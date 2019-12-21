# Backend

## Prerequisite

- Go
- MySQL

## Setup

(1) Run local database (with docker)

```
$ docker pull mysql:latest
$ docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=<password> -d mysql
```

(2) Copy `backend/example.env` and rename it to `backend/.env`

(3) DB Migrate

`go install main.go`

## Run

`go run main.go`
