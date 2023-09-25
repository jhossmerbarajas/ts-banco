# App Banco con TypeScript

Revisión: 2023-09-25

Descripción

App Banco con TypeScript es una aplicación web que permite la creación de usuarios por roles (admin, employe y client), la creación de cuentas (ahorro y corriente) y la asignación de cuentas a clientes.

## Características

1. Creación de usuarios por roles: admin, employe y client.
2. Creación de cuentas: ahorro y corriente.
3. Asignación de cuentas a clientes por admin y employe.
4. Uso de migraciones y typeorm para la gestión de datos.
5. Tablas relacionadas.

# Instrucciones de uso

# Get started

### 1. Clona el repositorio:
```
__ git clone https://github.com/jhossmerbarajas/app-banco-typescript.git __
```

### 2. Configura las variables de entorno:
```
 **.env**
 ```

Edita el archivo .env y configura los siguientes valores:
```
** DB_HOST **: Dirección del servidor MySQL.
** DB_PORT **: Puerto del servidor MySQL.
** DB_DATABASE **: Nombre de la base de datos.
** DB_USERNAME **: Nombre de usuario de la base de datos.
** DB_PASSWORD **: Contraseña de la base de datos.
```
### 3. Instala las dependencias:
```
** npm install **
```
### 4. Inicia el servidor de desarrollo:
```
**npm run dev**
```
### 5. Correr las migraciones

Para correr las migraciones, ejecuta el siguiente comando:
```
**npm run m:run**
```
Este comando creará las tablas en la base de datos según el modelo de datos definido en el archivo src/config/data-source.ts.
