import pandas as pd
from datetime import date

SOURCE = "../data/manual/2020選舉公報.xlsx"

# print(pd.ExcelFile(SOURCE).sheet_names)


def party_politics():
    df = pd.read_excel(SOURCE, sheet_name="不分區政黨", header=1)

    column_mapping = {"號碼": "number", "政黨": "name", "政見": "politics"}
    df = df.rename(columns=column_mapping)
    df["name"] = df["name"].str.strip()
    j = df.to_json(force_ascii=False, orient="records")
    with open("../mobile/src/data/party_politics_2020_cec.json", "w") as fp:
        fp.write(j)


def party_candidates():
    def ROCtoAD(roc_date: str):
        year, month, day = roc_date.split("/")
        return date(int(year) + 1911, int(month), int(day)).isoformat()

    df = pd.read_excel(SOURCE, sheet_name="不分區候選人", header=0)

    column_mapping = {
        "排序": "number",
        "政黨": "party",
        "姓名": "name",
        "性別": "sex",
        "學歷": "education",
        "經歷": "experience",
        "出生地": "place_of_birth",
        "生日（民國）": "day_of_birth",
    }
    df = df.rename(columns=column_mapping)
    df["name"] = df["name"].str.strip()
    df["day_of_birth"] = df["day_of_birth"].apply(ROCtoAD)
    df["education"] = df["education"].str.replace("、", "\n").str.strip()
    df["experience"] = df["experience"].str.replace("\n ", "\n").str.replace("\n\n", "\n").str.strip()
    j = df.to_json(force_ascii=False, orient="records")
    with open("../mobile/src/data/party_candidates_cec.json", "w") as fp:
        fp.write(j)


if __name__ == "__main__":
    party_politics()
    party_candidates()
