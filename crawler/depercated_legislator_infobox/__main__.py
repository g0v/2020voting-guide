from os import remove

from scrapy.crawler import CrawlerProcess
from spider import InfoboxSpider
# from transform import transform

OUTPUT_RAW = '../data/raw/legislator_candidate_infobox.json'
# OUTPUT_TRANSFORMED = '../data/organized/legislator_candidate.json'


def remove_output():
    try:
        remove(OUTPUT_RAW)
    except FileNotFoundError:
        print(f'File not exist: {OUTPUT_RAW}')


def crawl():
    remove_output()
    process = CrawlerProcess({
        'USER_AGENT': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)',
        'FEED_FORMAT': 'json',
        'FEED_EXPORT_ENCODING': 'utf-8',
        'FEED_URI': OUTPUT_RAW,
        'DOWNLOAD_DELAY': 0.25,
        'LOG_LEVEL': 'INFO'
    })
    process.crawl(InfoboxSpider)
    process.start()


if __name__ == "__main__":
    crawl()
    # transform(OUTPUT_RAW, OUTPUT_TRANSFORMED)
