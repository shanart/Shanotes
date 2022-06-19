from rest_framework.serializers import ModelSerializer
from apps.shared.models import Tags, Categories, EntityMeta


class EntityMetaSerializer(ModelSerializer):
    class Meta:
        model = EntityMeta
        fields = (
            "id",
            "color",
            "important",
            "bookmark",
        )


class TagsSerializer(ModelSerializer):
    meta = EntityMetaSerializer()

    class Meta:
        model = Tags
        fields = (
            "id",
            "title",
            "meta",
        )


class CategoriesSerializer(ModelSerializer):
    meta = EntityMetaSerializer()

    class Meta:
        model = Categories
        fields = (
            "id",
            "title",
            "meta",
        )
