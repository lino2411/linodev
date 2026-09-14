LinoDev — Portafolio web

Portafolio web personal de LinoDev, desarrollado con HTML, CSS y JavaScript vanilla.

El sitio presenta servicios de desarrollo frontend, sistemas administrativos, bases de datos y proyectos seleccionados.
Demo

    Portafolio: Ver sitio publicado

    Ecommerce Elisyn Soya: Ver demo

        Reemplaza el enlace del portafolio por la URL real después de configurar GitHub Pages.

Características

    Diseño responsive para escritorio, tablet y móvil.

    Menú de navegación adaptable.

    Modo claro y oscuro.

    Secciones de presentación, especialidades, proyectos, proceso y contacto.

    Formulario de contacto que prepara un mensaje para WhatsApp.

    Enlace externo al ecommerce publicado en Vercel.

    Animaciones de entrada y transiciones reducidas cuando el usuario lo solicita.

Tecnologías

    HTML5.

    CSS3.

    JavaScript.

    CSS Grid y Flexbox.

    Font Awesome.

    Vercel para la demo del ecommerce.

    GitHub Pages para publicar el portafolio.

Estructura del proyecto

text
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── assets/
    └── img/

Instalación local

    Clona el repositorio:

bash
git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git

    Entra en la carpeta:

bash
cd TU-REPOSITORIO

    Abre index.html en el navegador o utiliza Live Server desde Visual Studio Code.

Configuración de WhatsApp

El formulario utiliza un enlace de WhatsApp con mensaje preparado. En js/script.js, configura el número en formato internacional, sin espacios, guiones ni el signo +:

javascript
const numeroWhatsApp =
    '51927291508';

Cambia ese valor por tu número real antes de publicar.
Publicación en GitHub Pages

En el repositorio de GitHub:

    Abre Settings.

    Entra en Pages.

    Selecciona Deploy from a branch.

    Elige la rama main.

    Selecciona la carpeta / (root).

    Guarda la configuración.

El archivo index.html debe permanecer en la raíz del repositorio.
Actualizar el repositorio

Después de realizar cambios:

bash
git add .
git commit -m "Actualiza portafolio"
git push origin main

Créditos

Proyecto diseñado y desarrollado por LinoDev.
Licencia

Este proyecto se publica con fines demostrativos. Las imágenes, marcas, textos y contenido propio no deben reutilizarse sin autorización.