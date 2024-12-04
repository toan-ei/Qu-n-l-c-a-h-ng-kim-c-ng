from django.shortcuts import render

# Create your views here.
def home(request):
    context = []
    return render(request, 'home.html')
def boSieuTap(request):
    return render(request, 'BoSieuTap.html')
def bangGiaKimCuong(request):
    return render(request, 'banggiakimcuong.html')
def login(request):
    return render(request, 'login.html')