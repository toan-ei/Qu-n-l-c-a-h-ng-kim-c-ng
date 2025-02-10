from django.urls import include, path

urlpatterns = [
    path('products/', include('api_app.urls.product_urls')),
    path('users/', include('api_app.urls.user_urls')),
    path('cart/', include('api_app.urls.cart_urls')),
    path('transactions/', include('api_app.urls.transaction_urls')),
]