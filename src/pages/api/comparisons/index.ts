import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { calculateLoanDetails } from '@/app/helpers/calculateLoanDetails';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    {
        if (req.method === 'POST') {
            const { requestedAmount, repaymentPeriod, loanType } = req.body;

            if (!requestedAmount || !repaymentPeriod || !loanType) {
                return res
                    .status(400)
                    .json({ message: 'Missing required fields' });
            }

            try {
                // 1. Fetch offers that match loan type, amount, and term
                const offers = await prisma.loanOffer.findMany({
                    where: {
                        type: loanType,
                        minAmount: { lte: requestedAmount },
                        maxAmount: { gte: requestedAmount },
                        termMonths: repaymentPeriod,
                    },
                });

                if (!offers.length) {
                    return res
                        .status(404)
                        .json({ message: 'No matching offers found' });
                }

                // 2. Calculate monthly + total repayments for each offer
                const calculatedOffers = offers.map((offer) => {
                    const details = calculateLoanDetails(
                        requestedAmount,
                        offer.interestRate,
                        repaymentPeriod
                    );
                    return {
                        offerId: offer.id,
                        provider: offer.provider,
                        interestRate: offer.interestRate,
                        ...details,
                    };
                });

                // 3. Pick the best offer (lowest total repayment)
                const bestOffer = calculatedOffers.reduce((best, current) =>
                    current.totalRepayment < best.totalRepayment
                        ? current
                        : best
                );

                // 4. Save the comparison log and link offers
                const comparisonLog = await prisma.comparisonLog.create({
                    data: {
                        requestedAmount,
                        repaymentPeriod,
                        loanType,
                        offers: {
                            create: calculatedOffers.map((c) => ({
                                offerId: c.offerId,
                                monthlyPayment: c.monthlyPayment,
                                totalRepayment: c.totalRepayment,
                            })),
                        },
                    },
                    include: { offers: { include: { offer: true } } },
                });

                // 5. Return saved log + calculated values + best offer
                return res.status(201).json({
                    comparison: comparisonLog,
                    calculatedOffers,
                    bestOffer,
                });
            } catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: 'Internal server error' });
            }
        } else if (req.method === 'GET') {
            try {
                const comparisons = await prisma.comparisonLog.findMany({
                    orderBy: { createdAt: 'desc' },
                });
                return res.status(200).json(comparisons);
            } catch (error) {
                console.error(error);
                return res
                    .status(500)
                    .json({ message: 'Internal server error' });
            }
        } else {
            return res.status(405).json({ message: 'Method not allowed' });
        }
    }
}
