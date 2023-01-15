from django.shortcuts import redirect, render
from .models import Dataset
from .forms import DatasetForm

import pandas as pd  # for handling csv and csv contents
from rdflib import Graph, Literal, RDF, URIRef, Namespace  # basic RDF handling
from rdflib.namespace import FOAF, XSD  # most common namespaces
import io
import requests
from django.core.files.base import ContentFile, File
from django.shortcuts import get_object_or_404, render

from django.http import JsonResponse
from django.views.decorators.clickjacking import xframe_options_exempt

@xframe_options_exempt

def turtles(request, dataset_id):
    dataset = get_object_or_404(Dataset, pk=dataset_id)
    url = "http://localhost:8000/"+str(str(dataset.docfile).split(
        '.')[0]+'.ttl')

    print(url)

    # Create a Graph
    g = Graph()
    s = requests.get(url).content
    
    g.parse(io.StringIO(s.decode('utf-8')), format="turtle")
    triples = []
    print(len(g))
    for s, p, o in g:
        triples.append({'subject': s, 'predicate': p, 'object': o})

    return JsonResponse(triples, safe=False, status=201)


@xframe_options_exempt
def dataset(request, dataset_id):
    dataset = get_object_or_404(Dataset, pk=dataset_id)
    url = "http://localhost:8000/"+str(str(dataset.docfile).split(
        '.')[0]+'.ttl')
    
    print(url)

    # Create a Graph
    g = Graph()
    s = requests.get(url).content
    g.parse(io.StringIO(s.decode('utf-8')), format="turtle")
    triples = []
    print(len(g))
    for s, p, o in g:
        triples.append({'subject': s, 'predicate': p, 'object': o})
    context = {'dataset': dataset, 'triples': triples[0:100]}

    return render(request, 'detail.html', context)


@xframe_options_exempt
def datasets(request, graph):
    print(f"Great! You're using Python 3.6+. If you fail here, use the right version.")
    message = 'Upload as many files as you want!'
    # Handle file upload
    if request.method == 'POST':
        form = DatasetForm(request.POST, request.FILES)
        if form.is_valid():
            newdoc = Dataset(
                name=form.cleaned_data['name'],
                content=form.cleaned_data['content'],
                docfile=request.FILES['docfile']
            )
            newdoc.save()
            url = "http://localhost:8000/"+str(newdoc.docfile)
            s = requests.get(url).content
            df = pd.read_csv(io.StringIO(s.decode('utf-8')))
            g = Graph()
            print(len(df.values))
            for row in df.values:
                if row is not None:
                    g.add((Literal(row[0]), Literal(row[2]), Literal(row[1])))

            # print(g.serialize(format='turtle'))
            g.serialize(str(newdoc.docfile).split(
                '.')[0]+'.ttl', format='turtle')
            newdoc.size = len(df.values)
            newdoc.graph = str(graph)
            newdoc.save()

            # # Create a Graph
            # g2 = Graph()

            # g2.parse("tools/data/turtle.ttl", format="turtle")

            # for s, p, o in g:
            #     print(s, p, o)

            # Redirect to the dataset list after POST
            return redirect('datasets/schema/'+str(graph))
        else:
            message = 'The form is not valid. Fix the following error:'
    else:
        form = DatasetForm()  # An empty, unbound form

    # Load datasets for the list page
    datasets = Dataset.objects.filter(graph=graph)
    print(graph)

    # Render list page with the datasets and the form
    context = {'datasets': datasets, 'graph': graph, 'form': form, 'message': message}
    return render(request, 'list.html', context)
