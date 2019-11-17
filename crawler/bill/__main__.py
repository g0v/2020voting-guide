import json
import re
from os import environ, makedirs, path

from db import Bill
from legislative_yuan_open_data import read_pages_info, scrap_info_pages, store_pages_info

ID = "bill_info"
FILE_DIR = path.dirname(path.abspath(__file__))
OUTPUT_RAW_DIR = environ.get("OUTPUT_RAW_DIR", f"{FILE_DIR}/../../data/raw/bill")


def extract():
    pages_info = scrap_info_pages(ID, payload_base={"id": 20, "selectTerm": "all"}, page_count=20)
    store_pages_info(pages_info, ID, OUTPUT_RAW_DIR)


def transform_load():
    pages_info = read_pages_info(ID, OUTPUT_RAW_DIR)
    data = [
        {
            **bill,
            "name": ("廢止" if bill["billName"].startswith("廢止") else "")
            + re.findall(r"「[\w\W]+」", bill["billName"])[0].replace("「", "").replace("」", ""),
            "billProposer": re.sub(r"　{2,}", "；", bill["billProposer"]) if bill["billProposer"] else None,
            "billCosignatory": re.sub(r"　{2,}", "；", bill["billCosignatory"]) if bill["billCosignatory"] else None,
        }
        for page in pages_info
        for bill in json.loads(page)["jsonList"]
    ]
    Bill.drop_table()
    Bill.create_table()
    Bill.insert_many(data).execute()
    print("Finish loading")


if __name__ == "__main__":
    makedirs(OUTPUT_RAW_DIR, exist_ok=True)
    extract()
    # transform_load()
