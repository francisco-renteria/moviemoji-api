const cors = require("cors");
const express = require("express");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
require("dotenv-flow").config();

const { findEmojiByKeyword, loadEmojis } = require("../utils/findEmoji");

const palabrasClave = require("../utils/palabrasClave");

const app = express();

const PORT = process.env.PORT || 3000;
// Verificar que NODE_ENV y CORS_ORIGIN están definidas
const NODE_ENV = process.env.NODE_ENV;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

if (!NODE_ENV) {
  throw new Error("NODE_ENV no está definido");
}

if (!CORS_ORIGIN) {
  throw new Error("CORS_ORIGIN no está definido");
}

// Configurar CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (NODE_ENV === "development") {
      callback(null, true); // Permitir cualquier origen en desarrollo
    } else {
      if (CORS_ORIGIN === "*" || !origin) {
        callback(null, true); // Permitir cualquier origen en producción si está configurado como "*"
      } else if (CORS_ORIGIN.split(",").includes(origin)) {
        callback(null, true); // Permitir solo los dominios especificados en producción
      } else {
        callback(new Error("Origen no permitido por CORS"));
      }
    }
  },
};

// Usar la configuración de CORS en la aplicación
app.use(cors(corsOptions));

// Clave API de TMDb
const apiKey = process.env.TMBD_API_KEY;

// Middleware para servir archivos estáticos
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/openmoji", (req, res) => {
  try {
    const openMojiData = JSON.parse(
      fs.readFileSync("public/data/OpenMoji.json").toString()
    );
    res.json(openMojiData);
  } catch (error) {
    console.error("Error al leer OpenMoji.json:", error);
    res.status(500).send("Error interno del servidor");
  }
});
const emojis = loadEmojis();
// Endpoint /find
app.get("/find", async (req, res) => {
  const movieName = req.query.movie;
  if (!movieName) {
    return res
      .status(400)
      .json({ error: "Debe proporcionar el nombre de la película" });
  }

  try {
    // solicitud de búsqueda a TMDb  español
    const searchResponse = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: apiKey,
          query: movieName,
          language: "es-MX",
        },
      }
    );

    if (searchResponse.data.results.length === 0) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    // primer resultado de la búsqueda
    const data = searchResponse.data.results[0];
    const movieId = data.id;
    const title = data.title;
    const original_title = data.original_title;
    const synopsisES = data.overview || "Sinopsis no disponible";
    const image = searchResponse.data.results[0].poster_path;
    const score = searchResponse.data.results[0].vote_average;
    console.log(searchResponse.data.results[0]);
    // solicitud de detalles de la película a TMDb en inglés
    const movieResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          api_key: apiKey,
          language: "en-US",
        },
      }
    );

    const synopsisEN = movieResponse.data.overview || "Sinopsis no disponible";
    // sinopsis para extraer palabras clave
    const keywords = await palabrasClave(synopsisEN);
    const uniqueKeywords = [...new Set(keywords)];

    // emojis para cada palabra clave

    const emojisResult = uniqueKeywords.map((keyword) => {
      const closestEmoji = findEmojiByKeyword(keyword, emojis);
      return closestEmoji ? closestEmoji["_openMoji_hexcode"] : null;
    });

    return res.json({
      keywords: uniqueKeywords,
      emojis: emojisResult,
      title: title,
      original_title: original_title,
      synopsisEN: synopsisEN,
      synopsisES: synopsisES,
      image: image,
      score: score,
    });
  } catch (error) {
    console.error("Error al comunicarse con TMDb:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
