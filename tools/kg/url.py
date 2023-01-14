from selenium import webdriver
from selenium.webdriver.common.by import By
import pandas as pd


def func(e, dic):
    if len(e.find_elements(by=By.XPATH, value='./b/a')) != 0:
        obj = e.find_element(by=By.XPATH, value='./b/a')
    elif len(e.find_elements(by=By.XPATH, value='./a'))!=0:
        obj = e.find_element(by=By.XPATH, value='./a')
    else:
        return
    dic['name'].append(obj.text)
    dic['url'].append(obj.get_attribute('href'))


character = {'name': [], 'url': []}
driver = webdriver.Chrome()


driver.get('https://baike.baidu.com/item/%E5%B8%8C%E8%85%8A%E7%A5%9E%E8%AF%9D/63444')

li = driver.find_elements(by=By.XPATH, value='/html/body/div[3]/div[2]/div/div[1]/div')
#time.sleep(5)

for ele in li[35:244]:
    func(ele, character)

print(character)

character = pd.DataFrame(character).drop_duplicates()
character = character.to_csv('raw_url.csv', index=False, encoding='utf_8_sig')

#remove 4 line by hand; or define 'div' index