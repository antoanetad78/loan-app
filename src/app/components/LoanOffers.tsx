'use client';

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
        <div>
            <h2>Loan Offers</h2>
            <ul>
                {data?.map((offer) => (
                    <li key={offer.id}>
                        {offer.provider} - {offer.interestRate}% interest -{' '}
                        {offer.termMonths} months
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LoanOffers;
