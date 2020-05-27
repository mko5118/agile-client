from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from client.models import Client, Company, Log
from client.serializers import ClientSerializer


CLIENTS_URL = reverse('client:client-list')    # /api/client/clients/


# Default Objects for Testing
def sample_log(user):
    pass

def sample_company(user, company_name='Test Company'):
    pass

def sample_client(user):
    """Create and return a basic Client object"""
    pass


# NOT AUTHORIZED / PUBLIC ROUTES TEST (NOT LOGGED IN)
class PublicClientApiTests(TestCase):
    """
    Test the publicly available Clients API
    """

    def setUp(self):
        """Initial setup before running public tests"""
        self.client = APIClient()

    def test_login_required(self):
        """Test authentication required to interact with Client API"""
        # HTTP GET request
        res = self.client.get(CLIENTS_URL)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


# AUTHORIZED / PRIVATE ROUTES TEST (LOGGED IN)
class PrivateClientApiTests(TestCase):
    """
    Test the private Clients API
    """

    def setUp(self):
        """Initial setup before running private tests"""
        self.user = get_user_model().objects.create_user('test@email.com', 'password')
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_clients(self):
        """Test retrieving list of Client objects (No Company or Logs)"""
        Client.objects.create(
            user=self.user,
            first_name='Bill',
            last_name='Gates',
            email='billgates@microsoft.com',
            phone_number='555-222-3333',
            job_title='CEO',
            notes='Goes by Billy Gatesworth'
        )
        Client.objects.create(
            user=self.user,
            first_name='Jeff',
            last_name='Bezos',
            email='jeffbezos@amazon.com',
            phone_number='333-124-5993',
            job_title='Ruler',
            notes='Global takeover of Whole Foods'
        )
        # HTTP GET request
        res = self.client.get(CLIENTS_URL)
        clients = Client.objects.all()
        serializer = ClientSerializer(clients, many=True)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_retrieve_client_limited_to_user(self):
        """Test retrieving Client objects for ONLY logged in User"""
        # User 1
        Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        # User 2
        user2 = get_user_model().objects.create_user('user2@email.com', 'password')
        Client.objects.create(user=user2, first_name='Jeff', last_name='Bezos')
        # HTTP GET request
        res = self.client.get(CLIENTS_URL)
        clients = Client.objects.filter(user=self.user)
        serializer = ClientSerializer(clients, many=True)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['first_name'], 'Bill')
        self.assertEqual(res.data, serializer.data)

    def test_create_client_successful(self):
        """Test creating a Client object is successful"""
        payload = {
            'first_name': 'Bill',
            'last_name': 'Gates',
        }
        # HTTP POST request
        res = self.client.post(CLIENTS_URL, payload)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        exists = Client.objects.filter(
            user=self.user,
            first_name=payload['first_name']
        ).exists()
        self.assertTrue(exists)

    def test_view_client_detail(self):
        """Test retrieving specific Client details"""
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        client2 = Client.objects.create(user=self.user, first_name='Jeff', last_name='Bezos')
        # HTTP GET request
        url = reverse('client:client-detail', args=[client1.id])
        serializer = ClientSerializer(client1)
        res = self.client.get(url)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['last_name'], 'Gates')
        self.assertEqual(res.data, serializer.data)

    def test_partial_update_client(self):
        """Test updating Client with PATCH method (Only fields in payload)"""
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        payload = {
            'first_name': 'Elon'
        }
        # HTTP PATCH request
        url = reverse('client:client-detail', args=[client1.id])
        res = self.client.patch(url, payload)
        client1.refresh_from_db()
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(client1.first_name, 'Elon')

    def test_full_update_client(self):
        """Test updating Client with PUT method (Full object update)"""
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        payload = {
            'first_name': 'Bill',
            'last_name': 'Gates',
            'email': 'billgates@microsoft.com',
            'phone_number': '111-222-3333',
            'job_title': 'Founder',
            'notes': 'One of the biggest Tech founders today'
        }
        # HTTP PUT request
        url = reverse('client:client-detail', args=[client1.id])
        res = self.client.put(url, payload)
        client1.refresh_from_db()
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(client1.email, payload['email'])
        self.assertEqual(client1.job_title, 'Founder')



















