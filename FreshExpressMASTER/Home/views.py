from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    context = {'MyVar': 0}
    return render(request, 'Home/index.html', context)
