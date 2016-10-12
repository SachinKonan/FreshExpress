from django.shortcuts import render
from .models import ingredient
import requests
import json

def index(request):
    ingredients_list = ingredient.objects.order_by('ingredient_name')[:1000]
    context = {'ingredients':ingredients_list}
    return render(request, 'Ingredients/index.html', context)

def recipe(request):
    ingredients_list = ingredient.objects.order_by('ingredient_name')[:1000]
    ingredients_recipe = list(request.POST.getlist('check[]'))
    response = requests.get("http://www.recipepuppy.com/api/",

                            params=
                            {
                                'i': ','.join(ingredients_recipe)
                            }

                            )

    results = response.json()['results']

    #for i in range(0, len(results)):
     #   print('%s: %s' % (i, results[i]['title']))

    # print('Which number recipe do you want? ')
    recipe = 0

    print(results[recipe]['title'])
    print(results[recipe]['href'])
    print(results[recipe]['ingredients'])
    print(results[recipe]['thumbnail'])
    context = {'title': results[recipe]['title'],'href': results[recipe]['href'], 'ingredients': results[recipe]['ingredients'],'thumbnail': results[recipe]['thumbnail']}
    return render(request, 'Ingredients/recipe.html', context)
