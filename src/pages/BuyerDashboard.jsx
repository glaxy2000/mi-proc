import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  DollarSign,
  ArrowUpRight,
  Plus,
  Building2,
  Clock,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = React.useState({
    full_name: 'Ahmed Al-Sayed',
    company: 'SME Corporation Ltd.',
    role: 'buyer'
  });

  const stats = [
    {
      title: 'Active RFQs',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: FileText,
      color: 'bg-indigo-500'
    },
    {
      title: 'Bids Received',
      value: '48',
      change: '+12',
      trend: 'up',
      icon: Users,
      color: 'bg-teal-500'
    },
    {
      title: 'Pending Orders',
      value: '8',
      change: '2',
      trend: 'up',
      icon: Clock,
      color: 'bg-amber-500'
    },
    {
      title: 'Total Spend (MTD)',
      value: 'SAR 2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-emerald-500'
    }
  ];

  const recentRFQs = [
    { id: 'RFQ-2024-001', title: 'Construction Materials - Steel Rebar', status: 'active', quotes: 8, value: 'SAR 150,000', deadline: '3 days' },
    { id: 'RFQ-2024-002', title: 'Office Equipment - IT Hardware', status: 'negotiating', quotes: 5, value: 'SAR 45,000', deadline: '5 days' },
    { id: 'RFQ-2024-003', title: 'Medical Supplies - PPE', status: 'completed', quotes: 12, value: 'SAR 85,000', deadline: 'Closed' },
    { id: 'RFQ-2024-004', title: 'Raw Materials - Aluminum Sheets', status: 'pending', quotes: 0, value: 'SAR 220,000', deadline: '7 days' }
  ];

  const escrowTransactions = [
    { id: 'ESC-001', supplier: 'ABC Steel Co.', amount: 'SAR 75,000', status: 'held', progress: 60 },
    { id: 'ESC-002', supplier: 'MedSupply Ltd.', amount: 'SAR 42,500', status: 'released', progress: 100 },
    { id: 'ESC-003', supplier: 'TechParts Inc.', amount: 'SAR 28,000', status: 'pending', progress: 30 }
  ];

  const statusColors = {
    active: 'bg-teal-100 text-teal-700',
    negotiating: 'bg-amber-100 text-amber-700',
    completed: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-slate-100 text-slate-700'
  };

  const escrowStatusColors = {
    held: 'bg-amber-100 text-amber-700',
    released: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-slate-100 text-slate-700'
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user.full_name}! 👋
              </h1>
              <div className="flex items-center gap-2 text-indigo-100">
                <Building2 className="h-5 w-5" />
                <span className="text-lg">{user.company}</span>
              </div>
              <p className="text-indigo-100 mt-3">
                Here's your procurement overview and latest opportunities.
              </p>
            </div>
            <div className="hidden md:block">
              <Link to={createPageUrl('Wallet')}>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Wallet className="h-4 w-4 mr-2" />
                  Mi-Wallet
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-white border border-slate-200 rounded-lg">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="workflows">Workflows</TabsTrigger>
              <TabsTrigger value="budgets">Budgets</TabsTrigger>
              <TabsTrigger value="comparison">Supplier Comparison</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Tab Content */}
        <TabsContent value="overview">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-xl ${stat.color}`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center gap-1 text-sm text-emerald-600">
                        <ArrowUpRight className="h-4 w-4" />
                        {stat.change}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                      <p className="text-sm text-slate-500">{stat.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent RFQs */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Recent RFQs</CardTitle>
                  <Link to={createPageUrl('RFQList')}>
                    <Button variant="ghost" size="sm" className="text-indigo-600">
                      View All
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRFQs.map((rfq, index) => (
                      <motion.div
                        key={rfq.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{rfq.title}</p>
                            <p className="text-sm text-slate-500">{rfq.id} • {rfq.quotes} quotes</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">{rfq.value}</p>
                          <div className="flex items-center gap-2 justify-end mt-1">
                            <Badge className={statusColors[rfq.status]}>
                              {rfq.status}
                            </Badge>
                            <span className="text-xs text-slate-500">{rfq.deadline}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Escrow Status */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Escrow Status</CardTitle>
                  <Link to={createPageUrl('Escrow')}>
                    <Button variant="ghost" size="sm" className="text-indigo-600">
                      View All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {escrowTransactions.map((tx, index) => (
                      <motion.div
                        key={tx.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-slate-50 rounded-xl"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-medium text-slate-900">{tx.supplier}</p>
                            <p className="text-sm text-slate-500">{tx.id}</p>
                          </div>
                          <Badge className={escrowStatusColors[tx.status]}>
                            {tx.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Amount</span>
                            <span className="font-semibold text-slate-900">{tx.amount}</span>
                          </div>
                          <Progress value={tx.progress} className="h-2" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to={createPageUrl('CreateRFQ')}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Plus className="h-6 w-6 text-indigo-600" />
                    </div>
                    <p className="font-medium text-slate-900">Create New RFQ</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to={createPageUrl('Bids')}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-teal-600" />
                    </div>
                    <p className="font-medium text-slate-900">View Active Bids</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to={createPageUrl('Orders')}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="font-medium text-slate-900">Track Shipments</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to={createPageUrl('Suppliers')}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-emerald-600" />
                    </div>
                    <p className="font-medium text-slate-900">Browse Suppliers</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="workflows">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Approval Workflows</CardTitle>
            </CardHeader>
            <CardContent className="py-12 text-center">
              <p className="text-slate-600 mb-4">Manage and track approval workflows for your purchase orders</p>
              <Link to={createPageUrl('WorkflowConfiguration')}>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Go to Workflow Configuration
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budgets">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Budget Management</CardTitle>
            </CardHeader>
            <CardContent className="py-12 text-center">
              <p className="text-slate-600 mb-4">Set spending limits and monitor budget utilization</p>
              <Link to={createPageUrl('BudgetManagement')}>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  View Budgets
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Supplier Comparison</CardTitle>
            </CardHeader>
            <CardContent className="py-12 text-center">
              <p className="text-slate-600 mb-4">Compare suppliers side-by-side for better decisions</p>
              <Link to={createPageUrl('SupplierComparison')}>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Compare Suppliers
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </div>
  );
}