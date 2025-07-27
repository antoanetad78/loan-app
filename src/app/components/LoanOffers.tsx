'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';

type LoanOffer = {
    id: string;
    provider: string;
    interestRate: number;
    termMonths: number;
    maxAmount: number;
    minAmount: number;
    type: string;
};

async function fetchLoanOffers(): Promise<LoanOffer[]> {
    const res = await fetch('/api/loans');
    if (!res.ok) throw new Error('Failed to fetch loan offers');
    return res.json();
}

export function LoanOffers() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['loanOffers'],
        queryFn: fetchLoanOffers,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading offers</div>;

    return (
        <section className='mt-6'>
            <h2 className='text-lg font-semibold mb-3'>
                Available Loan Offers
            </h2>
            <div className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'>
                {data?.map((offer) => (
                    <Card
                        key={offer.id}
                        className='hover:shadow-lg transition-shadow w-full max-w-sm mx-auto'
                    >
                        <CardHeader className='flex justify-between items-center'>
                            <CardTitle>{offer.provider}</CardTitle>
                            <Badge variant='outline'>{offer.type}</Badge>
                        </CardHeader>
                        <CardContent className='space-y-1 text-sm'>
                            <p>
                                <strong>Interest:</strong> {offer.interestRate}%
                            </p>
                            <p>
                                <strong>Term:</strong> {offer.termMonths} months
                            </p>
                            <p className='text-gray-600 text-xs'>
                                <strong>Amount Range:</strong> {offer.minAmount}{' '}
                                – {offer.maxAmount}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}

export default LoanOffers;
