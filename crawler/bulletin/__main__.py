import os
import json
import requests
from transform import transform
from scrapy.crawler import CrawlerProcess
from spider import BulletinSpider

FILE_DIR = os.path.dirname(os.path.abspath(__file__))
DEST_FILE_DIR = f'{FILE_DIR}/../../data/raw/bulletin'
BULLETIN_FILE_NAME = f'{FILE_DIR}/../../data/raw/bulletin/2016-bulletin.json'
ORGANIZED_BULLETIN_FILE_NAME = f'{FILE_DIR}/../../data/organized/2016-bulletin.json'
SOURCE_URL = {
    "2016-總統": "http://2016.cec.gov.tw/opendata/api/proofreadercanrpt/json",
    "2016-區域立委": "http://2016.cec.gov.tw/opendata/api/proofreadercanrptarea/json",
    "2016-山地原住民立委": "http://2016.cec.gov.tw/opendata/api/proofreadercanrptarea/gaoshan/json",
    "2016-平地原住民立委": "http://2016.cec.gov.tw/opendata/api/proofreadercanrptarea/pingpu/json",
    "2016-不分區立委": "http://2016.cec.gov.tw/opendata/api/proofreadercanrptnationwide/json"
}
CHECK_KEYS = ["CandidateUrl", "CandidateUrl2", "RecPartyNameUrl"]


def remove_output():
    try:
        os.remove(BULLETIN_FILE_NAME)
    except FileNotFoundError:
        print(f'File not exist: {BULLETIN_FILE_NAME}')


def crawl_raw_data():
    source = []
    for name, url in SOURCE_URL.items():
        res = requests.get(url).json()
        raw_file_name = f'{DEST_FILE_DIR}/{name}.json'
        os.makedirs(os.path.dirname(raw_file_name), exist_ok=True)
        with open(raw_file_name, "w") as f:
            f.write(json.dumps(res, indent=2, ensure_ascii=False))
        print("[INFO] write raw result to", raw_file_name)
        source.append(res)

    return source


def get_bulletin_urls(source):
    urls = []
    for raw in source:
        for candidate in raw:
            if "CandidateUrl" in candidate and "CandidateUrl2" not in candidate:  # filter out president
                print(candidate["CandidateName"], candidate["CandidateUrl"])
                urls.append(candidate["CandidateUrl"])

    return urls


def crawl_bulletin_data(urls):
    process = CrawlerProcess({
        'USER_AGENT': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)',
        'FEED_FORMAT': 'json',
        'FEED_EXPORT_ENCODING': 'utf-8',
        'FEED_URI': BULLETIN_FILE_NAME,
        'DOWNLOAD_DELAY': 0.25,
        'LOG_LEVEL': 'INFO'
    })
    process.crawl(BulletinSpider, start_urls=urls)
    process.start()


if __name__ == "__main__":
    remove_output()
    urls = get_bulletin_urls(crawl_raw_data())
    crawl_bulletin_data(urls)
    transform(BULLETIN_FILE_NAME, ORGANIZED_BULLETIN_FILE_NAME)
