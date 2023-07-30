const fs = require('node:fs/promises')

fs.readdir('.')
  .then(files => {
    files.forEach(file => {
      console.log(file)
    })
  })
  .catch(err => {
    if (err) {
      console.error('Error al leer el directorio: ', err)
    }
  })

// fs.readdir('.', (err, files) => {
//   if (err) {
//     console.log('Error al leer el directorio: ', err);
//     return
//   }
//   files.forEach(file =>{
//     console.log(file)
//   })
// })
