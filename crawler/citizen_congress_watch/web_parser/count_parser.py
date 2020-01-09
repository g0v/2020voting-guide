"""
從官網爬取 優秀立委 與 待觀察立委 次數，產生如下格式資料 ccw_count.json
{
    "王定宇": {
        "excellentLegislatorNum": 5,
        "observedLegislatorNum": 0
    },
    "尤美女": {
        "excellentLegislatorNum": 5,
        "observedLegislatorNum": 0
    }
    ...
"""
import json

from requests_html import HTMLSession


def parse_legislator_num():
    """
    產生如下格式資料
    {
        "王定宇": {
            "excellentLegislatorNum": 5,
            "observedLegislatorNum": 0
        },
    }
    """
    session = HTMLSession()
    base_url = 'https://ccw.org.tw/assess/session/'

    # https://ccw.org.tw/assess/session/3 -> 第一會期, https://ccw.org.tw/assess/session/5 -> 第二會期...
    session_path_list = [3, 5, 4, 7, 1, 2, 6]

    legislator_list = []
    for session_id in session_path_list:
        print(session_id)
        r = session.get(f'{base_url}{session_id}')

        elements = r.html.find('.display-section')[1].find('legislator-item')
        excellent_names = [e.text for e in elements]

        elements = r.html.find('.display-section')[2].find('legislator-item')
        observed_names = [e.text for e in elements]

        elements = r.html.find('.display-section')[3].find('legislator-item')
        normal_names = [e.text for e in elements]

        legislator_rate = {
            '優秀立委': excellent_names,
            '待觀察立委': observed_names,
            '一般立委': normal_names,
        }

        legislator_list.append(legislator_rate)

    for num, names in enumerate(legislator_list):
        print(f'第 {num+1} 會期')
        print(names, '\n')

    people_dict = {}
    for names in legislator_list:
        for name in names['優秀立委']:
            if name not in people_dict:
                people_dict[name] = {
                    "excellentLegislatorNum": 1,
                    "observedLegislatorNum": 0
                }
            else:
                people_dict[name]['excellentLegislatorNum'] += 1

        for name in names['待觀察立委']:
            if name not in people_dict:
                people_dict[name] = {
                    "excellentLegislatorNum": 0,
                    "observedLegislatorNum": 1
                }
            else:
                people_dict[name]['observedLegislatorNum'] += 1

        for name in names['一般立委']:
            if name not in people_dict:
                people_dict[name] = {
                    "excellentLegislatorNum": 0,
                    "observedLegislatorNum": 0
                }

    people_dict_text = json.dumps(people_dict, ensure_ascii=False, indent=4)

    output_file = "ccw_count.json"
    with open(output_file, 'w') as output:
        output.write(people_dict_text)
