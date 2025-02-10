from django.shortcuts import render,redirect
from django.http import HttpResponse, JsonResponse
from .models import *
import json
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

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
def phieutichdiem(request):
    return render(request, 'phieutichdiem.html')
def lichsugiaodich(request):
    return render(request, 'lichsugiaodich.html')
def kienthuc(request):
    return render(request, 'kienthuc.html')
def gioithieu(request):
    products = Product.objects.all()  # Lấy tất cả sản phẩm
    return render(request, 'gioithieu.html', {'products': products})
def cauhoithuonggap(request):
    return render(request, 'cauhoithuonggap.html')

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
# View hiển thị trang thanh toán
order_items = [
    {
        "product_name": "Sản phẩm A",
        "product_code": "SP001",
        "product_price": 400000,
        "quantity": 2,
        "image": "app/image/6.jpg",
    },
    {
        "product_name": "Sản phẩm B",
        "product_code": "SP002",
        "product_price": 300000,
        "quantity": 1,
        "image": "app/image/7.jpg",
    },
]

def checkout_view(request):
    # Tính tổng giá trị đơn hàng
    total_price = sum(item["product_price"] * item["quantity"] for item in order_items)
    context = {
        "order_items": order_items,
        "total_price": total_price,
    }
    return render(request, "thanhtoan.html", context)

# View xử lý form thanh toán
@csrf_exempt
def checkout_submit_view(request):
    if request.method == "POST":
        # Lấy thông tin từ form
        gender = request.POST.get("gender", "")
        full_name = request.POST.get("full_name", "")
        phone_number = request.POST.get("phone_number", "")
        email = request.POST.get("email", "")
        birth_date = request.POST.get("birth_date", "")
        delivery_method = request.POST.get("delivery_method", "")
        province = request.POST.get("province", "")
        address = request.POST.get("address", "")
        payment_method = request.POST.get("payment_method", "")
        notes = request.POST.get("notes", "")

        # Ví dụ: In dữ liệu nhận được ra console (hoặc lưu vào database)
        print({
            "gender": gender,
            "full_name": full_name,
            "phone_number": phone_number,
            "email": email,
            "birth_date": birth_date,
            "delivery_method": delivery_method,
            "province": province,
            "address": address,
            "payment_method": payment_method,
            "notes": notes,
        })

        # Phản hồi thành công
        return JsonResponse({"success": True, "message": "Đơn hàng đã được ghi nhận."})
    
    # Phản hồi khi không phải POST
    return JsonResponse({"success": False, "message": "Chỉ chấp nhận phương thức POST."})
