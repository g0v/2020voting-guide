import json
from typing import List, Dict, Optional


def get_legislators_info(history_legislator_info_pages, current_legislator_info_pages) -> str:
    legislators: Dict[str, Dict[str, List[Dict[str, Optional[str]]]]] = {}
    history_legislators_pages = [json.loads(page)["jsonList"] for page in history_legislator_info_pages]
    current_legislators_pages = [json.loads(page)["jsonList"] for page in current_legislator_info_pages]

    for history_legislators in history_legislators_pages:
        for legislator in history_legislators:
            name = legislator["name"]
            if name not in legislators:
                legislators[name] = {"current_info": [], "history_info": []}
            legislators[name]["history_info"].append(legislator)

    for current_legislators in current_legislators_pages:
        for legislator in current_legislators:
            name = legislator["name"]
            legislators[name]["current_info"].append(legislator)

    return json.dumps(legislators, ensure_ascii=False)


def get_current_legislator_names(current_legislator_info_pages):
    import re

    current_legislators_pages = [json.loads(page)["jsonList"] for page in current_legislator_info_pages]
    names = [
        re.match(r"[\u4e00-\u9fff|．]{2,}", legislator["name"])[0]
        for current_legislators in current_legislators_pages
        for legislator in current_legislators
        if legislator["leaveFlag"] == "否"
    ]
    return names
