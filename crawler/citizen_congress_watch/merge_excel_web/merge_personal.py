import json


def merge_personal():
    with open('meta_data/ccw_rate.json', 'r') as rate, open('meta_data/ccw_count.json', 'r') as count, open('ccw.json', 'w') as output:

        correct_rate_data = json.load(rate)
        correct_count_data = json.load(count)

        for name in correct_count_data:
            correct_rate_data[name]['excellentLegislatorNum'] = correct_count_data[name]['excellentLegislatorNum']
            correct_rate_data[name]['observedLegislatorNum'] = correct_count_data[name]['observedLegislatorNum']

        merge_data = json.dumps(correct_rate_data, ensure_ascii=False, indent=4)
        output.write(merge_data)
