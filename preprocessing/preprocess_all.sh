#!/bin/bash

set -o errexit

SOURCE_DIR=$(dirname "${BASH_SOURCE[0]}")
cd "${SOURCE_DIR}"

pipenv run python numbering_legislator
pipenv run python generate_legislator_info