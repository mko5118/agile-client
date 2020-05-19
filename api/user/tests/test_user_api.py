from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status


CREATE_USER_URL = reverse('user:create')    # api/user/create/
TOKEN_URL = reverse('user:token')           # api/user/token/
ME_URL = reverse('user:me')                 # api/user/me

# Create User Helper Function
def create_user(**params):
    return get_user_model().objects.create_user(**params)


# Not Authenticated Users Tests (Not Logged In)
class PublicUserApiTests(TestCase):
    """
    Test the Users API (Public / Not Authenticated)
    """
    def setUp(self):
        self.client = APIClient()

    def test_create_valid_user_success(self):
        """Test creating User with valid payload is successful"""
        payload = {
            'email': 'test@email.com',
            'password': 'password',
            'name': 'Test Name'
        }
        # HTTP POST request
        res = self.client.post(CREATE_USER_URL, payload)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        user = get_user_model().objects.get(**res.data)
        self.assertTrue(user.check_password(payload['password']))
        self.assertNotIn('password', res.data)  # check password is NOT returned in request (security reasons)

    def test_user_exists(self):
        """Test creating a User that already exist fails"""
        payload = {'email': 'test@email.com', 'password': 'password'}
        # Try to create existing User
        create_user(**payload)
        # HTTP POST request
        res = self.client.post(CREATE_USER_URL, payload)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_too_short(self):
        """Test password is at LEAST 6 characters"""
        payload = {'email': 'test@email.com', 'password': 'pw'}
        res = self.client.post(CREATE_USER_URL, payload)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

        user_exists = get_user_model().objects.filter(email=payload['email']).exists()
        self.assertFalse(user_exists)

    def test_create_token_for_user(self):
        """Test that a token is created for the User"""
        payload = {'email': 'test@email.com', 'password': 'password'}
        create_user(**payload)
        res = self.client.post(TOKEN_URL, payload)
        # Assertions
        self.assertIn('token', res.data)  # checks that a key of 'token' exists in res.data
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_invalid_credentials(self):
        """Test that token is not created if invalid credentials given"""
        create_user(email='test@email.com', password='password')
        payload = {'email': 'test@email.com', 'password': 'wrongpassword'}
        res = self.client.post(TOKEN_URL, payload)
        # Assertions
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_no_user(self):
        """Test that token is NOT created if user doesnt exist"""
        payload = {'email': 'test@email.com', 'password': 'password'}
        res = self.client.post(TOKEN_URL, payload)
        # Assertions
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_missing_field(self):
        """Test that email and password are required"""
        res = self.client.post(TOKEN_URL, {'email': 'noemail', 'password': ''})  # no email, no password
        # Assertions
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_user_unauthorized(self):
        """Test that authentication is required for users"""
        res = self.client.get(ME_URL)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


# AUTHENTICATED USERS (LOGGED IN)
class PrivateUserApiTests(TestCase):
    """Test API requests that require authentication"""

    def setUp(self):
        self.user = create_user(
            email='test@email.com',
            password='password',
            name='name'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retrieve_profile_success(self):
        """Test retrieving profile for logged in user"""
        # HTTP GET request
        res = self.client.get(ME_URL)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {
            'name': self.user.name,
            'email': self.user.email
        })

    def test_post_me_not_allowed(self):
        """Test that POST request is not allowed on the 'me' URL"""
        res = self.client.post(ME_URL, {})
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_user_profile(self):
        """Test updating the user profile for authenticated user"""
        payload = {'name': 'New Name', 'password': 'newpassword'}
        # HTTP PATCH request
        res = self.client.patch(ME_URL, payload)
        self.user.refresh_from_db()
        # Assertions
        self.assertEqual(self.user.name, payload['name'])
        # self.assertTrue(self.user.check_password(payload['password']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
