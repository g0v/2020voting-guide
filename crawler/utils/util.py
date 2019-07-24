import os
import pymysql.cursors

# DB config
MYSQL_HOST = os.environ["MYSQL_HOST"]
MYSQL_USER = os.environ["MYSQL_USER"]
MYSQL_PASSWORD = os.environ["MYSQL_PASSWORD"]
MYSQL_DB = os.environ["MYSQL_DB"]
MYSQL_CHARSET = os.environ["MYSQL_CHARSET"]


def store_json(json_data: str, output_path: str) -> None:
    with open(output_path, "w+") as fp:
        fp.write(json_data)
        print(f'[INFO] JSON data is written to "{output_path}"')


def getDbConnection():
    connection = pymysql.connect(
        host=MYSQL_HOST,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        db=MYSQL_DB,
        charset=MYSQL_CHARSET,
        cursorclass=pymysql.cursors.DictCursor,
    )

    return connection
