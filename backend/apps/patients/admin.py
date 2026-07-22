# pyrefly: ignore [missing-import]
from django.contrib import admin
from .models import Patient

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display=["first_name","last_name","rut","status","entry_date"]


