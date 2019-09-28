from os import remove
import json
from scrapy.crawler import CrawlerProcess
from spider import VotingAreaMappingSpider
from db import Candidate

OUTPUT_RAW = "../data/raw/candidate_birthday.json"


def remove_output():
    try:
        remove(OUTPUT_RAW)
    except FileNotFoundError:
        print(f"File not exist: {OUTPUT_RAW}")


def get_page_list():
    return [row.wiki.split("/")[-1] for row in Candidate.select() if row.wiki]


def crawl():
    process = CrawlerProcess(
        {
            "USER_AGENT": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",
            "FEED_FORMAT": "json",
            "FEED_EXPORT_ENCODING": "utf-8",
            "CONCURRENT_REQUESTS": 1,
            "FEED_URI": OUTPUT_RAW,
        }
    )
    process.crawl(VotingAreaMappingSpider, get_page_list())
    process.start()


def write_result_to_db(file_path):
    with open(file_path) as fp:
        data = json.load(fp)

    for candidate in data:
        Candidate.update(dateOfBirth=candidate["date_of_birth"], age=candidate["age"]).where(
            Candidate.name == candidate["page_name"]
        ).execute()


if __name__ == "__main__":
    remove_output()
    crawl()
    write_result_to_db(OUTPUT_RAW)
