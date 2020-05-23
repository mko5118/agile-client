from django.contrib import admin

from client import models

admin.site.register(models.Company)     # Company Model
admin.site.register(models.Log)         # Log Model
admin.site.register(models.Client)      # Client Model
