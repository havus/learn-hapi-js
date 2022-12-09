import Hapi from '@hapi/hapi'
import bookRoutes from '../routes/book.js'

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  server.route(bookRoutes)

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
