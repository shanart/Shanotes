from rest_framework.serializers import ModelSerializer
from apps.shared.models import Tags, Categories, EntityMeta


def update_meta(instance, meta_obj):
    if meta_obj:
        if instance.meta:
            instance.meta.important = meta_obj.get('important', instance.meta.important)
            instance.meta.color = meta_obj.get('color', instance.meta.color)
            instance.meta.bookmark = meta_obj.get('bookmark', instance.meta.bookmark)
            instance.meta.save()
        else:
            instance.meta = EntityMeta.objects.create(**meta_obj)
    return instance


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
    meta = EntityMetaSerializer(required=False)

    class Meta:
        model = Tags
        fields = (
            "id",
            "title",
            "meta",
        )

    def update(self, instance, validated_data):
        meta_obj = validated_data.pop("meta", None)
        instance = update_meta(instance, meta_obj)
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance

    def create(self, validated_data):
        meta_obj = validated_data.pop("meta", None)
        instance, created = Tags.objects.get_or_create(owner=self.context["request"].user,
                                                       title=validated_data.get("title"))
        instance = update_meta(instance, meta_obj)
        instance.save()
        return instance


class CategoriesSerializer(ModelSerializer):
    meta = EntityMetaSerializer(required=False)

    class Meta:
        model = Categories
        fields = (
            "id",
            "title",
            "parent",
            "meta",
        )

    def update(self, instance, validated_data):
        meta_obj = validated_data.pop("meta", None)
        instance = update_meta(instance, meta_obj)
        instance.title = validated_data.get('title', instance.title)
        instance.parent = validated_data.get("parent", instance.parent)
        instance.save()
        return instance

    def create(self, validated_data):
        meta_obj = validated_data.pop("meta", None)
        parent = validated_data.get("parent", None)
        instance, created = Categories.objects.get_or_create(owner=self.context["request"].user,
                                                             parent=parent,
                                                             title=validated_data.get("title"))
        instance = update_meta(instance, meta_obj)
        instance.save()
        return instance
