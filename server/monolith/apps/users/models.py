from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import gettext as _


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        """Create and return a `User` with an email, username and password."""
        if username is None:
            raise TypeError(_('Users must have a username.'))

        if email is None:
            raise TypeError(_('Users must have an email address.'))

        user = self.model(username=username, email=self.normalize_email(email), is_active=True)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password):
        if password is None:
            raise TypeError(_('Superusers must have a password.'))
        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    first_name = models.CharField(default="", max_length=20)
    last_name = models.CharField(default="", max_length=20)
    email = models.EmailField(db_index=True, unique=True)
    phone = models.CharField(max_length=24, default="")
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    icon = models.ImageField(upload_to="users", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.email

