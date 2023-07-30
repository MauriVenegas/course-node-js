const http = require('node:http')
const { findAvaliablePort } = require('./10.free-port')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('Request reecived')
  res.end('Hola mundo!')
})
findAvaliablePort(desiredPort)
  .then(port => {
    server.listen(port, () => {
      console.log(`Server listening on port http://localhost:${server.address().port}`)
    })
  })
