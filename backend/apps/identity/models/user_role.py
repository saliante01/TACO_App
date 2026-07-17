# pyrefly: ignore [missing-import]
from django.db import models

class UserRole(models.TextChoices):
    ADMIN = "ADMIN" , "Administrador"
    NURSE = "NURSE", "Enfermero"
    PATIENT = "PATIENT", "Paciente"
    