import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  FileText,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Wallet,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function Dashboard() {
  // Determine user role - in production this should come from base44.auth.me()
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // In production: const user = await base44.auth.me(); setUser(user);
    const path = window.location.pathname;
    if (path.includes('Supplier')) {
      setUser({
        full_name: 'Ahmed Al-Mansour',
        company: 'Al-Mansour Trading Co.',
        role: 'supplier'
      });
    } else {
      setUser({
        full_name: 'Khalid Al-Salem',
        company: 'SME Corporation Ltd.',
        role: 'buyer'
      });
    }
  }, []);

  const userRole = user?.role || 'buyer';

  const buyerStats = [
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

  const supplierStats = [
    {
      title: 'New RFQs',
      value: '18',
      change: '+5',
      trend: 'up',
      icon: FileText,
      color: 'bg-indigo-500'
    },
    {
      title: 'Bids Submitted',
      value: '32',
      change: '+8',
      trend: 'up',
      icon: Users,
      color: 'bg-teal-500'
    },
    {
      title: 'Active Orders',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: CheckCircle2,
      color: 'bg-purple-500'
    },
    {
      title: 'Total Earnings (MTD)',
      value: 'SAR 1.8M',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-emerald-500'
    }
  ];

  const stats = userRole === 'buyer' ? buyerStats : supplierStats;

  const buyerRecentRFQs = [
    { id: 'RFQ-2024-001', title: 'Construction Materials - Steel Rebar', status: 'active', quotes: 8, value: 'SAR 150,000', deadline: '3 days' },
    { id: 'RFQ-2024-002', title: 'Office Equipment - IT Hardware', status: 'negotiating', quotes: 5, value: 'SAR 45,000', deadline: '5 days' },
    { id: 'RFQ-2024-003', title: 'Medical Supplies - PPE', status: 'completed', quotes: 12, value: 'SAR 85,000', deadline: 'Closed' },
    { id: 'RFQ-2024-004', title: 'Raw Materials - Aluminum Sheets', status: 'pending', quotes: 0, value: 'SAR 220,000', deadline: '7 days' }
  ];

  const supplierNewRFQs = [
    { id: 'RFQ-2024-015', title: 'Industrial Equipment - Pumps', category: 'Manufacturing', deadline: '2 days', value: 'SAR 120,000' },
    { id: 'RFQ-2024-016', title: 'Raw Materials - Copper Wire', category: 'Materials', deadline: '4 days', value: 'SAR 85,000' },
    { id: 'RFQ-2024-017', title: 'Office Furniture - Desks & Chairs', category: 'Furniture', deadline: '6 days', value: 'SAR 42,000' },
  ];

  const supplierRecentBids = [
    { id: 'BID-045', rfqTitle: 'Construction Materials - Steel Rebar', status: 'under_review', amount: 'SAR 148,000', submittedDate: '2 days ago' },
    { id: 'BID-044', rfqTitle: 'Medical Supplies - PPE', status: 'accepted', amount: 'SAR 82,000', submittedDate: '5 days ago' },
    { id: 'BID-043', rfqTitle: 'Office Equipment', status: 'negotiating', amount: 'SAR 44,500', submittedDate: '1 week ago' },
  ];

  const supplierTodos = [
    { task: 'Submit bid for RFQ-2024-015', deadline: 'Due in 2 days', priority: 'high' },
    { task: 'Ship Order #ORD-2024-089', deadline: 'Due today', priority: 'urgent' },
    { task: 'Respond to negotiation for BID-043', deadline: 'Due tomorrow', priority: 'medium' },
  ];

  const recentRFQs = userRole === 'buyer' ? buyerRecentRFQs : supplierNewRFQs;

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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome, {user?.full_name || 'User'}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Building2 className="h-4 w-4 text-slate-500" />
              <p className="text-slate-500">{user?.company || 'Company'}</p>
              <span className="text-slate-300">•</span>
              <Badge className={userRole === 'buyer' ? 'bg-indigo-100 text-indigo-700' : 'bg-teal-100 text-teal-700'}>
                {userRole === 'buyer' ? 'Buyer' : 'Supplier'}
              </Badge>
            </div>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Link to={createPageUrl('Wallet')}>
              <Button variant="outline">
                <Wallet className="h-4 w-4 mr-2" />
                Mi-Wallet
              </Button>
            </Link>
          </div>
        </div>

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
                    <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
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
          {/* Recent RFQs / New RFQs for Supplier */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  {userRole === 'buyer' ? 'Recent RFQs' : 'New RFQs Available'}
                </CardTitle>
                <Link to={createPageUrl('RFQList')}>
                  <Button variant="ghost" size="sm" className="text-indigo-600">
                    View All
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userRole === 'buyer' ? (
                    buyerRecentRFQs.map((rfq, index) => (
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
                    ))
                  ) : (
                    supplierNewRFQs.map((rfq, index) => (
                      <motion.div
                        key={rfq.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-teal-600" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{rfq.title}</p>
                            <p className="text-sm text-slate-500">{rfq.id} • {rfq.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">{rfq.value}</p>
                          <div className="flex items-center gap-2 justify-end mt-1">
                            <Clock className="h-3 w-3 text-amber-600" />
                            <span className="text-xs text-slate-500">{rfq.deadline}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Escrow / To-Do List based on role */}
          <div>
            {userRole === 'buyer' ? (
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
            ) : (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                    To-Do List
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {supplierTodos.map((todo, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl border-l-4 ${
                          todo.priority === 'urgent' ? 'bg-red-50 border-red-500' :
                          todo.priority === 'high' ? 'bg-amber-50 border-amber-500' :
                          'bg-indigo-50 border-indigo-500'
                        }`}
                      >
                        <p className="font-medium text-slate-900 mb-1">{todo.task}</p>
                        <p className="text-sm text-slate-600">{todo.deadline}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userRole === 'buyer' ? (
              <>
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
              </>
            ) : (
              <>
                <Link to={createPageUrl('RFQList')}>
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <FileText className="h-6 w-6 text-teal-600" />
                      </div>
                      <p className="font-medium text-slate-900">Browse New RFQs</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to={createPageUrl('Negotiations')}>
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Users className="h-6 w-6 text-indigo-600" />
                      </div>
                      <p className="font-medium text-slate-900">View Submitted Bids</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to={createPageUrl('Orders')}>
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="h-6 w-6 text-purple-600" />
                      </div>
                      <p className="font-medium text-slate-900">Manage Orders</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to={createPageUrl('Wallet')}>
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Wallet className="h-6 w-6 text-emerald-600" />
                      </div>
                      <p className="font-medium text-slate-900">View Earnings</p>
                    </CardContent>
                  </Card>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}