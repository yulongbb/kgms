# Generated by Django 4.1.4 on 2022-12-28 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dataset', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dataset',
            name='turtle',
            field=models.FileField(upload_to=''),
        ),
    ]
