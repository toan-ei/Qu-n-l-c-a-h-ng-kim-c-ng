from django.urls import include, path

urlpatterns = [
    path('products/', include('api_app.urls.product_urls')),
    path('users/', include('api_app.urls.user_urls'))
]