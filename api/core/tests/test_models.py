from django.test import TestCase
from django.contrib.auth import get_user_model


class ModelTests(TestCase):

    def test_create_user_with_email_successful(self):
        """Test creating a new User with email is successful"""
        email = 'test@email.com'
        password = 'password'
        user = get_user_model().objects.create_user(email=email, password=password)
        # Assertions
        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test email for new User is normalized (lowercase domain)"""
        email = 'test@EMAIL.COM'
        user = get_user_model().objects.create_user(email, 'password')
        # Assertions
        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        """Test creating User with no email raises ValueError"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None, 'password') # None = no email

    def test_create_new_superuser(self):
        """Test creating a new SuperUser"""
        user = get_user_model().objects.create_superuser(
            'admin@email.com',
            'adminpassword'
        )
        # Assertions
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)
