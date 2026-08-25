# Portafolio Web Interactivo - Eduardo Ramírez

Portafolio web personal con temática de terminal/consola interactiva, desarrollado con un enfoque *mobile-first* y diseño responsive para mostrar proyectos destacados, habilidades técnicas y certificaciones.

## 🚀 Tecnologías Utilizadas

* **HTML5:** Estructura semántica del sitio web.
* **Tailwind CSS (CDN):** Estilos modernos, diseño responsive y paleta de colores personalizada.
* **JavaScript (ES6):** Lógica para la consola interactiva y manipulación del DOM.
* **Docker:** Entorno de desarrollo estandarizado con servidor Nginx local.

## 📌 Características

* **Consola Interactiva:** Navegación por comandos (`sobre-mi`, `proyectos`, `habilidades`, `certificaciones`, `limpiar`).
* **Diseño Adaptativo:** Totalmente optimizado para dispositivos móviles, tabletas y computadoras de escritorio.
* **Secciones Clave:** Presentación de proyectos reales con enlaces, habilidades en desarrollo web y redes de contacto directo.

## 🛠️ Ejecución en Desarrollo

Puedes abrir directamente el archivo `index.html` en el navegador o ejecutarlo dentro de un contenedor Docker mediante Nginx:

```bash
docker build -t mi-portafolio .
docker run -d -p 8080:80 mi-portafolio