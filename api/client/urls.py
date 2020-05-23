from django.urls import path, include
from rest_framework.routers import DefaultRouter

from client import views


router = DefaultRouter()
router.register('companys', views.CompanyViewSet)        # Company API URL - /api/client/company/
router.register('logs', views.LogViewSet)                # Log API URL     - /api/client/log/
router.register('clients', views.ClientViewSet)          # Client API URL  - /api/client/client/

app_name = 'client'

urlpatterns = [
    path('', include(router.urls))
]