from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^schedule/', include('Schedule.urls')),
    url(r'^ingredients/', include('Ingredients.urls',namespace='Ingredients')),
    url(r'^$', include('Home.urls')),
]