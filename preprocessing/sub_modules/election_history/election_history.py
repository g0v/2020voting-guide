import re
import os
import csv
import json
from pathlib import Path
from copy import deepcopy

import util
from political_contributions import political_contributions

FILE_NAME_CAND = r"elcand*.csv"
FILE_NAME_PARTY = r"elpaty.csv"
FILE_NAME_REPM = r"elrepm*.csv"

SCHEMA = {
    FILE_NAME_CAND: [
        "province",
        "county",
        "area",
        "city",
        "village",
        "number",
        "name",
        "partyNo",
        "gender",
        "birth",
        "age",
        "birthPlace",
        "education",
        "incumbent",
        "win",
        "vice",
    ],
    FILE_NAME_PARTY: ["number", "name"],
    FILE_NAME_REPM: ["partyNo", "rank", "name", "gender", "birth", "age", "birthPlace", "education", "incumbent", "win"],
}

FILE_DIR = os.path.dirname(os.path.abspath(__file__))
SOURCE_DIR = f"{FILE_DIR}/../../../data/raw/voteData/"
POLITICS_FILE_PATH = f"{FILE_DIR}/../../../data/organized/2016-politics.json"
print(os.path.abspath(SOURCE_DIR))

connection = util.getDbConnection()


def readRawData():
    history_info = {}
    politics_info = {}
    with open(POLITICS_FILE_PATH, "r") as f:
        politics_info = json.load(f)

    for cand_filename in Path(SOURCE_DIR).glob(f"**/{FILE_NAME_CAND}"):
        dir = os.path.dirname(cand_filename)

        print("processing", os.path.abspath(dir))

        party_filename = dir + "/" + FILE_NAME_PARTY
        party_mappings = {}

        with open(party_filename) as pf:
            reader = csv.DictReader(pf, fieldnames=SCHEMA[FILE_NAME_PARTY])
            for row in reader:
                party_mappings[row["number"]] = row["name"]

        repm_files = list(Path(dir).glob(FILE_NAME_REPM))

        if len(repm_files) > 0:
            with open(repm_files[0]) as cf:
                reader = csv.DictReader(cf, fieldnames=SCHEMA[FILE_NAME_REPM])
                for row in reader:
                    row["party"] = party_mappings[re.sub(r"\D", "", row["partyNo"].strip())]  # strip() to prevent some dirty data like "1 "
                    row["electionName"] = "-".join(dir.split("voteData/")[1].split("/"))
                    history_info.setdefault(row["name"], []).append(row)
        else:
            with open(cand_filename) as cf:
                reader = csv.DictReader(cf, fieldnames=SCHEMA[FILE_NAME_CAND])
                for row in reader:
                    row["party"] = party_mappings[re.sub(r"\D", "", row["partyNo"].strip())]  # strip() to prevent some dirty data like "1 "
                    row["electionName"] = "-".join(dir.split("voteData/")[1].split("/"))
                    if row["electionName"].startswith("2016") and row["name"] in politics_info:
                        row["politics"] = politics_info[row["name"]]
                        pc = political_contributions.getPCInfo(row["name"])
                        if len(pc) > 0:
                            row["voteCount"] = pc["voteCount"]
                            row["votePer"] = pc["votePer"]
                            if row["win"] == "*":
                                row["committee"] = pc["committee"]
                            del pc["voteCount"]
                            del pc["votePer"]
                            del pc["committee"]
                            row["politicalContributions"] = pc
                    history_info.setdefault(row["name"], []).append(row)
    return history_info


def writeResultToDb(history_info):
    datas = []
    for name, history in history_info.items():
        copy = deepcopy(history)
        for h in copy:
            h["name"] = name
            datas.append(h)
    with connection.cursor() as cursor:
        data = [
            (
                h["name"],
                h["electionName"],
                h.get("party", None),
                h.get("politics", None),
                h.get("win", None),
                h.get("incumbent", None),
                h.get("voteCount", None),
                h.get("votePer", None),
                h.get("committee", None),
            )
            for h in datas
        ]
        sql = (
            "INSERT IGNORE INTO `election_history` (`name`, `electionName`, `party`, `politics`, `win`, `incumbent`, `voteCount`,"
            "`votePer`, `committee`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        )
        cursor.executemany(sql, data)


HISTORY_INFO = readRawData()
writeResultToDb(HISTORY_INFO)
connection.begin()
connection.close()


def getHistory(name: str):
    return HISTORY_INFO.get(name, [])
