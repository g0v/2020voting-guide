import pandas as pd
from datetime import date, datetime
import json

SOURCE = "../data/manual/2020選舉公報.xlsx"

# print(pd.ExcelFile(SOURCE).sheet_names)


def ROCtoAD(roc_date: str):
    year, month, day = roc_date.split("/")
    return date(int(year) + 1911, int(month), int(day)).isoformat()


def caculate_age(date_of_birth: str):
    today = date.today()
    born = datetime.strptime(date_of_birth, "%Y-%m-%d")
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))


def party_politics():
    df = pd.read_excel(SOURCE, sheet_name="不分區政黨", header=1)

    column_mapping = {"號碼": "number", "政黨": "name", "政見": "politics"}
    df = df.rename(columns=column_mapping)
    df["name"] = df["name"].str.strip()
    j = df.to_json(force_ascii=False, orient="records")
    with open("../mobile/src/data/party_politics_2020_cec.json", "w") as fp:
        fp.write(j)


def party_candidates():

    df = pd.read_excel(SOURCE, sheet_name="不分區候選人", header=0)

    column_mapping = {
        "排序": "rank",
        "政黨": "party",
        "姓名": "name",
        "性別": "sex",
        "學歷": "education",
        "經歷": "experience",
        "出生地": "place_of_birth",
        "生日（民國）": "date_of_birth",
    }
    df = df.rename(columns=column_mapping)
    df["name"] = df["name"].str.strip()
    df["date_of_birth"] = df["date_of_birth"].apply(ROCtoAD)
    df["age"] = df["date_of_birth"].apply(caculate_age)
    df["education"] = df["education"].str.replace("、", "\n").str.strip()
    df["educationConnection"] = "選舉公報"
    df["experience"] = (
        df["experience"].str.replace("、", "\n").str.replace("\n ", "\n").str.replace("\n\n", "\n").str.strip()
    )
    df["experienceConnection"] = "選舉公報"

    # j = df.to_json(force_ascii=False, orient="records")
    # with open("../mobile/src/data/party_candidates_cec.json", "w") as fp:
    #     fp.write(j)

    # modify data
    candidates = df.fillna("無").to_dict(orient="records")
    with open("../mobile/src/data/party_candidates.json", "r") as fp:
        original = json.load(fp)

    store = {}
    for candidate in candidates:
        original_candidate = [c for c in original[candidate["party"]] if c["name"] == candidate["name"]]
        original_candidate = original_candidate[0] if original_candidate else {}
        new_candidate = {**original_candidate, **candidate}
        if candidate["party"] not in store:
            store[candidate["party"]] = []
        store[candidate["party"]] += [new_candidate]
    # print(store)
    with open("../mobile/src/data/party_candidates_integrated.json", "w") as fp:
        json.dump(store, fp, ensure_ascii=False, indent=2)


def regional_candidates():
    df = pd.read_excel(SOURCE, sheet_name="區域立委", header=1)
    column_mapping = {
        "號碼": "number",
        "選舉區": "constituency",
        "姓名": "name",
        "生日\n民國年/月/日": "date_of_birth",
        "性別": "sex",
        "出生地": "place_of_birth",
        "政黨": "party",
        "學歷": "education",
        "經歷": "experience",
        "政見": "politic",
        "政見替代圖片": "politic_pic",
        "政見替代圖片檔名": "politic_pic_name",
    }
    df = df.rename(columns=column_mapping)
    # df["date_of_birth"] = df["date_of_birth"].apply(ROCtoAD)
    # df["age"] = df["date_of_birth"].apply(caculate_age)
    gist_source = "audreyt/ca005b9e2009e10aede305631dba5c3b/raw/"
    df["politic_pic"] = gist_source + df["politic_pic_name"]
    df = df.fillna("")

    json_string = df.to_json(force_ascii=False, orient="records")
    with open(f"../data/static/cec_regional/全國.json", "w") as fp:
        fp.write(json_string)

    candidates = df.to_dict(orient="records")
    constituencies = set([c["constituency"] for c in candidates])
    for constituency in constituencies:
        constituency_candidates = [c for c in candidates if c["constituency"] == constituency]
        with open(f"../data/static/cec_regional/{constituency}.json", "w") as fp:
            json.dump(constituency_candidates, fp, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    # party_politics()
    # party_candidates()
    regional_candidates()
