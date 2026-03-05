import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, AlertTriangle, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import BudgetForm from '@/components/budget/BudgetForm';
import BudgetList from '@/components/budget/BudgetList';

const currentYear = new Date().getFullYear().toString();

export default function BudgetManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const queryClient = useQueryClient();

  const { data: budgets = [] } = useQuery({
    queryKey: ['budgets', selectedYear],
    queryFn: () => base44.entities.Budget.filter({ fiscal_year: selectedYear }),
  });

  const { data: orders = [] } = useQuery({
    queryKey: ['goodsOrders'],
    queryFn: () => base44.entities.GoodsOrder.list(),
  });

  const deleteBudget = useMutation({
    mutationFn: (id) => base44.entities.Budget.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingBudget(null);
  };

  // Calculate budget metrics
  const totalAllocated = budgets.reduce((sum, b) => sum + (b.allocated_amount || 0), 0);
  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent_amount || 0), 0);
  const totalPending = budgets.reduce((sum, b) => sum + (b.pending_amount || 0), 0);
  const utilizationRate = totalAllocated > 0 ? Math.round(((totalSpent + totalPending) / totalAllocated) * 100) : 0;

  const alertBudgets = budgets.filter(budget => {
    const used = (budget.spent_amount || 0) + (budget.pending_amount || 0);
    const percentage = budget.allocated_amount > 0 ? (used / budget.allocated_amount) * 100 : 0;
    return percentage >= (budget.threshold_percentage || 80);
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Budget Management</h1>
              <p className="text-slate-600 mt-1">Set spending limits and monitor budget utilization</p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Budget
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {showForm ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <BudgetForm
              budget={editingBudget}
              onClose={handleClose}
              onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: ['budgets'] });
                handleClose();
              }}
            />
          </motion.div>
        ) : (
          <>
            {/* Year Filter */}
            <Card className="mb-8 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-end gap-4">
                  <div className="flex-1 max-w-xs">
                    <label className="text-sm font-medium text-slate-700 block mb-2">Fiscal Year</label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[2024, 2025, 2026, 2027].map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-0 shadow-md bg-gradient-to-br from-indigo-50 to-blue-50">
                  <CardContent className="p-6">
                    <p className="text-sm text-slate-600 mb-1">Total Allocated</p>
                    <p className="text-3xl font-bold text-indigo-600">SAR {(totalAllocated / 1000).toFixed(0)}K</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="border-0 shadow-md bg-gradient-to-br from-emerald-50 to-teal-50">
                  <CardContent className="p-6">
                    <p className="text-sm text-slate-600 mb-1">Total Spent</p>
                    <p className="text-3xl font-bold text-emerald-600">SAR {(totalSpent / 1000).toFixed(0)}K</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-orange-100">
                  <CardContent className="p-6">
                    <p className="text-sm text-slate-600 mb-1">Pending Approval</p>
                    <p className="text-3xl font-bold text-amber-600">SAR {(totalPending / 1000).toFixed(0)}K</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className={`border-0 shadow-md ${utilizationRate >= 80 ? 'bg-gradient-to-br from-red-50 to-pink-100' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
                  <CardContent className="p-6">
                    <p className="text-sm text-slate-600 mb-1">Utilization Rate</p>
                    <p className={`text-3xl font-bold ${utilizationRate >= 80 ? 'text-red-600' : 'text-slate-900'}`}>
                      {utilizationRate}%
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Alerts */}
            {alertBudgets.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
                <Card className="border-l-4 border-red-500 bg-red-50 border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base text-red-900 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Budget Alerts ({alertBudgets.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {alertBudgets.map((budget) => {
                        const used = (budget.spent_amount || 0) + (budget.pending_amount || 0);
                        const percentage = Math.round((used / budget.allocated_amount) * 100);
                        const remaining = budget.allocated_amount - used;
                        return (
                          <div key={budget.id} className="text-sm text-red-800">
                            <span className="font-semibold">{budget.name}</span> - {percentage}% utilized 
                            (SAR {remaining.toLocaleString()} remaining)
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Budget List */}
            <BudgetList
              budgets={budgets}
              onEdit={handleEdit}
              onDelete={(id) => deleteBudget.mutate(id)}
            />
          </>
        )}
      </div>
    </div>
  );
}