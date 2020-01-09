"""
從官網爬取 不同會期個別立委 相關數據，產生如下格式資料 ccw_full.json
[
    [
        {
            "評鑑": "優秀立委",
            "姓名": "王定宇",
            "所屬黨籍": "民主進步黨",
            "所屬黨團": "民主進步黨",
            "院會出席率": "100",
            "院會應出席": "20",
            "院會實際應出席": "20",
            "委員會出席率": "100",
            "委員會應出席": "42",
            "委員會實際應出席": "42",
            "質詢率": "95",
            "所屬委員會可質詢次數": "43",
            "口頭質詢次數": "41",
            "書面質詢次數": "1",
            "法案及預算審查": "100",
            "法案及預算審查可發言次數": "8",
            "法案及預算審查實際發言次數": "8"
        },
        ...
    ]
]

"""

import json

from requests_html import HTMLSession

#
# Parse Evaluation Data From CCW Website
#


def process_urls(session_list, urls):
    for url in urls:
        legislator_rate = get_legislator_rate(url)
        print(legislator_rate)
        session_list.append(legislator_rate)
    return session_list


def get_legislator_rate(url):
    r = session.get(url)
    return {
        "評鑑": r.html.find(".-show-md-to h1")[0].text,
        "姓名": r.html.find(".legislator-info .text-extra-bold")[1].text,
        "所屬黨籍": r.html.find(".legislator-info-list .underline span")[1].text,
        "所屬黨團": r.html.find(".legislator-info-list .underline span")[3].text,
        "院會出席率": r.html.find(".assess-level-list .assess-level-item .text-big-number")[0].text,
        "院會應出席": r.html.find(".assess-level-list .assess-level-item .text-word-with-bold b")[0].text,
        "院會實際應出席": r.html.find(".assess-level-list .assess-level-item .text-word-with-bold b")[1].text,
        "委員會出席率": r.html.find(".assess-level-list .assess-level-item .text-big-number")[1].text,
        "委員會應出席": r.html.find(".assess-level-list .assess-level-item .text-word-with-bold b")[2].text,
        "委員會實際應出席": r.html.find(".assess-level-list .assess-level-item .text-word-with-bold b")[3].text,
        "質詢率": r.html.find(".assess-level-list .assess-level-item .text-big-number")[2].text,
        "所屬委員會可質詢次數": r.html.find(".assess-level-list .assess-level-item .text-word-with-bold b")[4].text,
        "口頭質詢次數": r.html.find(".assess-level-list .assess-level-item .text-word-with-bold b")[5].text,
        "書面質詢次數": r.html.find(".assess-level-list .assess-level-item .text-word-with-bold b")[6].text,
        "法案及預算審查": r.html.find(".assess-level-list .assess-level-item .text-big-number")[3].text,
        "法案及預算審查可發言次數": r.html.find(".assess-level-list .assess-level-item .text-word-with-bold b")[7].text,
        "法案及預算審查實際發言次數": r.html.find(".assess-level-list .assess-level-item .text-word-with-bold b")[8].text,
    }


def parse_legislator_rate():
    session = HTMLSession()
    base_url = "https://ccw.org.tw/assess/session/"

    # https://ccw.org.tw/assess/session/3 -> 第一會期, https://ccw.org.tw/assess/session/5 -> 第二會期...
    session_path_list = [3, 5, 4, 7, 1, 2, 6]

    legislator_list = []
    for session_id in session_path_list:
        print(session_id)
        r = session.get(f"{base_url}{session_id}")

        # 取得每一位 優秀立委 之網址
        elements = r.html.find(".display-section")[1].find("legislator-item")
        excellent_urls = [e.attrs["href"] for e in elements]

        # 取得每一位 待觀察 之網址
        elements = r.html.find(".display-section")[2].find("legislator-item")
        observed_urls = [e.attrs["href"] for e in elements]

        # 取得每一位 一般立委 之網址
        elements = r.html.find(".display-section")[3].find("legislator-item")
        normal_urls = [e.attrs["href"] for e in elements]

        session_list = []
        session_list = process_urls(session_list, excellent_urls)
        session_list = process_urls(session_list, observed_urls)
        session_list = process_urls(session_list, normal_urls)
        legislator_list.append(session_list)

    print(legislator_list)

    people_dict_text = json.dumps(legislator_list, ensure_ascii=False, indent=4)

    output_file = "ccw_full.json"
    with open(output_file, "w") as output:
        output.write(people_dict_text)
