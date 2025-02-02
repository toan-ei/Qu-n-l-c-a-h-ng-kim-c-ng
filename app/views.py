from django.shortcuts import render,redirect
from django.http import HttpResponse, JsonResponse
from .models import *
import json
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
# Create your views here.
def home(request):
    return render(request, 'home.html')
def boSuuTap(request):
    return render(request, 'BoSuuTap.html')
def bangGiaKimCuong(request):
    return render(request, 'banggiakimcuong.html')
def sanpham(request):
    return render(request, 'sanpham.html')
def loginPage(request):
    return render(request, 'login.html')
def phieubaohanh(request):
    return render(request, 'phieubaohanh.html')
def phieutichdiem(request):
    return render(request, 'phieutichdiem.html')
def lichsugiaodich(request):
    return render(request, 'lichsugiaodich.html')
def kienthuc(request):
    return render(request, 'kienthuc.html')

@login_required
def addToCart(request, product_id):
    product = get_object_or_404(Product, product_id=product_id)
    cart, created = Cart.objects.get_or_create(user=request.user)
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += 1
        cart_item.save()
        messages.success(request, f"{product.product_name} đã được tăng số lượng trong giỏ hàng")
    else:
        messages.success(request, f"{product.product_name} đã được thêm vào giỏ hàng")
    return redirect('sanpham')