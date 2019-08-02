import json
from multiprocessing.dummy import Pool
from os import remove
import re

import requests

import util
import wptools
from db import Candidate
from parse import parse

URL = "https://zh.wikipedia.org/w/api.php"
OUTPUT_RAW = "../data/raw/legislator_candidate_infobox.json"


def remove_output():
    try:
        remove(OUTPUT_RAW)
    except FileNotFoundError:
        print(f"File not exist: {OUTPUT_RAW}")


def _send_request(payload):
    print(f"[INFO] Sending request to {URL}, payload: {payload}")
    try:
        response = requests.get(URL, params=payload, timeout=10)
    except requests.exceptions.ConnectTimeout:
        exit("[ERROR] Request Timeout")

    assert response.status_code == 200, f"[ERROR] Request Error, response code: {response.status_code}"
    return response.text


def get_infobox_page_list():
    return [row.wiki.split("/")[-1] for row in Candidate.select()]


def get_infobox(page_name):
    try:
        page = wptools.page(page_name, lang="zh").get_parse()
        return {"page_name": page_name, **page.data["infobox"]}
    except TypeError:
        print(f"[WARRNING] No infobox could be find, page_name: {page_name}")
    except LookupError:
        print(f"[ERROR] No page could be find, page_name: {page_name}")


def writeResultToDb(exist_info_boxes):
    for info_box in exist_info_boxes:
        valued_info = parse(info_box)
        Candidate.update(date_of_birth=valued_info["date_of_birth"], info_box=True).where(
            Candidate.name == valued_info["page_name"]
        ).execute()


if __name__ == "__main__":
    page_names = get_infobox_page_list()
    with Pool(processes=4) as pool:
        info_boxes = pool.map(get_infobox, page_names)
    exist_info_boxes = [i for i in info_boxes if i]
    info_boxes_string = json.dumps(exist_info_boxes, ensure_ascii=False, indent=2)
    util.store_json(info_boxes_string, OUTPUT_RAW)
    writeResultToDb(exist_info_boxes)
    # with open(OUTPUT_RAW) as fp:
    #     writeResultToDb(json.load(fp))
