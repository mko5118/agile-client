from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse


class AdminSiteTests(TestCase):

    def setUp(self):
        """
        Function run before every test case
        1. Create test Client
        2. Create new SuperUser to use to test
        3. Log in new User
        4. Create secondary regular User
        """
        self.client = Client()
        self.admin_user = get_user_model().objects.create_superuser(
            email='admin@email.com',
            password='adminpassword'
        )
        self.client.force_login(self.admin_user)
        self.user = get_user_model().objects.create_user(
            email='user@email.com',
            password='password',
            name='Test User'
        )

    def test_users_listed(self):
        """Test that Users are listed on User page"""
        url = reverse('admin:core_user_changelist')
        # HTTP GET Request
        res = self.client.get(url)
        # Assertions
        self.assertContains(res, self.user.name)
        self.assertContains(res, self.user.email)

    def test_user_change_page(self):
        """Test that user edit page works"""
        url = reverse('admin:core_user_change', args=[self.user.id])    # /admin/core/user/{USER_ID}
        # HTTP GET request
        res = self.client.get(url)
        # Assertions
        self.assertEqual(res.status_code, 200)

    def test_create_user_page(self):
        """Test that the create user page works"""
        url = reverse('admin:core_user_add')
        # HTTP GET request
        res = self.client.get(url)
        # Assertions
        self.assertEqual(res.status_code, 200)
