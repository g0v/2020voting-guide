#!/bin/bash

set -o errexit
set -o xtrace

env=${1:-stage}

set -o errexit

cd ./mobile
npm run build

cd ../
if [ "${env}" == "stage" ]; then
    gcloud app deploy --no-promote --quiet
else
    gcloud app deploy --quiet
fi
