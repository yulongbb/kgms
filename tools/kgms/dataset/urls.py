from django.urls import path
from .views import datasets, dataset

urlpatterns = [
    path('', datasets, name='datasets'),
    path('<int:dataset_id>', dataset, name='dataset'),
]