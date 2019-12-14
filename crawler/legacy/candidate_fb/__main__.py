import numpy as np
import pandas as pd

from db import FB

df = pd.read_csv("../data/manual/candidate_fb.csv")
df.columns = [
    "constituency",
    "name",
    "fbPage",
    "fbId",
    "like",
    "blueCheck",
    "createdDate",
    "managerCountry",
    "nameChangeNum",
]
data = df.replace({np.nan: None}).to_dict(orient="records")
FB.drop_table()
FB.create_table()
FB.insert_many(data).execute()
