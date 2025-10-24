# Sistema de Gestión de Mantenimiento - Programa de Lubricación

## 📁 Estructura del Proyecto

```
equi/
├── 📁 api/                     # APIs y endpoints
│   ├── upload.php             # API para subir archivos Excel
│   ├── list_files.php         # API para listar archivos subidos
│   ├── check_connection.php   # API para verificar conexión BD
│   ├── server_check.php       # API para verificar servidor
│   ├── diagnostico.php        # API de diagnóstico
│   └── test.php              # API de pruebas
├── 📁 assets/                  # Recursos estáticos
│   ├── 📁 css/               # Hojas de estilo
│   │   └── style.css         # Estilos principales
│   ├── 📁 js/                # Archivos JavaScript
│   │   ├── main.js           # JavaScript principal del SPA
│   │   └── db.js             # JavaScript de base de datos
│   └── 📁 images/            # Imágenes del proyecto
├── 📁 config/                  # Configuraciones
│   └── db_config.php         # Configuración de base de datos
├── 📁 logs/                    # Archivos de registro
│   └── db_debug.txt          # Logs de depuración
├── 📁 temp/                    # Archivos temporales
│   └── (archivos de prueba)
├── 📁 uploads/                 # Archivos subidos
│   └── (archivos Excel subidos)
├── 📁 views/                   # Vistas del SPA
│   ├── usuarios.html         # Vista de usuarios
│   ├── clientes.html         # Vista de clientes
│   ├── servicios.html        # Vista de servicios
│   ├── maquinas.html         # Vista de máquinas
│   ├── estudios.html         # Vista de estudios
│   ├── formatos.html         # Vista de formatos
│   ├── cartas.html           # Vista de cartas
│   ├── ajustes.html          # Vista de ajustes
│   ├── reportes_embedded.html # Vista embebida de PowerBI
│   ├── error.html            # Vista de error
│   └── redirect.html         # Vista de redirección
├── index.html                  # SPA principal
├── index.php                  # Punto de entrada con redirección
├── powerB.html                # Dashboard PowerBI principal
├── DashBoard.pbix             # Archivo Power BI
└── .htaccess                  # Configuración Apache
```

## 🚀 Características

- **📊 Dashboard PowerBI**: Visualización de datos de mantenimiento
- **📤 Upload Excel**: Subida y procesamiento de archivos Excel
- **🗄️ Base de Datos**: Gestión automática de tablas y datos
- **🔄 SPA Navigation**: Navegación fluida sin recargas
- **📱 Responsive**: Adaptable a diferentes dispositivos
- **🛡️ Seguridad**: Validaciones y manejo de errores

## 🛠️ Instalación

1. **Instalar XAMPP**
   - Descargar e instalar XAMPP
   - Iniciar servicios Apache y MySQL

2. **Configurar Proyecto**
   ```bash
   # Copiar archivos a htdocs
   cp -r equi/ /xampp/htdocs/
   ```

3. **Configurar Base de Datos**
   - Abrir phpMyAdmin: `http://localhost/phpmyadmin`
   - Crear base de datos: `equilub`
   - Las tablas se crean automáticamente

4. **Acceder al Sistema**
   - URL: `http://localhost/equi/`
   - Se redirige automáticamente al SPA

## 📚 Uso

### Dashboard Principal
- Acceder: `http://localhost/equi/index.html#dashboard`
- Gráficos interactivos con ApexCharts
- Métricas en tiempo real

### PowerBI Reportes
- Acceder: `http://localhost/equi/index.html#reportes`
- Subir archivos Excel
- Visualizar datos de mantenimiento
- Filtros por localización

### Gestión
- **Usuarios**: Administración de usuarios del sistema
- **Clientes**: Gestión de empresas cliente
- **Servicios**: Control de servicios de mantenimiento
- **Máquinas**: Inventario de equipos
- **Estudios**: Informes de lubricación
- **Cartas**: Documentos de lubricación

## 🔧 APIs Disponibles

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/upload.php` | POST | Subir archivo Excel |
| `/api/list_files.php` | GET | Listar archivos subidos |
| `/api/check_connection.php` | GET | Verificar conexión BD |
| `/api/server_check.php` | GET | Diagnóstico servidor |
| `/api/test.php` | GET | Test básico |

## 📝 Logs

- **Ubicación**: `/logs/db_debug.txt`
- **Contenido**: Operaciones de BD, uploads, errores
- **Formato**: `[YYYY-MM-DD HH:MM:SS] - CATEGORIA: mensaje`

## 🔒 Seguridad

- ✅ Validación de archivos subidos
- ✅ Preparación de consultas SQL
- ✅ Sanitización de datos
- ✅ Control de errores
- ✅ Logs de actividad

## 🚨 Solución de Problemas

### Error de conexión BD
```bash
# Verificar servicios XAMPP
# Revisar /logs/db_debug.txt
# Acceder a: /api/check_connection.php
```

### Archivos no se suben
```bash
# Verificar permisos de /uploads/
# Revisar logs en /logs/db_debug.txt
# Verificar tamaño máximo en php.ini
```

### SPA no carga
```bash
# Verificar /assets/js/main.js
# Revisar consola del navegador
# Acceder directamente a /index.html
```

## 📈 Versión
**v2.0.5** - Sistema completo reorganizado con mejores prácticas

## 👨‍💻 Desarrollador
Sistema de gestión para programa de lubricación industrial
