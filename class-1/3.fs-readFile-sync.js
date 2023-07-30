const fs = require('node:fs')

// Sincrona es uno primero y despues el otro => fs.readFileSync('./file.txt','utf-8')
// Asinncrona: se refiere a descordinada (al mismo tiempo) => fs.readFile('./file.txt','utf-8', (err, text) => {...})

// Usando callback
console.log('-----Reading first file-----')
const text = fs.readFileSync('./file.txt', 'utf-8')
console.log('-> first file:', text)

console.log('-----Reading second file-----')
const secondText = fs.readFileSync('./file2.txt', 'utf-8')
console.log('-> Second file:', secondText)
