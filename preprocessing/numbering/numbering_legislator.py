import csv
import json
from os import path
from sys import exit

SOURCE_FILE_NAME="fake_source.json"
RESULT_FILE_NAME="numbering_result.csv"
FIELDS=["id", "name"]

def readSource():
    try:
        with open(SOURCE_FILE_NAME, "r") as f:
            source = json.loads(f.read())
    except Exception as e:
        exit("Fail to load source file. error: "+str(e))

    return source

def readResult():
    result = []

    try:
        if path.exists(RESULT_FILE_NAME):
            with open(RESULT_FILE_NAME, newline="") as f:
                result = [{k: v for k, v in row.items()} for row in csv.DictReader(f, skipinitialspace=True)]
    except Exception as e:
        exit("Fail to load result file. error: "+str(e))

    return result

def genNewResult(oldResult):
    nameList = [x["name"] for x in oldResult]
    newResult = result.copy()

    for name in source:
        if name in nameList:
            print(name, "already exists, skip.")
        else:
            nameList.append(name)
            newResult.append({"id": len(newResult)+1, "name": name})

    return newResult[len(oldResult):]

def writeResult(newResult):
    if path.exists(RESULT_FILE_NAME):
        with open(RESULT_FILE_NAME, "a") as f:
            writer = csv.DictWriter(f, fieldnames=FIELDS)
            for legislator in newResult:
                writer.writerow(legislator)
    else:
        with open(RESULT_FILE_NAME, "w") as f:
            writer = csv.DictWriter(f, fieldnames=FIELDS)
            writer.writeheader()
            for legislator in newResult:
                writer.writerow(legislator)

if __name__ == "__main__":
    source = readSource()
    result = readResult()
    newResult = genNewResult(result)
    writeResult(newResult)
