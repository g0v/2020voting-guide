#!/bin/bash

set -o errexit
set -o xtrace

swag_package="github.com/swaggo/swag/cmd/swag"
go get -u ${swag_package}

go_src="$(go env GOPATH)/src"
cd "${go_src}/${swag_package}" || 0
go install
