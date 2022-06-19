from django.urls import path
from .views import NotesView

app_label = 'notes'
urlpatterns = [
    path('', NotesView.as_view()),

]

