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
        <section className='mt-6'>
            <h2 className='text-lg font-semibold mb-3'>Recent Comparisons</h2>
            <ul className='relative border-l border-gray-300 pl-4 space-y-4 marker:text-color list-inside text-blue-500 [&>li>p]:inline [&>li>p]:text-blue-800'>
                {data?.map((comp) => (
                    <li
                        key={comp.id}
                        className='relative marker:text-grey-800'
                    >
                        <div className='text-sm'>
                            <strong>{comp.loanType}</strong> loan —{' '}
                            {comp.requestedAmount} EUR over{' '}
                            {comp.repaymentPeriod} months
                        </div>
                        <div className='text-xs text-gray-500'>
                            {new Date(comp.createdAt).toLocaleString()}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
