from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    user_id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.username


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=100)
    product_description = models.TextField(blank=True)
    product_description_sub = models.TextField(blank=True)
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    product_image_first = models.TextField(blank=True)
    product_image_second = models.TextField(blank=True)

    def __str__(self):
        return self.product_name


class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
    cart_item_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=100)
    product_image = models.TextField(blank=True)
    product_total_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product_name} in {self.user.username}'s cart"

    @property
    def total_price(self):
        return self.product_total_price * self.quantity


class OrderItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='order_items')
    transaction_code = models.CharField(max_length=100)
    transaction_date = models.DateTimeField(auto_now_add=True)
    product_name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    product_total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product_name} by {self.user.username}"
