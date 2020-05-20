from django.db import models
from django.conf import settings
from django.utils import timezone


class Task(models.Model):
    """Task model allows User to create upcoming tasks/todos"""

    title = models.CharField(max_length=255, unique=True, blank=False)
    body = models.TextField(max_length=1500, blank=True)
    date_created = models.DateTimeField(default=timezone.now)
    is_complete = models.BooleanField(default=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.title
