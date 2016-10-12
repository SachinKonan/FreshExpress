from django.shortcuts import render
from .models import Stop

def index(request):
    stop_list = Stop.objects.order_by('stop_number')[:2]
    context = {'stops': stop_list}
    return render(request, 'Schedule/index.html', context)