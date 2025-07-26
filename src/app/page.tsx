import { LoanOffers } from '../app/components/LoanOffers';
import { ComparisonForm } from './components/ComparisonForm';
import ComparisonsList from './components/ComparisonsList';
export default function Home() {
    return (
        <main>
            <h1>Welcome to the Loan Comparing App</h1>
            <LoanOffers />
            <ComparisonForm />
            <ComparisonsList />
        </main>
    );
}
