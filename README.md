# Monorepo

## 创建applications 

npx create-nx-workspace monorepo --preset=angular

npx nx list

npx nx add @nrwl/react

npx nx g @nrwl/react:app graph

npx nx serve wikidata --port=4201

npx nx serve graph --port=4202

## 创建libraries

### 纯依赖
npx nx g @nrwl/workspace:lib lib-shared

### angular依赖
npx nx g @nrwl/angular:lib lib-angular

### react依赖
npx nx g @nrwl/react:lib lib-react


## 查看架构图
npx nx graph


## 打包发布
npx nx affected:build


gem install wikidata


docker run --name neo4j -p7474:7474 -p7687:7687 -d  --env NEO4J_AUTH=neo4j/test  neo4j:latest


-i https://mirrors.aliyun.com/pypi/simple/

dataset 数据集（CSV）

schema 本体模型

1 schema概念表查看、搜索功能，导出节点功能
2 schema概念表知识图谱可视化展示
3 schema属性表查看、搜索功能，导出节点功能
4 Myschema概念表增删改查功能、重置功能、导入数据功能、导出文件功能
5 Myschema概念表知识图谱可视化展示
6 Myschema属性表增删改查功能、重置功能、导出文件功能
7 生成Myschema三元组

file 文件

wikidata 知识库（entity/file）

graph 可视化展示

entity 实体



参考连接

npm install -D @nrwl/nest

npx nx serve api


