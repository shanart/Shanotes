from rest_framework import generics, permissions, views, response
from permissions.permissions import IsOwner
from .serializers import UserSerializer
from apps.users.models import User


class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.IsAdminUser,)


class UsersView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser,)


class UserSelfView(views.APIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        obj = self.serializer_class(self.request.user)
        return response.Response(obj.data, status=200)
