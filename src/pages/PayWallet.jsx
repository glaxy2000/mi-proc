import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Send,
  User,
  Building2,
  FileText,
  Shield,
  AlertCircle,
  CheckCircle2,
  Search,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

export default function PayWallet() {
  const [paymentType, setPaymentType] = React.useState('supplier');
  const [amount, setAmount] = React.useState('');
  const [recipient, setRecipient] = React.useState('');
  const [reference, setReference] = React.useState('');
  const [note, setNote] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const paymentTypes = [
    {
      id: 'supplier',
      name: 'Supplier Payment',
      icon: Building2,
      description: 'Pay suppliers for RFQ orders',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'escrow',
      name: 'Escrow Funding',
      icon: Shield,
      description: 'Fund escrow for RFQ transactions',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'invoice',
      name: 'Invoice Payment',
      icon: FileText,
      description: 'Pay vendor invoices directly',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'user',
      name: 'Send to User',
      icon: User,
      description: 'Transfer to other Mi-Proc users',
      fee: 'Free',
      time: 'Instant'
    }
  ];

  const recentRecipients = [
    { name: 'ABC Steel Co.', id: 'SUP-001', type: 'Supplier', lastPaid: 'SAR 75,000' },
    { name: 'MedSupply Ltd.', id: 'SUP-002', type: 'Supplier', lastPaid: 'SAR 42,500' },
    { name: 'TechParts Inc.', id: 'SUP-003', type: 'Supplier', lastPaid: 'SAR 28,000' }
  ];

  const handlePay = () => {
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
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Send Payment</h1>
              <p className="text-slate-600">Transfer funds instantly to suppliers and users</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500 mb-1">Available Balance</p>
              <p className="text-2xl font-bold text-indigo-600">SAR 145,250.00</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Type */}
            <Card>
              <CardHeader>
                <CardTitle>Select Payment Type</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentType} onValueChange={setPaymentType}>
                  <div className="grid md:grid-cols-2 gap-3">
                    {paymentTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          paymentType === type.id
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                        onClick={() => setPaymentType(type.id)}
                      >
                        <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            paymentType === type.id ? 'bg-indigo-100' : 'bg-slate-100'
                          }`}>
                            <type.icon className={`h-5 w-5 ${
                              paymentType === type.id ? 'text-indigo-600' : 'text-slate-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={type.id} className="font-semibold cursor-pointer">
                              {type.name}
                            </Label>
                            <p className="text-xs text-slate-600 mt-1">{type.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">{type.fee}</Badge>
                              <span className="text-xs text-slate-500">{type.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Recipient */}
            <Card>
              <CardHeader>
                <CardTitle>Recipient Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Search Recipient</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search by name, ID, or email..."
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Recent Recipients */}
                <div>
                  <Label className="mb-3 block">Recent Recipients</Label>
                  <div className="space-y-2">
                    {recentRecipients.map((rec) => (
                      <button
                        key={rec.id}
                        onClick={() => setRecipient(rec.name)}
                        className={`w-full p-3 border rounded-lg text-left transition-colors ${
                          recipient === rec.name
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">{rec.name}</p>
                            <p className="text-sm text-slate-500">{rec.id} • {rec.type}</p>
                          </div>
                          <p className="text-sm text-slate-600">{rec.lastPaid}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amount & Details */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
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
                  <Label>Reference / Invoice Number (Optional)</Label>
                  <Input
                    placeholder="e.g., INV-2024-001"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Payment Note (Optional)</Label>
                  <Textarea
                    placeholder="Add a note for this payment..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>

                {amount && parseFloat(amount) > 145250 && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">
                      Insufficient balance. Please top up your wallet first.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                disabled={!amount || !recipient || parseFloat(amount) <= 0 || parseFloat(amount) > 145250 || loading}
                onClick={handlePay}
              >
                {loading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send SAR {amount || '0.00'}
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
                <CardTitle className="text-lg">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Payment Type</span>
                    <span className="font-semibold capitalize">{paymentType.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Amount</span>
                    <span className="font-semibold">SAR {amount || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Transaction Fee</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold text-slate-900">Total Debit</span>
                    <span className="text-xl font-bold text-indigo-600">
                      SAR {amount || '0.00'}
                    </span>
                  </div>
                </div>

                {amount && parseFloat(amount) > 0 && parseFloat(amount) <= 145250 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-slate-600 mb-2">Balance After Payment</p>
                    <p className="text-2xl font-bold text-slate-900">
                      SAR {(145250 - parseFloat(amount)).toLocaleString('en-US', {
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
                    <h4 className="font-semibold text-slate-900 mb-2">Instant Settlement</h4>
                    <ul className="space-y-1 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        Instant transfer
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        No transaction fees
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        24/7 availability
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Secure Payment</h4>
                    <p className="text-sm text-slate-600">
                      All transactions are encrypted and protected by SAMA-regulated security standards.
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