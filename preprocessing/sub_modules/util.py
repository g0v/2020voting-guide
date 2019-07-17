import os
import csv
import pymysql.cursors
from typing import List, Dict, Any

NUMBERING_FILE_PATH = os.path.dirname(os.path.abspath(__file__)) + "/../../data/final/legislator_id.csv"

# DB config
MYSQL_HOST = os.environ["MYSQL_HOST"]
MYSQL_USER = os.environ["MYSQL_USER"]
MYSQL_PASSWORD = os.environ["MYSQL_PASSWORD"]
MYSQL_DB = os.environ["MYSQL_DB"]
MYSQL_CHARSET = os.environ["MYSQL_CHARSET"]

os.makedirs(os.path.dirname(NUMBERING_FILE_PATH), exist_ok=True)


def getNumberingFilePath():
    return os.path.abspath(NUMBERING_FILE_PATH)


def readNumberingData():
    result = []

    try:
        if os.path.exists(NUMBERING_FILE_PATH):
            with open(NUMBERING_FILE_PATH, newline="") as f:
                result = [{k: v for k, v in row.items()} for row in csv.DictReader(f, skipinitialspace=True)]
    except Exception as e:
        exit("Fail to load result file. error: " + str(e))

    return result


def read_csv(path: str) -> List[Dict[str, Any]]:
    data: List[Dict[str, Any]] = []

    try:
        with open(path, 'r+', newline="") as f:
            data = [row for row in csv.DictReader(f, skipinitialspace=True)]
    except FileNotFoundError:
        open(path, 'w')

    return data


def getDbConnection():
    connection = pymysql.connect(
        host=MYSQL_HOST,
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        db=MYSQL_DB,
        charset=MYSQL_CHARSET,
        cursorclass=pymysql.cursors.DictCursor)

    return connection
