#!/bin/bash

set -o errexit

SOURCE_DIR=$(dirname "${BASH_SOURCE[0]}")
cd "${SOURCE_DIR}"

# crawl & transform to a useful format
pipenv sync

# candidate
pipenv run python3 candidate
pipenv run python3 candidate_age
pipenv run python3 candidate_wikidata

# legislator
pipenv run python3 legislator
pipenv run python3 sitting
pipenv run python3 bulletin

# bill
pipenv run python3 bill

pipenv run python3 caculation
