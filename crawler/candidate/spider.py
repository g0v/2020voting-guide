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
import re
from typing import List
from urllib.parse import unquote

import scrapy
from scrapy.selector import Selector


class VotingAreaMappingSpider(scrapy.Spider):
    name = "voting_area_mapping"
    allowed_domains = ["zh.wikipedia.org"]

    def start_requests(self):
        wiki_api = "https://zh.wikipedia.org/w/api.php"
        params = {
            "action": "parse",
            "format": "json",
            "page": "2020年中華民國立法委員選舉",
            "prop": "text",
            "section": "8",  # section_name: 區域暨原住民選舉
            "utf8": "",
        }
        yield scrapy.FormRequest(url=wiki_api, formdata=params)

    def parse(self, response):
        def wiki_links_processor(links: List[str]) -> List[str]:
            return [
                unquote(link)
                for link in links
                if link not in ["/wiki/File:Yes_check.svg", "/wiki/File:Blue_check.svg", "/wiki/File:Black_check.svg"]
                and not link.endswith(".png")
                and not link.endswith("redlink=1")
            ]

        response_text = json.loads(response.body_as_unicode())["parse"]["text"]["*"]
        response_text = re.sub(r"\((.*)\)", "", response_text)  # remove notes
        table = Selector(text=response_text).xpath("//table")  # table_name: 2020年中華民國立法委員區域暨原住民候選人名單
        for row in table.xpath(".//tr")[3:-1]:
            yield {
                "constituency": row.xpath("./td[1]/a/text()").extract_first(),
                "kmt": {
                    "name": row.xpath("./td[2]//a/text()").extract(),
                    "wiki_link": wiki_links_processor(row.xpath("./td[2]//a/@href").extract()),
                },
                "dpp": {
                    "name": row.xpath("./td[3]//a/text()").extract(),
                    "wiki_link": wiki_links_processor(row.xpath("./td[3]//a/@href").extract()),
                },
                "other_party": {
                    "name": row.xpath("./td[4]//a/text()").extract(),
                    "wiki_link": wiki_links_processor(row.xpath("./td[5]//a/@href").extract()),
                    "party": row.xpath("./td[5]//a/text()").extract(),
                },
                "no_party": {
                    "name": row.xpath("./td[6]//a/text()").extract(),
                    "wiki_link": wiki_links_processor(row.xpath("./td[6]//a/@href").extract()),
                },
            }
