import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Clock,
  BarChart3,
  Calendar,
  ArrowLeftRight,
  Heart,
  Sparkles,
  Ban,
  Shield,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Analytics() {
  const [dateRange, setDateRange] = React.useState('last_6_months');
  const [viewMode, setViewMode] = React.useState('buyer');
  const selectedRole = localStorage.getItem('selectedRole') || 'buyer';
  // Buyer KPIs
  const buyerKpis = [
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

  // Supplier KPIs
  const supplierKpis = [
    {
      title: 'Total Revenue',
      value: 'SAR 8.9M',
      change: '+22.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-emerald-500'
    },
    {
      title: 'Average Deal Size',
      value: 'SAR 128,400',
      change: '+15.1%',
      trend: 'up',
      icon: Package,
      color: 'bg-indigo-500'
    },
    {
      title: 'Active Buyers',
      value: '89',
      change: '+12',
      trend: 'up',
      icon: Users,
      color: 'bg-teal-500'
    },
    {
      title: 'Win Rate',
      value: '68%',
      change: '+5.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  const kpis = viewMode === 'buyer' ? buyerKpis : supplierKpis;

  // Spending data over time
  const spendingTrend = [
    { month: 'Aug 2025', buyer: 1.8, supplier: 1.2 },
    { month: 'Sep 2025', buyer: 2.2, supplier: 1.5 },
    { month: 'Oct 2025', buyer: 2.0, supplier: 1.4 },
    { month: 'Nov 2025', buyer: 2.8, supplier: 2.0 },
    { month: 'Dec 2025', buyer: 2.5, supplier: 1.8 },
    { month: 'Jan 2026', buyer: 3.4, supplier: 2.5 }
  ];

  const buyerCategoryBreakdown = [
    { category: 'Construction Materials', amount: 4.2, percentage: 34, color: '#6366f1' },
    { category: 'Office Equipment', amount: 2.8, percentage: 23, color: '#14b8a6' },
    { category: 'Medical Supplies', amount: 2.1, percentage: 17, color: '#a855f7' },
    { category: 'Raw Materials', amount: 1.9, percentage: 15, color: '#f59e0b' },
    { category: 'IT & Hardware', amount: 1.4, percentage: 11, color: '#10b981' }
  ];

  const supplierCategoryBreakdown = [
    { category: 'Construction Materials', amount: 3.1, percentage: 35, color: '#6366f1' },
    { category: 'Office Equipment', amount: 1.9, percentage: 21, color: '#14b8a6' },
    { category: 'Medical Supplies', amount: 1.6, percentage: 18, color: '#a855f7' },
    { category: 'Raw Materials', amount: 1.4, percentage: 16, color: '#f59e0b' },
    { category: 'IT & Hardware', amount: 0.9, percentage: 10, color: '#10b981' }
  ];

  const categoryBreakdown = viewMode === 'buyer' ? buyerCategoryBreakdown : supplierCategoryBreakdown;

  const topSuppliers = [
    { name: 'ABC Steel Co.', orders: 24, value: 'SAR 3.2M', rating: 4.8, isFavorite: true, isNew: false },
    { name: 'TechSupply Ltd.', orders: 18, value: 'SAR 2.1M', rating: 4.6, isFavorite: true, isNew: false },
    { name: 'MedSupply International', orders: 15, value: 'SAR 1.8M', rating: 4.9, isFavorite: false, isNew: true },
    { name: 'Industrial Parts Inc.', orders: 12, value: 'SAR 1.4M', rating: 4.5, isFavorite: false, isNew: false }
  ];

  const supplierDistribution = [
    { name: 'Favorites', value: 45, color: '#ec4899' },
    { name: 'Regular', value: 98, color: '#6366f1' },
    { name: 'New', value: 13, color: '#a855f7' },
    { name: 'Blacklisted', value: 8, color: '#ef4444' }
  ];

  const regionalData = [
    { region: 'Riyadh', orders: 145, value: 4.8 },
    { region: 'Jeddah', orders: 98, value: 3.2 },
    { region: 'Dammam', orders: 76, value: 2.5 },
    { region: 'Mecca', orders: 54, value: 1.8 },
    { region: 'Other', orders: 42, value: 1.4 }
  ];

  const bidAnalytics = [
    { month: 'Aug', received: 45, accepted: 28, rejected: 12, pending: 5 },
    { month: 'Sep', received: 58, accepted: 35, rejected: 15, pending: 8 },
    { month: 'Oct', received: 52, accepted: 32, rejected: 14, pending: 6 },
    { month: 'Nov', received: 68, accepted: 42, rejected: 18, pending: 8 },
    { month: 'Dec', received: 61, accepted: 38, rejected: 16, pending: 7 },
    { month: 'Jan', received: 74, accepted: 48, rejected: 19, pending: 7 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics Dashboard</h1>
              <p className="text-slate-600">Comprehensive insights and performance metrics</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-48">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                  <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                  <SelectItem value="last_3_months">Last 3 Months</SelectItem>
                  <SelectItem value="last_6_months">Last 6 Months</SelectItem>
                  <SelectItem value="last_year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Role Toggle */}
          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border">
            <ArrowLeftRight className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">View as:</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={viewMode === 'buyer' ? 'default' : 'outline'}
                onClick={() => setViewMode('buyer')}
                className={viewMode === 'buyer' ? 'bg-indigo-600' : ''}
              >
                Buyer
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'supplier' ? 'default' : 'outline'}
                onClick={() => setViewMode('supplier')}
                className={viewMode === 'supplier' ? 'bg-indigo-600' : ''}
              >
                Supplier
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'comparison' ? 'default' : 'outline'}
                onClick={() => setViewMode('comparison')}
                className={viewMode === 'comparison' ? 'bg-indigo-600' : ''}
              >
                Comparison
              </Button>
            </div>
          </div>
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

        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="bids">Bids</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Category Breakdown - Bar Chart */}
              <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                Spending by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="category" tick={{ fontSize: 12 }} angle={-15} textAnchor="end" height={80} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => `SAR ${value}M`}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                  <Bar dataKey="amount" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Breakdown - Pie Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-teal-600" />
                Category Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [`${value}% (SAR ${props.payload.amount}M)`, props.payload.category]}
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value, entry) => entry.payload.category}
                  />
                </PieChart>
              </ResponsiveContainer>
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
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-slate-900">{supplier.name}</p>
                                {supplier.isFavorite && <Heart className="h-3 w-3 text-pink-600 fill-pink-600" />}
                                {supplier.isNew && <Badge className="bg-purple-100 text-purple-700 text-xs"><Sparkles className="h-2 w-2 mr-1" />New</Badge>}
                              </div>
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
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Supplier Distribution */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-indigo-600" />
                    Supplier Classification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={supplierDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {supplierDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {supplierDistribution.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <div>
                          <p className="text-xs text-slate-500">{item.name}</p>
                          <p className="text-lg font-bold text-slate-900">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Supplier Stats */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Supplier Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-pink-50 border border-pink-200 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="h-5 w-5 text-pink-600" />
                      <h3 className="font-semibold text-pink-900">Favorite Suppliers</h3>
                    </div>
                    <p className="text-2xl font-bold text-pink-900">45</p>
                    <p className="text-sm text-pink-700">28% of total suppliers</p>
                    <p className="text-xs text-pink-600 mt-2">Avg order value: SAR 168,500</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      <h3 className="font-semibold text-purple-900">New Suppliers</h3>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">13</p>
                    <p className="text-sm text-purple-700">Joined in last 30 days</p>
                    <p className="text-xs text-purple-600 mt-2">8 pending KYB verification</p>
                  </div>

                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Ban className="h-5 w-5 text-red-600" />
                      <h3 className="font-semibold text-red-900">Blacklisted</h3>
                    </div>
                    <p className="text-2xl font-bold text-red-900">8</p>
                    <p className="text-sm text-red-700">Due to compliance issues</p>
                    <p className="text-xs text-red-600 mt-2">0 appeals pending</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bids" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-indigo-600" />
                  Bid Analytics Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={bidAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                    <Legend />
                    <Bar dataKey="received" fill="#6366f1" name="Received" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="accepted" fill="#10b981" name="Accepted" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="rejected" fill="#ef4444" name="Rejected" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pending" fill="#f59e0b" name="Pending" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-teal-600" />
                  Regional Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={regionalData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="region" type="category" tick={{ fontSize: 12 }} width={80} />
                    <Tooltip 
                      formatter={(value, name) => [name === 'value' ? `SAR ${value}M` : value, name === 'value' ? 'Value' : 'Orders']}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Bar dataKey="orders" fill="#6366f1" name="Orders" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            {/* Spending Trend Over Time */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>
                  {viewMode === 'comparison' ? 'Financial Comparison' : `${viewMode === 'buyer' ? 'Procurement' : 'Revenue'} Trend`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={spendingTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} label={{ value: 'Amount (SAR M)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      formatter={(value) => `SAR ${value}M`}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    />
                    <Legend />
                    {viewMode === 'comparison' ? (
                      <>
                        <Line 
                          type="monotone" 
                          dataKey="buyer" 
                          stroke="#6366f1" 
                          strokeWidth={3}
                          dot={{ fill: '#6366f1', r: 5 }}
                          name="Buyer Spending"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="supplier" 
                          stroke="#14b8a6" 
                          strokeWidth={3}
                          dot={{ fill: '#14b8a6', r: 5 }}
                          name="Supplier Revenue"
                        />
                      </>
                    ) : (
                      <Line 
                        type="monotone" 
                        dataKey={viewMode === 'buyer' ? 'buyer' : 'supplier'}
                        stroke={viewMode === 'buyer' ? '#6366f1' : '#14b8a6'}
                        strokeWidth={3}
                        dot={{ fill: viewMode === 'buyer' ? '#6366f1' : '#14b8a6', r: 5 }}
                        name={viewMode === 'buyer' ? 'Procurement' : 'Revenue'}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}