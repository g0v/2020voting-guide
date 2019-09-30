import json
from os import path
from glob import glob
import pandas as pd

from db import Bill

FILE_DIR = path.dirname(path.abspath(__file__))

if __name__ == "__main__":
    for excel in glob(f"{FILE_DIR}/../../data/manual/issueBill/*"):
        category = path.basename(excel).replace(".xls", "")

        df = pd.read_html(excel, header=[0])[0]  # source stores html table as .xls
        bills = df.to_json(orient="records", force_ascii=False)

        formated_bills = [
            {"term": bill["會期"][:2], "sessionPeriod": bill["會期"][3:5], "name": bill["提案名稱"], "category": category}
            for bill in json.loads(bills)
        ]
        print(formated_bills)
        for bill in formated_bills:
            affected_rows = (
                Bill.update(category=bill["category"])
                .where(
                    Bill.term == bill["term"], Bill.sessionPeriod == bill["sessionPeriod"], Bill.name == bill["name"]
                )
                .execute()
            )
            print(f"Affected Rows: {affected_rows}")
