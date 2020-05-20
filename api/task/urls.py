from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import TaskViewSet


router = DefaultRouter()
router.register('tasks', TaskViewSet)       # Tasks API URL

app_name = 'task'

urlpatterns = [
    path('', include(router.urls))
]
