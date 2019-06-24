import json


def transform(input_path, output_path):
    result = {}

    with open(input_path) as fp:
        politics_list = json.load(fp)

    for each in politics_list:
        result[each["name"]] = each["politics"]

    with open(output_path, 'w') as fp:
        fp.write(json.dumps(result, ensure_ascii=False))
