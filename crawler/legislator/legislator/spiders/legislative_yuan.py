# -*- coding: utf-8 -*-
import scrapy


class LegislativeYuanSpider(scrapy.Spider):
    name = 'legislative_yuan'
    allowed_domains = ['www.ly.gov.tw']
    start_urls = ['http://www.ly.gov.tw/']

    def parse(self, response):
        pass
