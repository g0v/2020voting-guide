import json
from typing import Any

from db import mysql_db

cursor = mysql_db.execute_sql(
    """SELECT
    statistic.*,
    legislator.party,
    legislator.areaName
    FROM statistic
    LEFT JOIN legislator ON legislator.name = statistic.name
    WHERE statistic.dataType = 'categories' AND statistic.term = 9 AND legislator.term = '09'"""
)
items = [
    {"party": i[7], "name": i[1], "constituency": i[8], "term": i[2], "type": i[3], "category": i[5], "value": i[6]}
    for i in cursor.fetchall()
]

store: Any = {}

for item in items:
    meta = {}
    meta["name"] = item["name"]
    meta["party"] = item["party"]
    meta["constituency"] = item["constituency"]
    if item["type"] == "interpellation":
        meta["interpellation"] = item["value"]
    if item["type"] == "legal_proposal":
        meta["proposal"] = item["value"]

    if item["category"] not in store:
        store[item["category"]] = {}
    if item["party"] not in store[item["category"]]:
        store[item["category"]][item["party"]] = []
    store[item["category"]][item["party"]] += [meta]

with open("./category_visualization/vis.json", "w") as fp:
    json.dump(store, fp, ensure_ascii=False, indent=2)
