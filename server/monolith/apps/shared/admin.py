from django.contrib import admin
from apps.shared.models import Tags, EntityMeta, Categories


class MetaAdmin(admin.ModelAdmin):
    search_fields = ("title", "owner")
    list_display = ("title", "owner", "meta", "created_at",)
    readonly_fields = ("created_at", "updated_at",)
    list_filter = ("owner",)


class EntityMetaAdmin(admin.ModelAdmin):
    search_fields = ("color", "owner")
    list_display = ("color", "owner", "important", "bookmark", "created_at")
    readonly_fields = ("created_at", "updated_at",)
    list_filter = ("owner",)


admin.site.register(Tags, MetaAdmin)
admin.site.register(EntityMeta, EntityMetaAdmin)
admin.site.register(Categories, MetaAdmin)
