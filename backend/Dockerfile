FROM golang:1.12-stretch AS builder

WORKDIR /go/src/github.com/g0v/2020voting-guide/backend
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

FROM ubuntu

WORKDIR /root/

COPY --from=builder /go/bin/backend .

EXPOSE 9000

CMD ["./backend"]
