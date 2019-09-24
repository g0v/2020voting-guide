import json
from os import path

import pandas as pd

from db import Bill2

FILE_DIR = path.dirname(path.abspath(__file__))
EXCEL = f"{FILE_DIR}/issueBill.xlsx"

if __name__ == "__main__":
    for category in pd.ExcelFile(EXCEL).sheet_names:
        df = pd.read_excel(EXCEL, sheet_name=category)
        bills = df.to_json(orient="records", force_ascii=False)
        formated_bills = [
            {"term": bill["會期"][:2], "sessionPeriod": bill["會期"][3:5], "name": bill["提案名稱"], "category": category}
            for bill in json.loads(bills)
        ]
        print(formated_bills)
        for bill in formated_bills:
            Bill2.update(category=bill["category"]).where(
                Bill2.term == bill["term"], Bill2.sessionPeriod == bill["sessionPeriod"], Bill2.name == bill["name"]
            ).execute()
