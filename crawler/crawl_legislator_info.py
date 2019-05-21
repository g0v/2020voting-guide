from os import path
from sys import exit

import requests

FILE_DIR = path.dirname(path.abspath(__file__))
MAX_PAGE_NUM = 2


def crawl_page(page_num):
    print(f'[INFO] Start crawling page {page_num}')
    try:
        legislator_info_url = f'http://data.ly.gov.tw/odw/openDatasetJson.action?id=16&selectTerm=all&page={page_num}'
        response = requests.get(legislator_info_url, timeout=10)
    except requests.exceptions.ConnectTimeout:
        exit('[ERROR] Request Timeout')

    assert response.status_code == 200, f'[ERROR] Request Error, response code: {response.status_code}'

    OUTPUT_PATH = f'{FILE_DIR}/../data/legislator_info_page{page_num}.json'
    with open(OUTPUT_PATH, 'w+') as fp:
        fp.write(response.text)
        print(f'"{legislator_info_url}" is written to "{OUTPUT_PATH}"')


if __name__ == "__main__":
    for page in range(1, MAX_PAGE_NUM + 1):
        crawl_page(page)
