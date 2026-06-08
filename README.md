# TeenNews — Portal de Noticias

Proyecto final de Desarrollo Web — Grupo 2

## Integrantes

- Brunelli, Sofía
- Cambiaso, Candela
- Gomez, Ana
- Pochettino del Puerto, Mailén
- Quintanilla, Ornella

## Descripción

Portal de noticias para adolescentes con sistema de administración de contenido. Permite ver noticias cargadas dinámicamente, buscarlas, cambiar entre modo claro y oscuro, y gestionar el contenido desde un panel de administración protegido por login.

## Estructura de carpetas

    grupo2/
    ├── index.html        # Página principal con noticias
    ├── login.html        # Pantalla de acceso al panel admin
    ├── admin.html        # Panel de administración (CRUD)
    ├── README.md
    ├── css/
    │   └── styles.css    # Estilos generales y modo oscuro
    ├── js/
    │   ├── script.js     # Noticias, dark mode y API del dólar
    │   ├── login.js      # Autenticación con API DummyJSON
    │   └── admin.js      # CRUD de noticias en localStorage
    └── assets/
        └── BrightKenly.ttf

## Cómo ejecutar el proyecto localmente

1. Clonar el repositorio:

       git clone https://github.com/maipochettino/grupo2.git

2. Abrir el archivo index.html en el navegador.

No requiere instalación de dependencias ni servidor.

## Credenciales de administrador

Para acceder al panel de administración usar las siguientes credenciales en la pantalla de login:

- **Usuario:** emilys
- **Contraseña:** emilyspass

Estas credenciales son provistas por la API pública DummyJSON.

## APIs utilizadas

- **Bluelytics** — cotización del dólar oficial y blue en tiempo real
- **DummyJSON** — validación de identidad del administrador

## Sitio publicado

https://maipochettino.github.io/grupo2/
