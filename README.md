# kgms

通用元素：三元组（triple）

组成构件： 数据源（dataset）、概念（schema）、属性（property）、处理过程（builder）、实例（instance）、图（graph）

## screenshots

### dataset

[dataset](/screenshots/dataset.png)

### schema

[schema](/screenshots/schema.png)

### property

[property](/screenshots/property.png)

### builder

[builder](/screenshots/builder.png)

### instance

[instance](/screenshots/instance.png)

### graph

[graph](/screenshots/graph.png)

## 创建 applications

npx create-nx-workspace kgms --preset=angular

npx nx list

npm install -D @nrwl/nest

npx nx serve api

npx nx add @nrwl/react

npx nx g @nrwl/react:app graph

npx nx serve schema --port=4200

npx nx g @nrwl/react:app builder --js

npx nx serve builder --port=4201

npx nx serve graph --port=4202

## 创建 libraries

### 纯依赖

npx nx g @nrwl/workspace:lib lib-shared

### angular 依赖

npx nx g @nrwl/angular:lib lib-angular

### react 依赖

npx nx g @nrwl/react:lib lib-react

## 查看架构图

npx nx graph

## 打包发布

npx nx affected:build

gem install wikidata

docker run --name neo4j -p7474:7474 -p7687:7687 -d --env NEO4J_AUTH=neo4j/eszrdxtfc neo4j:latest

docker run -di --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql:8.0.21

-i https://mirrors.aliyun.com/pypi/simple/

dataset 数据集（CSV）

schema 本体模型

概念表

属性表

导出到知识图谱
编辑

1 schema 概念表查看、搜索功能，导出节点功能
2 schema 概念表知识图谱可视化展示
3 schema 属性表查看、搜索功能，导出节点功能
4 Myschema 概念表增删改查功能、重置功能、导入数据功能、导出文件功能
5 Myschema 概念表知识图谱可视化展示
6 Myschema 属性表增删改查功能、重置功能、导出文件功能
7 生成 Myschema 三元组

file 文件

wikidata 知识库（entity/file）

graph 可视化展示

entity 实体

参考连接

pip3 install rdflib -i https://pypi.tuna.tsinghua.edu.cn/simple

pip3 install Flask -i https://pypi.tuna.tsinghua.edu.cn/simple

pip3 install pandas -i https://pypi.tuna.tsinghua.edu.cn/simple

pip3 install Django -i https://pypi.tuna.tsinghua.edu.cn/simple

pip3 install mysqlclient -i https://pypi.tuna.tsinghua.edu.cn/simple

pip3 install Pillow -i https://pypi.tuna.tsinghua.edu.cn/simple

flask --app hello run

dataset 存储 csv 数据

python 将 csv 转换成 ttl 文件

ttl 文件解析成入库

django-admin startproject kgms

python manage.py startapp dataset

/usr/bin/python3 manage.py makemigrations

/usr/bin/python3 manage.py migrate

python manage.py sqlmigrate dataset 0001

/usr/bin/python3 manage.py migrate --fake dataset zero

/usr/bin/python3 manage.py migrate dataset

python manage.py createsuperuser

python manage.py runserver

npm install --save ag-grid-community --force
npm install --save ag-grid-angular --force
