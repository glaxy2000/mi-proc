import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function BudgetAlert({ budget, totalAmount, isDanger = false, isWarning = false }) {
  if (!budget) return null;

  const remaining = budget.allocated_amount - (budget.spent_amount || 0) - (budget.pending_amount || 0);
  const willRemain = remaining - totalAmount;
  const newPercentage = Math.round(((budget.spent_amount || 0) + (budget.pending_amount || 0) + totalAmount) / budget.allocated_amount * 100);

  return (
    <Card className={`border-0 ${isDanger ? 'bg-red-50 border-l-4 border-red-500' : 'bg-amber-50 border-l-4 border-amber-500'}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {isDanger ? (
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          ) : (
            <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className={`font-semibold ${isDanger ? 'text-red-900' : 'text-amber-900'}`}>
                Budget Alert
              </p>
              <Badge className={isDanger ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}>
                {isDanger ? 'Over Limit' : 'Warning'}
              </Badge>
            </div>
            <p className={`text-sm ${isDanger ? 'text-red-800' : 'text-amber-800'}`}>
              {budget.name} - {isDanger ? 'This purchase order exceeds remaining budget' : 'This purchase order will exceed the alert threshold'}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className={isDanger ? 'text-red-700' : 'text-amber-700'}>Remaining Budget</p>
                <p className="font-bold">SAR {remaining.toLocaleString()}</p>
              </div>
              <div>
                <p className={isDanger ? 'text-red-700' : 'text-amber-700'}>After This Order</p>
                <p className={`font-bold ${willRemain < 0 ? 'text-red-600' : ''}`}>
                  SAR {willRemain.toLocaleString()}
                </p>
              </div>
              <div>
                <p className={isDanger ? 'text-red-700' : 'text-amber-700'}>New Utilization</p>
                <p className="font-bold">{newPercentage}%</p>
              </div>
              <div>
                <p className={isDanger ? 'text-red-700' : 'text-amber-700'}>Threshold</p>
                <p className="font-bold">{budget.threshold_percentage || 80}%</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}