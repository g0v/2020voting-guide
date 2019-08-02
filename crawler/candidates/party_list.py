import json


def get_party_list(input_path, output_path):
    party_list = set()

    with open(input_path) as fp:
        constituencies_candidates = json.load(fp)

    for constituency in constituencies_candidates:
        for candidate in constituency[""]:
            party_list.add(candidate["party"])
