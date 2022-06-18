from django.core.management.base import BaseCommand
from apps.users.models import User
from lorem import get_word
from random import randint


class Command(BaseCommand):
    help = """Generate random users. Usage: python manage.py generate_random_users <int:amount>"""

    def add_arguments(self, parser):
        parser.add_argument("amount", type=int)

    def handle(self, *args, **kwargs):
        for i in range(kwargs.get("amount")):
            user, _ = User.objects.get_or_create(
                username="".join([chr(randint(ord('a'), ord('z'))) for _ in range(randint(10, 20))]),
                first_name=get_word(count=1).capitalize(),
                last_name=get_word(count=1).capitalize(),
                email=f"{get_word(count=1)}@{get_word(count=1)}.com",
                phone=randint(1000000000, 9999999999),
                is_active=True,
                is_staff=False,
                is_superuser=False
            )
            user.set_password("111")
            user.save()
