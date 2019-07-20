import json


def parse_constituency(constituency_data, all_candidate_list):

    for candidate_name in constituency_data['kmt']:
        all_candidate_list.append(candidate_name)

    for candidate_name in constituency_data['dpp']:
        all_candidate_list.append(candidate_name)

    for candidate_data in constituency_data['other_party']['name']:
        all_candidate_list.append(candidate_data)

    for candidate_name in constituency_data['dpp']:
        all_candidate_list.append(candidate_name)

    for candidate_name in constituency_data['no_party']:
        all_candidate_list.append(candidate_name)


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
    ['蔣萬安', '呂玉玲', '蕭景田', '周柏雅', '鄭正鈐', '徐志榮',
    '陳美雅', '謝淑亞', '馬文君', '顏聖冠', '黃珊珊', '魯明哲',
    '王世堅', '林奕華', '林文瑞', '伊斯坦大.貝雅夫.正福', ...]

    """

    with open(input_path) as fp:
        constituencies_candidates = json.load(fp)

    all_candidate_list = []

    transformed_constituencies_candidates = [parse_constituency(constituency_data, all_candidate_list) for constituency_data in constituencies_candidates]

    final_list = list(set(all_candidate_list))

    print("All candidate list: ")
    print(final_list)

    print("Total number of candidates: ")
    print(len(final_list))

    with open(output_path, 'w') as fp:
        fp.write(json.dumps(final_list, ensure_ascii=False))
