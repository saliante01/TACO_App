from apps.identity.models import User

class UserService:
    """
    Capa de servicios de negocio para la gestión de Usuarios.
    Usa directamente el Manager del modelo User (User.objects).
    """

    def find_user_by_email(self, email: str) -> User | None:
        return User.objects.find_by_email(email)
