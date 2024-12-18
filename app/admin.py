from django.contrib import admin
from .models import User, Product, PhieuBaoHanh, KhuyenMai, TransactionUser, Transaction

admin.site.register(User)
admin.site.register(Product)
admin.site.register(PhieuBaoHanh)
admin.site.register(KhuyenMai)
admin.site.register(TransactionUser)
admin.site.register(Transaction)
