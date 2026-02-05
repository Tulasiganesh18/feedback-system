from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FeedbackViewSet, UserViewSet, get_me, signup

router = DefaultRouter()
router.register(r'feedbacks', FeedbackViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('me/', get_me),
    path('signup/', signup),
]
