import React, { useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Filter, TrendingUp, Truck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const regions = ['All Regions', 'Saudi Arabia', 'GCC', 'International'];
const categories = ['All Categories', 'IT & Hardware', 'Office Supplies', 'Manufacturing', 'Services', 'Raw Materials'];

const COLORS = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function SupplierMetricsDashboard() {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Fetch suppliers
  const { data: suppliers = [] } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => base44.entities.SupplierPerformance.list(),
  });

  // Fetch pricing data
  const { data: pricingData = [] } = useQuery({
    queryKey: ['historicalPricing'],
    queryFn: () => base44.entities.HistoricPricing.list(),
  });

  // Filter data based on selections
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier => {
      const regionMatch = selectedRegion === 'All Regions' || supplier.region === selectedRegion;
      const categoryMatch = selectedCategory === 'All Categories' || supplier.category === selectedCategory;
      return regionMatch && categoryMatch;
    });
  }, [suppliers, selectedRegion, selectedCategory]);

  const filteredPricingData = useMemo(() => {
    return pricingData.filter(item => {
      const supplier = suppliers.find(s => s.supplier_email === item.supplier_email);
      if (!supplier) return false;
      const regionMatch = selectedRegion === 'All Regions' || supplier.region === selectedRegion;
      const categoryMatch = selectedCategory === 'All Categories' || item.item_name === selectedCategory || supplier.category === selectedCategory;
      return regionMatch && categoryMatch;
    });
  }, [pricingData, suppliers, selectedRegion, selectedCategory]);

  // Calculate on-time delivery trend data
  const deliveryTrendData = useMemo(() => {
    const monthlyData = {};
    filteredPricingData.forEach(item => {
      if (!item.order_date) return;
      const date = new Date(item.order_date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { onTimeCount: 0, totalCount: 0, month: monthKey };
      }
      monthlyData[monthKey].totalCount += 1;
      if (item.actual_delivery_days && item.actual_delivery_days <= 30) {
        monthlyData[monthKey].onTimeCount += 1;
      }
    });

    return Object.values(monthlyData)
      .sort((a, b) => a.month.localeCompare(b.month))
      .map(item => ({
        ...item,
        rate: item.totalCount > 0 ? Math.round((item.onTimeCount / item.totalCount) * 100) : 0,
      }))
      .slice(-12);
  }, [filteredPricingData]);

  // Calculate quality score trends
  const qualityTrendData = useMemo(() => {
    return filteredSuppliers
      .sort((a, b) => (b.quality_score || 0) - (a.quality_score || 0))
      .slice(0, 10)
      .map(supplier => ({
        name: supplier.supplier_email.split('@')[0],
        quality: supplier.quality_score || 0,
        communication: supplier.communication_score || 0,
        delivery: supplier.delivery_score || 0,
      }));
  }, [filteredSuppliers]);

  // Calculate spend distribution
  const spendDistribution = useMemo(() => {
    const spendBySupplier = {};
    filteredPricingData.forEach(item => {
      const supplierEmail = item.supplier_email;
      if (!spendBySupplier[supplierEmail]) {
        spendBySupplier[supplierEmail] = 0;
      }
      spendBySupplier[supplierEmail] += item.total_price || 0;
    });

    return Object.entries(spendBySupplier)
      .map(([name, value]) => ({
        name: name.split('@')[0],
        value: Math.round(value),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [filteredPricingData]);

  // Summary metrics
  const metrics = useMemo(() => {
    const avgOnTimeRate = filteredSuppliers.length > 0
      ? Math.round(
          filteredSuppliers.reduce((sum, s) => sum + (s.on_time_delivery_rate || 0), 0) /
            filteredSuppliers.length
        )
      : 0;

    const avgQualityScore = filteredSuppliers.length > 0
      ? Math.round(
          filteredSuppliers.reduce((sum, s) => sum + (s.quality_score || 0), 0) /
            filteredSuppliers.length
        )
      : 0;

    const totalSpend = filteredPricingData.reduce((sum, item) => sum + (item.total_price || 0), 0);

    return { avgOnTimeRate, avgQualityScore, totalSpend };
  }, [filteredSuppliers, filteredPricingData]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Supplier Metrics Dashboard</h1>
          <p className="text-slate-600">Track on-time delivery, quality scores, and spend distribution</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <Card className="mb-8 border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-end gap-4 flex-wrap">
              <Filter className="h-5 w-5 text-slate-400 mt-6" />
              <div className="flex-1 min-w-48">
                <label className="text-sm font-medium text-slate-700 block mb-2">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-48">
                <label className="text-sm font-medium text-slate-700 block mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => {
                  setSelectedRegion('All Regions');
                  setSelectedCategory('All Categories');
                }}
                variant="outline"
              >
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Metrics */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-md bg-gradient-to-br from-emerald-50 to-teal-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Avg On-Time Delivery</p>
                    <p className="text-3xl font-bold text-emerald-600">{metrics.avgOnTimeRate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Truck className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Avg Quality Score</p>
                    <p className="text-3xl font-bold text-blue-600">{metrics.avgQualityScore}</p>
                    <p className="text-xs text-slate-500 mt-1">out of 5</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Total Spend</p>
                    <p className="text-3xl font-bold text-purple-600">
                      SAR {(metrics.totalSpend / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{filteredPricingData.length} transactions</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* On-Time Delivery Trend */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">On-Time Delivery Rate Trend</CardTitle>
                <p className="text-sm text-slate-500 mt-1">Last 12 months</p>
              </CardHeader>
              <CardContent>
                {deliveryTrendData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={deliveryTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: '#10b981', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-80 flex items-center justify-center text-slate-500">
                    No data available
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quality Score Trends */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Quality Score Comparison</CardTitle>
                <p className="text-sm text-slate-500 mt-1">Top 10 suppliers</p>
              </CardHeader>
              <CardContent>
                {qualityTrendData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={qualityTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#94a3b8" angle={-45} textAnchor="end" height={80} />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="quality" fill="#4f46e5" name="Quality" />
                      <Bar dataKey="communication" fill="#06b6d4" name="Communication" />
                      <Bar dataKey="delivery" fill="#10b981" name="Delivery" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-80 flex items-center justify-center text-slate-500">
                    No data available
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Spend Distribution */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="lg:col-span-2">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Spend Distribution by Supplier</CardTitle>
                <p className="text-sm text-slate-500 mt-1">Top 8 suppliers by total spend</p>
              </CardHeader>
              <CardContent>
                {spendDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                      data={spendDistribution}
                      layout="vertical"
                      margin={{ left: 100, right: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" stroke="#94a3b8" />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" width={95} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                        }}
                        formatter={(value) => `SAR ${value.toLocaleString()}`}
                      />
                      <Bar dataKey="value" fill="#4f46e5" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-80 flex items-center justify-center text-slate-500">
                    No data available
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}