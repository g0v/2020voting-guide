#!/bin/bash

set -o errexit
set -o xtrace

dir_path=$(dirname "${BASH_SOURCE[0]}")
go_bin="$(go env GOPATH)/bin"

cd "${dir_path}/.."
"${go_bin}/swag" init
