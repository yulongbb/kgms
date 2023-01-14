# -*- coding: utf-8 -*-
import scrapy
from scrapy.selector import Selector
import csv


class BaikeSpider(scrapy.Spider):
    name = 'baike'
    allowed_domains = ['baike.baidu.com']
    start_urls = ['https://baike.baidu.com/item/陈奕迅']
    # olds = set([item['_id'] for item in db_baike.find({}, {'_id': 1})])
    # if len(olds) > 0:
    #     start_urls = ['https://baike.baidu.com/item/'+olds.pop()]

    def parse(self, response):
        # print(response.url)
        # item_name = re.sub('/', '', re.sub('https://baike.baidu.com/item/',
        #                                    '', urllib.parse.unquote(response.url)))
        # # 爬取过的直接忽视
        # if item_name in self.olds:
        #     return
        # # 更新爬取过的item集合
        # self.olds.add(item_name)
        # 爬取页面内的item
        # items = set(response.xpath(
        #     '//a[contains(@href, "/item/")]/@href').re(r'/item/[A-Za-z0-9%\u4E00-\u9FA5]+'))
        # for item in items:
        #     new_url = 'https://baike.baidu.com'+urllib.parse.unquote(item)
        #     new_item_name = re.sub(
        #         '/', '', re.sub('https://baike.baidu.com/item/', '', new_url))
        #     if new_item_name not in self.olds:
        #         yield response.follow(new_url, callback=self.parse)

        # 处理三元组
        entity = ''.join(response.xpath(
            '//h1/text()').getall()).replace('/', '')
        attrs = response.xpath(
            '//dt[contains(@class,"basicInfo-item name")]').getall()

        values = response.xpath(
            '//dd[contains(@class,"basicInfo-item value")]').getall()

        if len(attrs) != len(values):
            return
        with open('data.csv', 'w', encoding='utf-8') as c:
            writer = csv.writer(c)
            for attr, value in zip(attrs, values):

                # attr
                temp = Selector(text=attr).xpath(
                    '//dt//text()').getall()
                attr = ''.join(temp).replace('\xa0', '')
                # value
                values = ''.join(Selector(text=value).xpath(
                    '//dd/text()|//dd/a//text()').getall()).strip().split('\n')
                for value in values:
                    if value != '' and value != '收起' and value != '展开':
                        if '、' in value:
                            for v in value.split('、'):
                                if v != '':
                                    print(entity+attr+v)
                                    writer.writerow([entity, v, attr])
                        else:
                            writer.writerow([entity, value, attr])
