const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf-8');

const wordCount = content.split(" ");

//const reactWordCount = wordCount.filter((w) => w.toLowerCase().includes('react'));
const reactWordCount = content.match(/react/gi ?? 0);

console.log('Palabras', wordCount.length);
console.log('Palabras React', reactWordCount.length);