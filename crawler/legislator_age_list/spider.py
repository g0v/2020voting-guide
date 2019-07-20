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
    name = 'voting_area_mapping'
    allowed_domains = ['zh.wikipedia.org']




    def start_requests(self):
        wiki_api = 'https://zh.wikipedia.org/w/api.php'
        params = {
            'action': 'parse',
            'format': 'json',
            'page': '黃國昌',
            'prop': 'text',
            'section': '0',
            'utf8': ''
        }
        yield scrapy.FormRequest(url=wiki_api, formdata=params)


    def parse(self, response):

        print("Result:" )

        response_text = json.loads(response.body_as_unicode())['parse']['text']['*']

        print(response_text)

        print("EXTRACT!")
        # response.xpath('//h3[@class="title"]/a/span/text()').extract_first()

        print(Selector(text=response_text).xpath('//span/text()').extract_first())
        print(Selector(text=response_text).xpath("//span[@class ='bday']/text()").extract_first())

        date_of_birth = Selector(text=response_text).xpath("//span[@class ='bday']/text()").extract_first()
        # print(date_of_birth)
        year = int(date_of_birth[0:4])
        month = int(date_of_birth[5:7])
        day = int(date_of_birth[8:11])
        # print(year)
        # print(month)
        # print(day)
        print(calculate_age(year, month, day))




