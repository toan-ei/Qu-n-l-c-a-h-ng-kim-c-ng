from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from app.models import Product
from api_app.serializer import ProductSerializer


class ListCreateProductView(ListCreateAPIView):
    model = Product
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Tạo thành công một sản phẩm'}, status=status.HTTP_201_CREATED)
        else:
            # Hiển thị lỗi chi tiết
            print(serializer.errors)
            return Response({'message': 'Lỗi khi tạo sản phẩm', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



class UpdateDeleteProductView(RetrieveUpdateDestroyAPIView):
    model = Product
    serializer_class = ProductSerializer
    lookup_field = 'product_id' 
    queryset = Product.objects.all() 

    def get(self, request, *args, **kwargs):
        product = self.get_object()
        serializer = self.get_serializer(product)
        return Response({
            'message': 'Lấy sản phẩm thành công',
            'data': serializer.data
        }, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        product = self.get_object()  
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({
                'message': 'Sửa sản phẩm thành công'
            }, status=status.HTTP_200_OK)
        return JsonResponse({
            'message': 'Sửa sản phẩm không thành công'
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        product = self.get_object()  
        product.delete()
        return JsonResponse({
            'message': 'Xóa thành công'
        })
