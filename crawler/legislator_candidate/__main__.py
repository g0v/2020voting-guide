import json
from os import remove

from scrapy.crawler import CrawlerProcess

from spider import VotingAreaMappingSpider
from transform import transform
from util import getDbConnection

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

    connection = getDbConnection()
    try:
        with connection.cursor() as cursor:
            sql = "DROP TABLE IF EXISTS candidates;"
            cursor.execute(sql)
            sql = (
                "CREATE TABLE candidates ("
                "name varchar(30) NOT NULL,"
                "party varchar(20) NOT NULL,"
                "constituency varchar(50) NOT NULL"
                ");"
            )
            cursor.execute(sql)
            data = [
                (candidate["name"], candidate["party"], constituency["constituency"])
                for constituency in data
                for candidate in constituency["candidates"]
            ]
            sql = "INSERT INTO candidates (name, party, constituency) VALUES (%s, %s, %s)"
            cursor.executemany(sql, data)
        connection.commit()
    except Exception as err:
        print(err)
    finally:
        connection.close()


if __name__ == "__main__":
    remove_output()
    scrapy_crawl()
    transform(OUTPUT_RAW, OUTPUT_TRANSFORMED)
    write_result_to_db(OUTPUT_TRANSFORMED)
