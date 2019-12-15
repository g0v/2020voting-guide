# import json

import numpy as np
import pandas as pd
from db import ManualCandidate

df = pd.read_csv("../data/manual/2020candidate_regional.csv")
df.columns = [
    "constituency",  # 選區
    "name",  # 姓名
    "fbPage",  # FB 粉絲專頁
    "fbPersonalPage",  # FB 粉絲專頁
    "photo",  # 照片
    "party",  # 政黨
    "currentLegislator",  # 現任立委
    "beenLegislator",  # 曾任立委
    "dayOfBirth",  # 生日
    "age",  # 年齡
    "wiki",  # wiki
    "education",  # 學歷
    "educationConn",  # 學歷連結
    "experience",  # 經歷
    "experienceConn",  # 經歷連結
    "politics",  # 政見
    "politicsConn",  # 政見連結
    "other",
]

data = df.replace({np.nan: None}).to_dict(orient="records")
data = [
    {
        **d,
        "currentLegislator": True if d["currentLegislator"] == "Y" else False,
        "beenLegislator": True if d["beenLegislator"] == "Y" else False,
        "education": d["education"].replace(";", "\n").replace("\n\n", "\n").strip() if d["education"] else None,
        "experience": d["experience"].replace(";", "\n").replace("\n\n", "\n").strip() if d["experience"] else None,
    }
    for d in data
]
# print(json.dumps(data, ensure_ascii=False, indent=2))
ManualCandidate.drop_table()
ManualCandidate.create_table()
ManualCandidate.insert_many(data).execute()
