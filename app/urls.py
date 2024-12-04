from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('bosieutap', views.boSieuTap)
]