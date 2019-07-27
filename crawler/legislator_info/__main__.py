from os import environ, path
from typing import List
from legislative_yuan_open_data import scrap_legislator_info_pages, store_pages_info
from transform import get_legislators_info, get_current_legislator_names
from util import store_json, getDbConnection

FILE_DIR = path.dirname(path.abspath(__file__))
OUTPUT_RAW_DIR = environ.get("OUTPUT_RAW_DIR", f"{FILE_DIR}/../../data/raw")
OUTPUT_TRANSFORMED_DIR = environ.get("OUTPUT_TRANSFORMED_DIR", f"{FILE_DIR}/../../data/organized")


def run_history_legislator_info_pages():
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
    connection = getDbConnection()
    # Add column before runs
    # ALTER TABLE vote2020.candidates ADD COLUMN current_legislator BOOLEAN DEFAULT FALSE NOT NULL;
    try:
        with connection.cursor() as cursor:
            sql = "UPDATE candidates SET current_legislator = TRUE WHERE name = %s;"
            data = [(name) for name in names]
            cursor.executemany(sql, data)
        connection.commit()
    except Exception as err:
        print(err)
    finally:
        connection.close()


if __name__ == "__main__":
    history_legislator_info_pages = run_history_legislator_info_pages()
    current_legislator_info_pages = run_current_legislator_info_pages()
    legislators_info = get_legislators_info(history_legislator_info_pages, current_legislator_info_pages)
    store_json(legislators_info, f"{OUTPUT_TRANSFORMED_DIR}/legislator_info.json")

    current_legislator_names = get_current_legislator_names(current_legislator_info_pages)
    tag_current_legislator_in_db(current_legislator_names)
