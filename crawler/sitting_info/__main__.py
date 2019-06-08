from os import environ, path

from legislative_yuan_open_data import (scrap_legislator_info_pages,
                                        store_pages_info)
from transform import transform
from util import store_json

FILE_DIR = path.dirname(path.abspath(__file__))
OUTPUT_RAW_DIR = environ.get('OUTPUT_RAW_DIR', f'{FILE_DIR}/../../data/raw')
OUTPUT_TRANSFORMED_DIR = environ.get('OUTPUT_TRANSFORMED_DIR', f'{FILE_DIR}/../../data/organized')
ID = 'sitting_info'

if __name__ == "__main__":
    pages_info = scrap_legislator_info_pages(ID, payload_base={'id': 42, 'selectTerm': 'all'}, page_count=6)
    store_pages_info(pages_info, ID, OUTPUT_RAW_DIR)
    sitting_info = transform(pages_info)
    store_json(sitting_info, f'{OUTPUT_TRANSFORMED_DIR}/sitting_info.json')
