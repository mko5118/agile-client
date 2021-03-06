from django.db import models
from django.conf import settings
from django.utils import timezone


# COMPANY MODEl
class Company(models.Model):
    """
    - Store Company info of a Client (Will allow for search/filter by Company)
    - Many Clients can belong to the same Company
    """
    company_name = models.CharField(max_length=50, blank=False)
    website = models.CharField(max_length=100, blank=True)
    company_number = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=150, blank=True)
    company_notes = models.TextField(max_length=1500, blank=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    associated_client = models.ForeignKey(
        'Client',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.company_name


# LOGS MODEL
class Log(models.Model):
    """
    - Store past meetings/contact with Client
    - One Client can have many Logs associated with them
    """
    type = models.CharField(max_length=50, blank=False)
    details = models.TextField(max_length=1500, blank=True)
    log_date = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    associated_client = models.ForeignKey(
        'Client',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.type} - {self.associated_client} - {self.user}'


# CLIENT MODEL
class Client(models.Model):
    """
    Store Client info
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    first_name = models.CharField(max_length=50, blank=False)
    last_name = models.CharField(max_length=50, blank=False)
    email = models.EmailField(max_length=50, blank=True)
    phone_number = models.CharField(max_length=50, blank=True)
    job_title = models.CharField(max_length=100, blank=True)
    notes = models.TextField(max_length=1500, blank=True)
    # Company + Log Models in Client
    client_company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True)
    logs = models.ForeignKey(Log, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
