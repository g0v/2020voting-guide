import json
from scrapy import Spider, Request


class RecordSpider(Spider):
    name = "record"
    allowed_domains = ["lis.ly.gov.tw"]
    start_urls = ("https://lis.ly.gov.tw/lylegismc/lylegismemkmout?@@0.7567155695596053",)
    host = "https://lis.ly.gov.tw"
    custom_settings = {"LOG_LEVEL": "INFO"}

    def __init__(self, legal_proposal_path, interpellation_path, **kwargs):
        """init: need to provide paths for tmp storage."""
        self.legal_proposal_file_path = legal_proposal_path
        self.interpellation_file_path = interpellation_path
        super().__init__(**kwargs)

    def parse(self, response):
        # clear file first
        print("Clean result file.")
        with open(self.legal_proposal_file_path, "w") as f:
            f.write("")
        with open(self.interpellation_file_path, "w") as f:
            f.write("")
        print("Parsing entrance page")
        legislator_list_path = response.xpath('//*[@id="Map"]/area[1]/@href').extract_first()
        yield Request(self.host + legislator_list_path, self.parse_legislator_list_page)

    def parse_legislator_list_page(self, response):
        print("Parsing legislator list page page:", response.request.url)
        res = response.xpath('//*[@id="ball_r"]/li/a/@href')
        for term in res:
            term_path = term.extract()
            # path format: /lylegismc/lylegismemkmout?00023B370005000100000000000019000000003C000000000^9
            yield Request(self.host + term_path, self.parse_legislator_list_term_page, meta={"term": term_path[-1:]})

    def parse_legislator_list_term_page(self, response):
        print("Parsing term{} legislator list page page: {}".format(response.meta["term"], response.request.url))
        res = response.xpath('//*[@id="box01"]//table//tr/td/a/@href')
        for legislator in res:
            path = legislator.extract()
            yield Request(self.host + path, self.parse_personal_page, meta={"term": response.meta["term"]})

    def parse_personal_page(self, response):
        print("Parsing personal page page:", response.request.url)
        legislator_name = response.xpath("/html/body/form/table/tr[1]/td/table/tr/td[2]/text()").extract_first()
        print("Name:", legislator_name)
        statistics_path = response.xpath("/html/body/form/table/tr[2]/td/table/tr/td[4]/a/@href").extract_first()
        if statistics_path:
            yield Request(
                self.host + statistics_path,
                self.parse_statistics_page,
                meta={"name": legislator_name, "term": response.meta["term"]},
            )
        else:
            # legislator before term9 doesn't have statistic page
            achievement_path = response.xpath("/html/body/form/table/tr[2]/td/table/tr/td[3]/a/@href").extract_first()
            if achievement_path:
                yield Request(
                    self.host + achievement_path,
                    self.parse_achievement_page,
                    meta={"name": legislator_name, "term": response.meta["term"]},
                )

    def parse_achievement_page(self, response):
        print("Parsing", response.meta["name"], "achievement page:", response.request.url)
        # [(402)] => 402
        interpellation_field = response.xpath('//*[@id="pop02"]/a/span/text()').extract()
        legal_proposal_field = response.xpath('//*[@id="pop04"]/a/span/text()').extract()
        if interpellation_field:
            interpellation_num = interpellation_field[0][1:-1]
            record = {
                "name": response.meta["name"],
                "term": response.meta["term"],
                "types": [{"key": "總計", "value": interpellation_num}],
                "categories": [{"key": "總計", "value": interpellation_num}],
            }
            with open(self.interpellation_file_path, "a") as f:
                f.write(json.dumps(record, ensure_ascii=False))
                f.write("\n")
        if legal_proposal_field:
            legal_proposal_num = legal_proposal_field[0][1:-1]
            record = {
                "name": response.meta["name"],
                "term": response.meta["term"],
                "progress": [{"key": "總計", "value": legal_proposal_num}],
                "categories": [{"key": "總計", "value": legal_proposal_num}],
            }
            with open(self.legal_proposal_file_path, "a") as f:
                f.write(json.dumps(record, ensure_ascii=False))
                f.write("\n")

    def parse_statistics_page(self, response):
        print("Parsing", response.meta["name"], "statistics page:", response.request.url)
        speak_path = response.xpath('//*[@id="tab04"]/li[1]/a/@href').extract_first()
        interpellation_path = response.xpath('//*[@id="tab04"]/li[4]/a/@href').extract_first()
        yield Request(
            self.host + speak_path,
            self.parse_legal_proposal_page,
            meta={"name": response.meta["name"], "term": response.meta["term"]},
        )
        yield Request(
            self.host + interpellation_path,
            self.parse_interpellation_page,
            meta={"name": response.meta["name"], "term": response.meta["term"]},
        )

    def parse_legal_proposal_page(self, response):
        print("Parsing", response.meta["name"], "legal proposal page:", response.request.url)
        # 委員法律提案審議進度統計
        progress = []
        for i in range(2, 15):
            key = response.xpath('//*[@id="lgmempro_progress_data"]/tr[{}]/td[2]/text()'.format(i)).extract_first()
            value = response.xpath('//*[@id="lgmempro_progress_data"]/tr[{}]/td[3]/text()'.format(i)).extract_first()
            progress.append({"key": key, "value": value})

        # 委員法律提案類別統計
        categories = []
        for i in range(2, 27):
            key = response.xpath('//*[@id="lgmempro_class_data"]/tr[1]/th[{}]/text()'.format(i)).extract_first()
            value = response.xpath('//*[@id="lgmempro_class_data"]/tr[2]/td[{}]/text()'.format(i)).extract_first()
            categories.append({"key": key, "value": value})

        record = {
            "name": response.meta["name"],
            "term": response.meta["term"],
            "progress": progress,
            "categories": categories,
        }

        with open(self.legal_proposal_file_path, "a") as f:
            f.write(json.dumps(record, ensure_ascii=False))
            f.write("\n")

    def parse_interpellation_page(self, response):
        print("Parsing", response.meta["name"], "interpellation page:", response.request.url)
        # 委員質詢類型統計
        types = []
        for i in range(2, 7):
            key = response.xpath('//*[@id="qr_type_data"]/tr[{}]/td[2]/text()'.format(i)).extract_first()
            value = response.xpath('//*[@id="qr_type_data"]/tr[{}]/td[3]/text()'.format(i)).extract_first()
            types.append({"key": key, "value": value})

        # 委員質詢類別統計
        categories = []
        for i in range(2, 27):
            key = response.xpath('//*[@id="qr_class_data"]/tr[1]/th[{}]/text()'.format(i)).extract_first()
            value = response.xpath('//*[@id="qr_class_data"]/tr[2]/td[{}]/text()'.format(i)).extract_first()
            categories.append({"key": key, "value": value})

        record = {
            "name": response.meta["name"],
            "term": response.meta["term"],
            "types": types,
            "categories": categories,
        }

        with open(self.interpellation_file_path, "a") as f:
            f.write(json.dumps(record, ensure_ascii=False))
            f.write("\n")
