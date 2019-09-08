from scrapy import Spider, Request


class LawSpider(Spider):
    name = "law"
    allowed_domains = ["lis.ly.gov.tw"]
    start_urls = ("https://lis.ly.gov.tw/billtpc/billtp",)
    host = "https://lis.ly.gov.tw"

    def parse(self, response):
        print(response.request.url)
        law_table = response.xpath("/html/body/form/table/tr[3]/td/table/tr/td/table/tr[4]/td/table/tr")
        content = law_table[1:]
        if not content:
            print(response.body)
        for record in content:
            url = self.host + record.xpath("./td[3]/a/@href").extract_first()
            yield Request(url, self.parse_law_page)

        next_page = response.xpath("//img[@src='/billtp/images/page_next.png']/parent::a/@href").extract_first()
        if next_page:
            print("next_page exist")
            yield Request(self.host + next_page, self.parse, dont_filter=True)

    def parse_law_page(self, response):
        yield {
            "name": response.xpath("//tr[td='法案名稱']/td[2]/text()").extract_first(),
            "category": response.xpath("//tr[td='類別']/td[2]/text()").extract_first(),
            "url": response.request.url,
            "date": response.xpath("//tr[td='提案日期']/td[2]/text()").extract_first(),
            "main_proposal": response.xpath("//tr[td='主提案']/td[2]/table//td/text()").extract(),
            "joint_proposal": response.xpath("//tr[td='連署提案']/td[2]/table//td/text()").extract(),
            "proposed_category": response.xpath("//tr[td='提案類別']/td[2]/text()").extract_first(),
            "law_name": response.xpath("//tr[td='法名稱']/td[2]/text()").extract_first(),
        }
