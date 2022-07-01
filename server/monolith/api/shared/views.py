from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from permissions.permissions import IsOwner
from .serializers import TagsSerializer, Tags, Categories, CategoriesSerializer
from django_filters.rest_framework import DjangoFilterBackend


class TagsViewSet(ModelViewSet):
    serializer_class = TagsSerializer
    permission_classes = (IsAuthenticated, IsOwner,)
    filter_backends = (DjangoFilterBackend, )
    filterset_fields = ('title', )
    pagination_class = None

    def get_queryset(self):
        return Tags.objects.filter(owner=self.request.user)


class CategoriesViewSet(ModelViewSet):
    serializer_class = CategoriesSerializer
    permission_classes = (IsAuthenticated, IsOwner,)
    filter_backends = (DjangoFilterBackend, )
    filterset_fields = ('title', )
    pagination_class = None

    def get_queryset(self):
        return Categories.objects.filter(owner=self.request.user)
