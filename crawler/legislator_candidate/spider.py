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


class VotingAreaMappingSpider(scrapy.Spider):
    name = 'voting_area_mapping'
    allowed_domains = ['zh.wikipedia.org']

    def start_requests(self):
        wiki_api = 'https://zh.wikipedia.org/w/api.php'
        params = {
            'action': 'parse',
            'format': 'json',
            'page': '2020年中華民國立法委員選舉',
            'prop': 'text',
            'section': '8',  # section_name: 區域暨原住民選舉
            'utf8': ''
        }
        yield scrapy.FormRequest(url=wiki_api, formdata=params)

    def parse(self, response):
        response_text = json.loads(response.body_as_unicode())['parse']['text']['*']
        table = Selector(text=response_text).xpath('//table')  # table_name: 2020年中華民國立法委員區域暨原住民候選人名單
        for row in table.xpath('.//tr')[3:-1]:
            yield {
                'constituency': row.xpath('./td[1]//a/text()').extract_first(),
                'kmt': row.xpath('./td[2]//a/text()').extract(),
                'dpp': row.xpath('./td[3]//a/text()').extract(),
                'other_party': {
                    'name': row.xpath('./td[4]//a/text()').extract(),
                    'party': row.xpath('./td[5]//a/text()').extract()
                },
                'no_party': row.xpath('./td[6]//a/text()').extract()
            }
