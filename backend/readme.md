# Aplicación TACO — Seguimiento de Pacientes en Tratamiento Anticoagulante Oral

> **Propósito de este documento:** Este README consolida el levantamiento de requerimientos de la aplicación TACO, para ser utilizado como contexto por otra IA (o equipo de desarrollo) en tareas de diseño, arquitectura, modelado de datos o generación de código. Contiene el problema de negocio, alcance, roles, reglas de negocio, modelo de datos conceptual y criterios de éxito.

---

## 1. Contexto y Problema que Resuelve

La aplicación **TACO** busca mejorar la **continuidad, seguridad y trazabilidad** del seguimiento de pacientes en tratamiento anticoagulante oral (TACO).

### Situación actual (dolor del negocio)
- La entrega de dosis posterior al control de TP/INR depende **principalmente de llamados telefónicos manuales**.
- Depende de la **disponibilidad del paciente** para contestar el teléfono.
- Los registros son internos y **poco trazables**.
- Existen **retrasos**, **falta de confirmación de comprensión** del paciente, **pérdida de trazabilidad** y **riesgo de errores** en la administración del tratamiento.
- Algunos pacientes **no comprenden** completamente las indicaciones previas al control, **olvidan dosis** o **modifican el tratamiento sin indicación médica**, afectando la interpretación del TP/INR y el ajuste terapéutico.

### Proceso actual (as-is)
1. El paciente asiste presencialmente a toma de muestra.
2. Se procesa el TP/INR.
3. El resultado es enviado/revisado por el cardiólogo, quien define la dosis y la próxima fecha de control.
4. Enfermería **llama** al paciente para entregar la indicación o informar disponibilidad del carnet TACO.

### Qué resuelve la aplicación
- **Para el paciente:** consultar dosis mensual, próxima cita de INR, indicaciones previas a la toma de muestra, información nutricional y solicitar contacto con enfermería.
- **Para el equipo clínico:** registrar, actualizar y trazabilizar la entrega de indicaciones, reforzando la seguridad del paciente y el seguimiento del programa TACO.

### Beneficios esperados
- Mayor seguridad del paciente y mejor adherencia al tratamiento.
- Menor riesgo de errores de dosis.
- Mejor preparación antes del control TP/INR.
- Mayor trazabilidad y menor sobrecarga por llamados repetidos.
- **Disminución del tiempo de enfermería** dedicado a este proceso.
- Mejora del indicador institucional **GCL 1.13**.

---

## 2. Plataformas (Software)

| Plataforma | Uso |
|---|---|
| **Móvil** | App para pacientes (principal canal de consulta y autogestión). |
| **Web (Dashboard)** | Panel de gestión para enfermería y administración. |

---

## 3. Alcance del Proyecto

### Institución
- **Primera etapa:** una sola institución — **Clínica RedSalud Providencia**.
- **Etapa futura:** escalable a otros centros RedSalud o programas TACO similares.

### Restricciones
- MVP acotado y de **bajo costo operativo**, centrado en: visualización de dosis, próxima cita, educación, solicitud de contacto y trazabilidad básica.
- La **integración con sistemas institucionales (LIS/HIS)** queda para una segunda etapa.

### Población objetivo
Pacientes adultos en tratamiento anticoagulante oral que requieren:
- Control periódico de TP/INR.
- Educación y seguimiento de dosis.
- Recordatorio de próxima cita.
- Información nutricional.

---

## 4. Roles de Usuario

### 4.1 Enfermera
**Descripción:** Actualiza la dosis mensual del tratamiento según indicación médica del cardiólogo. Consulta información del paciente, registra educación entregada, confirma comprensión, revisa solicitudes de contacto y da seguimiento a pacientes no contactados.

