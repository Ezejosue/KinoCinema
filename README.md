# KinoCinema
 

El proyecto consiste en una página web que muestra una lista de películas en cartelera para el año 2023 y permite a los usuarios reservar entradas para una película en particular en una fecha y hora específica. La página consume la API de The Movie Database (TMDb) para obtener información sobre las películas, como su título, clasificación, imagen de portada y sinopsis. La página también utiliza SweetAlert para mostrar alertas de éxito y error cuando los usuarios intentan realizar una reserva.

## Comenzando

### Requisitos previos

Antes de empezar, asegúrate de tener instalado en tu ordenador:

- Node.js (versión X o superior)
- NPM (versión X o superior)
- VsCode (En su última versión)

### Instalación

1. Clona el repositorio
   git clone https://github.com/Ezejosue/KinoCinema.git
2. Instala las dependencias
   npm install
3. Crea un archivo con las variables de entorno necesarias (ver apartado "Variables de entorno" más abajo).

### Uso

1. Arranca el servidor
   npm start

2. Abre el navegador y accede a `http://localhost:#puerto`

### Variables de entorno

Para el correcto funcionamiento de la aplicación, necesitarás crear un archivo en la raíz del proyecto con las siguientes variables:

API_KEY=your_api_key
BASE_URL=https://api.themoviedb.org/3
IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500

## Construido con

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Bootstrap](https://getbootstrap.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [JQuery](https://jquery.com/)


## Autor

- [Ezejosue](https://github.com/Ezejosue) - Josué Ávalos
- [razmit](https://github.com/razmit) - Rolin Azmitia

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](https://github.com/Ezejosue/KinoCinema/blob/main/LICENSE) para más detalles.