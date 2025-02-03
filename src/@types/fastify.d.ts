import 'fastify'

export type UserData = {
  userId: string
}

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUser(): Promise<UserData>
  }
}
