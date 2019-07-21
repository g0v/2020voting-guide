import json
import os
from glob import glob
from itertools import groupby

import util
from election_history import election_history
from yuan_sittings_attend_rate import yuan_sittings_attend_rate

FILE_DIR = os.path.dirname(os.path.abspath(__file__))
DEST_FILE_PATH = f"{FILE_DIR}/../../data/final/personal_info_history.json"

NUMBER_INFO = util.readNumberingData()


def readRawData():
    file_list = glob(f"{FILE_DIR}/../../data/raw/history_legislator_info_page*.json")
    print("Raw data files:", str(file_list))
    raw = []
    for path in file_list:
        with open(path, "r") as f:
            raw += json.loads(f.read())["jsonList"]

    return raw


def integrateData(raw):
    name_list = list(map(lambda x: x["name"], NUMBER_INFO))
    result = {
        info["name"]: {
            "id": info["id"],
            "name": info["name"],
            "detail_list": [],
            "electionHistory": election_history.getHistory(info["name"]),
        }
        for info in NUMBER_INFO
    }
    for name, datas in groupby(raw, lambda x: x["name"]):
        for data in datas:
            if name in name_list:
                result[name]["detail_list"].append(
                    {
                        "term": data["term"],
                        "party": data["party"],
                        "areaName": data["areaName"],
                        "onboardDate": data["onboardDate"],
                        "degree": data["degree"],
                        "experience": data["experience"],
                        "picUrl": data["picUrl"],
                        "yuanSittingsAttendRate": yuan_sittings_attend_rate.calc_attending_rate(name, data["term"]),
                    }
                )
            else:
                print(name, "is not in this term, skip.")
    for each in result.values():
        each["detail_list"].sort(key=lambda x: x["term"])
    for old_key in list(result.keys()):
        new_key = result[old_key]["id"]
        del result[old_key]["id"]
        result[new_key] = result.pop(old_key)

    return result


def writeResultToDb(legislator_info):
    connection = util.getDbConnection()
    try:
        term_info_list = [{"name": info["name"], **term} for info in legislator_info.values() for term in info["detail_list"]]
        with connection.cursor() as cursor:
            data = [
                (
                    term_info["name"],
                    term_info["term"],
                    term_info.get("party", None),
                    term_info.get("areaName", None),
                    term_info.get("onboardDate", None),
                    term_info.get("degree", None),
                    term_info.get("experience", None),
                    term_info.get("picUrl", None),
                    term_info.get("yuanSittingsAttendRate", None),
                )
                for term_info in term_info_list
            ]
            sql = (
                "INSERT IGNORE INTO personal_info_history (name, term, party, areaName, onboardDate, degree, experience,"
                "picUrl, yuanSittingsAttendRate) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            )
            cursor.executemany(sql, data)
        connection.commit()
    finally:
        connection.close()


if __name__ == "__main__":
    raw = readRawData()
    result = integrateData(raw)
    with open(DEST_FILE_PATH, "w") as f:
        f.write(json.dumps(result, ensure_ascii=False))
    writeResultToDb(result)
