const natural = require("natural");
const sw = require("stopword");

const inflector = new natural.NounInflector();

function palabrasClave(text) {
  const tokenizer = new natural.WordTokenizer();
  const splited = text
    .split(" ")
    .filter((palabra) => !palabra.includes("'"))
    .join(" ");

  const tokens = tokenizer.tokenize(splited);

  // quita palabras vacías usando stopword
  var filteredTokens = sw.removeStopwords(tokens);

  filteredTokens = filteredTokens.map((palabra) =>
    inflector.singularize(palabra)
  );

  // verbos comunes que queremos eliminar
  const verbosComunes = [];
  const innecesarias = [];

  // filtra las palabras eliminando los verbos comunes
  filteredTokens = filteredTokens.filter(
    (palabra) => !verbosComunes.includes(palabra)
  );
  filteredTokens = filteredTokens.filter(
    (palabra) => !innecesarias.includes(palabra)
  );

  return Promise.all(filteredTokens);
}

module.exports = palabrasClave;
