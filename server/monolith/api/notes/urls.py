from django.urls import path
from .views import NotesView, NoteDetailView

app_label = 'notes'
urlpatterns = [
    path('', NotesView.as_view()),
    path('<int:id>/', NoteDetailView.as_view())
]

