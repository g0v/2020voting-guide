import pandas as pd


def get_full_type_name(sheet_name):
    """[由於每個會期之評鑑種類名稱皆不同，透過此函式統一轉化評鑑種類名稱為 xx 委員會格式]

    Arguments:
        sheet_name {[string]} -- [評鑑種類]

    Returns:
        [string] -- [內政委員會 等評鑑種類名稱]
    """
    rate_types = ["內政委員會", "外交及國防委員會", "經濟委員會", "財政委員會", "交通委員會", "司法及法制委員會", "教育及文化委員會", "社會福利及衛生環境委員會"]

    if "委員會" in sheet_name:
        return sheet_name

    for rate_type in rate_types:
        # sheet_name = '教育文化' return '教育及文化委員會'
        if sheet_name[-2:] in rate_type:
            return rate_type
            break
    else:
        # sheet_name = '社福衛環' return '社會福利及衛生環境委員會'
        return rate_types[-1]


def get_sheets(session):
    """[取得該會期所有評鑑表格, e.g. 內政, 外交國防...]

    Arguments:
        session {[int]} -- [第幾會期]

    Returns:
        [dict] -- [回傳依據評鑑種類分類之評鑑 DataFrame]
    """
    xl = pd.ExcelFile(f"../../data/raw/citizen_congress_watch/9-{session}.xlsx")
    sheet_names = xl.sheet_names[1:9] if "說明" in xl.sheet_names[0] else xl.sheet_names[0:8]  # see all sheet names
    #     print(sheet_names)

    df_dict = {}

    for sheet_name in sheet_names:
        rate_type = get_full_type_name(sheet_name)

        df = xl.parse(sheet_name)
        df = df.dropna(how="all")

        df_dict[rate_type] = df

    return df_dict
