// Esto sólo en los módulos nativos
// que no tienen promesas nativas

// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)

// Trabajo secuencial

const fs = require('node:fs/promises')

console.log('-----Reading first file-----')
fs.readFile('./file.txt', 'utf-8')
  .then((text) => {
    console.log('-> first file:', text)
  })

console.log('-----Reading second file-----')
fs.readFile('./file2.txt', 'utf-8')
  .then((text) => {
    console.log('-> Second file:', text)
  })
