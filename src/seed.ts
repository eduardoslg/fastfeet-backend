import { hash } from 'bcryptjs'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await hash('$4Hgxdugr', 8)

  await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        name: 'Admin',
        email: 'admin@zysoft.com.br',
        password: passwordHash,
        role: 'ADMIN',
        cpf: '46732910850',
      },
    })
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
