# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import pandas as pd
from itemadapter import ItemAdapter


class WorkPipeline:
    def __init__(self):
        self.result = {'name': [], 'des': []}

    def open_spider(self, spider):
        print('spider begin....')

    def process_item(self, item, spider):
        self.result['name'].append(item['name'])
        self.result['des'].append(item['des'])
        return item

    def close_spider(self, spider):
        print('spider finished')
        pd.DataFrame(self.result).drop_duplicates().to_csv('./data/raw_des.csv', index=False,)