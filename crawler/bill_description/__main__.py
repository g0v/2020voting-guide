import json
from os import environ, path

from db import BillDescription
from legislative_yuan_open_data import scrap_info_pages, store_pages_info

ID = "bill_description"
FILE_DIR = path.dirname(path.abspath(__file__))
OUTPUT_RAW_DIR = environ.get("OUTPUT_RAW_DIR", f"{FILE_DIR}/../../data/raw/bill_description")

if __name__ == "__main__":
    BillDescription.drop_table()
    BillDescription.create_table()
    for i in range(1, 51, 5):
        pages_info = scrap_info_pages(
            ID, payload_base={"id": 19, "selectTerm": "all"}, page_count=i + 4, start_page=i, timeout=40
        )
        store_pages_info(pages_info, ID, OUTPUT_RAW_DIR, start_page=i)

        data = [
            {"bill": bill["lawCompareTitle"].replace("對照表", ""), **bill}
            for page in pages_info
            for bill in json.loads(page)["jsonList"]
        ]
        BillDescription.insert_many(data).execute()
