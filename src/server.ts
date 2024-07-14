import { env } from './config/env'
import { app } from './shared/app'

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`HTTP Server Running on port ${env.PORT}`)
  })
