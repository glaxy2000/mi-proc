import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  DollarSign,
  ArrowUpRight,
  Building2,
  Clock,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SupplierDashboard() {
  const [user, setUser] = React.useState({
    full_name: 'Khalid Mohammed',
    company: 'ABC Steel Industries',
    role: 'supplier'
  });

  const stats = [
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

  const newRFQs = [
    { id: 'RFQ-2024-015', title: 'Industrial Equipment - Pumps', category: 'Manufacturing', deadline: '2 days', value: 'SAR 120,000' },
    { id: 'RFQ-2024-016', title: 'Raw Materials - Copper Wire', category: 'Materials', deadline: '4 days', value: 'SAR 85,000' },
    { id: 'RFQ-2024-017', title: 'Office Furniture - Desks & Chairs', category: 'Furniture', deadline: '6 days', value: 'SAR 42,000' },
  ];

  const todos = [
    { task: 'Submit bid for RFQ-2024-015', deadline: 'Due in 2 days', priority: 'high' },
    { task: 'Ship Order #ORD-2024-089', deadline: 'Due today', priority: 'urgent' },
    { task: 'Respond to negotiation for BID-043', deadline: 'Due tomorrow', priority: 'medium' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user.full_name}! 👋
              </h1>
              <div className="flex items-center gap-2 text-teal-100">
                <Building2 className="h-5 w-5" />
                <span className="text-lg">{user.company}</span>
              </div>
              <p className="text-teal-100 mt-3">
                Here's your sales overview and new RFQ opportunities.
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
          {/* New RFQs Available */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">New RFQs Available</CardTitle>
                <Link to={createPageUrl('RFQList')}>
                  <Button variant="ghost" size="sm" className="text-indigo-600">
                    View All
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newRFQs.map((rfq, index) => (
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* To-Do List */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                  To-Do List
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todos.map((todo, index) => (
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
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}