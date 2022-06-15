from django.contrib import admin
from apps.notes.models import Note


class NoteAdmin(admin.ModelAdmin):
    search_fields = ("title", )
    list_display = ("title", "created_at", )
    readonly_fields = ("created_at", "updated_at", )


admin.site.register(Note, NoteAdmin)
