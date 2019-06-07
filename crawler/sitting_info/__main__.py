from os import environ, path

from legislative_yuan_open_data import (scrap_legislator_info_pages,
                                        store_pages_info)

FILE_DIR = path.dirname(path.abspath(__file__))
OUTPUT_DIR = environ.get('OUTPUT_DIR', f'{FILE_DIR}/../../data/raw')
ID = 'meeting_info'

if __name__ == "__main__":
    pages_info = scrap_legislator_info_pages(ID, payload_base={'id': 42, 'selectTerm': 'all'}, page_count=6)
    store_pages_info(pages_info, ID, OUTPUT_DIR)
