from rest_framework import permissions, views, response
from apps.notes.models import Note
from permissions.permissions import IsOwner
from rest_framework.pagination import LimitOffsetPagination
from .serializers import NoteSerializer, NoteShortSerializer, NoteCreateSerializer


class NotesView(views.APIView, LimitOffsetPagination):
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get_queryset(self):
        return Note.objects.filter(owner=self.request.user)

    def get(self, request, *args, **kwargs):
        entity = self.get_queryset()
        results = self.paginate_queryset(entity, request, view=self)
        serializer = NoteSerializer(results, many=True)
        if "list" in request.GET:
            if request.GET["list"] == "short":
                serializer = NoteShortSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = NoteCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            instance = serializer.save(owner=request.user)
            s = NoteSerializer(instance)
            return response.Response(s.data, status=201)
        return response.Response(serializer.errors, status=400)
