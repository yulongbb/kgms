import json

with open('tools/data/military.json', 'r', encoding='utf-8') as f:
    for line in f:
        value = json.loads(line)
        print(value)