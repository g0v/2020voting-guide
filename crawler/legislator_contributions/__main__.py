import numpy as np
import pandas as pd

from db import Contribution

df = pd.read_csv("../data/manual/2016_legislators_contributions.csv", thousands=",")
df.columns = [
    "constituency",
    "name",
    "constituencyRank",
    "voteNum",
    "party",
    "voteRate",
    "elected",
    "currentLegislator",
    "committee",
    "sex",
    "yearOfBirth",
    "contributeCompanyNum",
    "totalIncome",
    "personalContributeion",
    "personalContributeionRate",
    "profitableContributeion",
    "profitableContributeionRate",
    "partyContributeion",
    "partyContributeionRate",
    "civilOrganizationsContributeion",
    "civilOrganizationsContributeionRate",
    "anonymousContributeion",
    "anonymousContributeionRate",
    "otherContributeion",
    "otherContributeionRate",
    "overThrityThousandContribute",
    "totalExpense",
]
data = df.replace({np.nan: None}).to_dict(orient="records")
Contribution.drop_table()
Contribution.create_table()
Contribution.insert_many(data).execute()
