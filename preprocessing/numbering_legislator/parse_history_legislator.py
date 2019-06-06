from typing import List
import json
import itertools


def get_legislator_names(source_path: str) -> List[str]:
    with open(source_path) as fp:
        legislation_info_list = json.load(fp)

    candidates = [constituency["candidates"] for constituency in legislation_info_list]
    legislation_names = [candidate["name"] for candidate in list(itertools.chain.from_iterable(candidates))]
    return list(set(legislation_names))
