import csv
from os import path
from typing import Iterable

import util
from parse_history_legislator import get_legislator_names

SOURCE_FILE_PATH = "../data/organized/legislator_candidate.json"
RESULT_FILE_PATH = "../data/final/legislator_id.csv"
FIELD_NAMES = ["id", "name"]


def readResult():
    result = []

    if path.exists(RESULT_FILE_PATH):
        with open(RESULT_FILE_PATH, newline="") as f:
            result = [{k: v for k, v in row.items()} for row in csv.DictReader(f, skipinitialspace=True)]

    return result


def writeResult(add_legislation_list: Iterable[str], start_id: int):
    with open(RESULT_FILE_PATH, "a+") as fp:
        fp.seek(0)
        writer = csv.writer(fp)
        if not fp.read():
            writer.writerow(FIELD_NAMES)
        writer.writerows(enumerate(add_legislation_list, start_id))


if __name__ == "__main__":
    new_legislator_list = get_legislator_names(SOURCE_FILE_PATH)
    old_legislator_list = [legislator['name'] for legislator in util.read_csv(RESULT_FILE_PATH)]
    assert len(old_legislator_list) == len(set(old_legislator_list))
    add_legislator_list = set(new_legislator_list) - set(old_legislator_list)
    writeResult(add_legislator_list, len(old_legislator_list) + 1)
