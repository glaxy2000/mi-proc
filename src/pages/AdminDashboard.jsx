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
  ShieldCheck,
  TrendingUp,
  Activity,
  Wallet,
  Package
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const [user, setUser] = React.useState({
    full_name: 'Admin User',
    company: 'Mi-Proc Platform',
    role: 'admin'
  });

  const stats = [
    {
      title: 'Total Users',
      value: '2,548',
      change: '+142',
      trend: 'up',
      icon: Users,
      color: 'bg-indigo-500'
    },
    {
      title: 'Active RFQs',
      value: '324',
      change: '+28',
      trend: 'up',
      icon: FileText,
      color: 'bg-teal-500'
    },
    {
      title: 'Total Transactions',
      value: '6,892',
      change: '+456',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Platform Revenue',
      value: 'SAR 4.2M',
      change: '+18.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-emerald-500'
    }
  ];

  const recentUsers = [
    { name: 'Al-Rashid Trading Co.', type: 'buyer', status: 'verified', date: '2 hours ago' },
    { name: 'Gulf Steel Industries', type: 'supplier', status: 'pending', date: '5 hours ago' },
    { name: 'Tech Solutions Ltd.', type: 'buyer', status: 'verified', date: '1 day ago' },
    { name: 'Modern Furniture Co.', type: 'supplier', status: 'verified', date: '2 days ago' }
  ];

  const platformActivity = [
    { event: 'New RFQ Created', user: 'SME Corporation', details: 'Construction Materials - SAR 150K', time: '5 min ago' },
    { event: 'Bid Submitted', user: 'ABC Steel Co.', details: 'RFQ-2024-156', time: '12 min ago' },
    { event: 'Payment Completed', user: 'Tech Parts Inc.', details: 'SAR 45,000', time: '25 min ago' },
    { event: 'New User Registered', user: 'Gulf Trading', details: 'Buyer account', time: '1 hour ago' }
  ];

  const pendingApprovals = [
    { item: 'KYB Verification', user: 'New Steel Industries', priority: 'high' },
    { item: 'Dispute Resolution', user: 'RFQ-2024-142', priority: 'urgent' },
    { item: 'Limit Increase Request', user: 'SME Corp', priority: 'medium' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user.full_name}! 👋
              </h1>
              <div className="flex items-center gap-2 text-purple-100">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-lg">{user.company}</span>
              </div>
              <p className="text-purple-100 mt-3">
                Platform overview and system administration.
              </p>
            </div>
            <div className="hidden md:block">
              <Link to={createPageUrl('Analytics')}>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Activity className="h-4 w-4 mr-2" />
                  Analytics
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
          {/* Recent Platform Activity */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Platform Activity</CardTitle>
                <Link to={createPageUrl('Analytics')}>
                  <Button variant="ghost" size="sm" className="text-indigo-600">
                    View All
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platformActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Activity className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{activity.event}</p>
                        <p className="text-sm text-slate-600">{activity.user} • {activity.details}</p>
                        <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Approvals */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-indigo-600" />
                  Pending Approvals
                  <Badge className="ml-auto bg-red-100 text-red-700">3</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingApprovals.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border-l-4 ${
                        item.priority === 'urgent' ? 'bg-red-50 border-red-500' :
                        item.priority === 'high' ? 'bg-amber-50 border-amber-500' :
                        'bg-indigo-50 border-indigo-500'
                      }`}
                    >
                      <p className="font-medium text-slate-900 mb-1">{item.item}</p>
                      <p className="text-sm text-slate-600">{item.user}</p>
                      <Button variant="outline" size="sm" className="mt-2 w-full">
                        Review
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Users */}
        <div className="mt-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent User Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.type} • {user.date}</p>
                      </div>
                    </div>
                    <Badge className={user.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                      {user.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to={createPageUrl('UserJourney')}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <p className="font-medium text-slate-900">Manage Users</p>
                </CardContent>
              </Card>
            </Link>
            <Link to={createPageUrl('RFQList')}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-6 w-6 text-teal-600" />
                  </div>
                  <p className="font-medium text-slate-900">View All RFQs</p>
                </CardContent>
              </Card>
            </Link>
            <Link to={createPageUrl('Orders')}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Package className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="font-medium text-slate-900">Monitor Orders</p>
                </CardContent>
              </Card>
            </Link>
            <Link to={createPageUrl('Analytics')}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Activity className="h-6 w-6 text-emerald-600" />
                  </div>
                  <p className="font-medium text-slate-900">Platform Analytics</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}