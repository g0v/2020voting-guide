#!/bin/bash

set -o errexit

SOURCE_DIR=$(dirname "${BASH_SOURCE[0]}")
cd "${SOURCE_DIR}"

pipenv run python3 numbering_legislator
pipenv run python3 generate_legislator_info
