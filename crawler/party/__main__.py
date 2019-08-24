from os import path
import json
from db import Party


FILE_DIR = path.dirname(path.abspath(__file__))
RAW = f"{FILE_DIR}/../../data/manual/party.json"


def to_db() -> None:
    with open(RAW) as fp:
        parties = json.load(fp)

    transformed_parties = [
        {**party, "chairman": ",".join(party["chairman"]), "electedPerson": ",".join(party["electedPerson"])}
        for party in parties
    ]

    Party.drop_table()
    Party.create_table()
    Party.insert_many(transformed_parties).execute()


if __name__ == "__main__":
    to_db()
