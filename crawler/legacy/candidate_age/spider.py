"""Crawl current legislation candidate.

output:

[{
    "constituency": "臺北市第一選舉區",
    "kmt": ["詹為元", "黃子哲", "曾文培", "陳重文", "汪志冰"],
    "dpp": ["吳思瑤"],
    "other_party": {"name": ["潘懷宗"], "party": ["新黨"]},
    "no_party": ["陳建銘", "王郁楊"]
},...]
"""
import json

import scrapy
from scrapy.selector import Selector
from datetime import date


def calculate_age(year, month, day):
    today = date.today()
    return today.year - year - ((today.month, today.day) < (month, day))


class VotingAreaMappingSpider(scrapy.Spider):
    name = "voting_area_mapping"
    allowed_domains = ["zh.wikipedia.org"]

    def __init__(self, page_list):
        """Use wiki page names as input."""
        self.page_list = page_list

    def start_requests(self):
        wiki_api = "https://zh.wikipedia.org/w/api.php"
        for page_name in self.page_list:
            params = {
                "action": "parse",
                "format": "json",
                "page": page_name,
                "prop": "text",
                "section": "0",
                "utf8": "",
            }
            yield scrapy.FormRequest(url=wiki_api, formdata=params, meta={"page_name": page_name})

    def parse(self, response):
        try:
            response_text = json.loads(response.body_as_unicode())["parse"]["text"]["*"]
        except Exception:
            print(f'no response from {response.meta["page_name"]}')
            return

        date_of_birth = Selector(text=response_text).xpath("//span[@class ='bday']/text()").extract_first()
        if date_of_birth:
            year = int(date_of_birth[0:4])
            month = int(date_of_birth[5:7])
            day = int(date_of_birth[8:11])

            yield {
                "page_name": response.meta["page_name"],
                "date_of_birth": date_of_birth,
                "age": calculate_age(year, month, day),
            }
        else:
            yield {"page_name": response.meta["page_name"], "date_of_birth": None, "age": None}
