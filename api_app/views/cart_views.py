from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from app.models import Product, Cart, CartItem, User
from api_app.serializer import CartSerializer, CartItemSerializer

class CartApi(APIView):
    def post(self, request, product_id):
        if request.user.is_authenticated:
            product = get_object_or_404(Product, product_id=product_id)
            # Lấy giỏ hàng của người dùng (hoặc tạo mới nếu chưa có)
            cart, created = Cart.objects.get_or_create(user=request.user)
            
            # Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
            if not created:
                cart_item.quantity += 1  # Tăng số lượng nếu sản phẩm đã có trong giỏ
            #cart_item.save()
            
            # Trả về thông tin giỏ hàng
            serializer = CartSerializer(cart)
            return Response({
                'data': serializer.data,
                'status': True
            })
        
        return Response({
            "message": "người dùng chưa đăng nhập",
            'status': False
        })
    def get(self, request, username=None):
        #if username:
            try:
                # Get the user by username
                user = get_object_or_404(User, username=username)

                # Lấy giỏ hàng của người dùng
                cart = get_object_or_404(Cart, user=user)
                
                # Lấy danh sách các sản phẩm trong giỏ hàng
                cart_items = CartItem.objects.filter(cart=cart)
                
                # Serialize các sản phẩm trong giỏ hàng
                cart_items_serializer = CartItemSerializer(cart_items, many=True)
                
                # Trả về thông tin giỏ hàng với danh sách sản phẩm
                return Response({
                    'cart': CartSerializer(cart).data,
                    'items': cart_items_serializer.data,
                    'status': True
                })
            except Exception as e:
                return Response({
                    'message': f'Error: {str(e)}',
                    'status': False
                })
        
        #return Response({
            #"message": "Username not provided",
            #'status': False
        #})