#!/bin/bash

set -o errexit

SOURCE_DIR=$(dirname "${BASH_SOURCE[0]}")
cd "${SOURCE_DIR}"

# Clear crawled files, not necessary.
# Because we overwrite the old files.
find ../data -type f -maxdepth 0 \
    -not -name 'README.md' \
    -not -name 'voting_area_mapping.json' \
    -delete
find ../data/raw -type f \
    -not -name 'README.md' \
    -not -name 'voting_area_mapping.json' \
    -delete

# Crawl the raw data we need.
pipenv run python crawl_legislator_info.py
scrapy runspider legislator_candidate.py --set=FEED_EXPORT_ENCODING='utf-8' -t json --output=- > ../data/raw/legislator_candidate.json
