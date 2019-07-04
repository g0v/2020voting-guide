# 2020voting-guide

## Git Clone

`git clone --depth=1 https://github.com/bangyuwen/2020voting-guide.git`

## Naming Convention

[官方英文名稱](https://www.ly.gov.tw/Pages/List.aspx?nodeid=214)
候選人： candidate  
立委： legislator  
選區： constituency  
會議： sitting  
委員會： committee  

## Dataflow

> crawler -> data/raw
> -> preprocessing -> data/clean_data
> -> preprocessing -> data/organized
> -> backend
> -> frontend

## Guide

抓取所有所需資料：

```shell
./crawler/crawl_all.sh
```

資料處理：

```shell
./preprocessing/preprocess_all.sh
```

## References

> [立委投票指南](https://github.com/g0v/twly-voter-guide)
