"""Crawl 2016 candidate politics.

output:

[{
  "name": "丁守中",
  "politics": "一、 獎助科研創新、大幅獎助綠能與文創產業；大幅提高智慧..."
},...]
"""
import re
import json
import scrapy
from scrapy.selector import Selector


class PoliticsSpider(scrapy.Spider):
    name = "2016-legistator_politics"
    allowed_domains = ["2016.cec.gov.tw"]

    def __init__(self, start_urls=None, *args, **kwargs):
        self.start_urls = start_urls
        super(PoliticsSpider, self).__init__(*args, **kwargs)

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.FormRequest(url=url)

    def parse(self, response):
        response_text = response.body_as_unicode()
        pattern = re.compile('.*var data = (.*);.*')
        for each in Selector(text=response_text).xpath("//script/text()"):
            text = each.extract().strip()
            if re.match(pattern, text):
                data = json.loads(re.match(pattern, text).group(1))
        if "rptpolitics" in data:
            self.logger.info("processed politics info for " + data["candidatename"])
            yield {
                "name": data["candidatename"],
                "politics": data["rptpolitics"]
            }
        else:
            self.logger.info("no politics info for " + data["candidatename"])
