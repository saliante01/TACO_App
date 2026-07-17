from apps.identity.models import UserRole
# pyrefly: ignore [missing-import]
from django.contrib.auth.models import AbstractUser
# pyrefly: ignore [missing-import]
from django.db import models
class User(AbstractUser):
    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
    )