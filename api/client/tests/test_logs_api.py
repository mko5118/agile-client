from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from client.models import Client, Log
from client.serializers import ClientSerializer, LogSerializer


LOGS_URL = reverse('client:log-list')   # /api/client/logs/


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
        client1 = Client.objects.create(user=self.user, first_name='Test', last_name='User')
        Log.objects.create(user=self.user, type='Lunch', associated_client=client1)
        Log.objects.create(user=self.user, type='Dinner', associated_client=client1)
        # HTTP GET request
        res = self.client.get(LOGS_URL)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)

    def test_retrieve_logs_limited_to_user(self):
        """Test can only retrieve Log objects belonging to auth User"""
        # User 1 => Client object for Log
        client1 = Client.objects.create(user=self.user, first_name='Mark', last_name='Zuck')
        Log.objects.create(user=self.user, type='Lunch', associated_client=client1)
        # User 2 => Client object for Log
        user2 = get_user_model().objects.create_user('user2@email.com', 'password')
        client2 = Client.objects.create(user=user2, first_name='Jeff', last_name='Bezos')
        Log.objects.create(user=user2, type='Dinner', associated_client=client2)
        # HTTP GET request (for User 1)
        res = self.client.get(LOGS_URL)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['type'], 'Lunch')

    def test_create_log_successful(self):
        """Test creating a Log object is successful"""
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        payload = {
            "type": "Meeting",
            "details": "Quick meeting with Bill Gates - Test Config",
            "associated_client": client1.id
        }
        # HTTP POST request
        self.client.post(LOGS_URL, payload)
        # Assertions
        exists = Log.objects.filter(
            user=self.user,
            type=payload['type']
        ).exists()
        self.assertTrue(exists)

    def test_create_log_invalid(self):
        """Test creating a Log object is invalid if required field empty"""
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        payload = {'type': '', 'details': 'Testing invalid data', 'associated_client': client1.id}
        # HTTP POST request
        res = self.client.post(LOGS_URL, payload)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_partial_update_log(self):
        """Test updating Log object with PATCH method (Only update fields in payload)"""
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        log1 = Log.objects.create(user=self.user, type='Dinner', associated_client=client1)
        payload = {'type': 'Lunch'}
        # HTTP PATCH request
        url = reverse('client:log-detail', args=[log1.id])
        res = self.client.patch(url, payload)
        log1.refresh_from_db()
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(log1.type, 'Lunch')

    def test_full_update_log(self):
        """Test updating Log object with PUT method (Full object update)"""
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        log1 = Log.objects.create(user=self.user, type='Lunch', associated_client=client1)
        payload = {
            'type': 'Lunch',
            'details': 'Lunch meeting with Bill Gates - Client 1',
            'associated_client': client1.id
        }
        # HTTP PUT request
        url = reverse('client:log-detail', args=[log1.id])
        res = self.client.put(url, payload)
        log1.refresh_from_db()
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(log1.details, payload['details'])
        self.assertEqual(log1.associated_client.id, payload['associated_client'])

    def test_delete_log_successful(self):
        """Test deleting/destroy Log object is successful"""
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        log1 = Log.objects.create(user=self.user, type='Dinner', associated_client=client1)
        log2 = Log.objects.create(user=self.user, type='Lunch', associated_client=client1)
        # HTTP DELETE request
        url = reverse('client:log-detail', args=[log1.id])
        res = self.client.delete(url)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(log2.type, 'Lunch')

    def test_retrieve_logs_with_associated_client(self):
        """Test retrieving all Log objects only for requested associated_client parameter"""
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        client2 = Client.objects.create(user=self.user, first_name='Jeff', last_name='Bezos')
        Log.objects.create(user=self.user, type='Lunch', associated_client=client1)
        Log.objects.create(user=self.user, type='Dinner', associated_client=client1)
        Log.objects.create(user=self.user, type='Meeting', associated_client=client2)
        # HTTP GET request
        res = self.client.get(LOGS_URL, {'associated_client': client1.id})
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)


















