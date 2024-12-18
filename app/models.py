from django.db import models


# User model
class User(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('khach_hang', 'Khách hàng'),
    ]
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='khach_hang')

    def __str__(self):
        return self.name


# KhuyenMai model
class KhuyenMai(models.Model):
    khuyen_mai_id = models.AutoField(primary_key=True)
    name_khuyen_mai = models.CharField(max_length=255)
    ma_khuyen_mai = models.CharField(max_length=50, unique=True)
    date_start = models.DateField()
    date_end = models.DateField()
    down_price = models.FloatField()  # Discount percentage
    text = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name_khuyen_mai


# Product model
class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    khuyen_mai = models.ForeignKey(KhuyenMai, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=255)
    price_goc = models.DecimalField(max_digits=10, decimal_places=2)
    price_khuyen_mai = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    loai_san_pham = models.CharField(max_length=255)
    size = models.CharField(max_length=50)
    xuat_xu = models.CharField(max_length=255)
    carat = models.DecimalField(max_digits=5, decimal_places=2)
    color = models.CharField(max_length=50)
    purity = models.CharField(max_length=50)
    cutting_angle = models.CharField(max_length=50)

    def __str__(self):
        return self.name


# PhieuBaoHanh model
class PhieuBaoHanh(models.Model):
    phieu_bao_hanh_id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    date_order = models.DateField()
    time_bao_hanh = models.IntegerField(help_text="Số tháng bảo hành")
    noi_dung = models.TextField()

    def __str__(self):
        return f"{self.name} - {self.product.name}"


# TransactionUser model
class TransactionUser(models.Model):
    transaction_user_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    phieu_bao_hanh = models.ForeignKey(PhieuBaoHanh, on_delete=models.SET_NULL, null=True, blank=True)
    date_order = models.DateField()
    status = models.CharField(max_length=50, choices=[('pending', 'Pending'), ('completed', 'Completed')])

    def __str__(self):
        return f"Giao dịch {self.transaction_user_id} - {self.user.name}"


# Transaction model
class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    transaction_user = models.ForeignKey(TransactionUser, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"Transaction {self.transaction_id}"
