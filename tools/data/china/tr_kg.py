import json
import csv


with open('tools/data/china/tr_kg.json', 'r', encoding='utf-8') as f:
    with open('tools/data/china/tr_kg.csv', 'w', encoding='utf-8') as c:
        writer = csv.writer(c)
        for line in f:
            value = json.loads(line)
            print(value['name'])
            writer.writerow([value['name'], value['isA'], '类型'])
            writer.writerow([value['name'], value['code'], '编码'])
            for v in value['include']:
                writer.writerow([v['name'], value['name'], '上级'])
# with open('tools/military/military.csv', 'w', encoding='utf-8') as c:
#     writer = csv.writer(c)
#     for line in f:
#         value = json.loads(line)
#         print(value['名称'])
#         for key in value:
#             if key == '_id' or key == '名称':
#                 continue
#             print(key)
#             print(value[key])
#             writer.writerow([value['名称'], value[key], key])
