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


def dataset(request, dataset_id):
    dataset = get_object_or_404(Dataset, pk=dataset_id)
    url = "http://localhost:8000/"+str(dataset.turtle)

    # Create a Graph
    g = Graph()
    s = requests.get(url).content
    g.parse(io.StringIO(s.decode('gbk')), format="turtle")
    triples = []
    for s, p, o in g:
        print(s, p, o)
        triples.append({'subject': s, 'predicate': p, 'object': o})
    context = {'dataset': dataset, 'triples': triples}

    return render(request, 'detail.html', context)


def datasets(request):
    print(f"Great! You're using Python 3.6+. If you fail here, use the right version.")
    message = 'Upload as many files as you want!'
    # Handle file upload
    if request.method == 'POST':
        form = DatasetForm(request.POST, request.FILES)
        if form.is_valid():
            print(form.cleaned_data['name'])
            print(form.cleaned_data['content'])
            newdoc = Dataset(
                name=form.cleaned_data['name'],
                content=form.cleaned_data['content'],
                docfile=request.FILES['docfile']
            )
            newdoc.save()
            print(newdoc.id)
            print(newdoc.docfile)
            url = "http://localhost:8000/"+str(newdoc.docfile)
            s = requests.get(url).content
            df = pd.read_csv(io.StringIO(s.decode('gbk')))
            g = Graph()
            for row in df.values:
                g.add((Literal(row[1]), Literal(row[2]), Literal(row[1])))

            print(g.serialize(format='turtle'))
            g.serialize(str(newdoc.docfile).split(
                '.')[0]+'.ttl', format='turtle')
            with open(str(newdoc.docfile).split('.')[0]+'.ttl', 'r', encoding='utf-8') as f:
                newdoc.turtle = File(f)
                newdoc.save()
                f.close()

            # # Create a Graph
            # g2 = Graph()

            # g2.parse("tools/data/turtle.ttl", format="turtle")

            for s, p, o in g:
                print(s, p, o)

            # Redirect to the dataset list after POST
            return redirect('datasets')
        else:
            message = 'The form is not valid. Fix the following error:'
    else:
        form = DatasetForm()  # An empty, unbound form

    # Load datasets for the list page
    datasets = Dataset.objects.all()

    # Render list page with the datasets and the form
    context = {'datasets': datasets, 'form': form, 'message': message}
    return render(request, 'list.html', context)
