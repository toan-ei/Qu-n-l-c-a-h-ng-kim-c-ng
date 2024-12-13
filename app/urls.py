from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('bosieutap', views.boSieuTap),
    path('banggiakimcuong', views.bangGiaKimCuong),
    path( 'login',views.loginPage, name="login"),
    path( 'register',views.register, name="register"),
    path('phieubaohanh', views.phieubaohanh, name='phieubaohanh'),
    path('sanpham', views.sanpham, name="sanpham")
]