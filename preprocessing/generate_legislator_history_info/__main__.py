import json
import os
from glob import glob
from itertools import groupby

import util
from election_history import election_history
from yuan_sittings_attend_rate import yuan_sittings_attend_rate

FILE_DIR = os.path.dirname(os.path.abspath(__file__))
DEST_FILE_PATH = f'{FILE_DIR}/../../data/final/personal_info_history.json'

NUMBER_INFO = util.readNumberingData()

connection = util.getDbConnection()


def readRawData():
    file_list = glob(f'{FILE_DIR}/../../data/raw/history_legislator_info_page*.json')
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
            "electionHistory": election_history.getHistory(info["name"])
        } for info in NUMBER_INFO
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
                        "yuanSittingsAttendRate": yuan_sittings_attend_rate.calc_attending_rate(name, data["term"])
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
    datas = []
    for id, info in legislator_info.items():
        for each in info["detail_list"]:
            each["name"] = info["name"]
            datas.append(each)
    with connection.cursor() as cursor:
        data = [(h["name"], h["term"], h.get("party", None), h.get("areaName", None), h.get("onboardDate", None), h.get("degree", None),
                h.get("experience", None), h.get("picUrl", None), h.get("yuanSittingsAttendRate", None)) for h in datas]
        sql = "INSERT IGNORE INTO `personal_info_history` (`name`, `term`, `party`, `areaName`, `onboardDate`, `degree`, `experience`," \
            "`picUrl`, `yuanSittingsAttendRate`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.executemany(sql, data)


if __name__ == "__main__":
    raw = readRawData()
    result = integrateData(raw)
    with open(DEST_FILE_PATH, "w") as f:
        f.write(json.dumps(result, ensure_ascii=False))
    writeResultToDb(result)
    connection.begin()
    connection.close()
