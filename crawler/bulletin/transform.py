import json


def transform(input_path, output_path):
    result = {}

    with open(input_path) as fp:
        bulletins = json.load(fp)

    for each in bulletins:
        result[each["name"]] = each["bulletin"]

    with open(output_path, 'w') as fp:
        fp.write(json.dumps(result, ensure_ascii=False))
