from rest_framework import generics, permissions
from .serializers import NoteSerializer
from apps.notes.models import Note
from permissions.permissions import IsOwner


class NoteView(generics.RetrieveAPIView):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsOwner)


class NotesView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)
