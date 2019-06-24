#!/bin/bash

set -o errexit

SOURCE_DIR=$(dirname "${BASH_SOURCE[0]}")
cd "${SOURCE_DIR}"

# clean up folders because of renaming files
find ../data/raw -type f \
    -not -name 'README.md' \
    -not -path '*/voteData/*' \
    -delete
find ../data/organized -type f \
    -not -name 'README.md' \
    -delete

# crawl & transform to a useful format
pipenv sync
pipenv run python3 legislator_candidate
pipenv run python3 legislator_info
pipenv run python3 sitting_info
pipenv run python3 wiki_infoboxes
pipenv run python3 bulletin
