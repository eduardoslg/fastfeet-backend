import { UsersRepository } from '../repositories'

type FetchUsersUseCaseData = {
  page: number
  limit: number
  search?: string
}

export class FetchUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({ page, limit, search }: FetchUsersUseCaseData) {
    const offset = (page ? page - 1 : page) * limit

    const whereCondition = search
      ? ` and (u.name ilike '%${search}%' or 
               u.email ilike '%${search}%')`
      : ''

    const result = await this.usersRepository.fetch({
      limit,
      offset,
      whereCondition,
    })

    return result
  }
}
