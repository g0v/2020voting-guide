"""
Document should be check after scraping form wiki
"""
import json
from os import remove

from scrapy.crawler import CrawlerProcess

from db import Candidate
from spider import VotingAreaMappingSpider
from transform import transform

OUTPUT_RAW = "../data/raw/legislator_candidate.json"
OUTPUT_TRANSFORMED = "../data/organized/legislator_candidate.json"


def remove_output():
    try:
        remove(OUTPUT_RAW)
    except FileNotFoundError:
        print(f"File not exist: {OUTPUT_RAW}")


def scrapy_crawl():
    process = CrawlerProcess(
        {
            "USER_AGENT": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",
            "FEED_FORMAT": "json",
            "FEED_EXPORT_ENCODING": "utf-8",
            "FEED_URI": OUTPUT_RAW,
        }
    )
    process.crawl(VotingAreaMappingSpider)
    process.start()


def write_result_to_db(file_path):
    """Read candidate file and store to db.

    input:
    [{
        "constituency": "臺北市第一選舉區",
        "candidates": [
            {
                "party": "國民黨",
                "name": "汪志冰"
            },...
        ]
    }...]
    """
    with open(file_path) as fp:
        data = json.load(fp)

    data = [
        {
            "name": candidate["name"].replace("․", "．"),
            "party": candidate["party"],
            "wiki": candidate["wiki"],
            "constituency": constituency["constituency"],
        }
        for constituency in data
        for candidate in constituency["candidates"]
    ]
    Candidate.drop_table()
    Candidate.create_table()
    Candidate.insert_many(data).execute()


if __name__ == "__main__":
    remove_output()
    scrapy_crawl()
    transform(OUTPUT_RAW, OUTPUT_TRANSFORMED)
    # write_result_to_db(OUTPUT_TRANSFORMED)
