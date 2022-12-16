from neo4j import GraphDatabase
import json
import random

driver = GraphDatabase.driver("neo4j://localhost:7687",
                              auth=("neo4j", "eszrdxtfc"))


def add_Relation(tx, source, relation, target):
    tx.run("MERGE (m:"+source['cluster'].replace("/", "").replace("（", "").replace("）", "")+" {key: $key,label: $label, tag: $tag, cluster: $cluster}) "
           "MERGE (n:"+target['cluster'].replace("/", "").replace("（", "").replace("）", "") +
           " {key: $target_key,label: $target_label, tag: $target_tag, cluster: $target_cluster}) "
           "MERGE (m)-[:"+relation+"]->(n)",
           key=source['key'],
           label=source['label'],
           tag=source['tag'],
           cluster=source['cluster'],
           target_key=target['key'],
           target_label=target['label'],
           target_tag=target['tag'],
           target_cluster=target['cluster'],
           )


def output_Data(tx):
    query = ("MATCH p = (m)-[r]->(n) RETURN p LIMIT 100")
    with open("apps/graph/src/assets/dataset.json", "w", encoding='utf-8') as outfile:
        dataset = {}
        dataset["nodes"] = []
        dataset["edges"] = []
        dataset["clusters"] = []
        dataset["tags"] = [
            {"key": "Chart type", "image": "charttype.svg"},
            {"key": "Company", "image": "company.svg"},
            {"key": "Concept", "image": "concept.svg"},
            {"key": "Field", "image": "field.svg"},
            {"key": "List", "image": "list.svg"},
            {"key": "Method", "image": "method.svg"},
            {"key": "Organization", "image": "organization.svg"},
            {"key": "Person", "image": "person.svg"},
            {"key": "Technology", "image": "technology.svg"},
            {"key": "Tool", "image": "tool.svg"},
            {"key": "unknown", "image": "unknown.svg"}
        ]
        for record in tx.run(query):
            if record.data()['p'][0] not in dataset["nodes"]:
                dataset["nodes"].append(record.data()['p'][0])
            if record.data()['p'][2] not in dataset["nodes"]:
                dataset["nodes"].append(record.data()['p'][2])
            dataset["edges"].append(
                [record.data()['p'][0]['key'], record.data()['p'][2]['key']])
        print(dataset)

        labels = set()
        for node in dataset["nodes"]:
            labels.add(node["cluster"])
            node["x"] = random.uniform(0, 1)
            node["y"] = random.uniform(0, 1)
            node["score"] = random.uniform(0, 1)
            # if node['type'] == '国家':
            #     node["score"] = random.uniform(0, 1)
            # else:
            #     node["score"] = random.uniform(0, 0.01)
        for label in labels:
            def r(): return random.randint(0, 255)
            dataset["clusters"].append(
                {"key": label, "color": '#%02X%02X%02X' % (
                    r(), r(), r()), "clusterLabel": label}
            )
        json.dump(dataset, outfile, ensure_ascii=False)


def clusters_node(tx):
    query = ("MATCH (n) RETURN distinct labels(n)[0] AS label")
    clusters = []
    for record in tx.run(query):
        def r(): return random.randint(0, 255)
        clusters.append(
            {"key": record.data()['label'], "color": '#%02X%02X%02X' % (
                r(), r(), r()), "clusterLabel": record.data()['label']}
        )
    print(clusters)
    with open('tools\data\clusters.json', 'w', encoding='utf-8') as outfile:
        json.dump(clusters, outfile, ensure_ascii=False)
    return clusters


with driver.session(database="neo4j") as session:
    # with open('tools\data\military.json', 'r', encoding='utf-8') as f:
    #     for line in f:
    #         value = json.loads(line)
    #         print(value)
    #         source = {
    #             "key": value['_id']['$oid'],
    #             'cluster': value['类型'],
    #             "label": value['名称'],
    #             "tag": "Tool",
    #         }

    #         if '产国' in value.keys():
    #             target = {
    #                 "key": value['产国'],
    #                 'cluster': '国家',
    #                 "label": value['产国'],
    #                 "tag": "Tool",
    #             }
    #             print(source)
    #             print(target)
    #             session.execute_write(add_Relation, source, '产国', target)

    #         if '研发单位' in value.keys():
    #             target = {
    #                 "key": value['研发单位'],
    #                 'cluster': '研发单位',
    #                 "label": value['研发单位'],
    #                 "tag": "Tool",
    #             }
    #             print(source)
    #             print(target)
    #             session.execute_write(add_Relation, source, '研发单位',  target)

    session.execute_read(output_Data)
    # session.execute_read(clusters_node)

    # session.execute_write(add_friend, node, friend1)
    # session.execute_write(add_friend, node, friend2)
    # session.execute_write(add_friend, node, friend3)
    # session.execute_read(print_friends, node)

driver.close()
