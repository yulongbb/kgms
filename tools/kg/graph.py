import csv
import py2neo
from py2neo import Graph,Node,Relationship,NodeMatcher

#账号密码改为自己的
g=Graph('http://localhost:7474',user='neo4j',password='xxy3460!')


with open('./data/person_entity.csv',encoding='utf-8') as ff:
    reader=csv.reader(ff)
    for item in reader:
        if reader.line_num==1:
            continue
        print('当前行数：',reader.line_num,"当前内容：",item)
        node=Node("Person",name=item[0])
        g.merge(node,"Person","name")



with open('./data/person_relation.csv','r',encoding='utf-8') as f:
    reader=csv.reader(f)
    for item in reader:
        if reader.line_num==1:
            continue
        print("当前行数：",reader.line_num,"当前内容：",item)
        #start_node=Node("Person",name=item[0])
        #end_node=Node("Person",name=item[2])
        start_node=g.nodes.match("Person",name=item[0]).first()
        end_node=g.nodes.match("Person",name=item[2]).first()
        relation=Relationship(start_node,item[1],end_node)
        #g.merge(start_node,"Person","name")
        #g.merge(end_node,"Person","name")
        g.merge(relation,"Person","name")
with open('./data/story_relation.csv','r',encoding='utf-8') as f:
    reader=csv.reader(f)
    for item in reader:
        if reader.line_num==1:
            continue
        print("当前行数：",reader.line_num,"当前内容：",item)
        # start_node=Node("Person",name=item[0])
        end_node=Node("story",name=item[2])
        start_node=g.nodes.match("Person",name=item[0]).first()
        
        relation=Relationship(start_node,item[1],end_node)
        #g.merge(start_node,"Person","name")
        g.merge(end_node,"story","name")
        g.merge(relation,"Person_story","name")

with open('./data/person_intersection.csv','r',encoding='utf-8') as f:
    reader=csv.reader(f)
    for item in reader:
        if reader.line_num==1:
            continue
        print("当前行数：",reader.line_num,"当前内容：",item)
        # start_node=Node("Person",name=item[0])
        # end_node=Node("Person",name=item[2])
        start_node=g.nodes.match("Person",name=item[0]).first()
        end_node=g.nodes.match("Person",name=item[2]).first()
        relation=Relationship(start_node,item[1],end_node)
        #g.merge(start_node,"Person","name")
        #g.merge(end_node,"Person","name")
        g.merge(relation,"intersection","name")

