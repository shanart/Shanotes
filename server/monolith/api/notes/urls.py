from django.urls import path
from .views import NoteView, NotesView

app_label = 'notes'
urlpatterns = [
    path('<int:pk>/', NoteView.as_view()),
    path('list/', NotesView.as_view()),
]
