"""crawl current legislation candidate.

command: `scrapy runspider legislator_candidate.py --output=../data/legislator_candidate.json -t json --set=FEED_EXPORT_ENCODING='utf-8'`

example item:
    {
        "name": "臺北市第一選舉區",
        "kmt": "詹為元、黃子哲、曾文培、陳重文、汪志冰,初選勝出者再與新黨民調決定,6/15公布結果.",
        "dpp": "吳思瑤",
        "other_party": {"name": "潘懷宗", "party": "新黨,再與國民黨民調決定."},
        "no_party": "陳建銘 、王郁楊"
    }
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
        table = Selector(text=response_text).xpath('//table')
        for row in table.select('.//tr')[3:-1]:
            yield {
                'name': row.select('./td[1]//text()').extract_first(),
                'kmt': ''.join(row.select('./td[2]//text()').extract()).strip('\n').strip(' '),
                'dpp': ''.join(row.select('./td[3]//text()').extract()).strip('\n').strip(' '),
                'other_party': {
                    'name': ''.join(row.select('./td[4]//text()').extract()).strip('\n').strip(' '),
                    'party': ''.join(row.select('./td[5]//text()').extract()).strip('\n').strip(' ').strip('\xa0')
                },
                'no_party': ''.join(row.select('./td[6]//text()').extract()).strip('\n').strip(' ')
            }
