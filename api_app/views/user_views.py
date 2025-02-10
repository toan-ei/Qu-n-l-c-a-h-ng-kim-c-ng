from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from app.models import User
from api_app.serializer import UserSerializer, LoginSerializer
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status

class UserApi(APIView):
    def get(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response({
            'status': True,
            'data': serializer.data
        })

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            return Response({
                "token": token.key,
                "user": serializer.data
            })
        return Response({
            'message': 'Tạo tài khoản thất bại',
            'data': serializer.errors
        },status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id):
        user = get_object_or_404(User, user_id=user_id)
        user.delete()
        return Response({
            'status': True,
            'message': 'Xóa thành công tài khoản'
        })


class loginUser(APIView):
    def post(self, request):
<<<<<<< HEAD
        username = request.data.get('username')
        password = request.data.get('password')
        if not username or not password:
            return Response({
                'message': 'Vui lòng cung cấp đầy đủ username và password'
            }, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({
                'message': 'Tài khoản không tồn tại'
            }, status=status.HTTP_404_NOT_FOUND)
        if not user.check_password(request.data['password']):
            return Response({
                'message': 'Mật khẩu không chính xác'
            }, status=status.HTTP_401_NOT_FOUND)
=======
        user = get_object_or_404(User, username=request.data['username'])
        if not user.check_password(request.data['password']):
            return Response({
                'message': 'không tìm thấy'
            }, status=status.HTTP_404_NOT_FOUND)
>>>>>>> 71e366c5a590c4f0c32f5bb2dfa67977ea180740
        token, created = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(instance=user)
        return Response({
            "token": token.key,
<<<<<<< HEAD
            "user": serializer.data
=======
                "user": serializer.data
>>>>>>> 71e366c5a590c4f0c32f5bb2dfa67977ea180740
        })