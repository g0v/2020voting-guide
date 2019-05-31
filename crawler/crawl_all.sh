#!/bin/bash

set -o errexit

python3.7 crawl_legislator_info.py
scrapy runspider legislator_candidate.py --set=FEED_EXPORT_ENCODING='utf-8' -t json --output=- > ../data/raw/legislator_candidate.json