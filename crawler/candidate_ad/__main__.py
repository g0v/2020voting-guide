import numpy as np
import pandas as pd

from db import AD

df = pd.read_csv("../data/manual/ad.csv")
df.columns = [
    "constituency",  # 選區
    "name",  # 參選人
    "adId",  # AD_ID
    "politicalAD",  # 登錄為政治廣告
    "startDate",  # 開始日期
    "endDate",  # 結束日期
    "content",  # 廣告內容
]
data = df.replace({np.nan: None}).to_dict(orient="records")
AD.drop_table()
AD.create_table()
AD.insert_many(data).execute()
