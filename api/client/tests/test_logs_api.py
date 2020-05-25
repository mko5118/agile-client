from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from client.models import Client, Log
from client.serializers import ClientSerializer, LogSerializer


LOGS_URL = reverse('client:log-list')


# NOT AUTHORIZED / PUBLIC ROUTES TEST (NOT LOGGED IN)
class PublicLogsApiTests(TestCase):
    """
    Test publicly available Logs API
    """

    def setUp(self):
        """Initial setup before running public tests"""
        self.client = APIClient()

    def test_login_required(self):
        """Test authentication required to interact with Client API"""
        # HTTP GET request
        res = self.client.get(LOGS_URL)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


# AUTHORIZED / PRIVATE ROUTES TEST (LOGGED IN)
class PrivateLogsApiTests(TestCase):
    """
    Test private Logs API
    """

    def setUp(self):
        """Initial setup before running private tests"""
        self.user = get_user_model().objects.create_user('test@email.com', 'password')
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_logs(self):
        """Test retrieving Log objects"""
        Log.objects.create(user=self.user, type='Lunch', details='Quick lunch with John')
        Log.objects.create(user=self.user, type='Meeting', details='Initial meeting with John')
        # HTTP GET request
        res = self.client.get(LOGS_URL)
        logs = Log.objects.all()
        serializer = LogSerializer(logs, many=True)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)
























