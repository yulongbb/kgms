# -*- coding: utf-8 -*-
import scrapy
import pandas as pd
from work.items import movie


class InfoSpider(scrapy.Spider):
    name = 'info'
    allowed_domains = ['www.baidu.com']
    raw = pd.read_csv('../raw_url.csv', encoding='gbk')

    def start_requests(self):
        for i in range(len(self.raw)):
            yield scrapy.Request(url=self.raw.iloc[i, 1], callback=self.parse, meta={'name': self.raw.iloc[i, 0]})

    def parse(self, response):
        if len(response.xpath('/html/body/div[3]/div[2]/div/div[1]/div[2]/div/text()').extract()) != 0:
            info = response.xpath('/html/body/div[3]/div[2]/div/div[1]/div[2]/div/text()')[0].extract()
        elif len(response.xpath('/html/body/div[3]/div[1]/div/div[1]/div[2]/div/text()').extract()) != 0:
            info = response.xpath('/html/body/div[3]/div[1]/div/div[1]/div[2]/div/text()')[0].extract()
        elif len(response.xpath('/html/body/div[3]/div[2]/div/div[1]/div[4]/div/text()').extract()) != 0:
            info = response.xpath('/html/body/div[3]/div[2]/div/div[1]/div[4]/div/text()')[0].extract()
        else:
            info = response.xpath('//*[@id="posterCon"]/dd[2]/div/div[1]/text()').extract()
            ex = response.xpath('//*[@id="posterCon"]/dd[2]/div/div[1]/a/text()').extract()
            for i in range(len(ex)):
                info.insert(i * 2 + 1, ex[i])
            info = ''.join(info)

        try:

            item = movie()
            item['name'] = response.meta['name']
            item['des'] = info

            yield item
        except:
            print(info)