import numpy as np
import pandas as pd
from pandas.io.parsers import read_csv

##person entity
c=pd.read_csv('./raw_data/raw_text.csv')
character=c['name']
cha=[]
for i in character:
    if i.strip() not in cha:
        cha.append(i.strip())
f=open('./raw_data/relation1.txt',encoding='utf-8')
re=f.readlines()
for line in re:
    x=line.split('\t')
    if x[0].strip() not in cha:
        cha.append(x[0].strip())
    if x[2].strip() not in cha:
        cha.append(x[2].strip())
f.close()
story=[]
f=open('./raw_data/ralation_story.txt',encoding='utf-8')
re=f.readlines()
for line in re:
    x=line.split('\t')
    if x[0].strip() not in cha:
        cha.append(x[0].strip())
f.close()

f=open('./raw_data/all_intersection.txt',encoding='utf-8')
re=f.readlines()
for line in re:
    x=line.split('\t')
    if x[0].strip() not in cha:
        cha.append(x[0].strip())
    if x[1].strip() not in cha:
        cha.append(x[1].strip())
f.close()

character={'name':cha}
character=pd.DataFrame(character)
character.to_csv('./data/person_entity.csv', index=False, encoding='utf_8_sig')

relation_p={'subject':[],'relation':[],'object':[]}
f=open('./raw_data/relation1.txt',encoding='utf-8')
re=f.readlines()
for line in re:
    x=line.split('\t')
    relation_p['subject'].append(x[0])
    relation_p['relation'].append(x[1])
    relation_p['object'].append(x[2].strip())
relation_p=pd.DataFrame(relation_p).drop_duplicates()
relation_p.to_csv('./data/person_relation.csv',index=False,encoding='utf_8_sig')

relation_inter={'subject':[],'relation':[],'object':[]}
f=open('./raw_data/all_intersection.txt',encoding='utf-8')
s=f.readlines()
R='交集'
for line in s:
    t=line.split('\t')
    relation_inter['subject'].append(t[0].strip())
    relation_inter['relation'].append(R)
    relation_inter['object'].append(t[1].strip())
relation_inter=pd.DataFrame(relation_inter).drop_duplicates()
relation_inter.to_csv('./data/person_intersection.csv',index=False,encoding='utf_8_sig')

relation_story={'subject':[],'relation':[],'object':[]}
f=open('./raw_data/ralation_story.txt',encoding='utf-8')
s=f.readlines()
R='相关故事'
story={'name':[]}
for line in s:
    t=line.split('\t')[1]
    x=t.split('：')[1]
    if x.strip()=='后记':
        break
    relation_story['subject'].append(line.split('\t')[0])
    relation_story['relation'].append(R)
    relation_story['object'].append(x.strip())
    story['name'].append(x.strip())
relation_story=pd.DataFrame(relation_story).drop_duplicates()
relation_story.to_csv('./data/story_relation.csv',index=False,encoding='utf_8_sig')
story=pd.DataFrame(story).drop_duplicates()
story.to_csv('./data/story_entity.csv',index=False,encoding='utf_8_sig')


entity=pd.concat([character,story],axis=0)
entity.to_csv('./data/entity.csv',index=False,encoding='utf_8_sig')

relations=pd.concat([relation_p,relation_story,relation_inter],axis=0)
relations.to_csv('./data/relations.csv',index=False,encoding='utf_8_sig')