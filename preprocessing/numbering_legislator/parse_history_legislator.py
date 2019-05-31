from typing import List
import json


def get_legislator_names(source_path: str) -> List[str]:
    with open(source_path) as fp:
        legislation_info_list = json.load(fp)['jsonList']

    legislation_names = [info['name'] for info in legislation_info_list]
    return list(set(legislation_names))
