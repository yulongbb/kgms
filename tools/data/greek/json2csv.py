import json
import csv


with open('tools/data/greek/records.json', 'r', encoding='utf-8') as f:
    with open('tools/data/greek/records.csv', 'w', encoding='utf-8') as c:
        writer = csv.writer(c)
        records = json.load(f)
        
        for record in records:
            print(record['n']['properties'])
            for key in record['n']['properties']:
                writer.writerow([record['n']['properties']['中文名'], record['n']['properties'][key], key])
