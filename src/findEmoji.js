const jsonfile = require("jsonfile");

// Función para cargar los emojis desde el archivo JSON
function loadEmojis(jsonFilename) {
  return jsonfile.readFileSync(jsonFilename);
}

// Función para encontrar el emoji que coincide mejor con la cadena de búsqueda
function findEmojiByKeyword(keyword, emojis) {
  let closestEmoji = null;
  let maxMatchCount = 0;

  emojis.forEach((emoji) => {
    const annotation = emoji["_openMoji_annotation"].toLowerCase();
    const tags = emoji["_openMoji_tags"]
      ? emoji["_openMoji_tags"].map((tag) => tag.toLowerCase())
      : [];
    const openTags = emoji["_openMoji_openMoji_tags"]
      ? emoji["_openMoji_openMoji_tags"].map((tag) => tag.toLowerCase())
      : [];
    const keywords = keyword.toLowerCase().split(" ");
    const annotations = annotation.toLowerCase().split(" ");

    const intersection1 = annotations.filter((element) =>
      keywords.includes(element)
    );
    const intersection2 = tags.filter((element) => keywords.includes(element));
    const intersection3 = openTags.filter((element) =>
      keywords.includes(element)
    );

    const inter1 = intersection1.length / annotations.length;
    const inter2 = intersection2.length / tags.length;
    const inter3 = intersection3.length / openTags.length;
    if (inter1 >= inter2 && inter1 > maxMatchCount) {
      maxMatchCount = inter1;
      closestEmoji = emoji;
    } else if (inter2 > maxMatchCount) {
      maxMatchCount = inter2;
      closestEmoji = emoji;
    } else if (inter3 > maxMatchCount && inter3 >= inter1 && inter3 >= 0.5) {
      maxMatchCount = inter3;
      closestEmoji = emoji;
    }
    if (keyword == "control" && inter1 >= 0.5) {
      console.log(
        inter1,
        inter2,
        inter3,
        maxMatchCount,
        emoji["_openMoji_annotation"],
        openTags
      );
    }

    // let matchAnnotationCount = 0;
    // let matchTagsCount = 0;
    // let matchTagGlobal = 0;

    // keywords.forEach((kw) => {
    //   if ((" " + annotation + " ").includes(" " + kw + " ")) {
    //     matchAnnotationCount += 5;
    //   } else {
    //     matchAnnotationCount -= 1;
    //   }
    // });

    // keywords.forEach((kw) => {
    //   matchTagGlobal = 0;
    //   tags.forEach((tag) => {
    //     matchTagsCount = 0;
    //     if ((" " + tag + " ").includes(" " + kw + " ")) {
    //       matchTagsCount += 5;
    //     } else {
    //       matchTagsCount -= 1;
    //     }
    //     matchTagGlobal =
    //       matchTagsCount > matchTagGlobal ? matchTagsCount : matchTagGlobal;
    //   });
    // });

    // if (
    //   matchAnnotationCount > maxMatchCount ||
    //   matchTagGlobal > maxMatchCount
    // ) {
    //   if (keyword == "first") {
    //     console.log(
    //       matchAnnotationCount,
    //       matchTagGlobal,
    //       matchAnnotationCount,
    //       annotation
    //     );
    //   }
    //   if (matchAnnotationCount >= matchTagGlobal) {
    //     maxMatchCount = matchAnnotationCount;
    //     closestEmoji = emoji;
    //   } else {
    //     maxMatchCount = matchTagGlobal;
    //     closestEmoji = emoji;
    //   }
    // }
  });

  return closestEmoji;
}

// Exportar la función findEmojiByKeyword para poder ser utilizada en otros archivos
module.exports = {
  findEmojiByKeyword,
  loadEmojis,
};
