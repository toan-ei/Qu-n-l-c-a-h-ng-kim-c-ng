from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class User(models.Model):
    userName = models.CharField(max_length=255)       
    password = models.CharField(max_length=255) 

    def __str__(self):
        return self.userName
