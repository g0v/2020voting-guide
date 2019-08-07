import json
from os import environ, path
from typing import Dict, List

from db import Candidate, LegislatorRecord
from legislative_yuan_open_data import scrap_legislator_info_pages, store_pages_info
from transform import get_current_legislator_names


FILE_DIR = path.dirname(path.abspath(__file__))
OUTPUT_RAW_DIR = environ.get("OUTPUT_RAW_DIR", f"{FILE_DIR}/../../data/raw")
OUTPUT_TRANSFORMED_DIR = environ.get("OUTPUT_TRANSFORMED_DIR", f"{FILE_DIR}/../../data/organized")


def run_history_legislator_info_pages() -> List[Dict[str, str]]:
    id = "history_legislator_info"
    pages_info = scrap_legislator_info_pages(id, payload_base={"id": 16, "selectTerm": "all"}, page_count=2)
    store_pages_info(pages_info, id, OUTPUT_RAW_DIR)
    return pages_info


def run_current_legislator_info_pages():
    id = "current_legislator_info"
    pages_info = scrap_legislator_info_pages(id, payload_base={"id": 9, "selectTerm": "all"}, page_count=1)
    store_pages_info(pages_info, id, OUTPUT_RAW_DIR)
    return pages_info


def tag_current_legislator_in_db(names: List[str]) -> None:
    """Write current_legislator column.

    Notice: won't change others to False
    """
    print(f"current legislators: {names}")
    query = Candidate.update(currentLegislator=True).where(Candidate.name.in_(names))
    query.execute()


if __name__ == "__main__":
    history_legislator_info_pages = run_history_legislator_info_pages()
    data = [legislator for page in history_legislator_info_pages for legislator in json.loads(page)["jsonList"]]
    LegislatorRecord.drop_table()
    LegislatorRecord.create_table()
    LegislatorRecord.insert_many(data).execute()

    current_legislator_info_pages = run_current_legislator_info_pages()
    current_legislator_names = get_current_legislator_names(current_legislator_info_pages)
    tag_current_legislator_in_db(current_legislator_names)
