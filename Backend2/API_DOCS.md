# EQUILUB Backend API - Documentación

## 🚀 Proyecto Backend2 - Laravel 12

Este es el nuevo backend de EQUILUB construido con **Laravel 12** y **Laravel Sanctum** para autenticación API.

## 📋 Información del Proyecto

- **Framework**: Laravel 12.21.0
- **PHP**: 8.2+
- **Autenticación**: Laravel Sanctum
- **Base de datos**: MySQL (`ddco_lubricantes`)
- **Frontend URL**: http://localhost:3000

## 🔧 Configuración Inicial

### 1. Instalar dependencias
```bash
composer install
```

### 2. Configurar archivo .env
```env
APP_NAME=EQUILUB
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ddco_lubricantes
DB_USERNAME=root
DB_PASSWORD=
```

### 3. Iniciar servidor
```bash
php artisan serve
```
Servidor disponible en: **http://127.0.0.1:8000**

## 🔐 Autenticación API

### Login
```http
POST /api/login
Content-Type: application/json

{
    "email": "admin@equilub.com",
    "password": "password123"
}
```

**Respuesta exitosa:**
```json
{
    "success": true,
    "message": "Login exitoso",
    "data": {
        "user": {
            "id": 5,
            "name": "Admin",
            "email": "admin@equilub.com",
            "roles_id": 2,
            "roles": {
                "id": 2,
                "name": "super-admin"
            }
        },
        "token": "1|XscFZaNfMPSbgfJivBMu1EPdWS3cGdvkoEvgp4wE64f4d6d4"
    }
}
```

### Obtener usuario autenticado
```http
GET /api/me
Authorization: Bearer {token}
```

### Logout
```http
POST /api/logout
Authorization: Bearer {token}
```

## 👥 Endpoints de Usuarios

### Listar usuarios
```http
GET /api/users/
```

### Listar usuarios con roles
```http
GET /api/users-with-roles
```

### Verificar permisos por rol
```http
GET /api/users/permission/{role}
```

### Eliminar usuario
```http
DELETE /api/users/{id}
Authorization: Bearer {token}
```

### Actualizar roles de usuario
```http
PUT /api/users/{id}/roles
Authorization: Bearer {token}
```

## 🗄️ Base de Datos

### Tablas principales:
- **users** - Usuarios del sistema
- **roles** - Roles de usuarios
- **permissions** - Permisos del sistema
- **permission_has_users** - Relación usuarios-permisos
- **clients** - Clientes
- **machine** - Máquinas
- **service** - Servicios
- **formatt_study** - Formatos de estudio
- **lubrications_study** - Estudios de lubricación

### Usuario de prueba:
```
Email: admin@equilub.com
Password: password123
Rol: super-admin
```

## 🌐 CORS

Configurado para permitir requests desde:
- http://localhost:3000 (Frontend)

## 📝 Notas Importantes

1. **Sanctum** está configurado para autenticación stateful y stateless
2. Las rutas protegidas requieren el middleware `auth:sanctum`
3. Los tokens se generan automáticamente en el login
4. La base de datos ya contiene datos de usuarios, roles y permisos

## 🔄 Migrar desde Backend anterior

Todos los modelos, controladores y rutas han sido copiados del proyecto original:

- ✅ Modelos: User, Clients, Service, Machine, etc.
- ✅ Controladores: UserController, Admin controllers, etc.
- ✅ Rutas API: Sistema completo de endpoints
- ✅ Base de datos: Conectada y funcionando

## 🚨 Solución de Problemas

### Error de conexión a base de datos:
1. Verificar que XAMPP esté ejecutándose
2. Confirmar credenciales en `.env`
3. Verificar que la base de datos `ddco_lubricantes` exista

### Error de autenticación:
1. Verificar que el token esté incluido en headers
2. Formato: `Authorization: Bearer {token}`
3. El token se obtiene del endpoint `/api/login`
