from django.urls import include, path
from main import views

urlpatterns = [
    #path('projects/', include('projects.urls')),
    path('', include('main.urls'))
]
