import requests

from db import Bill2

if __name__ == "__main__":
    response = requests.get("https://www.ly.gov.tw/WebAPI/LegislativeBill.aspx?from=1010201&to=1091201&mode=json")
    data = [
        {
            "date": bill["date"],
            "term": bill["term"],
            "sessionPeriod": bill["sessionPeriod"],
            "name": bill["billName"],
            "proposer": bill["billProposer"],
            "cosignatory": bill["billCosignatory"],
            "status": bill["billStatus"],
        }
        for bill in response.json()
    ]
    Bill2.drop_table()
    Bill2.create_table()
    Bill2.insert_many(data).execute()
