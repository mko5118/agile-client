from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from task.models import Task
from task.serializers import TaskSerializer


TASKS_URL = reverse('task:task-list')   # /api/task/


# NOT AUTHORIZED / PUBLIC TESTS (NOT LOGGED IN)
class PublicTaskApiTests(TestCase):
    """Test publicly available Task endpoints"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Test that authentication required for retrieving Tasks"""
        # HTTP GET request
        res = self.client.get(TASKS_URL)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


# AUTHORIZED / PRIVATE TESTS (LOGGED IN)
class PrivateTaskApiTest(TestCase):
    """Test private / authorized Task API"""

    def setUp(self):
        # Create a User => log new User in for testing
        self.user = get_user_model().objects.create_user('test@email.com', 'password')
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_tasks(self):
        """Test retrieving authenticated User Tasks"""
        Task.objects.create(user=self.user, title='First Title', body='First Body')
        Task.objects.create(user=self.user, title='Second Title', body='Second Body')
        # HTTP GET request
        res = self.client.get(TASKS_URL)
        tasks = Task.objects.all().order_by('date_created')
        serializer = TaskSerializer(tasks, many=True)   # returns MANY Tasks
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_tasks_returned_limited_to_user(self):
        """Test tasks returned are for the AUTHENTICATED user only"""
        user2 = get_user_model().objects.create_user('otheruser@email.com', 'password')
        Task.objects.create(user=user2, title='Other User Title', body='Other Body')
        # Create Task for AUTH user
        task = Task.objects.create(user=self.user, title='Auth Title', body='Auth Body')
        # HTTP GET request
        res = self.client.get(TASKS_URL)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)  # user should only have 1 Task
        self.assertEqual(res.data[0]['title'], task.title)

    def test_create_new_task_successful(self):
        """Test Task creation is successful"""
        payload = {'title': 'Test Title', 'body': 'Test Body'}
        # HTTP POST request
        self.client.post(TASKS_URL, payload)
        # If exists return True, Task created successfully
        exists = Task.objects.filter(
            user=self.user,
            title=payload['title']
        ).exists()
        # Assertions
        self.assertTrue(exists)

    def test_create_new_task_invalid(self):
        """Test Task creation with invalid payload"""
        payload = {'title': ''}
        # HTTP POST request
        res = self.client.post(TASKS_URL, payload)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_new_task_title_is_unique(self):
        """Test new Task title is unique"""
        Task.objects.create(user=self.user, title='Unique Title', body='Body 1')
        payload = {'title': 'Unique Title', 'body': 'Body 1'}
        # HTTP POST request
        res = self.client.post(TASKS_URL, payload)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_leave_task_body_empty(self):
        """Test new Task can leave 'body' field empty"""
        payload = {'title': 'Generic Title', 'body': ''}
        # HTTP POST request
        res = self.client.post(TASKS_URL, payload)
        # Assertions
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_partial_update_task(self):
        """Test updating Task with PATCH (ONLY fields in payload)"""
        task = Task.objects.create(user=self.user, title='Original Title', body='OG Body')
        payload = {'title': 'New Title Now'}
        url = reverse('task:task-detail', args=[task.id])  # /api/task/tasks/<TASK_ID>
        # HTTP PATCH request
        self.client.patch(url, payload)
        task.refresh_from_db()
        # Assertions
        self.assertEqual(task.title, payload['title'])
        self.assertEqual(task.body, 'OG Body')

    def test_full_update_task(self):
        """Test updating Task with PUT (Update entire object)"""
        task = Task.objects.create(user=self.user, title='Original Title', body='OG Body')
        payload = {'title': 'Brand New Title', 'body': 'Brand New Body', 'is_complete': True}
        url = reverse('task:task-detail', args=[task.id])   # /api/task/tasks/<TASK_ID>
        # HTTP PUT request
        self.client.put(url, payload)
        task.refresh_from_db()
        # Assertions
        self.assertEqual(task.title, payload['title'])
        self.assertEqual(task.body, payload['body'])
        self.assertTrue(task.is_complete)

    def test_task_delete_successful(self):
        """Test deleting Task is successful"""
        Task.objects.create(user=self.user, title='Title 2', body='Body2')
        task1 = Task.objects.create(user=self.user, title='Title 1', body='Body1')
        url = reverse('task:task-detail', args=[task1.id])  # /api/task/tasks/<TASK_ID>
        # HTTP DELETE request
        res = self.client.delete(url)
        # Assertions
        exists = Task.objects.filter(user=self.user, title='Title 1').exists()
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(exists)












