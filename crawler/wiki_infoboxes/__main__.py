import json
from multiprocessing.dummy import Pool
from os import remove

import requests
import wptools

from util import store_json

URL = 'https://zh.wikipedia.org/w/api.php'
OUTPUT_RAW = '../data/raw/legislator_candidate_infobox.json'


def remove_output():
    try:
        remove(OUTPUT_RAW)
    except FileNotFoundError:
        print(f'File not exist: {OUTPUT_RAW}')


def _send_request(payload):
    print(f'[INFO] Sending request to {URL}')
    try:
        response = requests.get(URL, params=payload, timeout=10)
    except requests.exceptions.ConnectTimeout:
        exit('[ERROR] Request Timeout')

    assert response.status_code == 200, f'[ERROR] Request Error, response code: {response.status_code}'
    return response.text


def get_infobox_page_list():
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


def get_infobox(page_name):
    try:
        page = wptools.page(page_name, lang='zh').get_parse()
        return {'page_name': page_name, **page.data['infobox']}
    except TypeError:
        print(f'[WARRNING] No infobox could be find, page_name: {page_name}')
    except LookupError:
        print(f'[ERROR] No page could be find, page_name: {page_name}')


if __name__ == "__main__":
    page_names = get_infobox_page_list()
    with Pool(processes=4) as pool:
        info_boxes = pool.map(get_infobox, page_names)
    info_boxes_string = json.dumps(info_boxes, ensure_ascii=False)
    store_json(info_boxes_string, '../data/raw/legislator_candidate_infobox.json')
