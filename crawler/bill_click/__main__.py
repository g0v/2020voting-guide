import json

import pandas as pd

from db import BillClicks

df = pd.read_csv("../data/manual/bill_clicks.csv", dtype="object")
j = df.to_json(orient="records", force_ascii=False)
data = json.loads(j)

BillClicks.drop_table()
BillClicks.create_table()
BillClicks.insert_many(data).execute()
