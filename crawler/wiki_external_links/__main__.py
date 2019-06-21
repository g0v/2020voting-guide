import json
from multiprocessing.dummy import Pool
from os import remove

import requests

from transform import transform
from util import store_json

URL = 'https://zh.wikipedia.org/w/api.php'
OUTPUT_RAW = '../data/raw/legislator_candidate_external_links.json'
OUTPUT_TRANSFORMED = '../data/organized/legislator_candidate_external_links.json'


def remove_output():
    try:
        remove(OUTPUT_RAW)
    except FileNotFoundError:
        print(f'File not exist: {OUTPUT_RAW}')


def _send_request(payload):
    print(f'[INFO] Sending request to {URL}, payload: {payload}')
    try:
        response = requests.get(URL, params=payload, timeout=10)
        assert response.status_code == 200, f'[ERROR] Request Error, response code: {response.status_code}'
        return response.text
    except (requests.exceptions.ConnectTimeout, requests.exceptions.ReadTimeout):
        print(f'[ERROR] Request Timeout, payload: {payload}')
    except AssertionError:
        print(f'[ERROR] Request Error, status_code: {response.status_code}, payload: {payload}')


def get_page_list():
    payload = {
        'action': 'parse',
        'format': 'json',
        'page': '2020年中華民國立法委員選舉',
        'prop': 'links',
        'section': '8',  # section_name: 區域暨原住民選舉
        'utf8': ''
    }
    response_data = json.loads(_send_request(payload))
    return [link['*'] for link in response_data['parse']['links'] if not link['*'].startswith('Template')]


def get_external_link_section(page_name):
    payload = {
        'action': 'parse',
        'prop': 'sections',
        'format': 'json',
        'page': page_name
    }
    response_data = json.loads(_send_request(payload))
    try:
        sections = response_data['parse']['sections']
        for section in sections:
            if section['line'] == '外部連結':
                return section['index']
        else:
            print(f'[WARRING] No sections, page_name: {page_name}')
    except IndexError:
        print(f'[WARRING] Can\'t find the last section, data: {response_data}')
    except KeyError:
        print(f'[WARRING] Page doesn\'t exist, page_name: {page_name}')


def get_page_links(page_name):
    section = get_external_link_section(page_name)
    payload = {
        'action': 'parse',
        'format': 'json',
        'page': page_name,
        'prop': 'externallinks',
        'utf8': '',
        'section': section
    }
    response_data = json.loads(_send_request(payload))
    try:
        return response_data['parse']
    except KeyError:
        print(f'[WARRNING] {page_name} does not have key "parse"')
        return {'title': page_name}


if __name__ == "__main__":
    page_names = get_page_list()
    with Pool(processes=4) as pool:
        pages_links = pool.map(get_page_links, page_names)
    pages_links_string = json.dumps(pages_links, ensure_ascii=False)
    store_json(pages_links_string, OUTPUT_RAW)

    # with open(OUTPUT_RAW) as fp:
    #     pages_links = json.load(fp)
    store_json(json.dumps(transform(pages_links), ensure_ascii=False), OUTPUT_TRANSFORMED)
