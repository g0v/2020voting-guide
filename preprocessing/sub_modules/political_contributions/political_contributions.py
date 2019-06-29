
import os
import csv
import json

FILE_DIR = os.path.dirname(os.path.abspath(__file__))
RAW_FILE_NAME = f'{FILE_DIR}/../../../data/raw/politicalContributions/2016_legislators.csv'


def numberFormat(input: str):
    s = input.replace(",", "")
    if s != "":
        return int(s)
    else:
        return 0


def readRawData():
    data = {}
    with open(RAW_FILE_NAME, "r") as f:
        pc_list = [row for row in csv.DictReader(f, skipinitialspace=True)]
    for each in pc_list:
        data[each['姓名']] = {
            "voteCount": numberFormat(each["得票數"]),
            "votePer": each["得票率"],
            "committee": each["委員會"],
            "companyNum": numberFormat(each["捐贈企業數"]),
            "incomeTotal": numberFormat(each["總收入"]),
            "incomePersonal": numberFormat(each["個人捐贈收入"]),
            "incomePersonalPer": each["個人捐贈比例"],
            "incomeCompany": numberFormat(each["營利事業捐贈收入"]),
            "incomeCompanyPer": each["營利事業捐贈比例"],
            "incomeParty": numberFormat(each["政黨捐贈收入"]),
            "incomePartyPer": each["政黨捐贈收入比例"],
            "incomeSocialGroup": numberFormat(each["人民團體捐贈收入"]),
            "incomeSocialGroupPer": each["人民團體收入比例"],
            "incomeAnonymous": numberFormat(each["匿名捐贈收入"]),
            "incomeAnonymousPer": each["匿名捐贈比例"],
            "incomeOther": numberFormat(each["其他收入"]),
            "incomeOtherPer": each["其他收入比例"],
            "incomeBig": numberFormat(each["超過三萬元之收入"]),
            "expensesTotal": numberFormat(each["總支出"])
        }
    for name, info in data.items():
        if info["incomePersonal"] + info["incomeCompany"] + info["incomeParty"] + info["incomeSocialGroup"] + \
                info["incomeAnonymous"] + info["incomeOther"] != info["incomeTotal"]:
            print(name, "income not match, info:", json.dumps(info, indent=2, ensure_ascii=False))

    return data


PC_INFO = readRawData()


def getPCInfo(name: str):
    return PC_INFO.get(name, {})
