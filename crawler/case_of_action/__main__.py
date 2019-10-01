from db import Bill
from os import makedirs, path
import requests
import subprocess
import re
import threading
import peewee
from typing import List

FILE_DIR = path.dirname(path.abspath(__file__))
DATA_FOLDER = f"{FILE_DIR}/../../data/raw/case_of_action"


def download_word(url: str, billNo: str, file_path: str):
    headers = {"User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)"}

    response = requests.get(url, headers=headers)
    with open(file_path, "wb") as fp:
        fp.write(response.content)


def word_to_text(doc_path: str) -> str:
    return str(subprocess.run(["antiword", doc_path], capture_output=True, encoding="utf8"))


def get_case_of_action(text: str) -> str:
    return (
        [*re.findall(r"(?<=案由：)[\w|\W]+(?=說明：)", text), *re.findall(r"(?<=案由：)[\w|\W]+(?=提案人：)", text)][0]
        .replace("\\n", "")
        .replace(" ", "")
    )


def process_bill(bill: peewee.ModelSelect) -> None:
    print(f"bill: {bill.billNo}, docURL: {bill.docUrl}")
    doc_path = f"{DATA_FOLDER}/{bill.billNo}.doc"

    if not path.isfile(doc_path):
        download_word(bill.docUrl, bill.billNo, doc_path)
    text = word_to_text(doc_path)
    try:
        case_of_action = get_case_of_action(text)
    except Exception:
        with open(f"{FILE_DIR}/error.log", "a+") as fp:
            fp.write(f"Can't get case of action from billNo: {bill.billNo}\n")

    Bill.update(caseOfAction=case_of_action).where(Bill.billNo == bill.billNo).execute()


if __name__ == "__main__":
    makedirs(DATA_FOLDER, exist_ok=True)
    bills = Bill.select(Bill.billNo, Bill.docUrl)

    threads: List[threading.Thread] = []
    for bill in bills:
        x = threading.Thread(target=process_bill, args=(bill,))
        threads.append(x)
        x.start()

    for thread in threads:
        thread.join()
