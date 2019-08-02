import re


def parse(info):
    def get_date_of_birth(info):
        birthday_columns = ["date of birth", "date_of_birth", "birth_date", "出生日期"]
        for option in birthday_columns:
            if option in info:
                m = re.search(r"(\d{4})\|(\d{1,2})\|(\d{1,2})", info[option]).group(0)
                return m.replace("|", "-")

    return {"page_name": info["page_name"], "date_of_birth": get_date_of_birth(info)}
