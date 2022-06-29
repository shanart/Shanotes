from django.urls import include, path

urlpatterns = [
    path("auth/", include("api.auth.urls")),
    path("users/", include("api.users.urls")),
    path("notes/", include("api.notes.urls")),
    path("meta/", include("api.shared.urls"))
]
