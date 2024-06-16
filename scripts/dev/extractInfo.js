const fs = require("fs");
const jsonfile = require("jsonfile");

function cleanValue(value) {
  let cleanedValue = value.trim();

  if (cleanedValue.startsWith('"') && cleanedValue.endsWith('"')) {
    cleanedValue = cleanedValue.slice(1, -1);
  } else if (cleanedValue === "Just 1") {
    cleanedValue = 1;
  } else if (cleanedValue === "Just 2") {
    cleanedValue = 2;
  } else if (cleanedValue.startsWith("[") && cleanedValue.endsWith("]")) {
    cleanedValue = JSON.parse(cleanedValue.replace(/'/g, '"'));
  } else if (!isNaN(cleanedValue)) {
    cleanedValue = parseFloat(cleanedValue);
  }

  return cleanedValue;
}


function extractEmojis(content) {
  const emojis = [];
  const regex = /\s*{([^}]+)}/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const emojiObject = {};
    const properties = match[1].split(/\s*,\s*/);

    properties.forEach((prop) => {
      const [key, value] = prop.split(/\s*=\s*/);
      const cleanedKey = key.trim().replace(/^_openMoji_/, "");
      emojiObject[cleanedKey] = cleanValue(value);
    });

    emojis.push(emojiObject);
  }

  return emojis;
}

// archivo Haskell
fs.readFile(".hs", "utf8", (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }

  // emojis del archivo Haskell
  const emojis = extractEmojis(data);

  // escribimos archivo JSON
  jsonfile.writeFile("emojis.json", emojis, { spaces: 2 }, (err) => {
    if (err) {
      console.error("Error al escribir el archivo JSON:", err);
    } else {
      console.log("Archivo JSON creado exitosamente");
    }
  });
});
