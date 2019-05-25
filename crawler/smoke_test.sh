#!/bin/bash

set -o errexit
set -o xtrace

export OUTPUT_DIR='/tmp/2020voting-guide-crawler-test'

SOURCE_DIR=$(dirname "${BASH_SOURCE[0]}")

mkdir -p "${OUTPUT_DIR}"
python3 "${SOURCE_DIR}/crawl_legislator_info.py"
rm -rf ${OUTPUT_DIR}