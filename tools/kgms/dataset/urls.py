from django.urls import path
from .views import datasets, dataset, turtles

urlpatterns = [
    path('<int:dataset_id>', dataset, name='dataset'),
    path('graph/<int:graph>/', datasets, name='datasets'),
    path('turtles/<int:dataset_id>', turtles, name='turtles'),

]
