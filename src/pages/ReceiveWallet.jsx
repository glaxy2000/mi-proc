import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Copy,
  Share2,
  QrCode,
  Mail,
  Download,
  CheckCircle2,
  AlertCircle,
  Building2,
  CreditCard,
  Wallet,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ReceiveWallet() {
  const [copied, setCopied] = React.useState(false);
  const [requestAmount, setRequestAmount] = React.useState('');
  const [requestNote, setRequestNote] = React.useState('');

  const accountDetails = {
    walletId: 'MIPRO-12450-SAR',
    accountName: 'SME Corp',
    iban: 'SA44 8000 0000 0001 2345 6789',
    bankName: 'Mi-Proc Wallet',
    swiftCode: 'MIPRSA21'
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(false), 2000);
  };

  const pendingRequests = [
    { id: 1, from: 'ABC Trading', amount: 45000, reference: 'RFQ-2024-156', status: 'pending', time: '2 hours ago' },
    { id: 2, from: 'Construction Co.', amount: 28500, reference: 'INV-8821', status: 'pending', time: '5 hours ago' },
    { id: 3, from: 'MedSupply Ltd.', amount: 12000, reference: 'Payment Request', status: 'paid', time: '1 day ago' }
  ];

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
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Receive Funds</h1>
            <p className="text-slate-600">Share your wallet details or request payment from buyers</p>
          </div>
        </div>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Wallet Details</TabsTrigger>
            <TabsTrigger value="request">Request Payment</TabsTrigger>
            <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          </TabsList>

          {/* Wallet Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-indigo-600" />
                    Mi-Wallet Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-xs text-slate-500">Wallet ID</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input value={accountDetails.walletId} readOnly className="font-mono" />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => copyToClipboard(accountDetails.walletId, 'wallet')}
                      >
                        {copied === 'wallet' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-slate-500">Account Name</Label>
                    <Input value={accountDetails.accountName} readOnly className="mt-1" />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 p-3 bg-indigo-50 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                      <p className="text-sm text-indigo-900">
                        Share this Wallet ID to receive instant payments from other Mi-Proc users
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bank Transfer Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-indigo-600" />
                    Bank Transfer Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-xs text-slate-500">IBAN</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input value={accountDetails.iban} readOnly className="font-mono" />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => copyToClipboard(accountDetails.iban, 'iban')}
                      >
                        {copied === 'iban' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-slate-500">Bank Name</Label>
                    <Input value={accountDetails.bankName} readOnly className="mt-1" />
                  </div>

                  <div>
                    <Label className="text-xs text-slate-500">SWIFT Code</Label>
                    <Input value={accountDetails.swiftCode} readOnly className="mt-1" />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                      <p className="text-sm text-amber-900">
                        Bank transfers may take 1-2 business days
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* QR Code & Share */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Quick Share</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Share your wallet details via QR code or email
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline">
                        <QrCode className="h-4 w-4 mr-2" />
                        Show QR Code
                      </Button>
                      <Button variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Link
                      </Button>
                      <Button variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Details
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                  <div className="w-32 h-32 bg-slate-100 rounded-xl flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-slate-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Request Payment Tab */}
          <TabsContent value="request" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Payment Request</CardTitle>
                <p className="text-sm text-slate-600 mt-2">
                  Request payment from buyers for RFQs or invoices
                </p>
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
                      value={requestAmount}
                      onChange={(e) => setRequestAmount(e.target.value)}
                      className="pl-14 text-lg font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <Label>Reference / Invoice Number</Label>
                  <Input
                    placeholder="e.g., RFQ-2024-001 or INV-8821"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Send Request To</Label>
                  <Input
                    placeholder="Buyer email or Wallet ID"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Note (Optional)</Label>
                  <Input
                    placeholder="Add a note for this payment request..."
                    value={requestNote}
                    onChange={(e) => setRequestNote(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                    <Send className="h-4 w-4 mr-2" />
                    Send Payment Request
                  </Button>
                  <Button variant="outline">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Requests Tab */}
          <TabsContent value="pending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Payment Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 border rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-slate-900">{request.from}</p>
                          <p className="text-sm text-slate-500">{request.reference}</p>
                        </div>
                        <Badge className={
                          request.status === 'paid'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }>
                          {request.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-indigo-600">
                          SAR {request.amount.toLocaleString()}
                        </span>
                        <span className="text-sm text-slate-500">{request.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}