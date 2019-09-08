import json
from collections import Counter

raw = "../data/raw/law.json"
final1 = "./result_law1.json"
final2 = "./result_law2.json"

store = {}

with open(raw) as fp:
    data = json.load(fp)

for law in data:
    category = law["category"]
    if category not in store:
        store[category] = {"main": [], "joint": []}
    store[category]["main"] += law["main_proposal"]
    store[category]["joint"] += law["joint_proposal"]

f_store = {}
print([*store])
for c in [*store]:
    print(c)
    if c not in f_store:
        f_store[c] = {}
    for t in store[c]:
        print(t)
        f_store[c][t] = dict(Counter(store[c][t]))

with open(final1, "w") as fp:
    json.dump(store, fp, ensure_ascii=False, indent=2)

with open(final2, "w") as fp:
    json.dump(f_store, fp, ensure_ascii=False, indent=2)
