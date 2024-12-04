from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('bosieutap', views.boSieuTap),
    path('banggiakimcuong', views.bangGiaKimCuong, name='banggiakimcuong'),
    path('login', views.login, name='login')
]