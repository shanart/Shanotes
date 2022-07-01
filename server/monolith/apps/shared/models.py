from django.contrib.contenttypes.models import ContentType
from django.utils.translation import gettext as _
from django.db import models
from apps.users.models import User


class EntityMeta(models.Model):
    color = models.CharField(max_length=7, null=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    important = models.BooleanField(default=False, null=True, blank=True)
    bookmark = models.BooleanField(default=False, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = _("Entities Meta")


class Tags(models.Model):
    title = models.CharField(max_length=64, unique=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    meta = models.ForeignKey(EntityMeta, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = _("Tags")

    def __str__(self):
        return self.title


class Categories(models.Model):
    title = models.CharField(max_length=64, unique=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    meta = models.ForeignKey(EntityMeta, on_delete=models.SET_NULL, null=True, blank=True)
    parent = models.ForeignKey("self", on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = _("Categories")

    def __str__(self):
        return self.title
