import json

from rate_merge import merge_single_session


if __name__ == "__main__":
    # 先分別合併第一會期到第七會期檔案之立委資料
    total_rate_list = [merge_single_session(session) for session in range(1, 8)]

    # 合併第一會期 ~ 第七會期之資料
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
                    year_type = num + 1
                    total_rate_list[0][people_index]['rate'][year_type] = people['rate'][year_type]

    merge_rate_list = total_rate_list[0]
    output_rate = json.dumps(merge_rate_list, ensure_ascii=False, indent=4)
    output_rate = output_rate.replace('NaN', 'null')


    with open('evaluation.json', 'w') as output:
        output.write(output_rate)
