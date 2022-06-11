from django.core.management.base import BaseCommand
from apps.users.models import User


class Command(BaseCommand):
    help = "Generate random users. Usage: python manage.py initial_admin"

    def handle(self, *args, **kwargs):
        user, _ = User.objects.get_or_create(
            username="admin",
            first_name="First",
            last_name="Last",
            email="admin@admin.com",
            phone="0111111111",
            is_active=True,
            is_staff=True,
            is_superuser=True
        )
        user.set_password("111")
        user.save()
