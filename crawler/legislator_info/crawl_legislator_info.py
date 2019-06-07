from sys import exit

import requests

URL = 'http://data.ly.gov.tw/odw/openDatasetJson.action'


def _send_request(payload):
    print(f'[INFO] Sending request to {URL}')
    try:
        response = requests.get(URL, params=payload, timeout=10)
    except requests.exceptions.ConnectTimeout:
        exit('[ERROR] Request Timeout')

    assert response.status_code == 200, f'[ERROR] Request Error, response code: {response.status_code}'
    return response.text


def _store_info(file_name, response_body, output_dir):
    OUTPUT_PATH = f'{output_dir}/{file_name}'
    with open(OUTPUT_PATH, 'w+') as fp:
        fp.write(response_body)
        print(f'[INFO] Response_body is written to "{OUTPUT_PATH}"')


def crawl_info_pages(output_dir, name, payload_base={}, page_count=1):
    for page_num in range(1, page_count + 1):
        print(f'[INFO] Start crawling "{name}" page{page_num} ')
        payload = {**payload_base, 'page': page_num}
        file_name = f'{name}_page{page_num}.json'
        response_body = _send_request(payload)
        _store_info(file_name, response_body, output_dir)


def crawl_all(output_dir):
    crawl_info_pages(output_dir=output_dir, name='history_legislator_info', payload_base={'id': 16, 'selectTerm': 'all'}, page_count=2)
    crawl_info_pages(output_dir=output_dir, name='current_legislator_info', payload_base={'id': 9, 'selectTerm': 'all'}, page_count=1)
    crawl_info_pages(output_dir=output_dir, name='meeting_info', payload_base={'id': 42, 'selectTerm': 'all'}, page_count=6)
