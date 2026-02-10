import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Clock,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Analytics() {
  const kpis = [
    {
      title: 'Total Procurement Value',
      value: 'SAR 12.4M',
      change: '+18.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-emerald-500'
    },
    {
      title: 'Average Order Value',
      value: 'SAR 145,250',
      change: '+12.3%',
      trend: 'up',
      icon: Package,
      color: 'bg-indigo-500'
    },
    {
      title: 'Active Suppliers',
      value: '156',
      change: '+8',
      trend: 'up',
      icon: Users,
      color: 'bg-teal-500'
    },
    {
      title: 'Avg. Procurement Cycle',
      value: '5.2 days',
      change: '-2.1 days',
      trend: 'down',
      icon: Clock,
      color: 'bg-purple-500'
    }
  ];

  const categoryBreakdown = [
    { category: 'Construction Materials', amount: 'SAR 4.2M', percentage: 34, color: 'bg-indigo-500' },
    { category: 'Office Equipment', amount: 'SAR 2.8M', percentage: 23, color: 'bg-teal-500' },
    { category: 'Medical Supplies', amount: 'SAR 2.1M', percentage: 17, color: 'bg-purple-500' },
    { category: 'Raw Materials', amount: 'SAR 1.9M', percentage: 15, color: 'bg-amber-500' },
    { category: 'IT & Hardware', amount: 'SAR 1.4M', percentage: 11, color: 'bg-emerald-500' }
  ];

  const topSuppliers = [
    { name: 'ABC Steel Co.', orders: 24, value: 'SAR 3.2M', rating: 4.8 },
    { name: 'TechSupply Ltd.', orders: 18, value: 'SAR 2.1M', rating: 4.6 },
    { name: 'MedSupply International', orders: 15, value: 'SAR 1.8M', rating: 4.9 },
    { name: 'Industrial Parts Inc.', orders: 12, value: 'SAR 1.4M', rating: 4.5 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Procurement Analytics</h1>
          <p className="text-slate-600">View detailed reports and insights</p>
        </div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${kpi.color}`}>
                      <kpi.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {kpi.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {kpi.change}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                  <p className="text-sm text-slate-500">{kpi.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Category Breakdown */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                Spending by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryBreakdown.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900">{item.category}</span>
                      <span className="text-sm font-semibold text-slate-700">{item.amount}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color} rounded-full transition-all duration-500`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-500 w-12 text-right">{item.percentage}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Suppliers */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-600" />
                Top Suppliers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSuppliers.map((supplier, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-indigo-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{supplier.name}</p>
                          <p className="text-sm text-slate-500">{supplier.orders} orders</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700">★ {supplier.rating}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900">{supplier.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trend */}
        <Card className="border-0 shadow-lg mt-6">
          <CardHeader>
            <CardTitle>Procurement Trend (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-4">
              {['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'].map((month, index) => {
                const heights = [40, 55, 48, 70, 62, 85];
                return (
                  <div key={month} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heights[index]}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg"
                    />
                    <span className="text-sm text-slate-600">{month}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}