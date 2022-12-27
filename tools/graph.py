
from rdflib import Graph

# Create a Graph
g = Graph()

g.parse("tools/data/asoiaf.ttl", format="turtle")

# Print out the entire Graph in the RDF Turtle format
for s, p, o in g:
    print(s, p, o)


# g.serialize('tools/data/asoiaf.ttl',format='turtle')

