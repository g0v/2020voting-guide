# crawler

## 爬所有資料

`./crawl_all.sh`

## 儲存位置

> 2020voting-guide/data/raw

## 爬取內容

[crawl_legislator_info](legislator_info/__main__.py)

內容        | 儲存位置                                 | 來源
-----------|-----------------------------------------|---------------------------------------------------
歷屆立委資料 | data/history_legislator_info*.json      | [Source](https://data.ly.gov.tw/getds.action?id=16)
當屆立委資料 | data/current_legislator_info*.json      | [Source](https://data.ly.gov.tw/getds.action?id=9)
會議資料    | data/meeting_info*.json                 | [Source](https://data.ly.gov.tw/getds.action?id=42)

[legislator_candidate](legislator_candidate/__main__.py)

內容        | 儲存位置                                 | 來源
-----------|-----------------------------------------|---------------------------------------------------
參選人名單   | data//legislator_candidate.json         | [Source](https://zh.wikipedia.org/wiki/2020年中華民國立法委員選舉#區域暨原住民選舉_2)
