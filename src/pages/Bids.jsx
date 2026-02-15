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
  Search,
  TrendingUp,
  Award,
  Heart,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Bids() {
  const [selectedRFQ, setSelectedRFQ] = useState('all');
  const [sortBy, setSortBy] = useState('received_latest');
  const [itemFilter, setItemFilter] = useState('all');
  const [supplierFilter, setSupplierFilter] = useState('all');

  const bids = [
    {
      id: 'BID-001',
      rfqId: 'RFQ-2024-001',
      rfqTitle: 'Construction Materials - Steel Rebar',
      supplierId: 'SUP-A8F3',
      supplierName: 'ABC Steel Industries',
      pricePerUnit: 'SAR 2,500',
      totalPrice: 'SAR 150,000',
      deliveryTime: '10 days',
      paymentTerms: '50% Advance',
      complianceScore: 95,
      status: 'pending',
      receivedDate: '2 hours ago',
      supplierRating: 4.8,
      performanceScore: 92,
      onTimeRate: 95,
      itemsBidOn: ['Steel Rebar', 'Structural Steel'],
      isFavorite: true,
      isNew: false
    },
    {
      id: 'BID-002',
      rfqId: 'RFQ-2024-001',
      rfqTitle: 'Construction Materials - Steel Rebar',
      supplierId: 'SUP-B2D9',
      supplierName: 'Steel Masters Co.',
      pricePerUnit: 'SAR 2,350',
      totalPrice: 'SAR 141,000',
      deliveryTime: '12 days',
      paymentTerms: '30% Advance',
      complianceScore: 88,
      status: 'shortlisted',
      receivedDate: '5 hours ago',
      supplierRating: 4.6,
      performanceScore: 85,
      onTimeRate: 87,
      itemsBidOn: ['Steel Rebar'],
      isFavorite: false,
      isNew: true
    },
    {
      id: 'BID-003',
      rfqId: 'RFQ-2024-002',
      rfqTitle: 'Office Equipment - IT Hardware',
      supplierId: 'SUP-C5E1',
      supplierName: 'TechParts Global',
      pricePerUnit: 'SAR 3,200',
      totalPrice: 'SAR 45,000',
      deliveryTime: '7 days',
      paymentTerms: 'Net 30',
      complianceScore: 92,
      status: 'negotiating',
      receivedDate: '1 day ago',
      supplierRating: 4.7,
      performanceScore: 88,
      onTimeRate: 90,
      itemsBidOn: ['Laptops', 'Printer Cartridges'],
      isFavorite: true,
      isNew: false
    }
  ];

  const statusColors = {
    pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending Review' },
    shortlisted: { bg: 'bg-indigo-100', text: 'text-indigo-700', label: 'Shortlisted' },
    negotiating: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Negotiating' },
    accepted: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Accepted' },
    rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected' }
  };

  const allItems = [...new Set(bids.flatMap(bid => bid.itemsBidOn || []))];

  const filteredAndSortedBids = bids
    .filter(bid => {
      const itemMatch = itemFilter === 'all' || bid.itemsBidOn?.includes(itemFilter);
      const supplierMatch = 
        supplierFilter === 'all' ||
        (supplierFilter === 'favorites' && bid.isFavorite) ||
        (supplierFilter === 'new' && bid.isNew);
      return itemMatch && supplierMatch;
    })
    .sort((a, b) => {
    switch (sortBy) {
      case 'price_lowest':
        return parseFloat(a.totalPrice.replace(/[^0-9]/g, '')) - parseFloat(b.totalPrice.replace(/[^0-9]/g, ''));
      case 'price_highest':
        return parseFloat(b.totalPrice.replace(/[^0-9]/g, '')) - parseFloat(a.totalPrice.replace(/[^0-9]/g, ''));
      case 'delivery_fastest':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      case 'delivery_slowest':
        return parseInt(b.deliveryTime) - parseInt(a.deliveryTime);
      case 'rating_highest':
        return b.supplierRating - a.supplierRating;
      case 'received_latest':
      default:
        return 0;
    }
  });

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
            <div className="grid md:grid-cols-6 gap-4">
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
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="received_latest">Latest First</SelectItem>
                  <SelectItem value="received_oldest">Oldest First</SelectItem>
                  <SelectItem value="price_lowest">Price: Low to High</SelectItem>
                  <SelectItem value="price_highest">Price: High to Low</SelectItem>
                  <SelectItem value="delivery_fastest">Delivery: Fastest</SelectItem>
                  <SelectItem value="delivery_slowest">Delivery: Slowest</SelectItem>
                  <SelectItem value="rating_highest">Rating: Highest</SelectItem>
                </SelectContent>
              </Select>
              <Select value={itemFilter} onValueChange={setItemFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  {allItems.map(item => (
                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Supplier type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  <SelectItem value="favorites">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-pink-600" />
                      Favorites Only
                    </div>
                  </SelectItem>
                  <SelectItem value="new">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-600" />
                      New Suppliers
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
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
              {filteredAndSortedBids.map((bid, index) => (
                <motion.div
                  key={bid.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-2 border-slate-200 rounded-xl p-6 hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-900">{bid.rfqTitle}</h3>
                        <Badge variant="outline" className="text-slate-600">{bid.rfqId}</Badge>
                        {bid.isFavorite && <Heart className="h-4 w-4 text-pink-600 fill-pink-600" />}
                        {bid.isNew && (
                          <Badge className="bg-purple-100 text-purple-700">
                            <Sparkles className="h-3 w-3 mr-1" />
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
                        <span className="font-medium text-slate-700">{bid.supplierName}</span>
                        <span>•</span>
                        <span>ID: {bid.supplierId}</span>
                        <span>•</span>
                        <span>Received {bid.receivedDate}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span className="font-medium text-slate-700">{bid.supplierRating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600">
                          <Award className="h-4 w-4" />
                          <span className="font-medium">{bid.performanceScore}/100</span>
                        </div>
                        <div className="flex items-center gap-1 text-indigo-600">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{bid.onTimeRate}% on-time</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={`${statusColors[bid.status].bg} ${statusColors[bid.status].text}`}>
                      {statusColors[bid.status].label}
                    </Badge>
                  </div>

                  {bid.itemsBidOn && bid.itemsBidOn.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-slate-500 mb-2">Bidding on items:</p>
                      <div className="flex flex-wrap gap-1">
                        {bid.itemsBidOn.map((item, i) => (
                          <Badge key={i} variant="outline" className="text-xs bg-indigo-50 text-indigo-700">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

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