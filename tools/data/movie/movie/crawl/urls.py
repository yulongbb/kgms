from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import pandas as pd


def func(e, dic):
    if len(e.find_elements(by=By.XPATH, value='./td[2]/div/a')) != 0:
        obj = e.find_element(by=By.XPATH, value='./td[2]/div/a')
    elif len(e.find_elements(by=By.XPATH, value='./td[1]/div/a')) != 0:
        obj = e.find_element(by=By.XPATH, value='./td[1]/div/a')
    else:
        return

    dic['name'].append(obj.text)
    dic['url'].append(obj.get_attribute('href'))


film = {'name': [], 'url': []}
driver = webdriver.Chrome()

driver.get('https://baike.baidu.com/item/%E6%9D%8E%E5%AE%89/16812?fr=aladdin')
li = driver.find_elements(by=By.XPATH, value='/html/body/div[3]/div[4]/div/div[1]/div/table[1]/tbody/tr')
time.sleep(5)
for ele in li[1:]:
    func(ele, film)
li = driver.find_elements(by=By.XPATH, value='/html/body/div[3]/div[4]/div/div[1]/div/table[2]/tbody/tr')
for ele in li[1:]:
    func(ele, film)

driver.get('https://baike.baidu.com/item/%E5%BC%A0%E8%89%BA%E8%B0%8B/147018?fr=aladdin')
time.sleep(5)
li = driver.find_elements(by=By.XPATH, value='/html/body/div[3]/div[3]/div/div[1]/div/table[1]/tbody/tr')
for ele in li[1:]:
    t = ele.find_element(by=By.XPATH, value='./td[2]/div/a').text
    if '导演' in t or '编剧' in t:
        func(ele, film)

driver.get('https://baike.baidu.com/item/%E5%86%AF%E5%B0%8F%E5%88%9A/113653?fr=aladdin')
time.sleep(5)
li = driver.find_elements(by=By.XPATH, value='/html/body/div[3]/div[4]/div/div[1]/div/table[1]/tbody/tr')
for ele in li[1:]:
    func(ele, film)
li = driver.find_elements(by=By.XPATH, value='/html/body/div[3]/div[4]/div/div[1]/div/table[2]/tbody/tr')
for ele in li[1:]:
    func(ele, film)

driver.get('https://baike.baidu.com/item/%E9%99%88%E5%87%AF%E6%AD%8C/188375?fr=aladdin')
time.sleep(5)
li = driver.find_elements(by=By.XPATH, value='/html/body/div[3]/div[3]/div/div[1]/div/table[1]/tbody/tr')
for ele in li[1:]:
    func(ele, film)

driver.get('https://baike.baidu.com/item/%E7%8E%8B%E5%AE%B6%E5%8D%AB/373607?fr=aladdin')
time.sleep(5)
li = driver.find_elements(by=By.XPATH, value='/html/body/div[3]/div[4]/div/div[1]/div/table[2]/tbody/tr')
for ele in li[1:]:
    func(ele, film)
li = driver.find_elements(by=By.XPATH, value='/html/body/div[3]/div[4]/div/div[1]/div/table[3]/tbody/tr')
for ele in li[1:]:
    func(ele, film)
li = driver.find_elements(by=By.XPATH, value='/html/body/div[3]/div[4]/div/div[1]/div/table[4]/tbody/tr')
for ele in li[1:]:
    func(ele, film)
film = pd.DataFrame(film).drop_duplicates()
film = film.to_csv('raw_url.csv', index=False)