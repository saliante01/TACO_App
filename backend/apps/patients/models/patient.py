from apps.identity.models import User
from .patient_status import PatientStatus
# pyrefly: ignore [missing-import]
from django.db import models

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="patient")
    rut = models.CharField(max_length=12, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    phone = models.CharField(max_length=15)
    secondary_phone = models.CharField(max_length=15, blank=True, null=True)
    guardian_name = models.CharField(max_length=200, blank=True, null=True)
    guardian_phone = models.CharField(max_length=15, blank=True, null=True)
    status = models.CharField(max_length=25, choices=PatientStatus.choices, default=PatientStatus.PENDING_VALIDATION)
    entry_date = models.DateField(auto_now_add=True)
    notes = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.rut}"

    class Meta:
        verbose_name = "Paciente"
        verbose_name_plural = "Pacientes"
        ordering = ["-created_at"]
    