from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    """Serializer for Task object"""

    class Meta:
        model = Task
        fields = ('id', 'title', 'body', 'date_created', 'is_complete')
        read_only_fields = ('id',)
