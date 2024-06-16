const natural = require('natural');
const sw = require('stopword');
const compromise = require('compromise'); // Usado para detectar nombres propios

function extractKeywords(text) {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text);

  // Eliminar palabras vacías usando stopword
  const filteredTokens = sw.removeStopwords(tokens);

  // Lematización de las palabras y conversión de plurales a singulares
  const wordnet = new natural.WordNet();
  const lemmatizedTokens = filteredTokens.map((token) => {
    return new Promise((resolve) => {
      wordnet.lookup(token, (results) => {
        if (results.length > 0) {
          // Buscar la forma base del verbo o del sustantivo
          let lemma = results.find(result => result.pos === 'v' || result.pos === 'n');
          if (lemma) {
            resolve(lemma.lemma);
          } else {
            resolve(token);
          }
        } else {
          resolve(token);
        }
      });
    });
  });

  return Promise.all(lemmatizedTokens).then((lemmatizedTokens) => {
    // Convertir el array de lemas en un texto para su análisis con compromise
    const lemmatizedText = lemmatizedTokens.join(' ');

    // Usar compromise para eliminar nombres propios
    const doc = compromise(lemmatizedText);
    const withoutNames = doc.not('#Person').out('array');

    // Devolver el resultado sin nombres propios
    return withoutNames;
  });
}

// Ejemplo de uso
const text = "John and Mary went to the market. They bought apples, oranges, and bananas.";

extractKeywords(text).then((keywords) => {
  console.log(keywords);
});
