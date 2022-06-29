from django.urls import path
from .views import UserView, UsersView, UserSelfView

urlpatterns = [
    path('<int:pk>/', UserView.as_view()),
    path('self/', UserSelfView.as_view()),
    path('list/', UsersView.as_view()),
]
