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
<<<<<<< HEAD
from rest_framework import status
=======
>>>>>>> c087a4d3fb032f953295ecc5a1bb22c47b6656ab

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
<<<<<<< HEAD
            serializer.save()
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()
            token = Token.objects.create(user=user)
=======
            password_hashed = make_password(request.data['password']) 
            new_user = User(username=request.data['username'], email=request.data['email'], password=password_hashed)
            new_user.save()
>>>>>>> c087a4d3fb032f953295ecc5a1bb22c47b6656ab
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
        user = get_object_or_404(User, username=request.data['username'])
        if not user.check_password(request.data['password']):
            return Response({
<<<<<<< HEAD
                'message': 'không tìm thấy'
            }, status=status.HTTP_404_NOT_FOUND)
        token, created = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(instance=user)
        return Response({
            "token": token.key,
                "user": serializer.data
=======
                'status': False,
                'data': serializer.errors
            })
        username = serializer.data['username']
        password = serializer.data['password']
        user_obj = User.objects.filter(username=username).first()
        print(user_obj.password)
        if user_obj is None or not check_password(password, user_obj.password):
            return Response({
                'message': 'Đăng nhập thất bại: Sai thông tin đăng nhập',
                'status': False,
                'data': {}
            })
        return Response({
            'status': True,
            'data': serializer.data
>>>>>>> c087a4d3fb032f953295ecc5a1bb22c47b6656ab
        })