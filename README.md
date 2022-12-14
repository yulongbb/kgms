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




docker run --name neo4j -p7474:7474 -p7687:7687 -d  --env NEO4J_AUTH=neo4j/test  neo4j:latest


-i https://mirrors.aliyun.com/pypi/simple/