import json
import os
import re
from itertools import groupby

import util

RAW_DATA_DIR = os.path.dirname(os.path.abspath(__file__)) + "/../../data"
RAW_DATA_REGEX = r"history_legislator_info_page\d + .json"
DEST_FILE_PATH = os.path.dirname(os.path.abspath(__file__)) + "/../../data/organized/personal_info.json"
FIELDS = ["id", "name", "terms", "party", "areaName", "onboardDate", "degree", "experience", "picUrl"]

NUMBER_INFO = util.readNumberingData()


def readRawData():
    f_list = [os.path.join(RAW_DATA_DIR, x) for x in os.listdir(RAW_DATA_DIR) if re.match(RAW_DATA_REGEX, x)]
    print("Raw data files:", json.dumps(f_list))
    raw = []
    for path in f_list:
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
                        "picUrl": data["picUrl"]
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
