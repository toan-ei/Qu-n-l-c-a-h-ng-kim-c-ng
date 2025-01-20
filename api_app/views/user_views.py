from django.shortcuts import get_object_or_404
from rest_framework.response  import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from app.models import User
from api_app.serializer import UserSerializer, LoginSerializer
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.authtoken.models import Token

class UserApi(APIView):
    def get(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many = True)
        return Response({
            'status': True,
            'data': serializer.data
        })
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            password = serializer.validated_data.get('password')
            hashPassword = make_password(password)
            serializer.validated_data['password'] = hashPassword
            serializer.save()
            return Response({
                'status': True,
                'message': 'tạo tài khoản thành công',
                'data': serializer.data
            })
        return Response({
                'status': False,
                'message': 'tạo tài khoản thất bại',
                'data': serializer.errors
            })
    def delete(self, response, user_id):
        user = get_object_or_404(User, user_id = user_id)
        user.delete()
        return Response({
            'status': True,
            'message': 'xóa thành công tài khoản'
            
        })


class loginUser(APIView):
    def post(self, request):
        data = request.data
        serializer = LoginSerializer(data=data)
        if not serializer.is_valid():
            return Response({
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
        })