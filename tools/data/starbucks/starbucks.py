import scrapy
import csv

class StarbucksSpider(scrapy.Spider):
    name = 'starbucksspider'
    start_urls = ['https://www.starbucks.com.cn/menu/']

    def parse(self, response):
        with open('data.csv', 'w', encoding='utf-8') as c:
            writer = csv.writer(c)
            for category in response.css('.product'):
                yield {'category': category.css('.caption::text').get()}
                for product in category.css('li>a'):
                    yield {'product': product.css('strong::text').get()}
                    yield {'preview': 'https://www.starbucks.com.cn/' +product.css('.preview').xpath('@style').re(r'background-image: url(\s)*(.*)')[1].split('"')[1]}
                    writer.writerow([product.css('strong::text').get(), category.css('.caption::text').get(), "类型"])
                    writer.writerow([product.css('strong::text').get(), 'https://www.starbucks.com.cn' +product.css('.preview').xpath('@style').re(r'background-image: url(\s)*(.*)')[1].split('"')[1], "图片"])