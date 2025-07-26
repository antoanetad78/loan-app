export function calculateLoanDetails(
    amount: number,
    rate: number,
    months: number
) {
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment =
        (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    const totalRepayment = monthlyPayment * months;
    const totalInterest = totalRepayment - amount;
    return {
        monthlyPayment: Math.round(monthlyPayment * 100) / 100,
        totalRepayment: Math.round(totalRepayment * 100) / 100,
        principal: amount,
        totalInterest: Math.round(totalInterest * 100) / 100,
    };
}
