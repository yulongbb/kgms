from django.db import models

# Create your models here.
class Dataset(models.Model):
    name = models.CharField(max_length=200)
    content = models.CharField(max_length=500)
    docfile = models.FileField(upload_to='docfiles/%Y/%m/%d')
    size = models.IntegerField()