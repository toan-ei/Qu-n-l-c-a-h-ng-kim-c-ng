from django.urls import path
from api_app.views import product_views

urlpatterns = [
    path('product', product_views.ListCreateProductView.as_view()),
    path('product/<int:product_id>', product_views.UpdateDeleteProductView.as_view())
]
