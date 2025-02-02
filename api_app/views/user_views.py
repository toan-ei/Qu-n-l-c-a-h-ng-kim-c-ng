from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from app.models import User
from api_app.serializer import UserSerializer, LoginSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token

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
            password = serializer.validated_data.get('password')
            hashPassword = make_password(password)
            serializer.validated_data['password'] = hashPassword
            serializer.save()
            return Response({
                'status': True,
                'message': 'Tạo tài khoản thành công',
                'data': serializer.data
            })
        return Response({
            'status': False,
            'message': 'Tạo tài khoản thất bại',
            'data': serializer.errors
        })

    def delete(self, response, user_id):
        user = get_object_or_404(User, id=user_id)
        user.delete()
        return Response({
            'status': True,
            'message': 'Xóa thành công tài khoản'
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

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        # Sử dụng `authenticate` để xác thực người dùng
        user_obj = authenticate(username=username, password=password)

        if user_obj is None:
            return Response({
                'message': 'Đăng nhập thất bại: Sai thông tin đăng nhập',
                'status': False,
                'data': {}
            })

        # Tạo hoặc lấy token cho người dùng
        token, created = Token.objects.get_or_create(user=user_obj)

        return Response({
            'status': True,
            'message': 'Đăng nhập thành công',
            'data': {
                'token': token.key,
                'user': {
                    'id': user_obj.id,
                    'username': user_obj.username,
                    'email': user_obj.email
                }
            }
        })
