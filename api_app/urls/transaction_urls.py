from django.urls import path
from api_app.views import transaction_views

urlpatterns = [
    path('transaction', transaction_views.TransactionApi.as_view()),
]
