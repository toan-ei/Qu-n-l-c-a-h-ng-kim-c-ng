from django.shortcuts import render,redirect
from django.http import HttpResponse, JsonResponse
from .models import *
import json
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
# Create your views here.
def home(request):
    return render(request, 'home.html')
def boSieuTap(request):
    return render(request, 'BoSieuTap.html')
def bangGiaKimCuong(request):
    return render(request, 'banggiakimcuong.html')
def sanpham(request):
    return render(request, 'sanpham.html')
def loginPage(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        # Xác thực thông tin đăng nhập
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)  # Đăng nhập thành công
            messages.success(request, "Đăng nhập thành công!")
            return redirect('http://127.0.0.1:8000/')  # Chuyển hướng đến trang Home
        else:
            messages.error(request, "Tên đăng nhập hoặc mật khẩu không đúng.")
    
    return render(request, 'login.html')
def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']

        if password == confirm_password:
            if not User.objects.filter(username=username).exists():
                # Tạo tài khoản mới
                User.objects.create_user(username=username, email=email, password=password)
                messages.success(request, "Đăng ký thành công! Hãy đăng nhập.")
                return redirect('login')  # Chuyển hướng đến trang đăng nhập
            else:
                messages.error(request, "Tên đăng nhập đã tồn tại.")
        else:
            messages.error(request, "Mật khẩu không khớp.")
    return render(request, 'register.html')

def phieubaohanh(request):
    return render(request, 'phieubaohanh.html')
    