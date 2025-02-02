from django.urls import path
from api_app.views import cart_views

urlpatterns = [
    path('add/<int:product_id>', cart_views.CartApi.as_view()) ,
    path('<str:username>', cart_views.CartApi.as_view()) 
]
