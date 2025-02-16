from rest_framework.views import APIView
from rest_framework.response import Response
from api_app.serializer import CartItemSerializer
from app.models import CartItem
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class CartApi(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.user_id  
        serializer = CartItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user) 
            return Response({
                "status": True,
                "message": "Thêm thành công sản phẩm vào giỏ hàng",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "status": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            cart_item = CartItem.objects.get(pk=id, user=request.user)
            cart_item.delete()
            return Response({
                "status": True,
                "message": f"Xóa sản phẩm có ID {id} thành công"
            }, status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            return Response({
                "status": False,
                "message": f"Không tìm thấy sản phẩm có ID {id} trong giỏ hàng"
            }, status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, id):
        try:
            cart_item = CartItem.objects.get(pk=id, user=request.user)
            new_quantity = request.data.get('quantity')
            if new_quantity is not None and int(new_quantity) > 0:
                cart_item.quantity = int(new_quantity)
                cart_item.save()
                return Response({
                    "status": True,
                    "message": f"Cập nhật số lượng thành công, số lượng mới: {cart_item.quantity}"
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "status": False,
                    "message": "Số lượng phải là một số nguyên dương"
                }, status=status.HTTP_400_BAD_REQUEST)
        except CartItem.DoesNotExist:
            return Response({
                "status": False,
                "message": f"Không tìm thấy sản phẩm có ID {id} trong giỏ hàng"
            }, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id=None):
        if id is not None:
            try:
                cart_item = CartItem.objects.get(cart_item_id=id, user=request.user)
                serializer = CartItemSerializer(cart_item)
                return Response({
                    'status': True,
                    'data': serializer.data
                }, status=status.HTTP_200_OK)
            except CartItem.DoesNotExist:
                return Response({
                    'status': False,
                    'message': f"Không tìm thấy sản phẩm có ID {id} trong giỏ hàng"
                }, status=status.HTTP_404_NOT_FOUND)
        else:
            order_items = CartItem.objects.filter(user=request.user)
            serializer = CartItemSerializer(order_items, many=True)
            return Response({
                'status': True,
                'data': serializer.data
            }, status=status.HTTP_200_OK)