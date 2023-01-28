import requests

def schema2entity(name):
    data = requests.get("http://localhost:3333/api/entity/schema/143?name="+str(name))
    if(len(data.json())>0):
        return "Q"+str(data.json()[0]['_fields'][0]['identity']['low'])
    return None


def children(schema):
    if(len(schema['children'])>0):
        for child in schema['children']:
            print(str(child['id'])+':'+str(child['name']))
            entity = schema2entity(child['name'])
            if(entity is not None):
                requests.put('http://localhost:3333/api/schemas/'+str(child['id'])+'/'+str(entity))
            children(child)

data = requests.get('http://localhost:3333/api/schemas/143')
print(data.json()['children'])   
for schema in data.json()['children']:
    print(str(schema['id'])+':'+str(schema['name']))
    entity = schema2entity(schema['name'])
    requests.put('http://localhost:3333/api/schemas/'+str(schema['id'])+'/'+str(entity))
    print(entity)
    children(schema)

