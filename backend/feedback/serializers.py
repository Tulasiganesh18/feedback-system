from rest_framework import serializers
from .models import Feedback, User
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'role']

class FeedbackSerializer(serializers.ModelSerializer):
    manager = UserSerializer(read_only=True)
    employee = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(role='employee'))

    class Meta:
        model = Feedback
        fields = '__all__'
        read_only_fields = ['timestamp', 'manager']
