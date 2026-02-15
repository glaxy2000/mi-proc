import React from 'react';
import HistoricPricingView from '../components/pricing/HistoricPricingView';

export default function HistoricPricing() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Historic Pricing</h1>
          <p className="text-slate-500 mt-1">View past pricing for items from your suppliers</p>
        </div>
        <HistoricPricingView />
      </div>
    </div>
  );
}