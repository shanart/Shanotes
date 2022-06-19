from rest_framework.serializers import ModelSerializer, SerializerMethodField
from apps.notes.models import Note
from api.shared.serializers import TagsSerializer, EntityMetaSerializer, CategoriesSerializer


class NoteSerializer(ModelSerializer):
    tags = TagsSerializer(many=True)
    category = CategoriesSerializer()
    meta = EntityMetaSerializer()

    class Meta:
        model = Note
        fields = (
            "id",
            "title",
            "content",
            "tags",
            "category",
            "meta",
            "created_at",
            "updated_at",
        )


class NoteShortSerializer(ModelSerializer):
    category = CategoriesSerializer()

    class Meta:
        model = Note
        fields = (
            "id",
            "title",
            "category",
            "created_at",
        )
