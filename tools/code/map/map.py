import json
import re
import csv


from playwright.sync_api import sync_playwright

# 图集
fields = ['成果单元名称', "新图号", '旧图号', '比例尺', '成果类型', '生产时间', '版本',
          '所属项目', '密级', '大地基准', '高程基准', '投影', '数据格式', '分发单位', '链接地址', '整体现势性']


# 数字高程模型
fields = ['成果单元名称', "新图号", '旧图号', '比例尺', '格网间距', '成果类型', '生产时间', '版本',
          '所属项目', '密级', '大地基准', '高程基准', '投影', '数据格式', '分发单位', '链接地址',  '编号', '格网间距(精确)', '整体现势性', '数据名称']

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False, slow_mo=500)
    page = browser.new_page()
    with open('tools\code\map\data.json', 'r', encoding='utf-8') as f:
        value = json.load(f)
        with open('tools\code\map\data.csv', 'w', encoding='utf-8') as c:
            writer = csv.writer(c)
            writer.writerow(fields)
            for v in value:
             
                page.goto(
                    "https://www.webmap.cn/dataEnty.do?method=getMapDetail&id="+v['id'])
                data = re.findall(r"detailes(.+?)id", page.content())
                print(data[0][3:-3])

                result = json.loads("["+data[0][3:-3]+"]")

                print(result)
                row = []
                for i, f in enumerate(fields):
                    print(i)
                    print(f)
                    row.append(result[i][f])
                writer.writerow(row)

        # with open('data\map2\maps.json', 'w', encoding='utf-8') as outfile:
        #     maps =[]
        #     index = 0
        #     for v in value:
        #         index = index+1
        #         page.goto(
        #                 "https://www.webmap.cn/dataEnty.do?method=getMapDetail&id="+v['id'])
        #         data = re.findall(r"detailes(.+?)id", page.content())
        #         index = index+1
        #         print(data[0][3:-12])
        #         result = json.loads("["+data[0][3:-13]+"]")
        #         if(result[0]['成果单元名称'] and result[1]['新图号']):
        #             map ={}
        #             map['id'] = index
        #             map['name'] = result[0]['成果单元名称']
        #             map['code'] = result[1]['新图号']
        #             maps.append(map)
        #     json.dump(maps, outfile, ensure_ascii=False)
