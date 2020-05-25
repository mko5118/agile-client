from django.urls import path, include
from rest_framework.routers import DefaultRouter

from client import views


router = DefaultRouter()
router.register('company', views.CompanyViewSet)        # Company API URL - /api/client/company/
router.register('logs', views.LogViewSet)                # Log API URL     - /api/client/logs/
router.register('clients', views.ClientViewSet)          # Client API URL  - /api/client/clients/

app_name = 'client'

urlpatterns = [
    path('', include(router.urls))
]