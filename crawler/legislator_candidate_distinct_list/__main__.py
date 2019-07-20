from os import remove

from scrapy.crawler import CrawlerProcess
from spider import VotingAreaMappingSpider
from transform import transform

OUTPUT_RAW = '../data/raw/legislator_candidate_distinct_list.json'
OUTPUT_TRANSFORMED = '../data/organized/legislator_candidate_distinct_list.json'


def remove_output():
    try:
        remove(OUTPUT_RAW)
    except FileNotFoundError:
        print(f'File not exist: {OUTPUT_RAW}')


def crawl():
    process = CrawlerProcess({
        'USER_AGENT': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)',
        'FEED_FORMAT': 'json',
        'FEED_EXPORT_ENCODING': 'utf-8',
        'FEED_URI': OUTPUT_RAW
    })
    process.crawl(VotingAreaMappingSpider)
    process.start()


if __name__ == "__main__":
    remove_output()
    crawl()
    transform(OUTPUT_RAW, OUTPUT_TRANSFORMED)
