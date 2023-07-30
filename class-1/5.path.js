const path = require('node:path')

// Barra separadora de carpetas segun SO
console.log(path.sep)

// Unir rutas con path join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

// Nombre del fichero
const base = path.basename('/tmp/midu-secret-files/password.txt')
console.log(base)

// Nombre del fichero sin la extención
const filename = path.basename('/tmp/midu-secret-files/password.txt', '.txt')
console.log(filename)

// Extención
const extension = path.extname('my.super.image.jpg')
console.log(extension)
