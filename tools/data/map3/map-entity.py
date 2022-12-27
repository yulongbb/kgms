import json
import requests

headers = {'Accept': 'application/json'}

with open('tools/data/map3/maps.json', 'r', encoding='utf-8') as f:
    values = json.load(f)
    with open('tools/data/map3/map-local.json', 'w', encoding='utf-8') as outfile:
        entities = []
        for v in values:
            entity = {}
            entity['type'] = '地点'
            entity['labels'] = {}
            entity['labels']['zh-cn'] = v['code']
            entity['claims'] = {}
            entity['claims']['图号'] = [{
                "prop": '图号',
                "tp": "string",
                "vl": {
                    "dt": "S",
                    "dv": {
                        "v": v['name'],

                    }
                },
                "qlfs": {},
                "refs": []
            }]
            entity['claims']['编号'] = [{
                "prop": '编号',
                "tp": "string",
                "vl": {
                    "dt": "S",
                    "dv": {
                        "v": v['id'],

                    }
                },
                "qlfs": {},
                "refs": []
            }]
            entities.append(entity)
        json.dump(entities, outfile, ensure_ascii=False)
