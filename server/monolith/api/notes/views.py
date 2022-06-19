from rest_framework import generics, permissions
from .serializers import NoteSerializer
from apps.notes.models import Note
from permissions.permissions import IsOwner


class NoteView(generics.RetrieveAPIView):
    serializer_class = NoteSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get_queryset(self):
        return Note.objects.filter(owner=self.request.user)


class NotesView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get_queryset(self):
        return Note.objects.filter(owner=self.request.user)
