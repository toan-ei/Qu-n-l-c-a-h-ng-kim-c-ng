from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),  
    path('login/', views.loginPage, name="login"),
    path('sanpham/', views.sanpham, name="sanpham"),
    path('lichsugiaodich/', views.lichsugiaodich, name='lichsugiaodich'),
    path('addToCart/<int:product_id>/', views.addToCart, name='themvaogiohang'),
    path('thanhtoan/',  views.checkout_view, name='thanhtoan'),
    path('checkout/submit/', views.checkout_submit_view, name='checkout_submit'),
    path('gioithieu/', views.gioithieu, name='gioithieu'),
    path('cauhoithuonggap/', views.cauhoithuonggap, name='cauhoithuonggap'),
    path('huongdanchonni/', views.huongdanchonni, name='huongdanchonni'),
    path('kienthucvekimcuong/', views.kienthucvekimcuong, name='kienthucvekimcuong'),
    path('kienthucvetrangsuc/', views.kienthucvetrangsuc, name='kienthucvetrangsuc'),         
]