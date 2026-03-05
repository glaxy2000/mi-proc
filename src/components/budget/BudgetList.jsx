import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function BudgetList({ budgets, onEdit, onDelete }) {
  if (budgets.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600">No budgets created for this year</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {budgets.map((budget, idx) => {
        const used = (budget.spent_amount || 0) + (budget.pending_amount || 0);
        const remaining = budget.allocated_amount - used;
        const percentage = Math.round((used / budget.allocated_amount) * 100);
        const isAlert = percentage >= (budget.threshold_percentage || 80);
        const isDanger = percentage >= 100;

        return (
          <motion.div
            key={budget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className={`border-0 shadow-md ${isDanger ? 'border-l-4 border-red-500' : isAlert ? 'border-l-4 border-amber-500' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{budget.name}</h3>
                      {!budget.active && (
                        <Badge className="bg-slate-200 text-slate-700">Inactive</Badge>
                      )}
                      {isAlert && (
                        <Badge className={isDanger ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}>
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {isDanger ? 'Over Budget' : 'Alert'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">
                      {budget.type === 'department' ? 'Department: ' : 'Project: '}
                      <span className="font-medium">{budget.department_or_project}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      onClick={() => onEdit(budget)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => onDelete(budget.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Budget Utilization</span>
                    <span className={`font-bold ${isDanger ? 'text-red-600' : isAlert ? 'text-amber-600' : 'text-slate-900'}`}>
                      {percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        isDanger ? 'bg-red-500' : isAlert ? 'bg-amber-500' : 'bg-indigo-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Budget Breakdown */}
                <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Allocated</p>
                    <p className="font-bold text-slate-900">
                      SAR {(budget.allocated_amount / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Spent</p>
                    <p className="font-bold text-slate-900">
                      SAR {((budget.spent_amount || 0) / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Pending</p>
                    <p className="font-bold text-amber-600">
                      SAR {((budget.pending_amount || 0) / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Remaining</p>
                    <p className={`font-bold ${remaining < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                      SAR {(remaining / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}