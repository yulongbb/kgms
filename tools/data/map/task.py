import json
import requests

headers = {'Accept': 'application/json'}

with open('data/map2/maps.json', 'r', encoding='utf-8') as f:
    values = json.load(f)
    with open('data/map2/task.json', 'w', encoding='utf-8') as outfile:
        tasks = []
        index = 0
        for value in values:
            r = requests.get('http://123.160.246.146:7511/esneg/search/p/1?stDate=全部&enDate=全部&cate=全部&emotion=全部&source=全部&type=模糊检索&sortstr=全部&str='+value['code'], headers=headers)
            print(r.json()['content'])
            for task in r.json()['content']:
                index = index + 1
                t ={}
                t['id']=index
                t['name']=task['newstitle']
                t['code']=value['code']
                tasks.append(t)
        json.dump(tasks, outfile, ensure_ascii=False)   