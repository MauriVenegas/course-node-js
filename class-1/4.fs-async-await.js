// Trabajo secuencial

const { readFile } = require('node:fs/promises')

async function init () {
  console.log('-----Reading first file-----')
  const text = await readFile('./file.txt', 'utf-8')
  console.log('-> first file:', text)

  console.log('-----Reading second file-----')
  const secondText = await readFile('./file2.txt', 'utf-8')
  console.log('-> Second file:', secondText)
}

init()

// IIFE - Inmediatly Invoked Function Expression
// ;(
//   async () => {
//     console.log('-----Reading first file-----')
//     const text = await readFile('./file.txt', 'utf-8')
//     console.log('-> first file:', text)

//     console.log('-----Reading second file-----')
//     const secondText = await readFile('./file2.txt', 'utf-8')
//     console.log('-> Second file:', secondText)
//   }
// )()
