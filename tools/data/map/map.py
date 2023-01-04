import json
import re


from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False, slow_mo=500)
    page = browser.new_page()
    with open('data\map2.json', 'r', encoding='utf-8') as f:
        value = json.load(f)
        entities = []
        with open('data\map2\maps.json', 'w', encoding='utf-8') as outfile:
            maps =[]
            index = 0
            for v in value:
                index = index+1
                page.goto(
                        "https://www.webmap.cn/dataEnty.do?method=getMapDetail&id="+v['id'])
                data = re.findall(r"detailes(.+?)id", page.content())
                index = index+1
                print(data[0][3:-12])
                result = json.loads("["+data[0][3:-13]+"]")
                if(result[0]['成果单元名称'] and result[1]['新图号']):
                    map ={}
                    map['id'] = index
                    map['name'] = result[0]['成果单元名称']
                    map['code'] = result[1]['新图号']
                    maps.append(map)
            json.dump(maps, outfile, ensure_ascii=False)



        # with open('data\item_index2entity_id_rehashed.txt', 'w', encoding='utf-8') as outfile:
        #     with open('data\kg.txt', 'w', encoding='utf-8') as kg:
        #         index = 0
        #         for v in value:
        #             page.goto(
        #                 "https://www.webmap.cn/dataEnty.do?method=getMapDetail&id="+v['id'])
        #             data = re.findall(r"detailes(.+?)]", page.content())
        #             index = index+1
        #             result = json.loads("["+data[0][3:-10]+"]")
        #             print(result)
        #             if(result[0]['成果单元名称'] and result[1]['新图号']):
        #                 outfile.write(result[1]['新图号']+"       "+str(index))
        #                 outfile.write('\n')
        #                 kg.write(str(index)+"   mapping.contains    "+result[0]['成果单元名称'])
        #                 kg.write('\n')
        #                 kg.write(result[0]['成果单元名称']+"   mapping.be.contains    "+str(index))
        #                 kg.write('\n')
    # browser.close()
