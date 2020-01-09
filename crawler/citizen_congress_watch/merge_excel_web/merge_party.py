import json


def add_party_to_personal():
    """
    幫下列格式資料 {
    "王定宇": {
        "excellentLegislatorNum": 5,
        "observedLegislatorNum": 0
    },
    加上 party 政黨資訊欄位
    """
    with open("meta_data/ccw_count.json", "r") as count, open("meta_data/ccw_full.json", "r") as full:
        party_full_data = json.load(full)
        correct_count_data = json.load(count)

        for session in party_full_data:
            for people in session:
                name = people["姓名"]
                if "party" not in correct_count_data[name]:
                    correct_count_data[name]["party"] = people["所屬黨籍"]

        print(correct_count_data)
        return correct_count_data


def merge_party_data():
    """
    以官網資訊之各別立委優秀立委次數 取代 excel 來源之現有政黨優秀立委次數 (excel_ccw_party.json)
    """
    with open("meta_data/excel_ccw_party.json", "r") as rate, open("ccw_party.json", "w") as output:

        correct_count_data = add_party_to_personal()
        correct_rate_data = json.load(rate)

        party_dict = {}
        for name in correct_count_data:
            party = correct_count_data[name]["party"]
            excellentLegislatorNum = correct_count_data[name]["excellentLegislatorNum"]
            observedLegislatorNum = correct_count_data[name]["observedLegislatorNum"]

            if party not in party_dict:
                party_dict[party] = {
                    "excellentLegislatorNum": excellentLegislatorNum,
                    "observedLegislatorNum": observedLegislatorNum,
                }
            else:
                party_dict[party]["excellentLegislatorNum"] += excellentLegislatorNum
                party_dict[party]["observedLegislatorNum"] += observedLegislatorNum

        for party in party_dict:
            if party != "無黨團結聯盟":
                correct_rate_data[party]["excellentLegislatorNum"] = party_dict[party]["excellentLegislatorNum"]
                correct_rate_data[party]["observedLegislatorNum"] = party_dict[party]["observedLegislatorNum"]

        merge_data = json.dumps(correct_rate_data, ensure_ascii=False, indent=4)
        output.write(merge_data)
