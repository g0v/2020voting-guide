from statistics import mean, median
import json


def calculate(name, people, people_dict):
    """[]

    Arguments:
        name {[str]} -- [name of legislator]
        people {[dict]} -- [info of legislator]
        people_dict {[dict]} -- [total legislator data]

    Returns:
        [dict] -- [total legislator data]
    """
    for session in people["rate"]:
        # e.g. group = "內政委員會"
        for group in people["rate"][session]:
            # e.g. key = A1.院會_0.03
            for key in people["rate"][session][group]:
                # A4 -> 法案/預算審查率
                if "A4" in str(key):
                    if people["rate"][session][group][key]:
                        rate = people["rate"][session][group][key]
                        rate = rate.replace("／", "/")
                        rate_value = round(int(rate.split("/")[0]) / int(rate.split("/")[1]), 2)

                        people_dict[name]["engagementRate"].append(rate_value)
                        people_dict[name]["engagementList"][session] = rate

            if "身分／其他" in people["rate"][session][group]:
                label = people["rate"][session][group]["身分／其他"]
                if label and "優秀立委" in str(label):
                    people_dict[name]["excellentLegislatorNum"] += 1
                if label and "待觀察" in str(label):
                    people_dict[name]["observedLegislatorNum"] += 1

            if "評鑑結果" in people["rate"][session][group]:
                label = people["rate"][session][group]["評鑑結果"]
                if label and "優秀立委" in str(label):
                    people_dict[name]["excellentLegislatorNum"] += 1
                if label and "待觀察" in str(label):
                    people_dict[name]["observedLegislatorNum"] += 1

    return people_dict


people_dict = {}
input_file = "../../data/static/evaluation.json"
output_file = "ccw.json"

with open(input_file, "r") as f, open(output_file, "w") as output:
    datastore = json.load(f)
    for people in datastore["evaluation"]:
        name = people["name"].strip()
        if name not in people_dict:
            people_dict[name] = {
                "engagementList": {},
                "engagementRate": [],
                "excellentLegislatorNum": 0,
                "observedLegislatorNum": 0,
            }
            people_dict = calculate(name, people, people_dict)
        else:
            people_dict = calculate(name, people, people_dict)

    total_rate = []

    for people in people_dict:
        if len(people_dict[people]['engagementList']) != 7:
            print(people, len(people_dict[people]['engagementList']), list(people_dict[people]['engagementList'].keys()))
        people_dict[people]["engagementRate"] = mean(people_dict[people]["engagementRate"])
        total_rate.append(people_dict[people]["engagementRate"])

    output_rate = json.dumps(people_dict, ensure_ascii=False, indent=4)
    output.write(output_rate)

    print("Mean Rate", mean(total_rate))
    print("Median Rate", median(total_rate))