| Funcionalidad | Descripción |
|---|---|
| Crear | Crear ficha/registro TACO del paciente: datos básicos, contacto, correo, teléfono, cuidador autorizado, fecha de ingreso al programa. |
| Consultar | Ficha del paciente, dosis vigente, calendario mensual, próxima cita INR, historial de indicaciones, estado de contacto, solicitudes de ayuda. |
| Editar | Dosis mensual, fecha del próximo control, datos de contacto, cuidador autorizado, observaciones, estado de seguimiento. |
| Eliminar | **No permitido** para registros clínicos. Solo se puede **desactivar** registros duplicados o erróneos, dejando trazabilidad y motivo. |
| Aprobar | Confirmar que la dosis indicada por el cardiólogo fue cargada correctamente y queda disponible para el paciente. |
| Rechazar | N/A |
| Buscar | Reportes de pacientes contactados, dosis cargadas, pendientes, no contactados, solicitudes de ayuda, registros incompletos, indicadores. |
| Generar reportes | Exportar reportes consolidados para calidad/supervisión, resguardando datos sensibles. |
| Configurar parámetros | Plantillas de mensajes, recordatorios, alertas, estados del paciente, horarios de contacto, criterios de priorización. |
| Gestionar usuarios | Solicitar/administrar acceso de usuarios según perfil (enfermería, cardiólogo, administrador, visualización). |
| Otra | Registrar educación entregada, consentimiento informado, confirmación de comprensión (contrapregunta), incidentes preanalíticos, seguimiento de pacientes que no revisan la app. |

### 4.2 Paciente
**Descripción:** Consulta su dosis del mes, próxima cita de INR, indicaciones previas a la toma de muestra, información nutricional y solicita contacto con enfermería ante dudas.

| Funcionalidad | Descripción |
|---|---|
| Crear | Crear/activar cuenta mediante correo validado por la institución. Puede asociar familiar/cuidador autorizado. |
| Consultar | Dosis diaria del mes, próxima cita de INR, indicaciones pre-toma de muestra, información nutricional, mensajes de enfermería. |
| Editar | Datos básicos de contacto (teléfono, correo) previa validación institucional. Preferencia de contacto. |
| Eliminar | **No aplica** a información clínica. No puede eliminar dosis, indicaciones ni registros de seguimiento. |
| Aprobar | Confirmar que recibió y comprendió la indicación de dosis o la próxima cita. |
| Rechazar | Informar que no comprende la indicación o tiene dudas. |
| Buscar | Búsqueda simple dentro de la app ("mi dosis", "próxima cita", "alimentación", "contactar enfermería"). |
| Generar reportes | No aplica. |
| Exportar información | Descargar/visualizar resumen simple de dosis mensual o próxima cita, si la institución lo autoriza. |
| Configurar parámetros | Notificaciones simples (recordatorio de cita, aviso para revisar dosis). |
| Gestionar usuarios | Autorizar/visualizar familiar o cuidador asociado, previa validación por enfermería. |
| Otra | Botón **"Solicitar contacto de enfermería"** para enviar alerta/correo al equipo ante dudas de dosis, alimentación, cita o indicaciones. |

### 4.3 Administrador
**Descripción:** Usuario técnico-administrativo responsable del funcionamiento de la app: configuración de accesos, perfiles, parámetros de seguridad, respaldo de datos y soporte ante fallas.

| Funcionalidad | Descripción |
|---|---|
| Crear | Usuarios y perfiles de acceso (enfermería, cardiólogos, administradores, pacientes). |
| Consultar | Estado del sistema, usuarios activos, registros de acceso, errores, alertas, funcionamiento general. |
| Editar | Perfiles de usuario, permisos, parámetros de notificación, plantillas generales, configuraciones técnicas. |
| Eliminar | Desactivar usuarios que ya no corresponden, **sin eliminar** trazabilidad histórica. |
| Aprobar | Aprobar accesos solicitados según perfil institucional. |
| Rechazar | Rechazar accesos no autorizados o solicitudes incompletas. |
| Buscar | Usuarios, pacientes, registros de acceso, incidencias técnicas. |
| Generar reportes | Reportes técnicos de uso, accesos, fallas, tiempos de respuesta, auditoría. |
| Exportar información | Exportar reportes técnicos/auditoría según permisos y políticas institucionales. |
| Configurar parámetros | Seguridad, perfiles, plantillas, horarios de notificación, respaldo de datos, reglas de alertas. |
| Gestionar usuarios | Crear, modificar, bloquear o desactivar usuarios, asignando permisos por rol. |
| Otra | Monitorear incidentes de ciberseguridad, respaldos, disponibilidad de la app, soporte técnico. |

### 4.4 Resumen de Roles

