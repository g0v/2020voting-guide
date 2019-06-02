import json
import os
from glob import glob
from itertools import groupby

import util
from yuan_sittings_attend_rate import yuan_sittings_attend_rate

FILE_DIR = os.path.dirname(os.path.abspath(__file__))
DEST_FILE_PATH = f'{FILE_DIR}/../../data/organized/personal_info.json'

NUMBER_INFO = util.readNumberingData()


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
    result = {info["name"]: {"id": info["id"], "name": info["name"], "detail_list": []} for info in NUMBER_INFO}
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

    return result


if __name__ == "__main__":
    raw = readRawData()
    result = integrateData(raw)
    with open(DEST_FILE_PATH, "w") as f:
        f.write(json.dumps(result, ensure_ascii=False))
