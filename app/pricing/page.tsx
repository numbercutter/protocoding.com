import { Metadata } from 'next';
import PricingCards from '@/components/PricingCards';

export const metadata: Metadata = {
  title: 'Pricing - Protocoding',
  description: 'Transparent pricing.',
};

export default function PricingPage() {
  return (
    <div className="material">
      <div className="p-10 lg:p-12 cell material-elevated">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Pricing</p>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Simple, transparent pricing</h1>
        <p className="text-sm text-gray-500">Choose the plan that fits your project.</p>
      </div>
      <PricingCards />
    </div>
  );
}
