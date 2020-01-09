"""
用於轉換特定會期，特定評鑑種類之 DataFrame 為 Json 格式]
"""
import datetime

import pandas as pd
import numpy as np


def set_rate_labels(df, rate_col, session, rate_type):
    """[用於產生 A1~A4 等評鑑名稱列表]

    Arguments:
        df {[DataFrame]} -- [特定會期，特定評鑑種類之 DataFrame, 透過 sheet.py 之 get_sheet() 產生]
        rate_col {[type]} -- [description]
        session {[int]} -- [第幾會期]
        rate_type {[string]} -- [用於辨識是否為 "黨團幹部" 類別]

    Returns:
        [type] -- [description]
    """
    # 設定： 評鑑項目欄位範圍，第四列以後為 A1, A2 等評鑑項目列
    rate_labels = df['Unnamed: 2'].iloc[4:]
    new_rate_labels = []

    for row, rate_label in enumerate(rate_labels):

        # 取得： A1.院會, A2.委員會等評鑑項目，注意 D1 ~ D4 與 A1~C7 存在欄位不同，前者存在於 'Unnamed: 1' 欄中
        rate_label = rate_label if pd.notnull(rate_label) else df['Unnamed: 1'].iloc[4+row]
        # 取得： 該評鑑項目 對應之 比重, 例如 A1 院會比重為 3%
        percent = df[rate_col].iloc[4+row]

        if pd.notnull(rate_label) and pd.notnull(percent):
            new_rate_labels.append(f"{rate_label}_{percent}")

        # 因應 相同評鑑項目 有兩列比重 之 sheet, e.g 第三會期 A5 有兩列
        elif pd.notnull(percent):
            # 因應 A5 存在第二列比重
            rate_label = df['Unnamed: 2'].iloc[4+row-1]

            # 因應 D4 存在第二列比重
            if pd.isnull(rate_label):
                rate_label = df['Unnamed: 1'].iloc[4+row-1]
            new_rate_labels.append(f"{rate_label}_{percent}")

        # 因應 第三會期 D4 評鑑項目 比重 未填寫
        elif pd.notnull(rate_label) and 'D4' in rate_label:
            new_rate_labels.append(f"{rate_label}_院內：Max-2/筆,院外：Max-1/筆")
        # 因應 第二會期, 外交國防 C4 評鑑項目 比重未填寫
        elif pd.notnull(rate_label) and 'C4' in rate_label:
            new_rate_labels.append(f"{rate_label}_Max+1")

    # 補充： 額外評鑑項目
    print(rate_type)
    if rate_type == '黨團幹部':
        if session in [3]:
            new_rate_labels += ['E1', 'E2', 'F1']
        elif session in [7]:
            new_rate_labels += ['E1', 'E2', '備註']
    else:
        if session in [2]:
            new_rate_labels += ['E黨團幹部加扣分', '備註']
        elif session in [3, 4, 5, 6, 7]:
            new_rate_labels += ['備註']
        elif session in [1]:
            new_rate_labels += ['身分／其他', '評鑑結果']

    return new_rate_labels


def generate_json(df, rate_type, session):
    """[轉化特定種類評鑑之 DataFrame 為 json object 格式]

    Arguments:
        df {[DataFrame]} -- [特定會期，特定評鑑類別之 DataFrame]
        rate_type {[string]} -- [評鑑類別, 如內政, 經濟]
        session {[int]} -- [第幾會期]
    """

    people_list = []
    columns = df.columns

    # 設定： 比重欄位, 第四年比重欄位為 'Unnamed: 3'
    rate_col = 'Unnamed: 4' if 'Unnamed: 4' in columns else 'Unnamed: 3'

    # 因應 第四年 外交國防 'Unnamed: 4' 為 立委
    rate_col = '第九屆第四會期委員會立委總成績表' if df[rate_col].iloc[0] != '比重' else rate_col
    if '第九屆第四會期委員會立委總成績表' not in columns:
        rate_col = columns[4]

    # 設定： 立委姓名欄位範圍, 第四年比重欄位為 'Unnamed: 3'
    people_col = columns[5:] if rate_col == 'Unnamed: 4' else columns[4:]

    # 取得： 評鑑項目列表
    new_rate_labels = set_rate_labels(df, rate_col, session, rate_type)
    print(new_rate_labels)

    # 移除： B2 ~ B4 的資料，基於 B 僅有單一分數
    df = df.drop([13, 14, 15])

    for person in people_col:
        name = df[person].iloc[3]
        group = df[person].iloc[2]

        info = {
            "name": name,
            "group": group,
            "rate": {
                session: {
                    rate_type: {}
                }
            }
        }
        data = info['rate'][session][rate_type]

        count = 0
        for rate in df[person].iloc[4:]:
            # 因應： 第五年 空值 為 '-'
            rate = np.nan if rate == '-' else rate
            if count < len(new_rate_labels):
                # 因應： pandas 誤將 6/13 讀取為日期
                if isinstance(rate, datetime.date):
                    data[new_rate_labels[count]] = f"{rate.month}/{rate.day}"
                    # print(data[new_rate_labels[count]])
                else:
                    data[new_rate_labels[count]] = rate
                    # print(new_rate_labels[count], rate)
                count += 1
            # 因應備註有兩列的情況，將第二列備註合併至第一列 e.g. 第四年
            elif pd.notnull(rate):
                print(new_rate_labels[count-1], rate)
                data[new_rate_labels[count-1]] += ',' + rate

        people_list.append(info)

    return people_list
