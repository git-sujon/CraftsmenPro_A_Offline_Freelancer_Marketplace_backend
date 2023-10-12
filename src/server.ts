import mongoose from 'mongoose'
import app from './app'
import config from './config'
// import { infoLogger, errorLogger } from './shared/logger';
import { Server } from 'http'
const port = config.port

process.on('uncaughtException', error => {
  console.log('Error', error)
  process.exit(1)
})

let server: Server

async function connectToMongoDB() {
  try {
    await mongoose.connect(`${config.database_url}`)
    console.log('Database Connection Successfully')

    server = app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  } catch (error) {
    console.error('Database connection Error:', error)
  }

  process.on('unhandledRejection', error => {
    console.log('unhandledRejection , Server is closed...')
    if (server) {
      server.close(() => {
        console.log('Error', error)
      })
    }
  })
}

connectToMongoDB().catch(err => console.error(err))

process.on('SIGTERM', () => {
  console.log('SIGTERM is received')
  if (server) {
    server.close()
  }
})
