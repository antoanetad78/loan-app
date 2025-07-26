import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.loanOffer.createMany({
    data: [
      {
        provider: 'Bank Alpha',
        interestRate: 5.5,
        termMonths: 60,
        maxAmount: 50000,
        minAmount: 1000,
        type: 'personal',
      },
      {
        provider: 'Bank Beta',
        interestRate: 3.9,
        termMonths: 120,
        maxAmount: 300000,
        minAmount: 5000,
        type: 'mortgage',
      },
      {
        provider: 'Bank Gamma',
        interestRate: 4.2,
        termMonths: 36,
        maxAmount: 20000,
        minAmount: 500,
        type: 'car',
      },
    ],
  })

  console.log('Seed data inserted!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
