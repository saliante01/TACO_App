# pyrefly: ignore [missing-import]
from django.contrib.auth.models import BaseUserManager
from .user_role import UserRole
class UserManager(BaseUserManager):
    """
    Manager personalizado para el modelo User donde el email es el identificador único.
    """

    def find_by_email(self, email: str):
        try:
            return self.get(email=email)
        except self.model.DoesNotExist:
            return None
            
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("El email es obligatorio")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", UserRole.ADMIN)
        return self.create_user(email, password, **extra_fields)