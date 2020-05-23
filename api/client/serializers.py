from rest_framework import serializers

from .models import Client, Company, Log

# Company Serializer
class CompanySerializer(serializers.ModelSerializer):
    """Serializer for Company object"""
    class Meta:
        model = Company
        fields = ('id', 'company_name', 'website', 'company_number', 'address', 'company_notes')
        read_only_fields = ('id',)


# Log Serializer
class LogSerializer(serializers.ModelSerializer):
    """Serializer for Log object"""
    class Meta:
        model = Log
        fields = ('id', 'type', 'details', 'log_date')
        read_only_fields = ('id',)


# Client Serializer
class ClientSerializer(serializers.ModelSerializer):
    """Serializer for Client object"""

    company = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Company.objects.all()
    )

    logs = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Log.objects.all()
    )

    class Meta:
        model = Client
        fields = ('id', 'first_name', 'last_name', 'email', 'phone_number', 'job_title', 'notes', 'company', 'logs')
        read_only_fields = ('id',)
