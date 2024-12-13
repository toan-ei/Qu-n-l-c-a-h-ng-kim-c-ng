from django.db import models
from django.contrib.auth.models import User

from django.contrib.auth.forms import UserCreationForm
#Change fomrs register django
class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password1', 'password2']
# Create your models here.

