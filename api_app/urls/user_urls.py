from django.urls import path
from api_app.views import user_views

urlpatterns = [
    path('user', user_views.UserApi.as_view()),
    path('user/<int:user_id>', user_views.UserApi.as_view()),
    path("login", user_views.loginUser.as_view())
]
