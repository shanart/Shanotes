import os
from random import choice, randint
from django.core.management.base import BaseCommand
from apps.users.models import User
from apps.shared.models import EntityMeta, Tags, Categories
from lorem import get_paragraph, get_sentence
from apps.notes.models import Note


class Command(BaseCommand):
    help = """Generate random notes. 
        Usage: python manage.py generate_notes <int:amount>"""

    def add_arguments(self, parser):
        parser.add_argument('amount', type=int)

    def handle(self, *args, **kwargs):
        amount: int = kwargs["amount"]
        users = User.objects.all()
        for i in range(amount):
            owner = choice(users)
            note = Note.objects.create(
                title=self._note_title(),
                content=self._note_content(),
                owner=owner
            )
            if len(Categories.objects.filter(owner=owner)):
                category = Categories.objects.filter(owner=owner).order_by("?")[0]
                note.category = category

            if len(Tags.objects.filter(owner=owner)):
                tags_query = Tags.objects.filter(owner=owner)
                total_tags = tags_query.count()
                tags_number = randint(1, total_tags if total_tags <= 5 else 5)
                tags = tags_query.order_by('?')[:tags_number]
                for tag in tags:
                    note.tags.add(tag)

            if choice([True, False]):
                note.meta = self._generate_meta(owner)
                note.save()

            note.save()

    def _note_content(self):
        """
        Generate random paragraph for note content
        :return:
        """
        return get_paragraph(
            count=1,
            sep=os.linesep,
            sentence_range=(2, 10)
        )

    def _note_title(self):
        """
        Generate random title like 1 sentence
        :return:
        """
        return str(get_sentence(
            count=1,
            sep=' ',
            word_range=(1, 5)
        )).replace('.', '')

    def _generate_meta(self, owner):
        return EntityMeta.objects.create(
            color="%06x" % randint(0, 0xFFFFFF),
            bookmark=bool(randint(0, 1)),
            important=bool(randint(0, 1)),
            owner=owner)

