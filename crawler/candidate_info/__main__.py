import pandas as pd
import json

SOURCE_PATH = "../data/manual/2020立委候選人資料.xlsx"
REGIONAL_PATH = "../data/static/info/2020regional.json"
PARTY_PATH = "../data/static/info/2020party.json"


def prettier(path):
    with open(path, "r") as fp:
        json_str = json.load(fp)
    with open(path, "w") as fp:
        json.dump(json_str, fp, ensure_ascii=False, indent=2)


def extract_regional():
    column_mapping = {
        "選區": "constituency",
        "姓名": "name",
        "縣市": "county",
        "FB 粉絲專頁": "fbFanPage",
        "FB 個人頁面": "fbPersonalPage",
        "照片": "photo",
        "政黨": "party",
        "現任立委": "currentLegislator",
        "曾任立委(次要)": "passLegislator",
        "生日": "dateOfBirth",
        "年齡": "age",
        "wiki（次要）": "wiki",
        "FB Link": "fbLink",
        "學歷": "education",
        "學歷連結/來源": "educationLink",
        "經歷": "experience",
        "經歷連結/來源": "experienceLink",
        "政見": "politic",
        "政見連結/來源": "politicLink",
        "其他": "other",
    }
    df1 = pd.read_excel(SOURCE_PATH, sheet_name="區域候選人-基本", header=2, index_col=[1, 2])
    df2 = pd.read_excel(SOURCE_PATH, sheet_name="區域候選人-詳細", header=1, index_col=[0, 1])
    df3 = df1.join(df2).reset_index().rename(columns=column_mapping)
    df3.to_json(REGIONAL_PATH, orient="records", force_ascii=False)
    prettier(REGIONAL_PATH)


def extract_party():
    column_mapping = {
        "政黨": "party",
        "順位": "priority",
        "姓名": "name",
        "現任立委": "currentLegislator",
        "曾任立委(次要)": "passLegislator",
        "生日": "dateOfBirth",
        "年齡": "age",
        "照片": "photo",
        "wiki": "wiki",
        "FB 粉絲專頁": "fbFanPage",
        "FB 個人頁面": "fbPersonalPage",
        "學歷": "education",
        "學歷連結/來源": "educationLink",
        "經歷": "experience",
        "經歷連結/來源": "experienceLink",
        "政見": "politic",
        "政見連結/來源": "politicLink",
        "其他": "other",
        "(\b封存) 缺少來源的學歷": "archiveEducation",
        "(\b封存) 缺少來源的政見": "archivePolitic",
    }
    df1 = pd.read_excel(SOURCE_PATH, sheet_name="不分區候選人-基本", header=1, index_col=[0, 1, 2])
    df2 = pd.read_excel(SOURCE_PATH, sheet_name="不分區候選人-詳細", header=1, index_col=[0, 1, 2])
    df3 = df1.join(df2).reset_index().rename(columns=column_mapping)
    df3.reset_index().to_json(PARTY_PATH, orient="records", force_ascii=False)
    prettier(PARTY_PATH)


if __name__ == "__main__":
    extract_regional()
    extract_party()
