import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import qs from 'qs'

import { env } from '@/env'
import { appRoutes } from '@/routes'
import { fastifyCors } from '@fastify/cors'
import jwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'

import { errorHandler } from './errors/error-handler'

export const app = fastify({
  querystringParser: (str) => qs.parse(str),
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.register(swagger, {
  openapi: {
    info: {
      title: 'Colo de Maria API',
      description: 'API documentation for Colo de Maria project',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  theme: {
    title: 'OCPP OpenAPI',
  },
})

app.register(jwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  exposedHeaders: ['x-total-count', 'Content-Disposition'],
  origin: '*',
})

app.register(appRoutes)
