"""
relate wiki: https://zh.wikipedia.org/wiki/2020年中華民國立法委員選舉
"""
import json
import urllib

import scrapy


class VotingAreaMappingSpider(scrapy.Spider):
    name = 'voting_area_mapping'
    allowed_domains = ['https://zh.wikipedia.org/']

    def start_requests(self):
        wiki_api = 'https://zh.wikipedia.org/w/api.php'
        params = {
            'action': 'parse',
            'format': 'json',
            'page': '2020年中華民國立法委員選舉',
            'prop': 'links',
            'section': '8',
            'utf8': ''
        }
        yield scrapy.FormRequest(url=wiki_api, formdata=params)

    def parse(self, response):
        response_dict = json.loads(response.body_as_unicode())
        internal_link_titles = [link['*'] for link in response_dict['parse']['links']]
        voting_area_link_titles = [title for title in internal_link_titles if '選舉區' in title]
        print(voting_area_link_titles)
