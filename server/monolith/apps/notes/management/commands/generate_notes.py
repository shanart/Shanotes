import os
from random import choice
from django.core.management.base import BaseCommand
from apps.users.models import User
from apps.shared.models import EntityMeta, Tags, Categories
from lorem import get_paragraph, get_sentence
from apps.notes.models import Note


class Command(BaseCommand):
    help = """Generate random notes, tags, and categories. 
        Usage: python manage.py generate_notes <int:amount>"""

    def add_arguments(self, parser):
        parser.add_argument('amount', type=int)

    def handle(self, *args, **kwargs):
        amount: int = kwargs["amount"]

        users = User.objects.all()

        for i in range(amount):
            note = Note.objects.create(
                title=self._note_title(),
                content=self._note_content(),
                owner=choice(users)
            )

    def _note_content(self):
        return get_paragraph(
            count=1,
            sep=os.linesep,
            sentence_range=(2, 10)
        )

    def _note_title(self):
        return get_sentence(
            count=1,
            sep=' ',
            word_range=(1, 5)
        )