| Rol | Qué puede hacer |
|---|---|
| **Enfermera** | Registrar educación inicial, validar datos de contacto, cargar/actualizar dosis indicada por el cardiólogo, registrar llamadas, confirmar comprensión, revisar solicitudes de ayuda, activar protocolo de rescate si el paciente no responde. |
| **Paciente** | Consultar dosis mensual, próxima cita de INR, indicaciones pre-toma de muestra, información nutricional, solicitar contacto con enfermería, confirmar recepción/comprensión de indicaciones. |
| **Administrador** | Gestionar usuarios, permisos, accesos, configuración de notificaciones, soporte técnico, seguridad de la plataforma, reportes de uso/trazabilidad. |

> **Nota:** El cardiólogo define la dosis médica, pero según el levantamiento, **quien la carga en el sistema es enfermería** (registro/actualización), y **quien aprueba la publicación de la dosis cargada es también enfermería** (confirma que fue cargada correctamente según la indicación médica).

---

## 5. Qué NO Hace la Aplicación (Fuera de Alcance)

1. No es una red social.
2. No reemplaza la atención médica presencial cuando el paciente lo requiere.
3. **No permite que el paciente modifique su dosis por cuenta propia.**
4. No entrega diagnósticos automáticos ni interpreta por sí sola el resultado de TP/INR.
5. No reemplaza la indicación del cardiólogo ni del equipo tratante.
6. No permite entregar información clínica a familiares o terceros no autorizados.
7. No debe utilizarse para urgencias médicas o signos de alarma (el paciente debe acudir a urgencia o contactar según protocolo).
8. No elimina la necesidad de acudir al control presencial de toma de muestra TP/INR.
9. No guarda información en teléfonos personales del equipo; debe operar mediante canales institucionales.
10. No cierra el seguimiento si el paciente no revisa su indicación o no puede ser contactado; **debe activar protocolo de rescate**.
11. No permite contacto entre pacientes.
12. No permite eliminar información clínica sin trazabilidad.

---

## 6. MVP — Funcionalidades Obligatorias (Primera Versión)

- Registro de paciente TACO.
- Validación de datos de contacto.
- Registro de cuidador autorizado.
- Visualización de dosis diaria/mensual.
- Visualización de próxima cita INR.
- Sección de indicaciones previas a la toma de muestra.
- Sección de información nutricional básica.
- Solicitud de contacto con enfermería.
- Registro de confirmación de comprensión.
- Registro de llamadas/contactos realizados.
- Alertas de paciente no contactado.
- Perfiles de usuario: paciente, enfermería, cardiólogo, administrador.

## 7. Funcionalidades para Versiones Futuras

- Integración automática con LIS/HIS.
- Notificaciones push avanzadas.
- Envío automático por WhatsApp institucional.
- Videollamada dentro de la aplicación.
- Chat seguro con enfermería.
- Firma digital integrada.
- Dashboard avanzado de indicadores.
- Interoperabilidad con ficha clínica electrónica.
- Módulo de encuestas de satisfacción.
- Alertas inteligentes según INR fuera de rango.

## 8. Funcionalidades que NO debe tener la aplicación

- No debe funcionar como red social.
- No debe permitir que el paciente modifique su dosis.
- No debe interpretar automáticamente el INR.
- No debe reemplazar al cardiólogo.
- No debe reemplazar la atención de urgencia.
- No debe permitir contacto entre pacientes.
- No debe entregar información clínica a familiares no autorizados.
- No debe permitir eliminar información clínica sin trazabilidad.
- No debe usarse desde canales personales del equipo.

---

## 9. Diagrama de Flujo General

```
Inicio
  └─> Paciente asiste a control TP/INR
        └─> Cardiólogo determina nueva dosis
              └─> Enfermera registra o actualiza dosis
                    └─> Sistema guarda la información
                          └─> Paciente recibe notificación
                                └─> Paciente ingresa a la aplicación
                                      └─> ¿Qué desea hacer?
                                            ├─> Consultar dosis mensual
                                            │     └─> ¿Comprende la indicación?
                                            │           ├─ No -> Solicita contacto con enfermería
                                            │           │        -> Enfermera revisa solicitud
                                            │           │        -> Contacta al paciente
                                            │           │        -> Registra seguimiento -> Fin
                                            │           └─ Sí -> Confirma recepción -> Fin
                                            ├─> Consultar próxima cita -> Fin
                                            ├─> Revisar indicaciones pre examen -> Fin
                                            └─> Revisar información nutricional -> Fin
```

