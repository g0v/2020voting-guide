import json
from os import environ, path

from db import Bill
from legislative_yuan_open_data import scrap_info_pages, store_pages_info

ID = "bill_info"
FILE_DIR = path.dirname(path.abspath(__file__))
OUTPUT_RAW_DIR = environ.get("OUTPUT_RAW_DIR", f"{FILE_DIR}/../../data/raw")

if __name__ == "__main__":
    pages_info = scrap_info_pages(ID, payload_base={"id": 20, "selectTerm": "all"}, page_count=20)
    store_pages_info(pages_info, ID, OUTPUT_RAW_DIR)
    data = [
        {
            "name": bill["billName"],
            "pdf": bill["pdfUrl"],
            "proposer": f'{bill["billOrg"]};'
            + (bill["billProposer"].replace("　　", ";") if bill["billProposer"] else ""),
            "cosignatory": bill["billCosignatory"].replace("　　", ";") if bill["billCosignatory"] else None,
            "billNo": bill["billNo"],
            "term": bill["term"],
            "sessionPeriod": bill["sessionPeriod"],
            "status": bill["billStatus"],
        }
        for page in pages_info
        for bill in json.loads(page)["jsonList"]
    ]
    Bill.drop_table()
    Bill.create_table()
    Bill.insert_many(data).execute()
