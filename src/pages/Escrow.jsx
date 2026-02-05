import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Upload,
  FileText,
  Truck,
  DollarSign,
  ArrowRight,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function Escrow() {
  const escrowTransactions = [
    {
      id: 'TRX-8821',
      supplier: 'ABC Steel Co.',
      amount: 150000,
      status: 'awaiting_delivery',
      milestones: [
        { title: 'Deal Confirmed', date: 'Jan 12, 10:00 AM', status: 'completed', note: 'Signed by both parties' },
        { title: 'Funds Escrowed', date: 'Jan 12, 10:15 AM', status: 'completed', note: '100% held in Mi-Wallet' },
        { title: 'Milestone 1 Delivery', date: 'Pending', status: 'pending', note: 'Upload proof to unlock SAR 75,000' },
        { title: 'Final Release', date: 'Locked', status: 'locked', note: 'Pending delivery confirmation' }
      ],
      progress: 50,
      fraudRisk: '<0.1%'
    },
    {
      id: 'TRX-8820',
      supplier: 'MedSupply Ltd.',
      amount: 85000,
      status: 'completed',
      milestones: [
        { title: 'Deal Confirmed', date: 'Jan 10, 09:30 AM', status: 'completed', note: 'Signed by both parties' },
        { title: 'Funds Escrowed', date: 'Jan 10, 09:45 AM', status: 'completed', note: '100% held in Mi-Wallet' },
        { title: 'Delivery Confirmed', date: 'Jan 14, 02:15 PM', status: 'completed', note: 'Verified by platform' },
        { title: 'Funds Released', date: 'Jan 14, 02:16 PM', status: 'completed', note: 'Instant release to supplier' }
      ],
      progress: 100,
      fraudRisk: '<0.1%'
    },
    {
      id: 'TRX-8819',
      supplier: 'TechParts Inc.',
      amount: 42500,
      status: 'dispute',
      milestones: [
        { title: 'Deal Confirmed', date: 'Jan 8, 11:00 AM', status: 'completed', note: 'Signed by both parties' },
        { title: 'Funds Escrowed', date: 'Jan 8, 11:30 AM', status: 'completed', note: '100% held in Mi-Wallet' },
        { title: 'Dispute Raised', date: 'Jan 13, 04:00 PM', status: 'dispute', note: 'Under arbitration review' },
        { title: 'Resolution', date: 'Pending', status: 'pending', note: 'Expected within 7 days' }
      ],
      progress: 60,
      fraudRisk: '<0.1%'
    }
  ];

  const statusColors = {
    awaiting_delivery: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Awaiting Delivery' },
    completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Completed' },
    dispute: { bg: 'bg-red-100', text: 'text-red-700', label: 'In Dispute' }
  };

  const milestoneStatusIcons = {
    completed: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    pending: <Clock className="h-5 w-5 text-amber-500" />,
    locked: <Lock className="h-5 w-5 text-slate-400" />,
    dispute: <AlertTriangle className="h-5 w-5 text-red-500" />
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-xl">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Escrow & Disputes</h1>
            </div>
            <p className="text-slate-500">Built-in trust architecture for secure B2B transactions</p>
          </div>
        </div>

        {/* Security Impact Banner */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-200 text-sm">Security Impact</p>
                  <p className="text-3xl font-bold mt-1">&lt;0.1%</p>
                  <p className="text-indigo-200 text-sm">Fraud Risk</p>
                </div>
                <Shield className="h-12 w-12 text-white/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">Total in Escrow</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">SAR 277.5K</p>
                  <p className="text-emerald-600 text-sm">3 active transactions</p>
                </div>
                <div className="p-3 bg-teal-100 rounded-xl">
                  <Lock className="h-6 w-6 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">Dispute Resolution</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">&lt;7 Days</p>
                  <p className="text-indigo-600 text-sm">Average resolution time</p>
                </div>
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Clock className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Escrow Transactions */}
        <div className="space-y-6">
          {escrowTransactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-slate-50 border-b">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-slate-500">Transaction ID</p>
                        <p className="font-semibold text-slate-900">{tx.id}</p>
                      </div>
                      <div className="h-8 w-px bg-slate-200" />
                      <div>
                        <p className="text-sm text-slate-500">Supplier</p>
                        <p className="font-semibold text-slate-900">{tx.supplier}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-slate-900">SAR {tx.amount.toLocaleString()}</p>
                        <Badge className={`${statusColors[tx.status].bg} ${statusColors[tx.status].text}`}>
                          {tx.status === 'awaiting_delivery' && <Lock className="h-3 w-3 mr-1" />}
                          {statusColors[tx.status].label}
                        </Badge>
                      </div>
                      <div className="p-3 bg-slate-100 rounded-xl">
                        <p className="text-xs text-slate-500 uppercase">Risk Level</p>
                        <p className="text-sm font-semibold text-emerald-600">{tx.fraudRisk}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-medium">{tx.progress}%</span>
                    </div>
                    <Progress value={tx.progress} className="h-2" />
                  </div>

                  <div className="grid md:grid-cols-4 gap-4">
                    {tx.milestones.map((milestone, mIndex) => (
                      <div
                        key={mIndex}
                        className={`p-4 rounded-xl border-2 ${
                          milestone.status === 'completed' ? 'border-emerald-200 bg-emerald-50' :
                          milestone.status === 'pending' ? 'border-amber-200 bg-amber-50' :
                          milestone.status === 'dispute' ? 'border-red-200 bg-red-50' :
                          'border-slate-200 bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {milestoneStatusIcons[milestone.status]}
                          <span className="font-medium text-sm text-slate-900">{milestone.title}</span>
                        </div>
                        <p className="text-xs text-slate-500">{milestone.date}</p>
                        <p className="text-xs text-slate-600 mt-1">{milestone.note}</p>
                      </div>
                    ))}
                  </div>

                  {tx.status === 'awaiting_delivery' && (
                    <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Upload className="h-5 w-5 text-amber-600" />
                          <div>
                            <p className="font-medium text-amber-900">Action Required</p>
                            <p className="text-sm text-amber-700">Upload proof of delivery to unlock SAR 75,000 release</p>
                          </div>
                        </div>
                        <Button className="bg-amber-500 hover:bg-amber-600">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Evidence
                        </Button>
                      </div>
                    </div>
                  )}

                  {tx.status === 'dispute' && (
                    <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="font-medium text-red-900">Dispute in Progress</p>
                            <p className="text-sm text-red-700">Our arbitration team is reviewing the case. Expected resolution within 7 days.</p>
                          </div>
                        </div>
                        <Button variant="outline" className="border-red-200 text-red-700">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How Escrow Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Lock, title: 'Automated Escrow', desc: 'Funds auto-locked upon deal confirmation' },
              { icon: Truck, title: 'Delivery Tracking', desc: 'Real-time status updates and verification' },
              { icon: CheckCircle2, title: 'Confirmation', desc: 'Both parties verify quality & quantity' },
              { icon: DollarSign, title: 'Instant Release', desc: 'Funds released to supplier immediately' }
            ].map((step, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                  {index < 3 && (
                    <ArrowRight className="h-5 w-5 text-slate-300 mx-auto mt-4 hidden md:block" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}