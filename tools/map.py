import json
import requests
import re


from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False, slow_mo=500)
    page = browser.new_page()
    with open('tools\data\map.json', 'r', encoding='utf-8') as f:
        value = json.load(f)
        entities = []
        for v in value:
            page.goto(
                "https://www.webmap.cn/dataEnty.do?method=getMapDetail&id="+v['id'])
            data = re.findall(r"detailes(.+?)]", page.content())

            result = json.loads("["+data[0][3:-10]+"]")
            entity = {}
            entity['type'] = "图集"
            entity['labels'] = {}
            entity['labels']['zh-cn'] = result[0]['成果单元名称']
            entity['claims'] = {}
            for r in result:
                for key in r:
                    print(r[key])
                    statement = {
                        "prop": key,
                        "tp": "string",
                        "vl": {
                            "dt": "S",
                            "dv": {
                                "v": r[key],

                            }
                        },
                        "qlfs": {},
                        "refs": []
                    }
                    entity['claims'][key] = [statement]
            entities.append(entity)
        with open('tools\data\dataset.json', 'w', encoding='utf-8') as outfile:
            json.dump(entities, outfile, ensure_ascii=False)

    # browser.close()
