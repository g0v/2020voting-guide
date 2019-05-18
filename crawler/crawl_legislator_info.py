from os import path
from sys import exit

import requests

LEGISLATOR_INFO_URL = 'http://data.ly.gov.tw/odw/openDatasetJson.action?id=16&selectTerm=all&page=1'
FILE_DIR = path.dirname(path.abspath(__file__))
OUTPUT_PATH = f'{FILE_DIR}/../data/legislator_info.json'

if __name__ == "__main__":
    try:
        response = requests.get(LEGISLATOR_INFO_URL, timeout=10)
    except requests.exceptions.ConnectTimeout:
        exit('[ERROR] Request Error')

    assert response.status_code == 200, 'Request Error'
    with open(OUTPUT_PATH, 'w+') as fp:
        fp.write(response.text)
        print(f'"{LEGISLATOR_INFO_URL}" is written to "{OUTPUT_PATH}"')
