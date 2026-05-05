import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
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
  Sparkles,
  FileText,
  Bell,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';

export default function Bids() {
  const [selectedRFQ, setSelectedRFQ] = useState('all');
  const [sortBy, setSortBy] = useState('received_latest');
  const [itemFilter, setItemFilter] = useState('all');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [liveRFQs, setLiveRFQs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loadingRFQs, setLoadingRFQs] = useState(true);

  const selectedRole = localStorage.getItem('selectedRole') || 'buyer';

  useEffect(() => {
    const fetchData = async () => {
      setLoadingRFQs(true);
      const [goodsRFQs, servicesRFQs, notifs] = await Promise.all([
        base44.entities.GoodsRFQ.list('-created_date'),
        base44.entities.ServicesRFQ.list('-created_date'),
        base44.entities.Notification.filter({ is_read: false }, '-created_date', 20),
      ]);
      const combined = [
        ...goodsRFQs.map(r => ({ ...r, rfqType: 'goods' })),
        ...servicesRFQs.map(r => ({ ...r, rfqType: 'services' })),
      ].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
      setLiveRFQs(combined);
      // Filter notifications relevant to current role
      const roleNotifs = notifs.filter(n =>
        n.recipient_role === selectedRole || n.recipient_role === 'all'
      );
      setNotifications(roleNotifs);
      setLoadingRFQs(false);
    };
    fetchData();
  }, []);

  const markAllRead = async () => {
    await Promise.all(notifications.map(n => base44.entities.Notification.update(n.id, { is_read: true })));
    setNotifications([]);
  };

  const bids = [];

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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Bid Management</h1>
            <p className="text-slate-600">Review and compare bids from suppliers</p>
          </div>
          {notifications.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge className="bg-red-100 text-red-700">
                <Bell className="h-3 w-3 mr-1" />
                {notifications.length} new notification{notifications.length > 1 ? 's' : ''}
              </Badge>
              <Button size="sm" variant="outline" onClick={markAllRead}>Mark all read</Button>
            </div>
          )}
        </div>

        {/* Notifications Panel */}
        {notifications.length > 0 && (
          <div className="mb-6 space-y-2">
            {notifications.slice(0, 5).map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-3 p-4 rounded-xl border ${
                  notif.type === 'new_rfq' ? 'bg-indigo-50 border-indigo-200' : 'bg-amber-50 border-amber-200'
                }`}
              >
                <Bell className={`h-5 w-5 mt-0.5 flex-shrink-0 ${notif.type === 'new_rfq' ? 'text-indigo-600' : 'text-amber-600'}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 text-sm">{notif.title}</p>
                  <p className="text-sm text-slate-600 mt-0.5">{notif.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{format(new Date(notif.created_date), 'MMM d, yyyy HH:mm')}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-slate-400 hover:text-slate-600 flex-shrink-0"
                  onClick={() => base44.entities.Notification.update(notif.id, { is_read: true }).then(() =>
                    setNotifications(prev => prev.filter(n => n.id !== notif.id))
                  )}
                >
                  ✕
                </Button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Live RFQs available for bidding (Supplier view) */}
        {selectedRole === 'supplier' && (
          <Card className="border-0 shadow-lg mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg">
                <FileText className="h-5 w-5 inline mr-2 text-indigo-600" />
                Open RFQs — Available to Bid
              </CardTitle>
              <Link to={createPageUrl('RFQList')}>
                <Button size="sm" variant="outline">View All RFQs</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loadingRFQs ? (
                <div className="flex justify-center py-6"><Loader2 className="h-6 w-6 animate-spin text-indigo-600" /></div>
              ) : liveRFQs.filter(r => r.status === 'active').length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-4">No active RFQs at the moment.</p>
              ) : (
                <div className="space-y-3">
                  {liveRFQs.filter(r => r.status === 'active').slice(0, 5).map((rfq) => (
                    <div key={rfq.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 text-sm">{rfq.title}</p>
                          <p className="text-xs text-slate-500 capitalize">{rfq.rfqType} • {rfq.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {rfq.budget && (
                          <span className="text-sm font-semibold text-indigo-600">SAR {rfq.budget.toLocaleString()}</span>
                        )}
                        <Badge className="bg-teal-100 text-teal-700">Active</Badge>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Submit Bid</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Buyer: RFQ summary with bid counts */}
        {selectedRole === 'buyer' && liveRFQs.length > 0 && (
          <Card className="border-0 shadow-lg mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                <FileText className="h-5 w-5 inline mr-2 text-indigo-600" />
                Your Active RFQs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {liveRFQs.slice(0, 4).map((rfq) => (
                  <div key={rfq.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{rfq.title}</p>
                      <p className="text-xs text-slate-500 capitalize">{rfq.rfqType} RFQ • {rfq.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={rfq.status === 'active' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-600'}>
                        {rfq.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}


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