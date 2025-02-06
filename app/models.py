from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    pass


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=100)
    product_description = models.TextField(blank=True)
    product_description_sub = models.TextField(blank=True)
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    product_image_first = models.CharField(max_length=100)
    product_image_second = models.CharField(max_length=100)

    def __str__(self):
        return self.product_name

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.user.username}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='cart_items')
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.product.product_name} in cart of {self.cart.user.username}"

    @property
    def total_price(self):
        return self.product.product_price * self.quantity

class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.order_id} - User: {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='order_items')
    quantity = models.PositiveIntegerField()
    product_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} of {self.product.product_name} in Order #{self.order.order_id}"

    @property
    def total_price(self):
        return self.product_price * self.quantity


class Payment(models.Model):
    payment_id = models.AutoField(primary_key=True)
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment')
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=50)
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=20, choices=[
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Failed', 'Failed')
    ])

    def __str__(self):
        return f"Payment #{self.payment_id} - Status: {self.payment_status}"


class Warranty(models.Model):
    warranty_id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='warranties')
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=[
        ('Active', 'Active'),
        ('Expired', 'Expired')
    ])

    def __str__(self):
        return f"Warranty #{self.warranty_id} - Product: {self.product.product_name}"


class Promotion(models.Model):
    promotion_id = models.AutoField(primary_key=True)
    promotion_title = models.CharField(max_length=100)
    promotion_description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    discount_type = models.CharField(max_length=20, choices=[
        ('Percentage', 'Percentage'),
        ('Fixed', 'Fixed')
    ])
    discount_value = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=[
        ('Active', 'Active'),
        ('Inactive', 'Inactive')
    ])

    def __str__(self):
        return self.promotion_title


class PromotionProduct(models.Model):
    promotion = models.ForeignKey(Promotion, on_delete=models.CASCADE, related_name='promotion_products')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='promotion_products')
    discount_value = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Promotion #{self.promotion.promotion_title} - Product: {self.product.product_name}"
