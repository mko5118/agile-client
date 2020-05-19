from django.urls import path

from user import views

# Define 'app_name' for django 'reverse' function to identify app
app_name = 'user'

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),   # api/user/create/
    path('token/', views.CreateTokenView.as_view(), name='token'),    # api/user/token/
    path('me/', views.ManageUserView.as_view(), name='me'),           # api/user/me/
]
