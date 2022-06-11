from rest_framework import generics, permissions
from .serializers import UserSerializer
from apps.users.models import User


class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated,)


class UsersView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser,)
