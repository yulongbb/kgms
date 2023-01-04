import json
import requests

headers = {'Accept': 'application/json'}

with open('tools/data/map3/maps.json', 'r', encoding='utf-8') as f:
    values = json.load(f)
    with open('tools/data/map3/item_index2entity_id_rehashed.txt', 'w', encoding='utf-8') as outfile:
        with open('tools/data/map3/kg.txt', 'w', encoding='utf-8') as kg:
            for v in values:
                outfile.write(v['name']+"       "+str(v['id']))
                outfile.write('\n')
                kg.write(str(v['id'])+"   mapping.contains    "+v['code'])
                kg.write('\n')
                kg.write(v['code']+"   mapping.be.contains    "+str(v['id']))
                kg.write('\n')

