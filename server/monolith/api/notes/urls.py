from django.urls import path

from api.notes.serializers import NoteShortSerializer, NoteSerializer
from .views import NoteView, NotesView

app_label = 'notes'
urlpatterns = [
    path('<int:pk>/', NoteView.as_view()),
    path('list/', NotesView.as_view(serializer_class=NoteSerializer)),
    path('list/short/', NotesView.as_view(serializer_class=NoteShortSerializer)),
]
