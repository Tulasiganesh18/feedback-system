from rest_framework import viewsets, permissions, status
from .models import Feedback, User
from .serializers import FeedbackSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from django.contrib.auth import get_user_model

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'manager':
            return User.objects.filter(role='employee')
        return User.objects.filter(id=self.request.user.id)

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'manager':
            return Feedback.objects.filter(manager=user)
        return Feedback.objects.filter(employee=user)

    def perform_create(self, serializer):
        serializer.save(manager=self.request.user)

    @action(detail=True, methods=['post'])
    def acknowledge(self, request, pk=None):
        feedback = self.get_object()
        if feedback.employee == request.user:
            feedback.acknowledged = True
            feedback.save()
            return Response({'status': 'acknowledged'})
        return Response({'error': 'Unauthorized'}, status=403)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_me(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    User = get_user_model()
    data = request.data

    if not all(k in data for k in ('username', 'password', 'role')):
        return Response({"error": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)

    if data['role'] not in ['manager', 'employee']:
        return Response({"error": "Invalid role"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=data['username']).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=data['username'],
        password=data['password'],
        role=data['role']
    )
    return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)