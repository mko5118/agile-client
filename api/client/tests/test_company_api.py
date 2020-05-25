from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from client.models import Client, Company
from client.serializers import ClientSerializer, CompanySerializer


COMPANYS_URL = reverse('client:company-list')


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
        Company.objects.create(
            user=self.user,
            company_name='Microzon',
            website='www.microzon.com',
            company_number='555-555-5555',
            address='1234 Fake Street Reeding, CA 55555',
            company_notes='Merger of Microsoft and Amazon',
        )
        Company.objects.create(
            user=self.user,
            company_name='Amasoft',
            website='www.amasoft.com',
            company_number='222-222-2222',
            address='9876 Real Street Hipsterville, WA 22222',
            company_notes='Jeff Bezo takes over the world',
        )
        # HTTP GET request
        res = self.client.get(COMPANYS_URL)
        companys = Company.objects.all()
        serializer = CompanySerializer(companys, many=True)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)















