'use client';

import { useState } from 'react';
import ComparisonResults from './ComparisonResults';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type ComparisonResult = {
    provider: string;
    interestRate: number;
    monthlyPayment: number;
    totalRepayment: number;
    principal: number;
    totalInterest: number;
};

type ApiResponse = {
    calculatedOffers: ComparisonResult[];
    bestOffer: ComparisonResult;
};

export function ComparisonForm() {
    const [requestedAmount, setRequestedAmount] = useState('');
    const [repaymentPeriod, setRepaymentPeriod] = useState('');
    const [loanType, setLoanType] = useState('personal');
    const [results, setResults] = useState<ComparisonResult[] | null>(null);
    const [bestOffer, setBestOffer] = useState<ComparisonResult | null>(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setResults(null);
        setBestOffer(null);

        try {
            const res = await fetch('/api/comparisons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    requestedAmount: Number(requestedAmount),
                    repaymentPeriod: Number(repaymentPeriod),
                    loanType,
                }),
            });

            if (res.ok) {
                const data: ApiResponse = await res.json();
                setResults(data.calculatedOffers);
                setBestOffer(data.bestOffer);
            } else {
                const err = await res.json();
                setMessage(`Error: ${err.message}`);
            }
        } catch (error) {
            setMessage(`Network error: ${error}`);
        }
    };

    return (
        <div className='space-y-4'>
            <form
                onSubmit={handleSubmit}
                className='space-y-4 bg-gray-50 p-4 rounded-lg shadow'
            >
                <h2 className='text-xl font-semibold'>Compare Loan Offers</h2>
                <Input
                    className='w-[180px]'
                    type='number'
                    placeholder='Requested Amount'
                    value={requestedAmount}
                    onChange={(e) => setRequestedAmount(e.target.value)}
                    required
                />
                <Input
                    className='w-[180px]'
                    type='number'
                    placeholder='Repayment Period (months)'
                    value={repaymentPeriod}
                    onChange={(e) => setRepaymentPeriod(e.target.value)}
                    required
                    aria-label='Repayment Period (months)'
                />
                <Select
                    value={loanType}
                    onValueChange={setLoanType}
                >
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Select loan type' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='personal'>Personal</SelectItem>
                        <SelectItem value='mortgage'>Mortgage</SelectItem>
                        <SelectItem value='car'>Car</SelectItem>
                    </SelectContent>
                </Select>
                <Button type='submit'>Compare</Button>
            </form>

            {message && <p className='text-red-600'>{message}</p>}

            {results && (
                <ComparisonResults
                    results={results}
                    bestOffer={bestOffer}
                />
            )}
        </div>
    );
}

export default ComparisonForm;
