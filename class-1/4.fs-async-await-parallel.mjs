// Trabajo paralelo

import { readFile } from 'node:fs/promises'

Promise.all([
  readFile('./file.txt', 'utf-8'),
  readFile('./file2.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('-----Reading first file-----')
  console.log('-> first file:', text)

  console.log('-----Reading second file-----')
  console.log('-> Second file:', secondText)
})
