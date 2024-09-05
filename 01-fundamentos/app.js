const fs = require('fs');

const data = fs.readFileSync('README.md', 'utf-8');

const newData = data.replace(/React/ig, 'Node');

console.log(data);
console.log(newData);

fs.writeFileSync('README-Node.md', newData);