from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Client, Company, Log
from .serializers import ClientSerializer, CompanySerializer, LogSerializer


# Company ViewSet (Inherits from GenericAPIView)
class CompanyViewSet(viewsets.ModelViewSet):
    """
    Manage Company objects in database
    """

    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """
        - Retrieve all Company objects for AUTH user
        - IF QUERY PARAM (company_id) is passed, only show company for
          auth User + specific company ID (/api/client/company/?company_id=<INT_ID>)
        - IF QUERY PARAM (associated_client ID) is passed, only show logs
          for auth User + associated_client
          (/api/client/company/?associated_client=<CLIENT_ID>)
        """
        queryset = self.queryset
        company_id = self.request.query_params.get('company_id', None)
        associated_client = self.request.query_params.get('associated_client', None)
        if company_id is not None:
            queryset = queryset.filter(id=int(company_id))
        if associated_client is not None:
            queryset = queryset.filter(associated_client=int(associated_client))
        return queryset.filter(user=self.request.user)

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return CompanySerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new Company object"""
        return serializer.save(user=self.request.user)


# Log ViewSet
class LogViewSet(viewsets.ModelViewSet):
    """
    Manage Log objects in database
    """
    queryset = Log.objects.all()
    serializer_class = LogSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """
        - Retrieve all Log objects for AUTH user
        - IF QUERY PARAM (associated_client ID) is passed, only show logs
          for auth User + associated_client
          (/api/client/logs/?associated_client=<CLIENT_ID>)
        """
        queryset = self.queryset
        associated_client = self.request.query_params.get('associated_client', None)
        if associated_client is not None:
            queryset = queryset.filter(associated_client=int(associated_client))
        return queryset.filter(user=self.request.user)

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return LogSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new Log object"""
        return serializer.save(user=self.request.user)


# Client ViewSet
class ClientViewSet(viewsets.ModelViewSet):
    """
    Manage Client objects in database
    """
    queryset = Client.objects.all()                     # all Client objects
    serializer_class = ClientSerializer
    authentication_classes = (TokenAuthentication,)     # use token to authenticate User
    permission_classes = (IsAuthenticated,)             # Users who use API are authenticated

    # PRIVATE Helper Function (convert string to int)
    def _params_to_ints(self, querystring):
        """Convert a list of String ID to a list of ints"""
        return [int(str_id) for str_id in querystring.split(',')]

    def get_queryset(self):
        """
        - Retrieve all Client objects for AUTH user
        - IF QUERY PARAM (company) passed, only show logs for
          auth User + clients belonging to specific company id
          (/api/client/clients/?company=<COMPANY_ID>)
        """
        company = self.request.query_params.get('company')
        logs = self.request.query_params.get('logs')
        queryset = self.queryset

        if company:
            company_ids = self._params_to_ints(company)
            queryset = queryset.filter(company__id__in=company_ids)
        if logs:
            logs_id = self._params_to_ints(logs)
            queryset = queryset.filter(logs__id__in=logs_id)

        return queryset.filter(user=self.request.user)

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return ClientSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new Client object"""
        return serializer.save(user=self.request.user)
