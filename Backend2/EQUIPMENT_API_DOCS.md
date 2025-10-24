# API de Equipos y Sistemas (Jerárquica)

## Descripción General
La API de equipos permite gestionar una estructura jerárquica de equipos, sub-equipos, componentes y partes. Cada equipo puede tener múltiples niveles de jerarquía.

## Tipos de Equipos
- `equipment`: Equipo Principal
- `subequipment`: Sub-equipo
- `component`: Componente
- `part`: Parte

## Estructura de Datos

### Machine (Equipment) Model
```json
{
  "id": 1,
  "name": "Excavadora CAT 320D",
  "state": "Operativa",
  "type": "Maquinaria Pesada",
  "description": "Excavadora principal para movimiento de tierra",
  "observation": "Equipo en buen estado",
  "equipment_type": "equipment",
  "hierarchy_level": 0,
  "full_path": "Excavadora CAT 320D",
  "parent_id": null,
  "hierarchy_data": {
    "specifications": {...},
    "maintenance_info": {...}
  },
  "parent": null,
  "children": [...],
  "children_count": 3,
  "has_children": true,
  "lubrication_studies_count": 2,
  "created_at": "2025-07-31T00:00:00.000000Z",
  "updated_at": "2025-07-31T00:00:00.000000Z"
}
```

## Endpoints

### 1. Obtener Tipos de Equipos
```
GET /api/machines/types
```

**Respuesta:**
```json
{
  "message": "Tipos de equipos obtenidos con éxito",
  "data": {
    "equipment": "Equipo Principal",
    "subequipment": "Sub-equipo", 
    "component": "Componente",
    "part": "Parte"
  }
}
```

### 2. Listar Equipos
```
GET /api/machines
```

**Parámetros opcionales:**
- `equipment_type`: Filtrar por tipo de equipo
- `parent_id`: Filtrar por equipo padre (usar 'null' para equipos principales)
- `show_all`: Mostrar todos los equipos sin filtros

**Ejemplo:**
```
GET /api/machines?parent_id=1  // Obtener hijos del equipo 1
GET /api/machines?equipment_type=component  // Obtener solo componentes
GET /api/machines?show_all=true  // Obtener todos los equipos
```

### 3. Obtener Jerarquía Completa
```
GET /api/machines/hierarchy
```

Devuelve todos los equipos principales con sus descendientes anidados.

### 4. Buscar Equipos
```
GET /api/machines/search?query=bomba&equipment_type=component
```

**Parámetros:**
- `query` (requerido): Término de búsqueda
- `equipment_type` (opcional): Tipo de equipo

### 5. Obtener Detalles de un Equipo
```
GET /api/machines/details/{id}
```

### 6. Obtener Descendientes de un Equipo
```
GET /api/machines/{id}/descendants
```

### 7. Crear Nuevo Equipo
```
POST /api/machines
```

**Cuerpo de la petición:**
```json
{
  "name": "Sistema Hidráulico",
  "state": "Operativo",
  "type": "Sistema",
  "description": "Sistema hidráulico principal",
  "observation": "Funcionamiento normal",
  "equipment_type": "subequipment",
  "parent_id": 1,
  "hierarchy_data": {
    "specifications": {
      "pressure": "350 bar",
      "flow_rate": "120 L/min"
    }
  }
}
```

### 8. Actualizar Equipo
```
PUT /api/machines/{id}
```

### 9. Mover Equipo a Otro Padre
```
PATCH /api/machines/{id}/move
```

**Cuerpo de la petición:**
```json
{
  "new_parent_id": 2
}
```

### 10. Eliminar Equipo
```
DELETE /api/machines/{id}
```

**Restricciones:**
- No se puede eliminar un equipo que tenga hijos
- No se puede eliminar un equipo con estudios de lubricación asociados

## Ejemplos de Uso

### Crear Estructura Jerárquica

1. **Crear equipo principal:**
```json
POST /api/machines
{
  "name": "Excavadora CAT 320D",
  "equipment_type": "equipment",
  "state": "Operativa",
  "type": "Maquinaria Pesada"
}
```

2. **Crear sub-equipo:**
```json
POST /api/machines
{
  "name": "Sistema Hidráulico",
  "equipment_type": "subequipment",
  "parent_id": 1,
  "state": "Operativo"
}
```

3. **Crear componente:**
```json
POST /api/machines
{
  "name": "Bomba Hidráulica",
  "equipment_type": "component",
  "parent_id": 2,
  "state": "Operativo"
}
```

4. **Crear parte:**
```json
POST /api/machines
{
  "name": "Pistones de la Bomba",
  "equipment_type": "part",
  "parent_id": 3,
  "state": "Operativo"
}
```

### Consultar Jerarquía

**Obtener equipos principales con sus hijos:**
```
GET /api/machines/hierarchy
```

**Obtener solo los hijos directos de un equipo:**
```
GET /api/machines?parent_id=1
```

**Buscar en toda la jerarquía:**
```
GET /api/machines/search?query=hidráulico
```

## Validaciones

- `name`: Requerido, máximo 255 caracteres
- `equipment_type`: Requerido, debe ser uno de los tipos válidos
- `parent_id`: Opcional, debe existir en la tabla de máquinas
- Se previene la creación de referencias circulares
- No se permite eliminar equipos con hijos o estudios asociados

## Funcionalidades Adicionales

### Campo `hierarchy_data`
Permite almacenar información adicional específica del equipo en formato JSON:
- Especificaciones técnicas
- Información de mantenimiento
- Datos personalizados

### Campo `full_path`
Se actualiza automáticamente y contiene la ruta completa del equipo:
```
"Excavadora CAT 320D > Sistema Hidráulico > Bomba Hidráulica > Pistones"
```

### Prevención de Referencias Circulares
El sistema valida automáticamente que no se creen referencias circulares al:
- Crear un nuevo equipo con padre
- Actualizar el padre de un equipo existente
- Mover un equipo a otro padre
