'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type OfferCardProps = {
    provider: string;
    interestRate: number;
    monthlyPayment: number;
    totalRepayment: number;
    principal: number;
    totalInterest: number;
    isBest?: boolean;
};

export default function OfferCard({
    provider,
    interestRate,
    monthlyPayment,
    totalRepayment,
    principal,
    totalInterest,
    isBest = false,
}: OfferCardProps) {
    return (
        // <article
        //     style={{
        //         border: isBest ? '3px solid green' : '1px solid #ccc',
        //         padding: '1rem',
        //         borderRadius: '8px',
        //         background: isBest ? '#d4edda' : 'white',
        //         boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        //     }}
        //     aria-label={isBest ? 'Best offer' : 'Loan offer'}
        // >
        //     <h4>{provider}</h4>
        //     {isBest && (
        //         <span
        //             style={{
        //                 display: 'inline-block',
        //                 background: 'green',
        //                 color: 'white',
        //                 padding: '0.25rem 0.5rem',
        //                 borderRadius: '4px',
        //                 fontSize: '0.8rem',
        //                 marginBottom: '0.5rem',
        //             }}
        //         >
        //             Best Offer
        //         </span>
        //     )}
        //     <p>
        //         <strong>Interest Rate:</strong> {interestRate}%
        //     </p>
        //     <p>
        //         <strong>Monthly Payment:</strong> {monthlyPayment.toFixed(2)}
        //     </p>
        //     <p>
        //         <strong>Total Repayment:</strong> {totalRepayment.toFixed(2)}
        //     </p>
        //     <p>
        //         <strong>Principal:</strong> {principal.toFixed(2)}
        //     </p>
        //     <p>
        //         <strong>Total Interest:</strong> {totalInterest.toFixed(2)}
        //     </p>
        // </article>
        <Card
            className={`border-2 ${
                isBest ? 'border-green-600' : 'border-gray-200'
            }`}
        >
            <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                    {provider}
                    {isBest && (
                        <Badge className='bg-green-600 text-white'>
                            Best Offer
                        </Badge>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2 text-sm'>
                <p>
                    <strong>Interest Rate:</strong> {interestRate}%
                </p>
                <p>
                    <strong>Monthly Payment:</strong>{' '}
                    {monthlyPayment.toFixed(2)}
                </p>
                <p>
                    <strong>Total Repayment:</strong>{' '}
                    {totalRepayment.toFixed(2)}
                </p>
                <p>
                    <strong>Principal:</strong> {principal.toFixed(2)}
                </p>
                <p>
                    <strong>Total Interest:</strong> {totalInterest.toFixed(2)}
                </p>
            </CardContent>
        </Card>
    );
}
