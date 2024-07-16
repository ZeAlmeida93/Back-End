import path from 'path';

console.log(import.meta.url);

const dirname = path.dirname (import.meta.url);


console.log(dirname);

console.log(path.join(dirname, '..' , 'pasta1'));


console.log(path.isAbsolute('01_Node-Fundamentals/path.js')); // false pois não é um caminho absoluto
console.log(path.isAbsolute('/01_Node-Fundamentals/path.js'));  // true pois este já o é


console.log(path.basename('01_Node-Fundamentals/path.js')); // retorna o nome do ficheiro
console.log(path.extname('01_Node-Fundamentals/path.js')); // retorna apenas a extensão do ficheiro