**Pantallas principales de la app (referencia de UX)**
- **Mi Dosis:** calendario semanal con dosis diaria (ej. "1 pastilla", "1/2 pastilla", "Sin dosis" los domingos).
- **Próxima Cita de INR:** fecha, hora, lugar (clínica/dirección), recomendaciones de llegada, botón "Contactar enfermería".
- **Indicaciones Toma de Muestra.**
- **Información Nutricional:** clasificación de alimentos por consumo de vitamina K — "Evitar o consumir muy poco", "Consumir con moderación", "Libre consumo" (con ejemplos de vegetales/verduras).
- **Solicitar Contacto de Enfermería:** acceso directo desde el menú principal.

---

## 10. Reglas de Negocio por Entidad

### 10.1 Pacientes

| Pregunta | Regla |
|---|---|
| ¿Cómo se registra un paciente? | Registrado por **enfermería o admisión**, tras incorporación al programa TACO. |
| ¿Puede registrarse por sí mismo? | **No** en la primera versión (validación institucional obligatoria por seguridad). |
| Información personal a almacenar | Nombre, RUT, fecha de nacimiento, teléfono, correo, cuidador autorizado, estado del paciente, fecha de ingreso, datos de contacto. |
| Identificador institucional | Sí — **RUT** y/o identificador interno institucional (RUT como identificador principal en Chile). |
| Dirección / comuna / previsión | No obligatorias para el MVP (comuna es opcional, útil para análisis). |
| Alergias / enfermedades asociadas / medicamentos adicionales | Recomendable si están disponibles desde ficha clínica; no son núcleo del MVP, salvo antecedentes relevantes para TACO o medicamentos que interfieran con el anticoagulante. |
| Correos / teléfonos | Puede tener **correo principal + secundario opcional** (ej. cuidador) y **teléfono principal + alternativo + del cuidador**. |
| Cambio de datos | Puede solicitarlo, pero debe ser **validado por enfermería o admisión**. |
| Cambio de contraseña | Sí, mediante recuperación segura. |
| Desactivación de cuenta | Puede solicitarla, pero **no puede eliminar su historial clínico**. |
| Cuidadores | Puede tener más de uno, pero **debe existir al menos uno principal autorizado**. |
| Tratamientos activos simultáneos | **No** — solo uno. |
| Paciente inactivo | Puede existir. |
| Fallecimiento | Se marca como **inactivo/fallecido**, bloqueando nuevas indicaciones y conservando historial. |
| Abandono del programa | Se marca como **egresado o inactivo**, con motivo y fecha. |

### 10.2 Enfermeras

| Pregunta | Regla |
|---|---|
| Creación de cuenta | Por **administrador/TI**. |
| Asignación de pacientes | Por programa TACO, agenda, turno o unidad responsable. |
| Multi-institución | **No** en primera versión (solo pacientes de su institución). |
| Alcance de edición | Solo pacientes asignados/pertenecientes al programa TACO de su centro. |
| Eliminación | **No permitida** — solo corregir o anular con motivo y trazabilidad. |
| Registro de tratamientos nuevos | Sí, puede crear el registro inicial, **pero la dosis debe estar indicada por el cardiólogo**. |
| Edición de tratamientos antiguos | **No** debe editar tratamientos cerrados; solo consultar historial o registrar corrección trazada. |

### 10.3 Administradores

| Pregunta | Regla |
|---|---|
| Permisos | Gestionar usuarios, perfiles, accesos, parámetros del sistema, notificaciones, seguridad, reportes técnicos. |
| Acceso a información clínica | Solo si el perfil institucional lo permite; idealmente **acceso limitado y auditado**. |
| Modificar tratamientos | **No** — el administrador no debe modificar información clínica. |
| Bloquear usuarios | Sí. |
| Recuperar contraseñas | Sí, mediante flujo seguro, **sin conocer** la contraseña del usuario. |

### 10.4 Tratamientos (núcleo del sistema)

