import json
from itertools import zip_longest


def parse_constituency(constituency_data):
    kmt_candidates = [
        {"party": "中國國民黨", "name": name, "wiki": ("https://zh.wikipedia.org" + wiki_link) if wiki_link else None}
        for name, wiki_link in zip_longest(constituency_data["kmt"]["name"], constituency_data["kmt"]["wiki_link"])
    ]
    dpp_candidates = [
        {"party": "民主進步黨", "name": name, "wiki": ("https://zh.wikipedia.org" + wiki_link) if wiki_link else None}
        for name, wiki_link in zip_longest(constituency_data["dpp"]["name"], constituency_data["dpp"]["wiki_link"])
    ]
    other_party_candidates = [
        {"party": party, "name": name, "wiki": ("https://zh.wikipedia.org" + wiki_link) if wiki_link else None}
        for party, name, wiki_link in zip_longest(
            constituency_data["other_party"]["party"],
            constituency_data["other_party"]["name"],
            constituency_data["other_party"]["wiki_link"],
        )
    ]
    no_party_candidates = [
        {"party": "無黨籍", "name": name, "wiki": ("https://zh.wikipedia.org" + wiki_link) if wiki_link else None}
        for name, wiki_link in zip_longest(
            constituency_data["no_party"]["name"], constituency_data["no_party"]["wiki_link"]
        )
    ]
    return {
        "constituency": constituency_data["constituency"],
        "candidates": [*kmt_candidates, *dpp_candidates, *other_party_candidates, *no_party_candidates],
    }


def transform(input_path, output_path):
    """Transform legislator candidate.

    output:
    [{
        "constituency": "臺北市第一選舉區",
        "candidates": [{"party": "國民黨", "name": "詹為元"},...]
    },...]
    """
    with open(input_path) as fp:
        constituencies_candidates = json.load(fp)

    transformed_constituencies_candidates = [
        parse_constituency(constituency_data) for constituency_data in constituencies_candidates
    ]

    # # get candidates' party list
    # party_list = set()
    # for constituency in transformed_constituencies_candidates:
    #     for candidate in constituency.get("candidates", []):
    #         party_list.add(candidate["party"])
    # print("Candidate party list:", ", ".join(party_list))

    with open(output_path, "w") as fp:
        fp.write(json.dumps(transformed_constituencies_candidates, ensure_ascii=False, indent=2))
