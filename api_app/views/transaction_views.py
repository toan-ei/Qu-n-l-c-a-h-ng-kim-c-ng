from rest_framework.views import APIView
from rest_framework.response import Response
from api_app.serializer import OrderItemSerializer
from app.models import OrderItem
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


class TransactionApi(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        order_items = OrderItem.objects.filter(user=request.user)
        serializer = OrderItemSerializer(order_items, many=True)
        return Response({
            'status': True,
            'data': serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.user_id  
        serializer = OrderItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user) 
            return Response({
                "status": True,
                "message": "Thêm thành công giao dịch",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "status": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
