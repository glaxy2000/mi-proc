import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign, TrendingUp, TrendingDown, AlertCircle, Plus,
  BarChart3, PieChart as PieIcon, CheckCircle2, Clock, Edit2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const budgets = [
  { id: 'BDG-001', name: 'IT & Technology', department: 'IT', total: 500000, committed: 280000, invoiced: 180000, spent: 180000, currency: 'SAR', period: 'FY 2024', color: '#6366f1' },
  { id: 'BDG-002', name: 'Operations & Facilities', department: 'Operations', total: 350000, committed: 120000, invoiced: 95000, spent: 95000, currency: 'SAR', period: 'FY 2024', color: '#14b8a6' },
  { id: 'BDG-003', name: 'HR & Consulting', department: 'HR', total: 200000, committed: 95000, invoiced: 45000, spent: 45000, currency: 'SAR', period: 'FY 2024', color: '#8b5cf6' },
  { id: 'BDG-004', name: 'Marketing & Events', department: 'Marketing', total: 150000, committed: 140000, invoiced: 130000, spent: 130000, currency: 'SAR', period: 'FY 2024', color: '#f59e0b' },
  { id: 'BDG-005', name: 'Security & Safety', department: 'Security', total: 180000, committed: 50000, invoiced: 30000, spent: 30000, currency: 'SAR', period: 'FY 2024', color: '#10b981' },
];

const monthlySpend = [
  { month: 'Jan', budget: 120, actual: 85 },
  { month: 'Feb', budget: 120, actual: 110 },
  { month: 'Mar', budget: 120, actual: 95 },
  { month: 'Apr', budget: 120, actual: 130 },
  { month: 'May', budget: 120, actual: 105 },
  { month: 'Jun', budget: 120, actual: 118 },
  { month: 'Jul', budget: 120, actual: 90 },
  { month: 'Aug', budget: 120, actual: 125 },
  { month: 'Sep', budget: 120, actual: 115 },
  { month: 'Oct', budget: 120, actual: 98 },
  { month: 'Nov', budget: 120, actual: 0 },
  { month: 'Dec', budget: 120, actual: 0 },
];

export default function BudgetManagement() {
  const [selectedBudget, setSelectedBudget] = useState(null);

  const totalBudget = budgets.reduce((s, b) => s + b.total, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const totalCommitted = budgets.reduce((s, b) => s + b.committed, 0);
  const totalRemaining = totalBudget - totalCommitted;
  const overBudget = budgets.filter(b => b.committed > b.total);

  const pieData = budgets.map(b => ({ name: b.name, value: b.total, color: b.color }));

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Budget Management</h1>
              <p className="text-emerald-100">Real-time spend visibility — committed, invoiced, and remaining funds across all departments.</p>
            </div>
            {overBudget.length > 0 && (
              <div className="bg-red-500/20 border border-red-300/30 rounded-xl px-4 py-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-200" />
                <span className="text-white text-sm font-medium">{overBudget.length} budget(s) near limit</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Budget', value: `SAR ${(totalBudget / 1000000).toFixed(2)}M`, sub: 'FY 2024', icon: DollarSign, color: 'bg-indigo-500' },
            { label: 'Total Spent', value: `SAR ${(totalSpent / 1000).toFixed(0)}K`, sub: `${((totalSpent / totalBudget) * 100).toFixed(0)}% of budget`, icon: TrendingUp, color: 'bg-emerald-500' },
            { label: 'Committed', value: `SAR ${(totalCommitted / 1000).toFixed(0)}K`, sub: 'POs & approved PRs', icon: Clock, color: 'bg-amber-500' },
            { label: 'Remaining', value: `SAR ${(totalRemaining / 1000).toFixed(0)}K`, sub: 'Available to spend', icon: CheckCircle2, color: 'bg-purple-500' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${s.color}`}><s.icon className="h-5 w-5 text-white" /></div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">{s.value}</p>
                    <p className="text-xs text-slate-500">{s.label}</p>
                    <p className="text-xs text-slate-400">{s.sub}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Monthly Spend Chart */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="h-4 w-4 text-indigo-600" />
                  Monthly Spend vs Budget (SAR '000)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlySpend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v) => `SAR ${v}K`} />
                      <Legend />
                      <Bar dataKey="budget" name="Budget" fill="#e0e7ff" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="actual" name="Actual Spend" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pie chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <PieIcon className="h-4 w-4 text-indigo-600" />
                Budget Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="45%" outerRadius={80} dataKey="value">
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => `SAR ${(v / 1000).toFixed(0)}K`} />
                    <Legend iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              Department Budgets — Live Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgets.map((b, i) => {
                const spentPct = (b.spent / b.total) * 100;
                const committedPct = (b.committed / b.total) * 100;
                const remaining = b.total - b.committed;
                const isWarning = committedPct > 80;
                const isOver = committedPct > 100;
                return (
                  <motion.div key={b.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className={`p-4 rounded-xl border ${isOver ? 'border-red-200 bg-red-50' : isWarning ? 'border-amber-200 bg-amber-50' : 'border-slate-100 bg-white'} hover:shadow-md transition-shadow`}>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ background: b.color }} />
                        <div>
                          <p className="font-semibold text-slate-900">{b.name}</p>
                          <p className="text-xs text-slate-500">{b.department} · {b.period}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {isOver ? <Badge className="bg-red-100 text-red-700">Over Budget</Badge> :
                          isWarning ? <Badge className="bg-amber-100 text-amber-700">Near Limit</Badge> :
                            <Badge className="bg-emerald-100 text-emerald-700">On Track</Badge>}
                      </div>
                    </div>
                    <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden mb-2">
                      <div className="absolute left-0 h-full rounded-full opacity-40" style={{ width: `${Math.min(committedPct, 100)}%`, background: b.color }} />
                      <div className="absolute left-0 h-full rounded-full" style={{ width: `${Math.min(spentPct, 100)}%`, background: b.color }} />
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div><p className="text-slate-400">Total Budget</p><p className="font-semibold text-slate-700">SAR {(b.total / 1000).toFixed(0)}K</p></div>
                      <div><p className="text-slate-400">Committed</p><p className="font-semibold text-amber-600">SAR {(b.committed / 1000).toFixed(0)}K</p></div>
                      <div><p className="text-slate-400">Invoiced</p><p className="font-semibold text-indigo-600">SAR {(b.invoiced / 1000).toFixed(0)}K</p></div>
                      <div><p className="text-slate-400">Remaining</p><p className={`font-semibold ${remaining < 0 ? 'text-red-600' : 'text-emerald-600'}`}>SAR {(remaining / 1000).toFixed(0)}K</p></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}