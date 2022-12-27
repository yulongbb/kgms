import pandas as pd #for handling csv and csv contents
from rdflib import Graph, Literal, RDF, URIRef, Namespace #basic RDF handling
from rdflib.namespace import FOAF , XSD #most common namespaces
import urllib.parse #for parsing strings to URI's

df = pd.read_csv('tools/csv2rdf/example.csv',encoding='gbk')

g = Graph()

for index, label in enumerate(df.标签):
    for key in df.keys()[1:]:
        g.add((Literal(label), Literal(key), Literal(df[key][index])))


print(g.serialize(format='turtle'))

g.serialize('tools/data/turtle.ttl',format='turtle')


# Create a Graph
g2 = Graph()

g2.parse("tools/data/turtle.ttl", format="turtle")


for s, p, o in g2:
    print(s, p, o)

