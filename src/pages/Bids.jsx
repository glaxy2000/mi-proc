import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  Star,
  MessageSquare,
  ArrowUpRight,
  Filter,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Bids() {
  const [selectedRFQ, setSelectedRFQ] = useState('all');

  const bids = [
    {
      id: 'BID-001',
      rfqId: 'RFQ-2024-001',
      rfqTitle: 'Construction Materials - Steel Rebar',
      supplierId: 'SUP-A8F3',
      pricePerUnit: 'SAR 2,500',
      totalPrice: 'SAR 150,000',
      deliveryTime: '10 days',
      paymentTerms: '50% Advance',
      complianceScore: 95,
      status: 'pending',
      receivedDate: '2 hours ago'
    },
    {
      id: 'BID-002',
      rfqId: 'RFQ-2024-001',
      rfqTitle: 'Construction Materials - Steel Rebar',
      supplierId: 'SUP-B2D9',
      pricePerUnit: 'SAR 2,350',
      totalPrice: 'SAR 141,000',
      deliveryTime: '12 days',
      paymentTerms: '30% Advance',
      complianceScore: 88,
      status: 'shortlisted',
      receivedDate: '5 hours ago'
    },
    {
      id: 'BID-003',
      rfqId: 'RFQ-2024-002',
      rfqTitle: 'Office Equipment - IT Hardware',
      supplierId: 'SUP-C5E1',
      pricePerUnit: 'SAR 3,200',
      totalPrice: 'SAR 45,000',
      deliveryTime: '7 days',
      paymentTerms: 'Net 30',
      complianceScore: 92,
      status: 'negotiating',
      receivedDate: '1 day ago'
    }
  ];

  const statusColors = {
    pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending Review' },
    shortlisted: { bg: 'bg-indigo-100', text: 'text-indigo-700', label: 'Shortlisted' },
    negotiating: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Negotiating' },
    accepted: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Accepted' },
    rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected' }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Bid Management</h1>
          <p className="text-slate-600">Review and compare bids from suppliers</p>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search bids..." className="pl-10" />
              </div>
              <Select value={selectedRFQ} onValueChange={setSelectedRFQ}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by RFQ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All RFQs</SelectItem>
                  <SelectItem value="rfq-001">RFQ-2024-001</SelectItem>
                  <SelectItem value="rfq-002">RFQ-2024-002</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="negotiating">Negotiating</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bid Comparison Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Bid Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bids.map((bid, index) => (
                <motion.div
                  key={bid.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-2 border-slate-200 rounded-xl p-6 hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-900">{bid.rfqTitle}</h3>
                        <Badge variant="outline" className="text-slate-600">{bid.rfqId}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>Supplier: {bid.supplierId}</span>
                        <span>•</span>
                        <span>Received {bid.receivedDate}</span>
                      </div>
                    </div>
                    <Badge className={`${statusColors[bid.status].bg} ${statusColors[bid.status].text}`}>
                      {statusColors[bid.status].label}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-5 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Price per Unit</p>
                      <p className="font-semibold text-slate-900">{bid.pricePerUnit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Total Price</p>
                      <p className="font-semibold text-indigo-600 text-lg">{bid.totalPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Delivery Time</p>
                      <p className="font-semibold text-slate-900">{bid.deliveryTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Payment Terms</p>
                      <p className="font-semibold text-slate-900">{bid.paymentTerms}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Compliance Score</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${bid.complianceScore}%` }}
                          />
                        </div>
                        <span className="font-semibold text-emerald-600">{bid.complianceScore}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Accept Bid
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Negotiate
                    </Button>
                    <Button size="sm" variant="outline">
                      <Star className="h-4 w-4 mr-2" />
                      Shortlist
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}