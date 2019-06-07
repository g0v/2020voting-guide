from os import environ, path

from legislative_yuan_open_data import (scrap_legislator_info_pages,
                                        store_pages_info)
from transform import transform
from util import store_json

FILE_DIR = path.dirname(path.abspath(__file__))
OUTPUT_RAW_DIR = environ.get('OUTPUT_RAW_DIR', f'{FILE_DIR}/../../data/raw')
OUTPUT_TRANSFORMED_DIR = environ.get('OUTPUT_TRANSFORMED_DIR', f'{FILE_DIR}/../../data/organized')


def run_history_legislator_info_pages():
    id = 'history_legislator_info'
    pages_info = scrap_legislator_info_pages(id, payload_base={'id': 16, 'selectTerm': 'all'}, page_count=2)
    store_pages_info(pages_info, id, OUTPUT_RAW_DIR)
    return pages_info


def run_current_legislator_info_pages():
    id = 'current_legislator_info'
    pages_info = scrap_legislator_info_pages(id, payload_base={'id': 9, 'selectTerm': 'all'}, page_count=1)
    store_pages_info(pages_info, id, OUTPUT_RAW_DIR)
    return pages_info


if __name__ == "__main__":
    history_legislator_info_pages = run_history_legislator_info_pages()
    current_legislator_info_pages = run_current_legislator_info_pages()
    legislator_info = transform(history_legislator_info_pages, current_legislator_info_pages)
    store_json(legislator_info, f'{OUTPUT_TRANSFORMED_DIR}/legislator_info.json')
