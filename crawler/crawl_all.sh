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

# crawl & transform to a useful format
pipenv run python3 legislator_candidate
pipenv run python3 legislator_info
pipenv run python3 sitting_info
