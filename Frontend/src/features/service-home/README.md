# Feature: Service Home

Módulo principal para la gestión de servicios, usuarios y turnos.

## Submódulos

---

## 📂 `service/`
Pantallas generales del módulo.

### `GestionServicios.jsx`
Pantalla que permite navegar dentro de Service Home:
- Alta de cliente
- Turnos
- Nuevo turno (según estructura)

---

## 📂 `user/`
Pantallas relacionadas al usuario cliente de Service Home.

### `NuevoUsuario.jsx`
Formulario de alta para clientes de Service Home.

Incluye:
- Datos personales
- Dirección
- Teléfonos
- Email

Con estilos en `NuevoUsuario.module.css`.

---

## 📂 `turnos/`

### 🗂️ `nuevoTurno/`
Contiene:

#### `TurnoNuevo.jsx`
Formulario para crear un turno.
Incluye:
- Selección de oficio
- Cliente
- Fecha
- Hora

#### `turnoNuevo.module.css`
Estilos del formulario.

---

### 🗂️ `tabla/`
Contiene la tabla de turnos asignados.

#### `TurnosTabla.jsx`
- Lista paginada
- Filtros (texto + oficio)
- Acciones (ver, editar, eliminar)
- Exportación a PDF
- Modal integrado

#### `TurnosServicios.jsx`
Interfaz de conexión con el sistema de turnos (mock store).

#### `TurnosTabla.module.css`
Estilos encapsulados.

---

## `index.js`
Expone las pantallas del módulo para importaciones limpias.

## Responsabilidad del Feature
- Gestionar turnos del sistema Service Home.
- Administrar usuarios y clientes del módulo.
- Mantener pantallas organizadas por subdominio.
