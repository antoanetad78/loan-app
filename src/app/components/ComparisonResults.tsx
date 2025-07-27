'use client';

import OfferCard from './OfferCard';

type ComparisonResult = {
    provider: string;
    interestRate: number;
    monthlyPayment: number;
    totalRepayment: number;
    principal: number;
    totalInterest: number;
};

type ComparisonResultsProps = {
    results: ComparisonResult[];
    bestOffer: ComparisonResult | null;
};

export default function ComparisonResults({
    results,
    bestOffer,
}: ComparisonResultsProps) {
    return (
        <div>
            <h3>Comparison Results</h3>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem',
                    marginTop: '1rem',
                }}
            >
                {results.map((offer) => (
                    <OfferCard
                        key={offer.provider}
                        provider={offer.provider}
                        interestRate={offer.interestRate}
                        monthlyPayment={offer.monthlyPayment}
                        totalRepayment={offer.totalRepayment}
                        principal={offer.principal}
                        totalInterest={offer.totalInterest}
                        isBest={bestOffer?.provider === offer.provider}
                    />
                ))}
            </div>
        </div>
    );
}
