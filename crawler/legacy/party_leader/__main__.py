import pandas as pd
import json

df = pd.read_csv("../data/manual/政黨幹部名單.csv")
json_text = df.to_json(orient="records", force_ascii=False)
records = json.loads(json_text)


store = {}
for record in records:
    party = record["party"]
    if party not in store:
        store[party] = []
    store[party].append({"position": record["position"], "name": record["name"]})

with open("../data/static/party_leader.json", "w") as fp:
    json.dump(store, fp, ensure_ascii=False, indent=2)
