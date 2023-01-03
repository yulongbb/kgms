from django.urls import path
from .views import datasets, dataset, turtles

urlpatterns = [
    path('', datasets, name='datasets'),
    path('<int:dataset_id>', dataset, name='dataset'),
    path('turtles/<int:dataset_id>', turtles, name='turtles'),

]