import pandas as pd

SOURCE = "../data/manual/2020選舉公報.xlsx"

# print(pd.ExcelFile(SOURCE).sheet_names)

df = pd.read_excel(SOURCE, sheet_name="不分區政黨", header=1)
df = df.rename(columns={"號碼": "number", "政黨": "name", "政見": "politics"})
df["name"] = df["name"].str.strip()
j = df.to_json(force_ascii=False, orient="records")
with open("../mobile/src/data/party_politics_2020_cec.json", "w") as fp:
    fp.write(j)
