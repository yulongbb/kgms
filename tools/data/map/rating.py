import json

with open('data/map2/task.json', 'r', encoding='utf-8') as f:
    values = json.load(f)
    print(values)
    with open('data/map2/rating.dat', 'w', encoding='utf-8') as outfile:
        for v in values:
            outfile.write(str(v['id'])+'::'+str(v['code'])+str("::1"))
            outfile.write('\n')
            