from sys import exit
from typing import Any, Dict, List
from util import store_json
from glob import glob
import requests

URL = "http://data.ly.gov.tw/odw/openDatasetJson.action"


def _send_request(payload: Dict[str, Any], timeout: int) -> str:
    print(f"[INFO] Sending request to {URL}")
    try:
        response = requests.get(URL, params=payload, timeout=timeout)
    except (requests.exceptions.ConnectTimeout, requests.exceptions.ReadTimeout):
        exit("[ERROR] Request Timeout")

    assert response.status_code == 200, f"[ERROR] Request Error, response code: {response.status_code}"
    return response.text


def scrap_info_pages(
    id: str, payload_base: Dict[str, Any], page_count: int, start_page=1, timeout: int = 10
) -> List[str]:
    def scrap_page(page_num: int) -> str:
        print(f'[INFO] Start scraping "{id}" page{page_num} ')
        response_body = _send_request({**payload_base, "page": page_num}, timeout)
        return response_body

    return [scrap_page(page_num) for page_num in range(start_page, page_count + 1)]


def store_pages_info(pages_info: List[str], id: str, output_dir: str, start_page: int = 1):
    for page_num, page_info in enumerate(pages_info, start_page):
        store_json(page_info, f"{output_dir}/{id}_page{page_num}.json")
        print(f"[INFO] Storing page{page_num}")


def read_pages_info(id: str, input_dir: str):
    def read_file(file_name):
        with open(file_name) as fp:
            return fp.read()

    return [read_file(file_name) for file_name in glob(f"{input_dir}/*") if id in file_name]
