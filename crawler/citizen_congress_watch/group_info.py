"""
用於產生 黨團幹部 資料 json 檔
"""
import json

import pandas as pd

from json_convert import generate_json

base_path = '../../data/raw/citizen_congress_watch/'

xl = pd.ExcelFile(f'{base_path}/9-3.xlsx')
sheet_name = '02-11黨團幹部'
df_1 = xl.parse(sheet_name)
df_1 = df_1.dropna(how='all')

xl = pd.ExcelFile(f'{base_path}/9-7.xlsx')
sheet_name = '黨團幹部'
df_2 = xl.parse(sheet_name)
df_2 = df_2.dropna(how='all')


total_rate_list = [
    generate_json(df_1, '黨團幹部', 3),
    generate_json(df_2, '黨團幹部', 7),
]


people_list = []
for num, rate_list in enumerate(total_rate_list):
    if num == 0:
        for people in rate_list:
            people_list.append(people['name'])
    else:
        for people in rate_list:
            if people['name'] not in people_list:
                people_list.append(people)
                total_rate_list[0].append(people)
            else:
                people_index = people_list.index(people['name'])
                year_type = num + 6
                total_rate_list[0][people_index]['rate'][year_type] = people['rate'][year_type]

merge_rate_list = total_rate_list[0]
output_rate = json.dumps(merge_rate_list, ensure_ascii=False, indent=4)
output_rate = output_rate.replace('NaN', 'null')

with open('group.json', 'w') as output:
    output.write(output_rate)
