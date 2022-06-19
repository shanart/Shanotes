from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path
from .views import NotesView

app_label = 'notes'
urlpatterns = [
    path('', NotesView.as_view()),
    # path('<int:pk>/', note_detail),
]

