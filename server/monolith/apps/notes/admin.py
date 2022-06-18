from django.contrib import admin
from apps.notes.models import Note


class NoteAdmin(admin.ModelAdmin):
    search_fields = ("title", )
    list_display = ("title", "owner", "created_at", )
    readonly_fields = ("created_at", "updated_at", )
    list_filter = ("owner", "category", )


admin.site.register(Note, NoteAdmin)
