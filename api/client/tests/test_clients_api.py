from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from client.models import Client, Company, Log


CLIENTS_URL = reverse('client:client-list')    # /api/client/


# Default Objects for Testing
def sample_log(user, content):
    pass

def sample_company(user, content):
    pass

def sample_client(user, content):
    pass


# NOT AUTHORIZED / PUBLIC ROUTES TEST (NOT LOGGED IN)
class PublicClientApiTests(TestCase):

    def setUp(self):
        """Initial setup before running Public tests"""
        self.client = APIClient()

    def test_auth_required(self):
        """Test authentication required to interact with Client API"""
        # HTTP GET request
        res = self.client.get(CLIENTS_URL)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


# AUTHORIZED / PRIVATE ROUTES TEST (LOGGED IN)
class PrivateClientApiTests(TestCase):

    def setUp(self):
        """Initial setup before running Private tests"""
        self.user = get_user_model().objects.create_user('test@email.com', 'password')
        self.client = APIClient()
        self.client.force_authenticate(self.user)


