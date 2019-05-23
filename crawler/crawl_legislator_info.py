from os import path
from sys import exit

import requests

FILE_DIR = path.dirname(path.abspath(__file__))
OUTPUT_DIR = f'{FILE_DIR}/../data'


def send_request(url):
    print(f'[INFO] Sending request to {url}')
    try:
        response = requests.get(url, timeout=10)
    except requests.exceptions.ConnectTimeout:
        exit('[ERROR] Request Timeout')

    assert response.status_code == 200, f'[ERROR] Request Error, response code: {response.status_code}'
    return response.text


def store_info(file_name, response_body):
    OUTPUT_PATH = f'{OUTPUT_DIR}/{file_name}'
    with open(OUTPUT_PATH, 'w+') as fp:
        fp.write(response_body)
        print(f'response_body is written to "{OUTPUT_PATH}"')


def crawl_legislator_info_pages(page_count=1):
    for page_num in range(1, page_count + 1):
        url = f'http://data.ly.gov.tw/odw/openDatasetJson.action?id=16&selectTerm=all&page={page_num}'
        file_name = f'legislator_info_page{page_num}.json'
        response_body = send_request(url)
        store_info(file_name, response_body)


if __name__ == "__main__":
    crawl_legislator_info_pages(page_count=2)
