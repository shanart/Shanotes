from random import randint, choice
from lorem import get_word
from django.core.management.base import BaseCommand
from apps.shared.models import Tags, Categories, EntityMeta
from apps.users.models import User


class Command(BaseCommand):
    help = """Generate random notes. 
        Usage: python manage.py generate_users_content"""

    def handle(self, *args, **kwargs):
        users = User.objects.all()

        for user in users:
            for i in range(randint(5, 15)):
                tag = Tags.objects.create(
                    title=get_word(count=1),
                    owner=user)

                if choice([True, False]):
                    tag.meta = self._generate_meta(user)
                    tag.save()

            for i in range(randint(1, 8)):
                category = Categories.objects.create(
                    title=get_word(count=1),
                    owner=user)

                if choice([True, False]):
                    if Categories.objects.filter(owner=user).exists():
                        parent = Categories.objects.filter(owner=user).order_by("?")[0]
                        category.parent = parent
                        category.save()

                if choice([True, False]):
                    category.meta = self._generate_meta(user)
                    category.save()

    def _generate_meta(self, owner):
        return EntityMeta.objects.create(
            color="%06x" % randint(0, 0xFFFFFF),
            bookmark=bool(randint(0, 1)),
            important=bool(randint(0, 1)),
            owner=owner)
