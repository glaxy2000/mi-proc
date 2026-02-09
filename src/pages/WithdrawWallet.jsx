import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Building2,
  CreditCard,
  Shield,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingDown,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function WithdrawWallet() {
  const [amount, setAmount] = React.useState('');
  const [withdrawMethod, setWithdrawMethod] = React.useState('bank');
  const [loading, setLoading] = React.useState(false);

  const quickAmounts = [5000, 10000, 25000, 50000, 100000];

  const withdrawMethods = [
    {
      id: 'bank',
      name: 'Bank Transfer (SARIE)',
      icon: Building2,
      description: 'Instant transfer to your linked bank account',
      fee: 'Free',
      time: 'Instant',
      limit: 'Up to SAR 500,000/day'
    },
    {
      id: 'card',
      name: 'Debit Card',
      icon: CreditCard,
      description: 'Withdraw to your linked debit card',
      fee: 'SAR 2.50',
      time: '1-2 hours',
      limit: 'Up to SAR 50,000/day'
    }
  ];

  const linkedAccounts = [
    {
      id: 1,
      type: 'bank',
      name: 'Al Rajhi Bank',
      number: '****6789',
      icon: Building2,
      primary: true
    },
    {
      id: 2,
      type: 'bank',
      name: 'Saudi National Bank',
      number: '****4321',
      icon: Building2,
      primary: false
    }
  ];

  const recentWithdrawals = [
    { date: '2026-02-08', amount: 45000, status: 'completed', method: 'Bank Transfer', bank: 'Al Rajhi Bank' },
    { date: '2026-02-05', amount: 28500, status: 'completed', method: 'Bank Transfer', bank: 'Al Rajhi Bank' },
    { date: '2026-02-02', amount: 15000, status: 'completed', method: 'Debit Card', bank: 'Mada Card' }
  ];

  const handleWithdraw = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to={createPageUrl('Wallet')}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Wallet
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Withdraw Funds</h1>
              <p className="text-slate-600">Transfer money to your bank account</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500 mb-1">Available to Withdraw</p>
              <p className="text-2xl font-bold text-indigo-600">SAR 145,250.00</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Amount Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-indigo-600" />
                  Withdrawal Amount
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Amount (SAR)</Label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                      SAR
                    </span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-14 text-lg font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Quick Select</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {quickAmounts.map((amt) => (
                      <Button
                        key={amt}
                        variant={amount === amt.toString() ? 'default' : 'outline'}
                        onClick={() => setAmount(amt.toString())}
                        className="font-semibold text-xs"
                      >
                        {amt >= 1000 ? `${amt / 1000}K` : amt}
                      </Button>
                    ))}
                  </div>
                </div>

                {amount && parseFloat(amount) > 145250 && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">
                      Amount exceeds available balance
                    </p>
                  </div>
                )}

                {amount && parseFloat(amount) < 100 && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      Minimum withdrawal amount is SAR 100
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Withdrawal Method */}
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={withdrawMethod} onValueChange={setWithdrawMethod}>
                  <div className="space-y-3">
                    {withdrawMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          withdrawMethod === method.id
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                        onClick={() => setWithdrawMethod(method.id)}
                      >
                        <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            withdrawMethod === method.id ? 'bg-indigo-100' : 'bg-slate-100'
                          }`}>
                            <method.icon className={`h-6 w-6 ${
                              withdrawMethod === method.id ? 'text-indigo-600' : 'text-slate-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={method.id} className="font-semibold cursor-pointer text-base">
                              {method.name}
                            </Label>
                            <p className="text-sm text-slate-600 mt-1">{method.description}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {method.fee}
                              </Badge>
                              <span className="text-xs text-slate-500">{method.time}</span>
                              <span className="text-xs text-slate-500">• {method.limit}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Linked Accounts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Linked Accounts</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Account
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {linkedAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          <account.icon className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{account.name}</p>
                          <p className="text-sm text-slate-500">{account.number}</p>
                        </div>
                      </div>
                      {account.primary && (
                        <Badge className="bg-indigo-100 text-indigo-700">Primary</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                disabled={!amount || parseFloat(amount) < 100 || parseFloat(amount) > 145250 || loading}
                onClick={handleWithdraw}
              >
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-5 w-5 mr-2" />
                    Withdraw SAR {amount || '0.00'}
                  </>
                )}
              </Button>
              <Link to={createPageUrl('Wallet')}>
                <Button size="lg" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            {/* Withdrawal Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Withdrawal Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Withdrawal Amount</span>
                    <span className="font-semibold">SAR {amount || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Processing Fee</span>
                    <span className="font-semibold text-green-600">
                      {withdrawMethod === 'bank' ? 'Free' : 'SAR 2.50'}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold text-slate-900">Total Debit</span>
                    <span className="text-xl font-bold text-indigo-600">
                      SAR {amount ? (parseFloat(amount) + (withdrawMethod === 'card' ? 2.5 : 0)).toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>

                {amount && parseFloat(amount) >= 100 && parseFloat(amount) <= 145250 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-slate-600 mb-2">Balance After Withdrawal</p>
                    <p className="text-2xl font-bold text-slate-900">
                      SAR {(145250 - parseFloat(amount) - (withdrawMethod === 'card' ? 2.5 : 0)).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Processing Time */}
            <Card className="bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      {withdrawMethod === 'bank' ? 'Instant Transfer' : 'Fast Processing'}
                    </h4>
                    <ul className="space-y-1 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        {withdrawMethod === 'bank' ? 'Instant via SARIE' : '1-2 hours processing'}
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        24/7 availability
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        Secure transaction
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Withdrawals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentWithdrawals.map((withdrawal, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium text-slate-900">SAR {withdrawal.amount.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">{withdrawal.bank}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-emerald-100 text-emerald-700 mb-1">
                          {withdrawal.status}
                        </Badge>
                        <p className="text-xs text-slate-500">{withdrawal.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Secure Withdrawal</h4>
                    <p className="text-sm text-slate-600">
                      All withdrawals are protected by SAMA-regulated security and require verification.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}