from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    """
    Object-level permission to only allow CURD his own objects
    """
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user or obj == request.user
