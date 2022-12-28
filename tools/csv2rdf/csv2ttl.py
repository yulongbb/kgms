import pandas as pd #for handling csv and csv contents
from rdflib import Graph, Literal, RDF, URIRef, Namespace #basic RDF handling
from rdflib.namespace import FOAF , XSD #most common namespaces
import io
import requests


# url="http://localhost:8000/datasets/2022/12/28/example.csv"

# s=requests.get(url).content

# df = pd.read_csv(io.StringIO(s.decode('gbk')))
df = pd.read_csv('tools/csv2rdf/finalrelation.csv',encoding='gbk')

g = Graph()
for index, row in enumerate(df.values):
    g.add((Literal(row[1]), Literal(row[2]), Literal(row[1])))

g.serialize('tools/data/turtle.ttl',format='turtle')


# g = Graph()

# for index, label in enumerate(df.标签):
#     for key in df.keys()[1:]:
#         g.add((Literal(label), Literal(key), Literal(df[key][index])))


# print(g.serialize(format='turtle'))



# # Create a Graph
# g2 = Graph()

# g2.parse("tools/data/turtle.ttl", format="turtle")


# for s, p, o in g2:
#     print(s, p, o)

