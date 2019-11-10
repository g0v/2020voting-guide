#!/bin/bash

set -o errexit

cd ./backend
go run main.go &

cd ../mobile
npm start
