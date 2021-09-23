const mediumToMarkdown = require('medium-to-markdown');
 
mediumToMarkdown.convertFromUrl("https://medium0.com/predict/decrypting-nfts-9a336b5162ea")
.then(function (markdown) {
  console.log(markdown); //=> Markdown content of medium post
});