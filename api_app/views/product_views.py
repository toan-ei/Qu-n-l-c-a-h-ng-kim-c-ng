from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from app.models import Product
from api_app.serializer import ProductSerializer


class ListCreateProductView(ListCreateAPIView):
    model = Product
    serializer_class  = ProductSerializer
    def get_queryset(self):
        return Product.objects.all()
    def create(self, request, *args, **kwargs):
        serializer = ProductSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return JsonResponse({
                'message':'tạo thành công một sản phẩm'
            }, status = status.HTTP_201_CREATED)
        return JsonResponse({
            'message':'có lỗi khi tạo sản phẩm mới'
        }, status = status.HTTP_400_BAD_REQUEST)

class UpdateDeleteProductView(RetrieveUpdateDestroyAPIView):
    model = Product
    serializer_class = ProductSerializer
    def put(self, request, *args, **kwargs):
        product = get_object_or_404(Product, product_id = kwargs.get('pk'))
        serializer = ProductSerializer(product, data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return JsonResponse({
                'message': 'sửa sản phẩm thành công'
            },status = status.HTTP_200_OK)
        return JsonResponse({
                'message': 'sửa sản phẩm không thành công'
            },status = status.HTTP_400_BAD_REQUEST)
    def delete(self, request, *args, **kwargs):
        product = get_object_or_404(Product, product_id = kwargs.get('pk'))
        product.delete()
        return JsonResponse({
            'message': 'xóa thành công'
        })