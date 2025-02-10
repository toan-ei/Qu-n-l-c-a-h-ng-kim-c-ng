from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),  
    path('bosuutap/', views.boSuuTap, name="bosuutap"),  
    path('banggiakimcuong/', views.bangGiaKimCuong, name="banggiakimcuong"), 
    path('login/', views.loginPage, name="login"),
    path('sanpham/', views.sanpham, name="sanpham"),
    path('phieutichdiem/', views.phieutichdiem, name='phieutichdiem'),
    path('lichsugiaodich/', views.lichsugiaodich, name='lichsugiaodich'),
    path('kienthuc/', views.kienthuc, name='kienthuc'),
    path('addToCart/<int:product_id>/', views.addToCart, name='themvaogiohang'),
    path('thanhtoan/',  views.checkout_view, name='thanhtoan'),
    path('checkout/submit/', views.checkout_submit_view, name='checkout_submit'),
    path('gioithieu/', views.gioithieu, name='gioithieu'),

]
