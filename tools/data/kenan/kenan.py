import json
import csv


with open('tools/data/kenan/new_property_clean.json', 'r', encoding='utf-8') as f:
    records = json.load(f)
    with open('tools/data/kenan/kenan.csv', 'w', encoding='utf-8') as c:
        writer = csv.writer(c)
    # print(records)
        for key in records:
            for prop in records[key]:
                if prop != 'id':
                    for value in str(records[key][prop]).split('、'):
                        print(str(key)+','+str(prop)+','+str(value))
                        writer.writerow([str(key), str(value), str(prop)])

    # with open('tools/data/greek/records.csv', 'w', encoding='utf-8') as c:
    #     writer = csv.writer(c)

    #     for record in records:
    #         print(record['n']['properties'])
    #         for key in record['n']['properties']:
    #             writer.writerow([record['n']['properties']['中文名'], record['n']['properties'][key], key])
