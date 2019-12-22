from legislator_candidate.transform import parse_constituency


def test_constituency_transform():
    input_data = {
        "constituency": "臺北市第一選舉區",
        "kmt": ["詹為元", "黃子哲", "曾文培", "陳重文", "汪志冰"],
        "dpp": ["吳思瑤"],
        "other_party": {"name": ["潘懷宗"], "party": ["新黨"]},
        "no_party": ["陳建銘", "王郁楊"]
    }
    output_data = {
        "constituency": "臺北市第一選舉區",
        "candidates": [
            {'name': '詹為元', 'party': '國民黨'},
            {'name': '黃子哲', 'party': '國民黨'},
            {'name': '曾文培', 'party': '國民黨'},
            {'name': '陳重文', 'party': '國民黨'},
            {'name': '汪志冰', 'party': '國民黨'},
            {'name': '吳思瑤', 'party': '民進黨'},
            {'name': '潘懷宗', 'party': '新黨'},
            {'name': '陳建銘', 'party': '無黨籍'},
            {'name': '王郁楊', 'party': '無黨籍'}
        ]
    }
    assert parse_constituency(input_data) == output_data
