import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: {
        userId: number
        role: string
      }
    }
  }
}
