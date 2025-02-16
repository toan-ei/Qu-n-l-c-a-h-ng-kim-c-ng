from django.urls import path
from api_app.views import cart_view

urlpatterns = [
    path('cart', cart_view.CartApi.as_view()),
    path('cart/<int:id>/', cart_view.CartApi.as_view()),
]
