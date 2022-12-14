from neo4j import GraphDatabase
import json

driver = GraphDatabase.driver("neo4j://localhost:7687",
                              auth=("neo4j", "test"))


def add_friend(tx, node, friend):
    tx.run("MERGE (a:Person {key: $key,label: $label}) "
           "MERGE (a)-[:KNOWS]->(friend:Person {key: $friend_key})",
           key=node['key'],  label=node['label'], friend_key=friend['key'])


def print_friends(tx, node):
    query = ("MATCH p = (a:Person)-[r:KNOWS]->(friend) WHERE a.key = $key "
             "RETURN p")
    with open("dataset.json", "w") as outfile:
        dataset = {}
        dataset["nodes"] = []
        dataset["edges"] = []
        dataset["clusters"] = []
        dataset["tags"] = []
        for record in tx.run(query, key=node['key']):
            if record.data()['p'][0] not in dataset["nodes"]:
                dataset["nodes"].append(record.data()['p'][0])
            dataset["nodes"].append(record.data()['p'][2])
            dataset["edges"].append([record.data()['p'][0]['key'], record.data()['p'][2]['key']])
        json.dump(dataset, outfile)


with driver.session(database="neo4j") as session:
    node = {
        "key": "cytoscape",
        "label": "Cytoscape",
        "tag": "Tool",
        "URL": "https://en.wikipedia.org/wiki/Cytoscape",
        "cluster": "0",
        "x": 643.82275390625,
        "y": -770.3126220703125,
        "score": 0.00006909602204225056
    }

    friend1 =  {
      "key": "microsoft excel",
      "label": "Microsoft Excel",
      "tag": "Tool",
      "URL": "https://en.wikipedia.org/wiki/Microsoft%20Excel",
      "cluster": "1",
      "x": -857.2847900390625,
      "y": 602.7734375,
      "score": 0.0018317394731443256
    }

    friend2 =  {
      "key": "gephi",
      "label": "Gephi",
      "tag": "Tool",
      "URL": "https://en.wikipedia.org/wiki/Gephi",
      "cluster": "0",
      "x": 343.4423828125,
      "y": -749.0428466796875,
      "score": 0.0010242079745792347
    }

    friend3 =  {
      "key": "microsoft power bi",
      "label": "Microsoft Power BI",
      "tag": "Tool",
      "URL": "https://en.wikipedia.org/wiki/Microsoft%20Power%20BI",
      "cluster": "1",
      "x": -900.3515014648438,
      "y": 633.4600830078125,
      "score": 0.0000049571249591405295
    }

    session.execute_write(add_friend, node, friend1)
    session.execute_write(add_friend, node, friend2)
    session.execute_write(add_friend, node, friend3)
    session.execute_read(print_friends, node)

driver.close()
