FROM node:12.2.0-alpine AS builder-node

# ENV PATH /app/node_modules/.bin:$PATH
COPY ./mobile /client

WORKDIR /client
RUN npm install --silent
RUN npm run build


FROM golang:1.12-stretch AS builder-go

WORKDIR /go/src/github.com/g0v/2020voting-guide/backend
COPY ./backend .

RUN go get -d -v ./...
RUN go install -v ./...


FROM ubuntu

WORKDIR /root/

COPY --from=builder-node /client/build ./client
COPY --from=builder-go /go/bin/backend .

EXPOSE 9000

CMD ["./backend"]

