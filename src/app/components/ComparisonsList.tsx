'use client';

import { useQuery } from '@tanstack/react-query';

type ComparisonLog = {
    id: string;
    createdAt: string;
    requestedAmount: number;
    repaymentPeriod: number;
    loanType: string;
};

async function fetchComparisons(): Promise<ComparisonLog[]> {
    const res = await fetch('/api/comparisons');
    if (!res.ok) throw new Error('Failed to fetch comparisons');
    return res.json();
}

export default function ComparisonsList() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['comparisons'],
        queryFn: fetchComparisons,
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading comparisons</div>;

    return (
        <div>
            <h2>Recent Comparisons</h2>
            <ul>
                {data?.map((comp) => (
                    <li key={comp.id}>
                        {comp.loanType} loan — {comp.requestedAmount} over{' '}
                        {comp.repaymentPeriod} months (logged at{' '}
                        {new Date(comp.createdAt).toLocaleString()})
                    </li>
                ))}
            </ul>
        </div>
    );
}
