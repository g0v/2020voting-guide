"""
用於將單一會期所有評鑑種類(經濟, 內政...) 之 json object 合併為單一一個 json 檔案
"""
from sheets import get_sheets
from json_convert import generate_json


def merge_single_session(session):
    """[整合單一會期所有評鑑種類為單一 json object]

    Arguments:
        session {[int]} -- [第幾會期]

    Returns:
        [type] -- [description]
    """
    sheet_dict = get_sheets(session)

    # 取得如下 list [[{"name": "王定宇",,{"name": "呂孫綾",}],[{...},{...}]]
    rate_list = [generate_json(sheet_dict[rate_type], rate_type, session) for rate_type in sheet_dict]
    # print(rate_list[0])

    people_list = []
    for num, rate in enumerate(rate_list):
        # 以第一個會期為基礎來合併
        if num == 0:
            for people in rate:
                people_list.append(people['name'])
        else:
            for people in rate:
                if people['name'] not in people_list:
                    people_list.append(people)
                    rate_list[0].append(people)
                else:
                    # 合併該種類之評鑑資訊 到 該位立委資料中
                    people_index = people_list.index(people['name'])
                    rate_type = list(people['rate'][session].keys())[0]
                    rate_list[0][people_index]['rate'][session][rate_type] = people['rate'][session][rate_type]
    return rate_list[0]
