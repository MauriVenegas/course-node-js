const http = require('node:http')

// ComonJS -> modulos clásicos de node
const dittoJSON = require('./pokemon/ditto.json')
// const { info } = require('node:console')
const proceessRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'aplication/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''

          // Escuchar el evento data
          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            // Llamar auna base de datos para guardar la info
            res.writeHead(202, { 'Content-Type': 'application/json; charset=utf-8' })

            data.timestampt = Date.now()
            res.end(JSON.stringify(data))
          })
          break
        }

        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; chatset=utf-8')
          return res.end('404 Not Found')
      }
  }
}

const server = http.createServer(proceessRequest)

server.listen(1234, () => {
  console.log('server listening on port http://localhost:1234')
})
