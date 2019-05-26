from os import path, environ
from sys import exit

import requests

FILE_DIR = path.dirname(path.abspath(__file__))
OUTPUT_DIR = environ.get('OUTPUT_DIR', f'{FILE_DIR}/../data')
URL = 'http://data.ly.gov.tw/odw/openDatasetJson.action'


def send_request(payload):
    print(f'[INFO] Sending request to {URL}')
    try:
        response = requests.get(URL, params=payload, timeout=10)
    except requests.exceptions.ConnectTimeout:
        exit('[ERROR] Request Timeout')

    assert response.status_code == 200, f'[ERROR] Request Error, response code: {response.status_code}'
    return response.text


def store_info(file_name, response_body):
    OUTPUT_PATH = f'{OUTPUT_DIR}/{file_name}'
    with open(OUTPUT_PATH, 'w+') as fp:
        fp.write(response_body)
        print(f'[INFO] Response_body is written to "{OUTPUT_PATH}"')


def crawl_legislator_info_pages(id, payload_base={}, page_count=1):
    for page_num in range(1, page_count + 1):
        print(f'[INFO] Start crawling "{id}" page{page_num} ')
        payload = {**payload_base, 'page': page_num}
        file_name = f'{id}_page{page_num}.json'
        response_body = send_request(payload)
        store_info(file_name, response_body)


if __name__ == "__main__":
    crawl_legislator_info_pages('history_legislator_info', payload_base={'id': 16, 'selectTerm': 'all'}, page_count=2)
    crawl_legislator_info_pages('current_legislator_info', payload_base={'id': 9, 'selectTerm': 'all'}, page_count=1)
    crawl_legislator_info_pages('meeting_info', payload_base={'id': 42, 'selectTerm': 'all'}, page_count=6)
