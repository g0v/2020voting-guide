import json


def parse_constituency(constituency_data):
    kmt_candidates = [{'party': '國民黨', 'name': candidate_name} for candidate_name in constituency_data['kmt']]
    dpp_candidates = [{'party': '民進黨', 'name': candidate_name} for candidate_name in constituency_data['dpp']]
    other_party_candidates = [{'party': candidate_data[0], 'name': candidate_data[1]}
                              for candidate_data in zip(constituency_data['other_party']['party'],
                                                        constituency_data['other_party']['name'])]
    no_party_candidates = [{'party': '無黨籍', 'name': candidate_name} for candidate_name in constituency_data['no_party']]
    return {'constituency': constituency_data['constituency'],
            'candidates': [*kmt_candidates, *dpp_candidates, *other_party_candidates, *no_party_candidates]}


def transform(input_path, output_path):
    """Transform legislator candidate.

    input:
    [{
        "constituency": "臺北市第一選舉區",
        "kmt": ["詹為元", "黃子哲", "曾文培", "陳重文", "汪志冰"],
        "dpp": ["吳思瑤"],
        "other_party": {"name": ["潘懷宗"], "party": ["新黨"]},
        "no_party": ["陳建銘", "王郁楊"]
    },...]

    output:
    [{
        "constituency": "臺北市第一選舉區",
        "candidates": [{"party": "國民黨", "name": "詹為元"},...]
    },...]
    """
    with open(input_path) as fp:
        constituencies_candidates = json.load(fp)


    transformed_constituencies_candidates = [parse_constituency(constituency_data) for constituency_data in constituencies_candidates]

    print(transformed_constituencies_candidates)



    with open(output_path, 'w') as fp:
        fp.write(json.dumps(transformed_constituencies_candidates, ensure_ascii=False))
