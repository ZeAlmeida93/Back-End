import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname (fileURLToPath(import.meta.url));
console.log (dirname);

/* Creates a new dorectory  
fs.mkdirSync(path.resolve(dirname , 'pasta-teste'));
fs.mkdirSync(path.resolve(dirname , 'pesto-teste' , 'pesto' , 'carbonara'), { recursive: true } ); // Cria pastas dentro de pastas, tems que colocar o recursive dentor da função
*/
/* fs.rmdirSync(path.resolve(dirname , 'pesto-teste')); */ // Remove pastas
fs.rmdirSync(path.resolve(dirname , 'pasta-teste')); // Remove pastas