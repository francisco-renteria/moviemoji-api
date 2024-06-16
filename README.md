# TMDB2EMOJIS API 🌟🚀

TMDB2EMOJIS API is the backend powerhouse that drives the innovative TMDB2EMOJIS application. It leverages advanced Natural Language Processing (NLP) techniques to extract meaningful keywords from movie synopses and translates them into relevant emojis. Hosted on Vercel, this API ensures seamless performance and integration with the TMDB2EMOJIS frontend.

## English Version

### Overview

TMDB2EMOJIS API is a robust backend service that processes movie data retrieved from TMDB (The Movie Database). By utilizing NLP libraries such as Natural.js and Compromise.js, the API analyzes movie synopses to extract key themes and concepts, which are then mapped to corresponding emojis.

### Features

- **NLP-Powered Analysis**: Employs advanced NLP techniques to understand and extract key information from movie plots.
- **Emoji Mapping**: Translates extracted keywords into relevant emojis, creating a unique representation of movie synopses.
- **Seamless Integration**: Designed to work seamlessly with the TMDB2EMOJIS frontend application.
- **Hosted on Vercel**: Ensures high performance and reliability.

### How It Works

1. **Data Retrieval**: The API fetches movie data from TMDB based on the user's input.
2. **NLP Processing**: Utilizes Natural.js and Compromise.js to analyze the movie synopsis and extract significant keywords.
3. **Emoji Selection**: Maps the extracted keywords to appropriate emojis using the OpenMoji library.
4. **Response**: Returns the emojis along with the movie title to the frontend, providing a visual representation of the movie.

### Technologies Used

- **NodeJS**: For building the server and handling backend logic.
- **Natural.js**: An NLP library for analyzing and extracting information from text.
- **Compromise.js**: Another NLP library used to enhance text processing capabilities.
- **Axios**: For making HTTP requests to the TMDB API.
- **Vercel**: Hosting platform for deployment and scaling.

### API Endpoints

- **GET /movie/:title**: Fetches movie data from TMDB, processes the synopsis, and returns the corresponding emojis.

### Try It Out!

Check out the TMDB2EMOJIS frontend at [TMDB2EMOJIS](https://www.tmdb2emojis.vercel.app) to see the API in action.

For more details on the implementation and to contribute, visit the [TMDB2EMOJIS API repository](https://github.com/francisco-renteria/TMDB2EMOJIS-api).

---

## Versión en Español

### Visión General

TMDB2EMOJIS API es un servicio backend robusto que procesa datos de películas recuperados de TMDB (The Movie Database). Utilizando bibliotecas de NLP como Natural.js y Compromise.js, la API analiza sinopsis de películas para extraer temas y conceptos clave, que luego se asignan a los emojis correspondientes.

### Características

- **Análisis Impulsado por NLP**: Emplea técnicas avanzadas de NLP para comprender y extraer información clave de los argumentos de las películas.
- **Asignación de Emojis**: Traduce las palabras clave extraídas en emojis relevantes, creando una representación única de las sinopsis de las películas.
- **Integración Perfecta**: Diseñado para funcionar a la perfección con la aplicación frontend TMDB2EMOJIS.
- **Alojado en Vercel**: Garantiza alto rendimiento y fiabilidad.

### Cómo Funciona

1. **Recuperación de Datos**: La API obtiene datos de películas de TMDB basándose en la entrada del usuario.
2. **Procesamiento NLP**: Utiliza Natural.js y Compromise.js para analizar la sinopsis de la película y extraer palabras clave significativas.
3. **Selección de Emojis**: Asigna las palabras clave extraídas a emojis apropiados utilizando la biblioteca OpenMoji.
4. **Respuesta**: Devuelve los emojis junto con el título de la película al frontend, proporcionando una representación visual de la película.

### Tecnologías Utilizadas

- **NodeJS**: Para construir el servidor y manejar la lógica del backend.
- **Natural.js**: Una biblioteca de NLP para analizar y extraer información de textos.
- **Compromise.js**: Otra biblioteca de NLP utilizada para mejorar las capacidades de procesamiento de textos.
- **Axios**: Para hacer solicitudes HTTP a la API de TMDB.
- **Vercel**: Plataforma de alojamiento para despliegue y escalado.

### Puntos de Acceso de la API

- **GET /movie/:title**: Recupera datos de películas de TMDB, procesa la sinopsis y devuelve los emojis correspondientes.

### ¡Pruébalo!

Visita el frontend de TMDB2EMOJIS en [TMDB2EMOJIS](https://www.tmdb2emojis.vercel.app) para ver la API en acción.

Para más detalles sobre la implementación y para contribuir, visita el [repositorio de TMDB2EMOJIS API](https://github.com/francisco-renteria/TMDB2EMOJIS-api).
