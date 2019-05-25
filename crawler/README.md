# crawler

爬取所需資料

## 儲存位置

> 2020voting-guide/data

## 爬取內容

[crawl_legislator_info.py](crawl_legislator_info.py)

內容        | 儲存位置                                 | 來源
-----------|-----------------------------------------|---------------------------------------------------
歷屆立委資料 | data/history_legislator_info*.json      | [Source](https://data.ly.gov.tw/getds.action?id=16)
當屆立委資料 | data/current_legislator_info*.json      | [Source](https://data.ly.gov.tw/getds.action?id=9)
會議資料    | data/meeting_info*.json                 | [Source](https://data.ly.gov.tw/getds.action?id=42)

## tools

1. [Scrapy](https://scrapy.org/)
   > [chinese tutorial](https://ithelp.ithome.com.tw/users/20107514/ironman/1919)
2. [Pipenv](https://docs.pipenv.org/en/latest/)
3. [Requests](https://2.python-requests.org/en/master/)
