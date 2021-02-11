urlpatterns = [
    path('admin/', admin.site.urls),
    path('projects/', include('projects.urls'),
    path('', include('main.urls'))
]
