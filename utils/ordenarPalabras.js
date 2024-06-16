const nlp = require("compromise");

function getCategoriaGramatical(palabra) {
  const doc = nlp(palabra);

  // orden de palabras segun categoria
  if (doc.nouns().length > 0) return "sustantivos";
  if (doc.pronouns().length > 0) return "pronombres";
  if (doc.adjectives().length > 0) return "adjetivos";
  if (doc.adverbs().length > 0) return "adverbios";
  if (doc.verbs().length > 0) return "verbos";
  if (doc.prepositions().length > 0) return "preposiciones";
  if (doc.conjunctions().length > 0) return "conjunciones";
  if (doc.numbers().length > 0) return "numeros";

  return "otros";
}

function ordenarPorCategoriaGramatical(palabras) {
  const palabrasConCategoria = palabras.map((palabra) => ({
    palabra,
    categoria: getCategoriaGramatical(palabra),
  }));

  const ordenCategorias = [
    "sustantivos",
    "pronombres",
    "adjetivos",
    "adverbios",
    "verbos",
    "preposiciones",
    "conjunciones",
    "numeros",
    "otros",
  ];

  palabrasConCategoria.sort((a, b) => {
    const indexA = ordenCategorias.indexOf(a.categoria);
    const indexB = ordenCategorias.indexOf(b.categoria);

    if (indexA === indexB) {
      return a.palabra.localeCompare(b.palabra);
    }

    return indexA - indexB;
  });

  return palabrasConCategoria.map((item) => item.palabra);
}

module.exports = ordenarPorCategoriaGramatical;