| Pregunta | Regla |
|---|---|
| Tratamientos por paciente | Puede tener historial, pero **solo uno activo** (el del mes en curso). |
| Creación | Enfermería o usuario autorizado, según indicación médica. |
| Aprobación | **Enfermera.** |
| Modificación post-publicación | Sí, **solo con trazabilidad y motivo**. |
| Historial | **Obligatorio**, se guarda siempre. |
| Identificación | ID interno + paciente + fecha de inicio + estado. |
| Fechas | Tiene fecha de inicio y de término (al suspender, finalizar o egresar). |
| Suspensión / cancelación | Posibles, dejando motivo y responsable. |

### 10.5 Dosis (parte crítica del sistema)

| Pregunta | Regla |
|---|---|
| ¿Cambia siempre mensualmente? | No necesariamente; puede mantenerse o cambiar según INR. |
| ¿Cambia durante el mes? | Sí — se pueden indicar dosis distintas por día, o el cardiólogo puede modificarla ante una emergencia. |
| Granularidad | Se registra **por día**; puede repetirse la misma dosis para toda la semana. |
| Repetición automática | Sí, si el médico mantiene el esquema, **pero debe validarse antes de publicar**. |
| ¿Quién modifica? | El **cardiólogo define**; **enfermería carga** según indicación médica. |
| Corrección | Sí, con registro de motivo, fecha y usuario. |
| Historial | Obligatorio. |
| Si el paciente ya visualizó la dosis y esta cambia | Debe generarse **alerta de nueva dosis** y **nueva confirmación de comprensión**. |
| Si el paciente no revisa la dosis | Se activa **protocolo de contacto telefónico y rescate**. |

### 10.6 Resultados INR

| Pregunta | Regla |
|---|---|
| Registro | Laboratorio o integración LIS/HIS; en **MVP, registro manual** por usuario autorizado. |
| Origen | Idealmente LIS/ficha clínica en etapa futura. |
| Modificación | Solo mediante **corrección trazada**. |
| Eliminación | **No** — solo anular con motivo. |
| Historial | Sí, obligatorio. |
| Múltiples resultados por cita | Sí, si hay repetición/corrección/nuevo control; debe quedar trazado. |

### 10.7 Citas

| Pregunta | Regla |
|---|---|
| Agendamiento | Admisión, enfermería o sistema institucional. |
| Reprogramación / cancelación | Sí, con motivo. |
| Notificación | Sí, idealmente **24–48 horas antes**. |
| Inasistencia | Se registra y se activa contacto para reagendar. **Importante:** estos días no bloquean la continuidad de la terapia anticoagulante en el calendario (pueden quedar días sin registro sin que esto bloquee el flujo). |
| Registro de asistencia | **No se registra explícitamente**; se asume asistencia cuando se ingresa la nueva dosis mensual. |

### 10.8 Contacto con Enfermería (Solicitudes)

| Pregunta | Regla |
|---|---|
| Tipos de consulta | Dudas sobre dosis, próxima cita, alimentación, olvido de dosis, toma de muestra, síntomas, solicitud de ayuda. |
| Prioridad | Sí — **normal, prioritaria, urgente**, según criterio. |
| Respuesta | Enfermería o equipo TACO autorizado. |
| Cierre / reapertura | Puede cerrarse cuando fue respondida y registrada; **puede reabrirse** si el paciente vuelve a consultar o no quedó resuelta. |
| Historial | Sí, obligatorio. |
| Adjuntos (imágenes/documentos) | **No en MVP**; posible en futuras versiones. |

### 10.9 Educación

| Pregunta | Regla |
|---|---|
| Contenido | Indicaciones TACO, preparación para TP/INR, uso de anticoagulante, alimentación con vitamina K, signos de alarma, uso de la app. |
| Formatos | PDF/infografía en MVP; **video queda para futuro**; artículos no son necesarios en MVP. |
| Administración de contenido | Enfermería, calidad o administrador autorizado. |
| Versionado | Sí, con control de versión al modificarse. |
| Trazabilidad de lectura | Idealmente sí, al menos registrar si fue visualizado. |

### 10.10 Notificaciones

