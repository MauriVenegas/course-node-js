import os from 'node:os' // a partir de Node 16, se recomienda poner node:

console.log('---------------Sistema opeerativo---------------')

console.log('Nomre', os.platform())
console.log('Version', os.release())
console.log('Arquitectura', os.arch())
console.log('CPUs', os.cpus())
console.log('Memoria libre', os.freemem() / 1024 / 1024)
console.log('Memoria total', os.totalmem() / 1024 / 1024)
console.log('Dias encendido (uptime)', os.uptime() / 60 / 60)
