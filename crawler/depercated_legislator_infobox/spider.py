"""Crawl current legislation candidate.

wiki API info: https://zh.wikipedia.org/w/api.php?action=help&modules=query
wiki API example: (https://zh.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&
                   titles=%E6%B2%88%E6%99%BA%E6%85%A7_(%E8%87%BA%E7%81%A3)&rvsection=0&rvslots=main)

output:

[{
    "name": "吳思瑤",
    "width": "275px",
    "image": "1227 吳思瑤在點亮台北造勢晚會.jpg",
    "office": "{{ROC}}第9屆[[立法委員]] ",
    "term_start": "2016年2月1日 ",
    "term_end": "",
    "constituency": "臺北市第一選舉區<br>（[[北投區]]、[[士林區]]-13里）",
    "constituency2": "第一選舉區<br>（[[北投區]]、[[士林區]]）",
    "sex": "女",
    "birth_date": "{{birth_date_and_age|1974|5|28}}",
    "birth_place": "{{ROC}}[[臺北縣]]<br>（今新北市）",
    "nationality": "{{ROC}}",
    "party": "{{dpp}}\\n}}\\n{"
},...]
"""
import json
import re
from typing import List

import scrapy

import mwparserfromhell

CANDIDATE_FILE = '../data/organized/legislator_candidate.json'


def get_candidate_list() -> List[str]:
    with open(CANDIDATE_FILE) as fp:
        candidate_data = json.load(fp)
    return [candidate['name'] for constituency_candidate in candidate_data for candidate in constituency_candidate['candidates']]


def parse_content(text):
    def parse_infobox_params(text):
        try:
            raw_key, raw_value = text.split('=', 1)
            return (raw_key.strip().replace(' ', '_'), raw_value.strip('\\n').strip())
        except ValueError:
            print(f'Parsing text error, text: {text}')
            return (str(text), 'error_parsing')

    query_result = re.search(r'"\*":"([\S\s]+)"', text)
    if query_result:
        response_content = query_result.group(1)
        wikicode = mwparserfromhell.parse(response_content).filter_templates()
        for item in wikicode:
            if 'Infobox' in item.name:
                key_value_pair = [parse_infobox_params(text) for text in item.params]
                try:
                    return dict(key_value_pair)
                except Exception as e:
                    print(e)
                    print(key_value_pair)


class InfoboxSpider(scrapy.Spider):
    name = 'infobox'
    allowed_domains = ['zh.wikipedia.org']

    def start_requests(self):
        wiki_api = 'https://zh.wikipedia.org/w/api.php'
        candidate_list = get_candidate_list()
        for name in candidate_list:
            params = {
                'action': 'query',
                'format': 'json',
                'rvprop': 'content',
                'prop': 'revisions',
                'titles': name,
                'rvslots': 'main',
                'rvsection': '0',
                'utf8': ''
            }
            yield scrapy.FormRequest(url=wiki_api, formdata=params, meta={'name': name})

    def parse(self, response):
        response_text = response.body_as_unicode()
        infobox_info = parse_content(response_text) or {'name': response.meta['name']}
        yield infobox_info