| Evento | ¿Genera notificación? |
|---|---|
| Recordatorio de dosis | Sí (opcional). |
| Recordatorio de cita | Sí (**obligatorio**). |
| Nueva dosis publicada | Sí (**obligatorio**). |
| Cambio de tratamiento | Sí (**obligatorio**). |
| Solicitud respondida | Sí. |
| Paciente no revisa dosis | Alerta interna a **enfermería**. |
| Paciente no asiste | Alerta para reagendar — dado que no se registra asistencia directamente, se genera cuando corresponde asignar un nuevo tratamiento mensual y este no se registra. |

**Canales de notificación:**
- **Correo:** para notificaciones a enfermería y paciente.
- **SMS:** no se utiliza.
- **WhatsApp:** para notificaciones al paciente.
- El usuario **puede desactivar** algunas notificaciones.

### 10.11 Auditoría

- **Acciones que deben quedar registradas:** creación de paciente, edición de datos, carga de dosis, modificación de dosis, visualización/confirmación, llamadas, contacto con enfermería, incidentes, cambios de estado.
- **Modificación de dosis:** debe registrar usuario, fecha, hora y motivo.
- **Eliminación de usuario:** no existe eliminación real; solo **desactivación** con usuario, fecha, hora y motivo.
- **Creación de tratamiento:** debe quedar registrada.
- **Retención de registros:** **15 años.**

### 10.12 Reportes

| Reporte | Contenido |
|---|---|
| Pacientes activos TACO | Listado de pacientes activos en el programa. |
| Dosis publicadas | Pacientes con dosis cargada por mes. |
| Pacientes que no revisaron dosis | Casos que requieren rescate. |
| Pacientes no contactados | Sin confirmación al cierre del día. |
| Próximas citas INR | Agenda de controles. |
| Registros incompletos | Contactos o dosis sin trazabilidad completa. |
| Indicadores del programa | Contacto oportuno, comprensión, próxima cita informada, no contactados, eventos. |
| Pacientes por asignar | Pacientes al día a quienes debería ingresarse tratamiento TACO según fecha de cita. |

**Filtros necesarios:** pacientes activos, pacientes que logran INR objetivo, pacientes inactivos por motivo, estado de contacto.

**Formatos de exportación:** Excel, PDF, CSV.

**Frecuencia de generación:** semanal y mensual.

### 10.13 Reglas de Negocio Transversales

| Regla | Detalle |
|---|---|
| Tratamientos activos por paciente | Solo **uno**, no puede haber más de un tratamiento TACO activo simultáneo. |
| Modificación de dosis publicada | Permitida, pero **debe generar nueva notificación**, quedar trazada y **requerir nueva confirmación** del paciente. |
| Eliminación de información clínica | **Prohibida** — solo anular o corregir con trazabilidad. |
| Paciente que no responde | Se activa **protocolo de rescate**. |
| Activación de protocolo de rescate | Cuando el paciente: no revisa la dosis, no confirma comprensión, no contesta llamada, o tiene INR prioritario sin contacto. |

**Estados posibles por entidad:**

- **Solicitud (contacto con enfermería):** `Nueva` → `En revisión` → `Respondida` → `Cerrada` (puede pasar a `Reabierta` → `Escalada`).
- **Tratamiento:** `Pendiente de aprobación` → `Activo` → (`Suspendido` | `Finalizado` | `Cancelado`).
- **Paciente:** `Pendiente de validación` → `Activo` → (`Inactivo` | `Egresado` | `Fallecido`).

**Transición a estado "Paciente Inactivo":** cuando abandona el programa, finaliza tratamiento, fallece, cambia de institución, o no continúa seguimiento según criterio clínico.

---

## 11. Objetivo General y Criterios de Éxito

### Objetivo general
Mejorar la continuidad, seguridad y trazabilidad del seguimiento de pacientes TACO, evitando errores por mala comprensión de dosis, omisión de tratamiento, falta de contacto telefónico y registros incompletos, mediante una plataforma formal con trazabilidad (inexistente actualmente). Se busca además **disminuir las horas de enfermería** dedicadas al llamado telefónico.

### Indicadores de éxito

