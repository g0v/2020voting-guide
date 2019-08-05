FROM golang:1.12-stretch AS builder

WORKDIR /go/src/github.com/g0v/2020voting-guide/backend

EXPOSE 9000
VOLUME [ "/go" ]

CMD ["go", "run", "main.go"]
