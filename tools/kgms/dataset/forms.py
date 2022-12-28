from django import forms


class DatasetForm(forms.Form):
    name = forms.CharField()
    content = forms.CharField(widget=forms.Textarea)
    docfile = forms.FileField(label='文件')