| Indicador | Meta sugerida |
|---|---|
| % pacientes TACO con dosis publicada el mismo día del resultado | ≥ 95% |
| % pacientes que revisan o confirman recepción de dosis | ≥ 90% |
| % llamadas/entregas registradas correctamente | ≥ 90% |
| N° pacientes no contactados al cierre del día | 0 sin escalamiento |
| % pacientes con próxima cita informada | ≥ 90% |
| % pacientes que declara comprender la indicación | ≥ 90% |
| N° incidentes por indicación incompleta o no trazable | 0 eventos graves |
| Indicador institucional | Mejora en el resultado del indicador **GCL 1.13** |

El proyecto se considerará exitoso si:
- Los pacientes pueden revisar su dosis y próxima cita de manera simple.
- Disminuyen los pacientes no contactados.
- Mejora el registro de indicaciones entregadas.
- Aumenta la comprensión del tratamiento y la adherencia al control.

---

## 12. Modelo de Datos Conceptual (Resumen para Diseño)

**Entidades principales identificadas:**

- **Paciente**: identificación (RUT), contacto (correo/tel. principal y secundario), cuidador(es) autorizado(s), estado (`pendiente_validacion`, `activo`, `inactivo`, `egresado`, `fallecido`), fecha de ingreso al programa.
- **Cuidador**: asociado a uno o más pacientes; al menos un cuidador principal autorizado por paciente (si aplica).
- **Usuario del sistema**: paciente, enfermera, cardiólogo, administrador (perfiles y permisos diferenciados).
- **Tratamiento**: paciente, fecha de inicio, fecha de término, estado (`pendiente_aprobacion`, `activo`, `suspendido`, `finalizado`, `cancelado`), historial de versiones.
- **Dosis**: tratamiento asociado, fecha (día específico), valor de dosis, estado de publicación, estado de confirmación por el paciente, usuario que cargó/corrigió, motivo de corrección (si aplica).
- **Resultado INR**: paciente, tratamiento, fecha, valor, origen (manual/LIS), estado (válido/anulado), historial.
- **Cita**: paciente, fecha, hora, lugar, estado (`agendada`, `reprogramada`, `cancelada`, `inasistencia`), notificación asociada.
- **Solicitud de contacto**: paciente, motivo, prioridad (`normal`, `prioritaria`, `urgente`), estado (`nueva`, `en_revision`, `respondida`, `cerrada`, `reabierta`, `escalada`), enfermera asignada, historial.
- **Registro de educación**: contenido entregado, versión, paciente, fecha, confirmación de comprensión (contrapregunta), usuario que administra el contenido.
- **Notificación**: tipo de evento, canal (correo/WhatsApp), paciente/enfermera destinatario, estado de lectura, configuración de activación/desactivación por usuario.
- **Registro de auditoría**: entidad afectada, acción, usuario, fecha/hora, motivo — con retención de **15 años**.
- **Reporte**: tipo, filtros aplicados, formato de exportación (Excel/PDF/CSV), periodicidad (semanal/mensual).

---

## 13. Consideraciones Técnicas y de Seguridad

- La información clínica **nunca se elimina**, solo se anula o corrige con trazabilidad completa (usuario, fecha, hora, motivo).
- El acceso a información clínica por parte de administradores debe ser **limitado y auditado**.
- La app **no debe operar desde canales personales** del equipo clínico (todo debe ser institucional).
- Toda modificación de dosis debe **regenerar el ciclo de notificación y confirmación** del paciente.
- El **protocolo de rescate** es una regla de negocio central: ningún paciente puede quedar "sin cierre" de seguimiento sin que se intente contacto activo.
- Los reportes deben resguardar **datos sensibles** (información clínica de pacientes).

---

## 14. Glosario

- **TACO:** Tratamiento Anticoagulante Oral.
- **TP/INR:** Tiempo de Protrombina / Razón Internacional Normalizada — examen que mide la coagulación sanguínea, usado para ajustar la dosis del anticoagulante.
- **LIS/HIS:** Laboratory Information System / Hospital Information System — sistemas institucionales de laboratorio y hospitalarios, cuya integración está planificada para etapas futuras.
- **GCL 1.13:** Indicador institucional de calidad referenciado como meta de mejora del proyecto.
- **Protocolo de rescate:** Proceso que se activa cuando un paciente no revisa su dosis, no confirma comprensión, no contesta llamadas, o presenta un INR prioritario sin contacto exitoso.