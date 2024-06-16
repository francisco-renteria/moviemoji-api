const natural = require("natural");
const sw = require("stopword");

const inflector = new natural.NounInflector();
const ordenarPorCategoriaGramatical = require("./ordenarPalabras");

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

  //filteredTokens = ordenarPorCategoriaGramatical(filteredTokens);

  // verbos comunes que queremos eliminar
  const verbosComunes = [
    "make",
    "do",
    "let",
    "be",
    "have",
    "go",
    "get",
    "take",
    "come",
    "see",
    "know",
    "give",
    "find",
    "tell",
    "become",
    "show",
    "leave",
    "feel",
    "put",
    "bring",
    "begin",
    "keep",
    "hold",
    "write",
    "stand",
    "hear",
    "let",
    "mean",
    "set",
    "meet",
    "run",
    "pay",
    "sit",
    "speak",
    "lie",
    "lead",
    "read",
    "grow",
    "lose",
    "fall",
    "send",
    "build",
    "understand",
    "spend",
    "return",
    "draw",
    "break",
    "call",
    "provide",
    "wait",
    "move",
    "learn",
    "change",
    "watch",
    "follow",
    "create",
    "open",
    "offer",
    "remember",
    "consider",
    "appear",
    "buy",
    "serve",
    "expect",
    "stay",
    "reach",
    "remain",
    "suggest",
    "raise",
    "pass",
    "require",
    "report",
    "decide",
    "pull",
    "break",
    "turn",
  ];
  const innecesarias = [
    "new",
    "content",
    "New",
    "Content",
    "lt",
    "Lt",
    "s",
    "face",
    "not",
    "Not",
    "no",
    "No",
  ];

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
