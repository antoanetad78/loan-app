import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.loanOffer.deleteMany(); // Clear old data

    await prisma.loanOffer.createMany({
        data: [
            {
                provider: 'Bank Alpha',
                interestRate: 5.5,
                termMonths: 36,
                maxAmount: 20000,
                minAmount: 1000,
                type: 'personal',
            },
            {
                provider: 'Bank Beta',
                interestRate: 4.2,
                termMonths: 36,
                maxAmount: 15000,
                minAmount: 500,
                type: 'personal',
            },
            {
                provider: 'Bank Gamma',
                interestRate: 6.1,
                termMonths: 36,
                maxAmount: 30000,
                minAmount: 5000,
                type: 'personal',
            },
            {
                provider: 'Mortgage Plus',
                interestRate: 3.8,
                termMonths: 120,
                maxAmount: 300000,
                minAmount: 20000,
                type: 'mortgage',
            },
        ],
    });

    console.log('Seed data inserted!');
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
