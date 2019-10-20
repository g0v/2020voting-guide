#!/bin/bash

set -o errexit

cd ./mobile
npm run build

cd ../
gcloud app deploy
