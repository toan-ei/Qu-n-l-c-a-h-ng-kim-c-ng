from django.urls import include, path

urlpatterns = [
    path('products/', include('API.urls.product_urls')),
    path('users/', include('API.urls.user_urls')),
]