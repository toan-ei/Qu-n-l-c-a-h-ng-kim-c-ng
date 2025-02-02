from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),  
    path('bosuutap/', views.boSuuTap, name="bosuutap"),  
    path('banggiakimcuong/', views.bangGiaKimCuong, name="banggiakimcuong"), 
    path('login/', views.loginPage, name="login"),
    path('phieubaohanh/', views.phieubaohanh, name='phieubaohanh'),
    path('sanpham/', views.sanpham, name="sanpham"),
    path('phieutichdiem/', views.phieutichdiem, name='phieutichdiem'),
    path('lichsugiaodich/', views.lichsugiaodich, name='lichsugiaodich'),
    path('kienthuc/', views.kienthuc, name='kienthuc'),
    path('addToCart/<int:product_id>/', views.addToCart, name='themvaogiohang'),
]
