import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CreditCard,
  Building2,
  Wallet,
  Shield,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function TopUpWallet() {
  const [amount, setAmount] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const [loading, setLoading] = React.useState(false);

  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Instant top-up with Visa, Mastercard, or Mada',
      fee: '0% fee',
      time: 'Instant'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building2,
      description: 'Direct transfer from your bank account',
      fee: 'No fees',
      time: '1-2 business days'
    },
    {
      id: 'wallet',
      name: 'Apple Pay / STC Pay',
      icon: Wallet,
      description: 'Fast and secure digital wallet payment',
      fee: '0% fee',
      time: 'Instant'
    },
    {
      id: 'bnpl',
      name: 'Buy Now, Pay Later (BNPL)',
      icon: DollarSign,
      description: 'Flexible payment plans with installments',
      fee: 'Low interest',
      time: 'Instant approval'
    }
  ];

  const handleTopUp = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      // Navigate to success page or show success message
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
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
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Top Up Mi-Wallet</h1>
              <p className="text-slate-600">Add funds to your wallet for instant transactions</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500 mb-1">Current Balance</p>
              <p className="text-2xl font-bold text-indigo-600">SAR 12,450.00</p>
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
                  <DollarSign className="h-5 w-5 text-indigo-600" />
                  Enter Amount
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
                        className="font-semibold"
                      >
                        {amt}
                      </Button>
                    ))}
                  </div>
                </div>

                {amount && parseFloat(amount) < 100 && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      Minimum top-up amount is SAR 100
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-indigo-600" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`relative flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              paymentMethod === method.id ? 'bg-indigo-100' : 'bg-slate-100'
                            }`}>
                              <method.icon className={`h-5 w-5 ${
                                paymentMethod === method.id ? 'text-indigo-600' : 'text-slate-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <Label htmlFor={method.id} className="font-semibold cursor-pointer">
                                {method.name}
                              </Label>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {method.fee}
                                </Badge>
                                <span className="text-xs text-slate-500">{method.time}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600">{method.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                disabled={!amount || parseFloat(amount) < 100 || loading}
                onClick={handleTopUp}
              >
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    Top Up SAR {amount || '0.00'}
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
            {/* Transaction Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transaction Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Top-up Amount</span>
                    <span className="font-semibold">SAR {amount || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Processing Fee</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold text-slate-900">Total Amount</span>
                    <span className="text-xl font-bold text-indigo-600">
                      SAR {amount || '0.00'}
                    </span>
                  </div>
                </div>

                {amount && parseFloat(amount) >= 100 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-slate-600 mb-2">New Balance</p>
                    <p className="text-2xl font-bold text-slate-900">
                      SAR {(12450 + parseFloat(amount)).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Secure Payment</h4>
                    <ul className="space-y-1 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        PCI-DSS Certified
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        256-bit Encryption
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        SAMA Regulated
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-slate-600 mb-2">Need help?</p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}