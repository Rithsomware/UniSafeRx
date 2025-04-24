
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Medicine, ScanRecord
from .serializers import MedicineSerializer, ScanRecordSerializer

@api_view(['POST'])
def verify_medicine(request):
    barcode = request.data.get('barcode')
    lat = request.data.get('lat')
    lng = request.data.get('lng')
    
    try:
        medicine = Medicine.objects.get(barcode=barcode)
        # Create scan record
        scan_record = ScanRecord.objects.create(
            medicine=medicine,
            location_lat=lat,
            location_lng=lng,
            scan_type='customer'
        )
        
        # Get medicine history
        history = ScanRecord.objects.filter(medicine=medicine).order_by('timestamp')
        
        return Response({
            'is_authentic': True,
            'medicine': MedicineSerializer(medicine).data,
            'history': ScanRecordSerializer(history, many=True).data
        })
    except Medicine.DoesNotExist:
        return Response({
            'is_authentic': False,
            'message': 'Medicine not found in database'
        }, status=404)
