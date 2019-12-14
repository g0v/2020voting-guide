import json
from os import environ, path
from typing import Dict, List, Optional

from db import Sitting
from legislative_yuan_open_data import scrap_info_pages, store_pages_info

FILE_DIR = path.dirname(path.abspath(__file__))
OUTPUT_RAW_DIR = environ.get("OUTPUT_RAW_DIR", f"{FILE_DIR}/../../data/raw")
OUTPUT_TRANSFORMED_DIR = environ.get("OUTPUT_TRANSFORMED_DIR", f"{FILE_DIR}/../../data/organized")
ID = "sitting_info"


def to_db(pages_info: List[str]) -> None:
    sitting_pages = [json.loads(page)["jsonList"] for page in pages_info]
    sittings: List[Dict[str, Optional[str]]] = [
        sitting for partial_sittings in sitting_pages for sitting in partial_sittings
    ]
    Sitting.drop_table()
    Sitting.create_table()
    Sitting.insert_many(sittings).execute()


if __name__ == "__main__":
    pages_info = scrap_info_pages(ID, payload_base={"id": 42, "selectTerm": "all"}, page_count=6)
    store_pages_info(pages_info, ID, OUTPUT_RAW_DIR)
    to_db(pages_info)
