'use client';

import { useState } from 'react';

export function ComparisonForm() {
    const [requestedAmount, setRequestedAmount] = useState('');
    const [repaymentPeriod, setRepaymentPeriod] = useState('');
    const [loanType, setLoanType] = useState('personal');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

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
                setMessage('Comparison logged successfully!');
                setRequestedAmount('');
                setRepaymentPeriod('');
                setLoanType('personal');
            } else {
                const err = await res.json();
                setMessage(`Error: ${err.message}`);
            }
        } catch (error) {
            setMessage('Network error');
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Log a Comparison</h2>
            <div>
                <label>Requested Amount:</label>
                <input
                    type='number'
                    value={requestedAmount}
                    onChange={(e) => setRequestedAmount(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Repayment Period (months):</label>
                <input
                    type='number'
                    value={repaymentPeriod}
                    onChange={(e) => setRepaymentPeriod(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Loan Type:</label>
                <select
                    value={loanType}
                    onChange={(e) => setLoanType(e.target.value)}
                >
                    <option value='personal'>Personal</option>
                    <option value='mortgage'>Mortgage</option>
                    <option value='car'>Car</option>
                </select>
            </div>
            <button type='submit'>Submit</button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default ComparisonForm;
