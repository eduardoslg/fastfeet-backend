import '@fastify/jwt'
import { UserData } from './fastify'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: UserData
    }
  }
}
