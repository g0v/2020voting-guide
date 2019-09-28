import json
from os import environ, path

from db import BillDescription
from legislative_yuan_open_data import scrap_info_pages, store_pages_info, read_pages_info

ID = "bill_description"
FILE_DIR = path.dirname(path.abspath(__file__))
OUTPUT_RAW_DIR = environ.get("OUTPUT_RAW_DIR", f"{FILE_DIR}/../../data/raw/bill_description")


def extract():
    for i in range(1, 51, 5):
        pages_info = scrap_info_pages(
            ID, payload_base={"id": 19, "selectTerm": "all"}, page_count=i + 4, start_page=i, timeout=40
        )
        store_pages_info(pages_info, ID, OUTPUT_RAW_DIR, start_page=i)


def transform_load():
    BillDescription.drop_table()
    BillDescription.create_table()
    pages_info = read_pages_info(ID, OUTPUT_RAW_DIR)
    for i, page in enumerate(pages_info):
        data = [{"bill": bill["lawCompareTitle"].replace("對照表", ""), **bill} for bill in json.loads(page)["jsonList"]]
        print(f"Loading to MYSQL, page: {i + 1}")
        BillDescription.insert_many(data).execute()
        print(f"Finished, page: {i + 1}")


if __name__ == "__main__":
    extract()
    transform_load()
