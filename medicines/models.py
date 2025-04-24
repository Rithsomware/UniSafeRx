
from django.db import models

class Medicine(models.Model):
    barcode = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=200)
    batch_number = models.CharField(max_length=100)
    expiry_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

class ScanRecord(models.Model):
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    location_lat = models.FloatField()
    location_lng = models.FloatField()
    scan_type = models.CharField(max_length=50)  # inventory, retailer, customer
    is_authentic = models.BooleanField(default=True)
