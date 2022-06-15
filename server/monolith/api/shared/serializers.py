from rest_framework.serializers import ModelSerializer
from apps.shared.models import Tags, Categories, EntityMeta


class EntityMetaSerializer(ModelSerializer):
    class Meta:
        model = EntityMeta
        fields = (
            "color",
            "important",
            "bookmark",
        )


class TagsSerializer(ModelSerializer):
    meta = EntityMetaSerializer()

    class Meta:
        model = Tags
        fields = (
            "title",
            "meta",
        )


class CategoriesSerializer(ModelSerializer):
    meta = EntityMetaSerializer()

    class Meta:
        model = Categories
        fields = (
            "title",
            "meta",
        )
