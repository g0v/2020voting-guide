#!/bin/bash

set -o errexit
set -o xtrace

export OUTPUT_DIR='/tmp/2020voting-guide-crawler-test'

SOURCE_DIR=$(dirname "${BASH_SOURCE[0]}")

cd "${SOURCE_DIR}"

mkdir -p "${OUTPUT_DIR}"
python3 "${SOURCE_DIR}/crawl_legislator_info.py"
scrapy runspider legislator_candidate.py --output=${OUTPUT_DIR}/legislator_candidate.json -t json --set=FEED_EXPORT_ENCODING='utf-8'
rm -rf ${OUTPUT_DIR}