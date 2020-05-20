from rest_framework import viewsets, mixins, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """
    Manage Task objects in database
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    # PRIVATE helper function for 'get_queryset'
    def _params_to_int(self, querystring):
        """Convert a list of string ID to a list of integers"""
        return [int(str_id) for str_id in querystring.split(',')]

    def get_queryset(self):
        """Retrieve all Task objects for AUTHENTICATED User"""

        queryset = self.queryset
        return queryset.filter(user=self.request.user)

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return TaskSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new Task object"""
        return serializer.save(user=self.request.user)
