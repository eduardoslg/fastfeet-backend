import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { env } from '@/config/env'
import { appRoutes } from '@/routes'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

import { errorHandler } from './errors'
import { getInternationalizedData } from './utils/getInternationalizedData'
import { getLanguage } from './utils/getLanguage'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'FastFeet',
      description: 'Especificações da API Rest',
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

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
  theme: {
    title: 'FastFeet API',
  },
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  exposedHeaders: ['x-total-count', 'Content-Disposition'],
})

app.register(appRoutes)

app.addHook('preSerialization', async (request, _, payload: any) => {
  if ('issues' in payload) {
    return payload
  }

  return getInternationalizedData(
    payload,
    getLanguage(request.headers['x-selected-language'] as string),
  )
})
