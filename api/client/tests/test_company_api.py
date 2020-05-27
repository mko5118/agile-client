from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from client.models import Client, Company
from client.serializers import ClientSerializer, CompanySerializer


COMPANYS_URL = reverse('client:company-list')   # /api/client/company/


# NOT AUTHORIZED / PUBLIC ROUTES TEST (NOT LOGGED IN)
class PublicCompanyApiTests(TestCase):
    """
    Test publicly available Company API
    """

    def setUp(self):
        """Initial setup before running public tests"""
        self.client = APIClient()

    def test_login_required(self):
        """Test authenticated required to interact with Company API"""
        # HTTP GET request
        res = self.client.get(COMPANYS_URL)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


# AUTHORIZED / PRIVATE ROUTES TEST (LOGGED IN)
class PrivateCompanyApiTests(TestCase):
    """
    Test private Company API
    """

    def setUp(self):
        """Initial setup before running private tests"""
        self.user = get_user_model().objects.create_user('test@email.com', 'password')
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_companys(self):
        """Test retrieving all Company objects"""
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        client2 = Client.objects.create(user=self.user, first_name='Jeff', last_name='Bezos')
        Company.objects.create(user=self.user, company_name='Microzon', associated_client=client1)
        Company.objects.create(user=self.user, company_name='Amasoft', associated_client=client2)
        # HTTP GET request
        res = self.client.get(COMPANYS_URL)
        companys = Company.objects.all()
        serializer = CompanySerializer(companys, many=True)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_retrieve_companys_limited_to_user(self):
        """Test only retrieves Company objects for auth User"""
        # User 1
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        Company.objects.create(user=self.user, company_name='Microsoft', associated_client=client1)
        # User 2
        user2 = get_user_model().objects.create_user('user2@email.com', 'password')
        client2 = Client.objects.create(user=user2, first_name='Jeff', last_name='Bezos')
        Company.objects.create(user=user2, company_name='Amazon', associated_client=client2)
        # HTTP GET request
        res = self.client.get(COMPANYS_URL)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['company_name'], 'Microsoft')

    def test_create_company_successful(self):
        """Test creating a new Company object is successful"""
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        payload = {
            'company_name': 'Microsoft',
            'associated_client': client1.id
        }
        # HTTP POST request
        res = self.client.post(COMPANYS_URL, payload)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        exists = Company.objects.filter(
            user=self.user,
            company_name=payload['company_name']
        ).exists()
        self.assertTrue(exists)

    def test_create_company_invalid(self):
        """Test creating Company object is invalid if required field is empty"""
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        Company.objects.create(user=self.user, company_name='', associated_client=client1)
        # HTTP POST request
        res = self.client.post(COMPANYS_URL)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_partial_update_company(self):
        """Test updating Company object with PATCH method (Only update fields in payload)"""
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        company1 = Company.objects.create(user=self.user, company_name='Microsoft', associated_client=client1)
        payload = {'company_name': 'Amazon'}
        # HTTP PATCH request
        url = reverse('client:company-detail', args=[company1.id])
        res = self.client.patch(url, payload)
        company1.refresh_from_db()
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(company1.company_name, 'Amazon')

    def test_full_update_company(self):
        """Test updating Company object with PUT method (Full object update)"""
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        company1 = Company.objects.create(user=self.user, company_name='Microsoft', associated_client=client1)
        payload = {
            'company_name': 'Microsoft',
            'website': 'www.microsoft.com',
            'company_number': '111-222-3333',
            'address': '1111 Fakeville Drive Seattle, WA 11111',
            'company_notes': 'One of the largest Tech companies in the world',
            'associated_client': client1.id
        }
        # HTTP PUT request
        url = reverse('client:company-detail', args=[company1.id])
        res = self.client.put(url, payload)
        company1.refresh_from_db()
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(company1.company_notes, payload['company_notes'])
        self.assertEqual(company1.website, 'www.microsoft.com')

    def test_retrieve_companys_with_associated_client_param(self):
        """Test retrieving all Company objects with associated_client parameter query"""
        client1 = Client.objects.create(user=self.user, first_name='Bill', last_name='Gates')
        client2 = Client.objects.create(user=self.user, first_name='Jeff', last_name='Bezos')
        client3 = Client.objects.create(user=self.user, first_name='Paul', last_name='Allen')
        Company.objects.create(user=self.user, company_name='Microsoft', associated_client=client1)
        Company.objects.create(user=self.user, company_name='Amazon', associated_client=client2)
        # HTTP GET request
        res = self.client.get(COMPANYS_URL, {'associated_client': client1.id})
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)













