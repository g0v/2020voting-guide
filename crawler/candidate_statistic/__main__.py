import os
import json
from db import Statistic
from scrapy.crawler import CrawlerProcess
from spider import RecordSpider

FILE_DIR = os.path.dirname(os.path.abspath(__file__))
LEGAL_PROPOSAL_FILE_PATH = f"{FILE_DIR}/../../data/organized/term_9_legal_proposal.json"
INTERPELLATION_FILE_PATH = f"{FILE_DIR}/../../data/organized/term_9_interpellation.json"


def scrapy_crawl():
    process = CrawlerProcess(
        {
            "USER_AGENT": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",
            "FEED_EXPORT_ENCODING": "utf-8",
            "CONCURRENT_REQUESTS": 2,
            "DOWNLOAD_DELAY": 0.5,
        }
    )
    process.crawl(
        RecordSpider, legal_proposal_path=LEGAL_PROPOSAL_FILE_PATH, interpellation_path=INTERPELLATION_FILE_PATH
    )
    process.start()


def write_result_to_db(legal_proposal_file_path, interpellation_file_path):
    legal_proposal_data = []
    interpellation_data = []
    transformed_legal_proposal_data = []
    transformed_interpellation_data = []

    with open(legal_proposal_file_path) as fp1:
        for line in fp1.readlines():
            legal_proposal_data.append(json.loads(line))
    with open(interpellation_file_path) as fp2:
        for line in fp2.readlines():
            interpellation_data.append(json.loads(line))

    for legislator in legal_proposal_data:
        for each in legislator["progress"]:
            if each["key"] is not None and each["value"] is not None:
                transformed_legal_proposal_data.append(
                    {
                        "name": legislator["name"],
                        "term": legislator["term"],
                        "statisticType": "legal_proposal",
                        "dataType": "progress",
                        "key": each["key"],
                        "value": each["value"],
                    }
                )
        for each in legislator["categories"]:
            if each["key"] is not None and each["value"] is not None:
                transformed_legal_proposal_data.append(
                    {
                        "name": legislator["name"],
                        "term": legislator["term"],
                        "statisticType": "legal_proposal",
                        "dataType": "categories",
                        "key": each["key"],
                        "value": each["value"],
                    }
                )
    for legislator in interpellation_data:
        for each in legislator["types"]:
            if each["key"] is not None and each["value"] is not None:
                transformed_interpellation_data.append(
                    {
                        "name": legislator["name"],
                        "term": legislator["term"],
                        "statisticType": "interpellation",
                        "dataType": "types",
                        "key": each["key"],
                        "value": each["value"],
                    }
                )
        for each in legislator["categories"]:
            if each["key"] is not None and each["value"] is not None:
                transformed_interpellation_data.append(
                    {
                        "name": legislator["name"],
                        "term": legislator["term"],
                        "statisticType": "interpellation",
                        "dataType": "categories",
                        "key": each["key"],
                        "value": each["value"],
                    }
                )
    Statistic.drop_table()
    Statistic.create_table()
    Statistic.insert_many(transformed_legal_proposal_data).execute()
    Statistic.insert_many(transformed_interpellation_data).execute()


if __name__ == "__main__":
    scrapy_crawl()
    write_result_to_db(LEGAL_PROPOSAL_FILE_PATH, INTERPELLATION_FILE_PATH)
