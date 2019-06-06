# 2020voting-guide

## Naming Convention

候選人： candidate
立委： legislator
選區： constituency

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
