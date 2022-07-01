from django.urls import re_path, include, path
from .views import TagsViewSet, CategoriesViewSet
from rest_framework.routers import DefaultRouter


tags_router = DefaultRouter()
tags_router.register(r'tags', TagsViewSet, basename='tags')

categories_router = DefaultRouter()
categories_router.register(r'categories', CategoriesViewSet, basename='categories')

urlpatterns = [
    path('', include(tags_router.urls)),
    path('', include(categories_router.urls)),
]

