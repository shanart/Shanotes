from django.db import models
from apps.users.models import User
from apps.shared.models import Tags, Categories, EntityMeta


class Note(models.Model):
    title = models.CharField(max_length=64, default="", null=True, blank=True)
    content = models.TextField(default="")
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    tags = models.ManyToManyField(Tags)
    category = models.ForeignKey(Categories, on_delete=models.SET_NULL, null=True, blank=True)
    meta = models.ForeignKey(EntityMeta, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
