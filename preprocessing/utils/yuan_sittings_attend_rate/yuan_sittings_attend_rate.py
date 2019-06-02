import re
import os
import json

FILE_DIR = os.path.dirname(os.path.abspath(__file__))
RAW_DATA_DIR = f'{FILE_DIR}/../../data'
RAW_DATA_REGEX = r'meeting_info_page\d+.json'
UNIT_LIST = ["全院委員會", "議事處會務科", "院會"]


def readRawData():
    f_list = [os.path.join(RAW_DATA_DIR, x) for x in os.listdir(RAW_DATA_DIR) if re.match(RAW_DATA_REGEX, x)]
    print("Raw data files:", json.dumps(f_list))
    raw = []
    for path in f_list:
        with open(path, "r") as f:
            raw += [data for data in json.loads(f.read())["jsonList"] if data["meetingUnit"] in UNIT_LIST]
    for each in raw:
        if each["attendLegislator"] is None:
            print("missing attend list:", json.dumps(each, ensure_ascii=False), "skip..")
            raw.remove(each)

    return raw


METTING_INFO = readRawData()


def calc(name: str, term: str):
    all_meetings = [d for d in METTING_INFO if d["term"] == term]
    if len(all_meetings) == 0:
        return "N/A"
    else:
        return str(sum(1 for d in all_meetings if name in d["attendLegislator"])) + "/" + str(len(all_meetings))
