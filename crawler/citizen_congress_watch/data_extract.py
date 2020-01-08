from statistics import mean, median
import json


def calculate(name, party, record, people_dict, party_dict):
    """[加總計算每位立委之 優秀立委次數, 待評估立委次數, 法案/預算審查率]

    Arguments:
        name {[str]} -- [name of legislator]
        party {[str]} -- [party of legislator]
        record {[dict]} -- [info of legislator]
        people_dict {[dict]} -- [total legislator data]
        party_dict {[dict]} -- [total party data]

    Returns:
        [dict] -- [total legislator data]
    """
    for session in record:
        # e.g. group = "內政委員會"
        for group in record[session]:
            # e.g. key = A1.院會_0.03
            for key in record[session][group]:
                # A4 -> 法案/預算審查率
                if "A4" in str(key):
                    if record[session][group][key]:
                        rate = record[session][group][key]
                        rate = rate.replace("／", "/")

                        did = int(rate.split("/")[0])
                        can = int(rate.split("/")[1])
                        party_dict[party]["engagementDid"] += did
                        party_dict[party]["engagementCan"] += can

                        rate_value = round(did / can, 2)

                        people_dict[name]["engagementDid"] += did
                        people_dict[name]["engagementCan"] += can
                        people_dict[name]["engagementRate"].append(rate_value)
                        people_dict[name]["engagementList"][session] = rate

            if "身分／其他" in record[session][group]:
                label = record[session][group]["身分／其他"]
                if label and "優秀立委" in str(label):
                    people_dict[name]["excellentLegislatorNum"] += 1
                    party_dict[party]["excellentLegislatorNum"] += 1
                if label and "待觀察" in str(label):
                    people_dict[name]["observedLegislatorNum"] += 1
                    party_dict[party]["observedLegislatorNum"] += 1

            if "評鑑結果" in record[session][group]:
                label = record[session][group]["評鑑結果"]
                if label and "優秀立委" in str(label):
                    people_dict[name]["excellentLegislatorNum"] += 1
                    party_dict[party]["excellentLegislatorNum"] += 1
                if label and "待觀察" in str(label):
                    people_dict[name]["observedLegislatorNum"] += 1
                    party_dict[party]["observedLegislatorNum"] += 1

        people_dict[name]["evaluationCount"] += 1
        party_dict[party]["evaluationCount"] += 1

    return people_dict


people_dict = {}
party_dict = {}
input_file = "../../data/static/evaluation.json"
output_file = "ccw.json"
party_output_file = "ccw_party.json"

with open(input_file, "r") as f, open(output_file, "w") as output, open(party_output_file, "w") as output2:
    datastore = json.load(f)
    for people in datastore["evaluation"]:
        name = people["name"].strip()
        party = people["group"].strip()
        record = people["rate"]
        if name not in people_dict:
            people_dict[name] = {
                "engagementList": {},
                "engagementCan": 0,
                "engagementDid": 0,
                "engagementRate": [],
                "excellentLegislatorNum": 0,
                "observedLegislatorNum": 0,
                "evaluationCount": 0,
            }
        if party not in party_dict:
            party_dict[party] = {
                "engagementCan": 0,
                "engagementDid": 0,
                "engagementRate": 0,
                "excellentLegislatorNum": 0,
                "observedLegislatorNum": 0,
                "evaluationCount": 0,
                "excellentLegislatorRate": 0,
                "observedLegislatorRate": 0,
            }

        people_dict = calculate(name, party, record, people_dict, party_dict)

    total_rate = []

    for people, statistic in people_dict.items():
        if len(statistic['engagementList']) != 7:
            print(people, len(statistic['engagementList']), list(statistic['engagementList'].keys()))
        statistic["engagementRate"] = statistic["engagementDid"] / statistic["engagementCan"] if statistic["engagementCan"] else 0
        total_rate.append(statistic["engagementRate"])

    output_rate = json.dumps(people_dict, ensure_ascii=False, indent=4)
    output.write(output_rate)

    print("Mean Rate", mean(total_rate))
    print("Median Rate", median(total_rate))

    for party, statistic in party_dict.items():
        statistic["engagementRate"] = statistic["engagementDid"] / statistic["engagementCan"]
        statistic["excellentLegislatorRate"] = statistic["excellentLegislatorNum"] / statistic["evaluationCount"]
        statistic["observedLegislatorRate"] = statistic["observedLegislatorNum"] / statistic["evaluationCount"]
    print(party_dict)
    output2.write(json.dumps(party_dict, ensure_ascii=False, indent=4))
