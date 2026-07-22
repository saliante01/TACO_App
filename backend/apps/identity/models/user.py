# pyrefly: ignore [missing-import]
from django.contrib.auth.models import AbstractUser
# pyrefly: ignore [missing-import]
from django.db import models

from .userManager import UserManager
from .user_role import UserRole

class User(AbstractUser):
    username = None

    email = models.EmailField(unique=True)

    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
    )

    objects: UserManager = UserManager()  # type: ignore

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
