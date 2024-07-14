export class NotAuthorizedError extends Error {
  constructor(message?: string) {
    super(message ?? 'not-authorized')
  }
}
