import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Send,
  User,
  Search,
  Shield,
  CheckCircle2,
  Clock,
  Zap,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

export default function SendWallet() {
  const [amount, setAmount] = React.useState('');
  const [recipient, setRecipient] = React.useState('');
  const [note, setNote] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const quickAmounts = [1000, 5000, 10000, 25000, 50000];

  const recentContacts = [
    { name: 'Ahmed Al-Qahtani', walletId: 'MIPRO-45821', type: 'User', lastSent: 'SAR 5,000' },
    { name: 'Sara Manufacturing', walletId: 'MIPRO-78921', type: 'Business', lastSent: 'SAR 15,000' },
    { name: 'Khalid Trading Co.', walletId: 'MIPRO-32145', type: 'Business', lastSent: 'SAR 8,500' }
  ];

  const handleSend = () => {
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
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Send Money</h1>
              <p className="text-slate-600">Transfer funds instantly to any Mi-Proc user</p>
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
            {/* Recipient */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-indigo-600" />
                  Send To
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Recipient Wallet ID or Email</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Enter wallet ID or email..."
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Recent Contacts */}
                <div>
                  <Label className="mb-3 block">Recent Contacts</Label>
                  <div className="space-y-2">
                    {recentContacts.map((contact) => (
                      <button
                        key={contact.walletId}
                        onClick={() => setRecipient(contact.walletId)}
                        className={`w-full p-3 border rounded-lg text-left transition-colors ${
                          recipient === contact.walletId
                            ? 'border-indigo-600 bg-indigo-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">{contact.name}</p>
                            <p className="text-sm text-slate-500">{contact.walletId} • {contact.type}</p>
                          </div>
                          <p className="text-sm text-slate-600">{contact.lastSent}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amount */}
            <Card>
              <CardHeader>
                <CardTitle>Amount</CardTitle>
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

                <div>
                  <Label>Note (Optional)</Label>
                  <Textarea
                    placeholder="Add a note for this transfer..."
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
                onClick={handleSend}
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
                <CardTitle className="text-lg">Transfer Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Amount</span>
                    <span className="font-semibold">SAR {amount || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Transfer Fee</span>
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
                    <p className="text-sm text-slate-600 mb-2">Balance After Transfer</p>
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

            {/* Features */}
            <Card className="bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Instant Transfer</h4>
                    <ul className="space-y-1 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        Instant delivery
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        Zero transaction fees
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        24/7 availability
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                        No daily limits
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
                    <h4 className="font-semibold text-slate-900 mb-2">Secure Transfer</h4>
                    <p className="text-sm text-slate-600">
                      All transfers are encrypted and protected by SAMA-regulated security standards.
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