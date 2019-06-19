import json
import os
from glob import glob

FILE_DIR = os.path.dirname(os.path.abspath(__file__))
UNIT_LIST = ["全院委員會", "議事處會務科", "院會"]


def readRawData():
    def validate_meeting(meeting):
        if meeting["meetingUnit"] not in UNIT_LIST:
            return False
        if meeting["attendLegislator"] is None:
            print("missing attend list: ", meeting['meetingName'], " skip..")
            return False
        return True

    file_list = glob(f'{FILE_DIR}/../../../data/raw/meeting_info_page*.json')
    print("Raw data files: ", str(file_list))

    meetings = []
    for path in file_list:
        with open(path) as fp:
            partial_meetings = json.load(fp)["jsonList"]
            meetings += [meeting for meeting in partial_meetings if validate_meeting(meeting)]

    return meetings


METTING_INFO = readRawData()


def calc_attending_rate(name: str, term: str) -> str:
    should_attend_meetings = [meeting for meeting in METTING_INFO if meeting["term"] == term]
    if not should_attend_meetings:
        return "N/A"
    else:
        numerator = sum(1 for meeting in should_attend_meetings if name in meeting["attendLegislator"])
        denumerator = len(should_attend_meetings)
        return f'{numerator}/{denumerator}'
