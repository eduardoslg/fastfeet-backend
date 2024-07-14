import 'fastify'

export type UserData = {
  userId: number
  role: string
}

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUser(): Promise<UserData>
  }
}
