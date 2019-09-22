from sys import exit
from typing import Any, Dict, List
from util import store_json

import requests

URL = "http://data.ly.gov.tw/odw/openDatasetJson.action"


def _send_request(payload: Dict[str, Any]) -> str:
    print(f"[INFO] Sending request to {URL}")
    try:
        response = requests.get(URL, params=payload, timeout=10)
    except requests.exceptions.ConnectTimeout:
        exit("[ERROR] Request Timeout")

    assert response.status_code == 200, f"[ERROR] Request Error, response code: {response.status_code}"
    return response.text


def scrap_info_pages(id: str, payload_base: Dict[str, Any], page_count: int) -> List[str]:
    def scrap_page(page_num: int) -> str:
        print(f'[INFO] Start scraping "{id}" page{page_num} ')
        response_body = _send_request({**payload_base, "page": page_num})
        return response_body

    return [scrap_page(page_num) for page_num in range(1, page_count + 1)]


def store_pages_info(pages_info: List[str], id: str, output_dir: str):
    for page_num, page_info in enumerate(pages_info, 1):
        store_json(page_info, f"{output_dir}/{id}_page{page_num}.json")
