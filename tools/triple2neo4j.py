import requests

# Extract
url="http://127.0.0.1:8000/datasets/turtles/2"

headers = {'Accept': 'application/json'}

r = requests.get(url, headers=headers)



for turtle in r.json():

    # transform

    # load
    rep = requests.post('http://localhost:3333/api/entity', data=turtle)
    print(rep.json())

