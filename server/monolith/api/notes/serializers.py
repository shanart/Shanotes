from rest_framework.serializers import ModelSerializer
from rest_framework.validators import ValidationError
from apps.notes.models import Note
from apps.shared.models import Categories
from api.shared.serializers import TagsSerializer, EntityMetaSerializer, CategoriesSerializer


class NoteCreateSerializer(ModelSerializer):
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
        try:
            return Categories.objects.get(pk=value, owner=user)
        except Categories.DoesNotExist:
            raise ValidationError("Category not found")


class NoteSerializer(ModelSerializer):
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
