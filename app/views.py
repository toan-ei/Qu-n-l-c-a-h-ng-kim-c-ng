from django.shortcuts import render

# Create your views here.
def home(request):
    context = []
    return render(request, 'home.html')
def boSieuTap(request):
    return render(request, 'BoSieuTap.html')