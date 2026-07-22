# pyrefly: ignore [missing-import]
from django.db import models

class PatientStatus(models.TextChoices):
    ACTIVE = "ACTIVO", "Activo"
    INACTIVE = "INACTIVO", "Inactivo"
    PENDING_VALIDATION = "PENDIENTE_VALIDACION", "Pendiente de validación"
    EGRESADO = "EGRESADO", "Egresado"
    DECEASED = "FALLECIDO", "Fallecido"
    

