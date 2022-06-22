from rest_framework import serializers
from rest_framework.validators import ValidationError
from apps.notes.models import Note
from api.shared.serializers import TagsSerializer, EntityMetaSerializer, CategoriesSerializer


class NoteCreateSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(child=serializers.IntegerField(), required=False, allow_empty=True, allow_null=True)

    class Meta:
        model = Note
        fields = (
            "title",
            "content",
            "tags",
            "category",
            "meta"
        )

    def validate_category(self, value):
        user = self.context["request"].user
        if value.owner != user:
            raise ValidationError("Not allowed to save in this category")
        return value


class NoteSerializer(serializers.ModelSerializer):
    tags = TagsSerializer(many=True, required=False)
    category = CategoriesSerializer()
    meta = EntityMetaSerializer(required=False)

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


class NoteShortSerializer(serializers.ModelSerializer):
    category = CategoriesSerializer()
    created_at = serializers.DateTimeField(format="%d %b %y")

    class Meta:
        model = Note
        fields = (
            "id",
            "title",
            "category",
            "created_at",
        )
