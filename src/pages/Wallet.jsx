import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Building2,
  Shield,
  Lock,
  Zap,
  Globe,
  CreditCard,
  Send,
  Download,
  History,
  TrendingUp,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function WalletPage() {
  const [selectedCurrency, setSelectedCurrency] = useState('SAR');

  const walletBalance = {
    SAR: { balance: 145250, change: '+12%' },
    USD: { balance: 45200, change: '+8%' },
    EUR: { balance: 28150, change: '+5%' }
  };

  const recentTransactions = [
    { id: 1, type: 'in', description: 'Escrow Release - Invoice #9921', from: 'Construction Co.', amount: 42500, currency: 'SAR', time: 'Just now', status: 'completed' },
    { id: 2, type: 'out', description: 'Utility Payment', to: 'Saudi Electricity', amount: 1240, currency: 'SAR', time: '10:45 AM', status: 'completed' },
    { id: 3, type: 'out', description: 'Payroll Batch', to: 'Multiple Recipients', amount: 15000, currency: 'SAR', time: 'Yesterday', status: 'processing' },
    { id: 4, type: 'in', description: 'Escrow Funding', from: 'ABC Trading', amount: 75000, currency: 'SAR', time: '2 days ago', status: 'completed' },
    { id: 5, type: 'out', description: 'Supplier Payment', to: 'Steel Works Ltd.', amount: 28500, currency: 'SAR', time: '3 days ago', status: 'completed' }
  ];

  const escrowAccounts = [
    { id: 'ESC-001', supplier: 'ABC Steel Co.', amount: 75000, status: 'held', milestone: 'Awaiting Delivery' },
    { id: 'ESC-002', supplier: 'MedSupply Ltd.', amount: 42500, status: 'released', milestone: 'Completed' },
    { id: 'ESC-003', supplier: 'TechParts Inc.', amount: 28000, status: 'pending', milestone: 'Pending Funding' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Mi-Wallet</h1>
              <Badge className="bg-teal-100 text-teal-700 border-teal-200">SAMA Compliant</Badge>
            </div>
            <p className="text-slate-500">Your integrated B2B digital wallet for instant settlements</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Link to={createPageUrl('WithdrawWallet')}>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </Link>
            <Link to={createPageUrl('SendWallet')}>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-indigo-200 text-sm font-medium mb-2">TOTAL BALANCE</p>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-5xl font-bold">SAR 145,250</span>
                    <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% vs last month
                    </Badge>
                  </div>
                  <div className="flex gap-6 mt-6">
                    <div className="px-4 py-3 bg-white/10 rounded-xl">
                      <p className="text-indigo-200 text-xs">USD Account</p>
                      <p className="text-xl font-semibold">$45,200</p>
                    </div>
                    <div className="px-4 py-3 bg-white/10 rounded-xl">
                      <p className="text-indigo-200 text-xs">EUR Account</p>
                      <p className="text-xl font-semibold">€28,150</p>
                    </div>
                    <div className="px-4 py-3 bg-white/10 rounded-xl border-2 border-dashed border-white/30 flex items-center justify-center">
                      <span className="text-white/60">+ Add</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 lg:mt-0 lg:text-right">
                  <div className="grid grid-cols-4 gap-3">
                    <Link to={createPageUrl('TopUpWallet')}>
                      <button className="flex flex-col items-center p-4 bg-teal-500/20 border-2 border-teal-400/50 rounded-xl hover:bg-teal-500/30 transition-colors w-full">
                        <Wallet className="h-6 w-6 mb-2" />
                        <span className="text-sm font-semibold">Top Up</span>
                      </button>
                    </Link>
                    <Link to={createPageUrl('PayWallet')}>
                      <button className="flex flex-col items-center p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors w-full">
                        <ArrowUpRight className="h-6 w-6 mb-2" />
                        <span className="text-sm">Pay</span>
                      </button>
                    </Link>
                    <Link to={createPageUrl('ReceiveWallet')}>
                      <button className="flex flex-col items-center p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors w-full">
                        <ArrowDownLeft className="h-6 w-6 mb-2" />
                        <span className="text-sm">Receive</span>
                      </button>
                    </Link>
                    <Link to={createPageUrl('WithdrawWallet')}>
                      <button className="flex flex-col items-center p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors w-full">
                        <Building2 className="h-6 w-6 mb-2" />
                        <span className="text-sm">Withdraw</span>
                      </button>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-4">
                    <div className="flex items-center gap-2 text-sm text-indigo-200">
                      <Lock className="h-4 w-4" />
                      FX Lock: USD/SAR 3.751
                    </div>
                    <Badge className="bg-white/10 text-white border-white/20">Guaranteed 48h</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Transactions */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm">
                    <History className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx, index) => (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'in' ? 'bg-emerald-100' : 'bg-amber-100'
                        }`}>
                          {tx.type === 'in' ? (
                            <ArrowDownLeft className="h-5 w-5 text-emerald-600" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5 text-amber-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{tx.description}</p>
                          <p className="text-sm text-slate-500">
                            {tx.type === 'in' ? `From: ${tx.from}` : `To: ${tx.to}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${tx.type === 'in' ? 'text-emerald-600' : 'text-slate-900'}`}>
                          {tx.type === 'in' ? '+' : '-'} SAR {tx.amount.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-xs text-slate-500">{tx.time}</span>
                          {tx.status === 'processing' && (
                            <Badge className="bg-amber-100 text-amber-700 text-xs">Processing</Badge>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Escrow & Features */}
          <div className="space-y-6">
            {/* Escrow */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  Escrow Accounts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {escrowAccounts.map((escrow) => (
                    <div key={escrow.id} className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-slate-900">{escrow.supplier}</p>
                        <Badge className={
                          escrow.status === 'held' ? 'bg-amber-100 text-amber-700' :
                          escrow.status === 'released' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-slate-100 text-slate-700'
                        }>
                          {escrow.status}
                        </Badge>
                      </div>
                      <p className="text-lg font-semibold text-slate-900">SAR {escrow.amount.toLocaleString()}</p>
                      <p className="text-xs text-slate-500 mt-1">{escrow.milestone}</p>
                    </div>
                  ))}
                </div>
                <Link to={createPageUrl('Escrow')}>
                  <Button variant="outline" className="w-full mt-4">
                    Manage Escrow
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Wallet Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                    <Zap className="h-5 w-5 text-teal-600" />
                    <div>
                      <p className="font-medium text-teal-900">Instant Settlements</p>
                      <p className="text-xs text-teal-600">T+minutes transfers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                    <Globe className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="font-medium text-indigo-900">Multi-Currency</p>
                      <p className="text-xs text-indigo-600">SAR, USD, EUR & more</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-900">Invoice Financing</p>
                      <p className="text-xs text-purple-600">Get paid instantly</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Compliance Footer */}
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="h-6 w-6 text-teal-500" />
              <div>
                <p className="font-medium text-slate-900">SAMA PSP Licensed</p>
                <p className="text-sm text-slate-500">Fully compliant with Saudi Central Bank regulations</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="outline" className="px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                PCI-DSS Level 1
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                mada
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                SARIE
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}