import json
import os
from glob import glob
from itertools import groupby


def _readRawData(raw_dir):
    file_list = glob(f'{raw_dir}/history_legislator_info_page*.json')
    print("Raw data files:", str(file_list))
    raw = []
    for path in file_list:
        with open(path, "r") as f:
            raw += json.loads(f.read())["jsonList"]

    return raw


def _writeResult(result, output_dir):
    fname = f'{output_dir}/personal_info_history.json'
    with open(fname, "w") as f:
        f.write(json.dumps(result, ensure_ascii=False))


def _integrateData(raw):
    result = {}
    for name, datas in groupby(raw, lambda x: x["name"]):
        for data in datas:
            result.setdefault(name, []).append(
                {
                    "term": data["term"],
                    "party": data["party"],
                    "areaName": data["areaName"],
                    "onboardDate": data["onboardDate"],
                    "degree": data["degree"],
                    "experience": data["experience"],
                    "picUrl": data["picUrl"],
                }
            )
    for each in result.values():
        each.sort(key=lambda x: x["term"])

    return result


def transform(raw_dir, output_dir):
    _writeResult(_integrateData(_readRawData(raw_dir)), output_dir)
