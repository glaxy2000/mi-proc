import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PackageCheck, Package, Clock, CheckCircle2, AlertCircle,
  Search, Plus, Truck, User, Calendar, ClipboardList, XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const mockGRNs = [
  {
    id: 'GRN-2024-001', po_number: 'PO-2024-045', order_id: 'ORD-2024-001',
    supplier: 'ABC Steel Industries', received_by: 'Warehouse Team',
    received_date: '2024-01-12', expected_date: '2024-01-14',
    status: 'accepted', quality_status: 'passed',
    items: [
      { name: 'Steel Rebar 12mm', ordered_qty: 50, received_qty: 50, unit: 'tons', condition: 'good' },
    ],
    notes: 'All items received in excellent condition. Quality inspection passed.'
  },
  {
    id: 'GRN-2024-002', po_number: 'PO-2024-046', order_id: 'ORD-2024-002',
    supplier: 'MedSupply Ltd.', received_by: 'Store Manager',
    received_date: '2024-01-15', expected_date: '2024-01-13',
    status: 'partial', quality_status: 'passed',
    items: [
      { name: 'PPE Kits', ordered_qty: 500, received_qty: 420, unit: 'units', condition: 'good' },
    ],
    notes: 'Only 420 of 500 units delivered. Remaining 80 expected within 3 days.'
  },
  {
    id: 'GRN-2024-003', po_number: 'PO-2024-048', order_id: 'ORD-2024-004',
    supplier: 'CleanCo Services', received_by: 'Facilities Manager',
    received_date: '2024-01-18', expected_date: '2024-01-18',
    status: 'accepted', quality_status: 'passed',
    items: [
      { name: 'Cleaning Supplies Bundle', ordered_qty: 1, received_qty: 1, unit: 'lot', condition: 'good' },
    ],
    notes: 'Service and supplies delivered on time.'
  },
  {
    id: 'GRN-2024-004', po_number: 'PO-2024-047', order_id: 'ORD-2024-003',
    supplier: 'TechParts Inc.', received_by: 'IT Department',
    received_date: '2024-01-20', expected_date: '2024-01-19',
    status: 'rejected', quality_status: 'failed',
    items: [
      { name: 'Server Hardware', ordered_qty: 5, received_qty: 5, unit: 'units', condition: 'damaged' },
    ],
    notes: '2 out of 5 servers arrived with physical damage. Returned to supplier for replacement.'
  },
  {
    id: 'GRN-2024-005', po_number: 'PO-2024-050', order_id: 'ORD-2024-005',
    supplier: 'Office Furniture Co.', received_by: null,
    received_date: null, expected_date: '2024-01-25',
    status: 'pending', quality_status: 'pending',
    items: [
      { name: 'Standing Desks', ordered_qty: 10, received_qty: 0, unit: 'units', condition: '-' },
    ],
    notes: ''
  },
];

const statusConfig = {
  pending: { label: 'Pending Delivery', color: 'bg-slate-100 text-slate-600', icon: Clock },
  accepted: { label: 'Accepted', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  partial: { label: 'Partial Receipt', color: 'bg-amber-100 text-amber-700', icon: AlertCircle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle },
};

const qualityColors = {
  pending: 'bg-slate-100 text-slate-600',
  passed: 'bg-emerald-100 text-emerald-700',
  failed: 'bg-red-100 text-red-700',
};

export default function GoodsReceipt() {
  const [grns, setGRNs] = useState(mockGRNs);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [showReceive, setShowReceive] = useState(null);
  const [receiveForm, setReceiveForm] = useState({ received_qty: '', condition: 'good', notes: '' });

  const filtered = grns.filter(g => {
    const matchSearch = g.id.toLowerCase().includes(search.toLowerCase()) || g.supplier.toLowerCase().includes(search.toLowerCase()) || g.po_number.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || g.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleConfirmReceipt = (grn) => {
    setGRNs(grns.map(g => g.id === grn.id ? {
      ...g, status: receiveForm.condition === 'damaged' ? 'rejected' : 'accepted',
      quality_status: receiveForm.condition === 'damaged' ? 'failed' : 'passed',
      received_by: 'Current User', received_date: new Date().toISOString().split('T')[0],
      notes: receiveForm.notes,
      items: g.items.map(i => ({ ...i, received_qty: parseInt(receiveForm.received_qty) || i.ordered_qty, condition: receiveForm.condition }))
    } : g));
    setShowReceive(null);
    setReceiveForm({ received_qty: '', condition: 'good', notes: '' });
  };

  const stats = [
    { label: 'Total GRNs', value: grns.length, color: 'bg-indigo-500', icon: ClipboardList },
    { label: 'Pending', value: grns.filter(g => g.status === 'pending').length, color: 'bg-amber-500', icon: Clock },
    { label: 'Accepted', value: grns.filter(g => g.status === 'accepted').length, color: 'bg-emerald-500', icon: CheckCircle2 },
    { label: 'Rejected / Issues', value: grns.filter(g => g.status === 'rejected' || g.status === 'partial').length, color: 'bg-red-500', icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
          <div>
            <h1 className="text-3xl font-bold mb-2">Goods Receipt (GRN)</h1>
            <p className="text-purple-100">Confirm quantity & quality on delivery. GRN records feed into 3-way matching for invoice approval.</p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${s.color}`}><s.icon className="h-5 w-5 text-white" /></div>
                  <div>
                    <p className="text-xl font-bold text-slate-900">{s.value}</p>
                    <p className="text-sm text-slate-500">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-4 flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search GRNs..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Filter by status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {Object.entries(statusConfig).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* GRN List */}
        <div className="space-y-4">
          {filtered.map((grn, i) => {
            const sc = statusConfig[grn.status];
            const item = grn.items[0];
            const receiptPct = item.ordered_qty > 0 ? Math.round((item.received_qty / item.ordered_qty) * 100) : 0;
            return (
              <motion.div key={grn.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${grn.status === 'rejected' ? 'bg-red-100' : grn.status === 'accepted' ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                          <Package className={`h-5 w-5 ${grn.status === 'rejected' ? 'text-red-600' : grn.status === 'accepted' ? 'text-emerald-600' : 'text-slate-500'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-mono text-xs text-slate-400">{grn.id}</span>
                            <Badge className={`${sc.color} text-xs`}>{sc.label}</Badge>
                            <Badge className={`${qualityColors[grn.quality_status]} text-xs`}>QC: {grn.quality_status}</Badge>
                          </div>
                          <h3 className="font-semibold text-slate-900 mb-1">{grn.supplier}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
                            <span>PO: {grn.po_number}</span>
                            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Expected: {grn.expected_date}</span>
                            {grn.received_date && <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />Received: {grn.received_date}</span>}
                          </div>
                          {item.ordered_qty > 0 && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs text-slate-500 mb-1">
                                <span>{item.name}</span>
                                <span>{item.received_qty}/{item.ordered_qty} {item.unit} ({receiptPct}%)</span>
                              </div>
                              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${receiptPct === 100 ? 'bg-emerald-500' : receiptPct > 0 ? 'bg-amber-500' : 'bg-slate-300'}`} style={{ width: `${receiptPct}%` }} />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 flex-col items-end">
                        <Button variant="outline" size="sm" onClick={() => setSelected(grn)} className="text-xs">
                          View Details
                        </Button>
                        {grn.status === 'pending' && (
                          <Button size="sm" onClick={() => { setShowReceive(grn); setReceiveForm({ received_qty: String(item.ordered_qty), condition: 'good', notes: '' }); }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                            <PackageCheck className="h-3.5 w-3.5 mr-1" /> Confirm Receipt
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Confirm Receipt Dialog */}
      {showReceive && (
        <Dialog open={!!showReceive} onOpenChange={() => setShowReceive(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Confirm Goods Receipt — {showReceive.id}</DialogTitle></DialogHeader>
            <div className="space-y-4 py-2">
              <div className="bg-slate-50 rounded-lg p-3 text-sm">
                <p className="font-medium text-slate-900">{showReceive.supplier}</p>
                <p className="text-slate-500">{showReceive.po_number} · {showReceive.items[0].name}</p>
              </div>
              <div>
                <Label>Received Quantity ({showReceive.items[0].unit})</Label>
                <Input type="number" value={receiveForm.received_qty} onChange={e => setReceiveForm({ ...receiveForm, received_qty: e.target.value })} className="mt-1" />
                <p className="text-xs text-slate-400 mt-1">Ordered: {showReceive.items[0].ordered_qty} {showReceive.items[0].unit}</p>
              </div>
              <div>
                <Label>Condition</Label>
                <Select value={receiveForm.condition} onValueChange={v => setReceiveForm({ ...receiveForm, condition: v })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Good Condition ✓</SelectItem>
                    <SelectItem value="acceptable">Acceptable</SelectItem>
                    <SelectItem value="damaged">Damaged / Rejected ✗</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea value={receiveForm.notes} onChange={e => setReceiveForm({ ...receiveForm, notes: e.target.value })} placeholder="Any remarks about the delivery..." className="mt-1" rows={2} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowReceive(null)}>Cancel</Button>
              <Button onClick={() => handleConfirmReceipt(showReceive)} className={receiveForm.condition === 'damaged' ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}>
                {receiveForm.condition === 'damaged' ? 'Reject Delivery' : 'Confirm Receipt'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Detail Dialog */}
      {selected && (
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selected.id} <Badge className={statusConfig[selected.status].color}>{statusConfig[selected.status].label}</Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 p-2 rounded-lg"><p className="text-xs text-slate-400">Supplier</p><p className="font-medium">{selected.supplier}</p></div>
                <div className="bg-slate-50 p-2 rounded-lg"><p className="text-xs text-slate-400">PO Number</p><p className="font-medium">{selected.po_number}</p></div>
                <div className="bg-slate-50 p-2 rounded-lg"><p className="text-xs text-slate-400">Expected</p><p className="font-medium">{selected.expected_date}</p></div>
                <div className="bg-slate-50 p-2 rounded-lg"><p className="text-xs text-slate-400">Received</p><p className="font-medium">{selected.received_date || '—'}</p></div>
              </div>
              {selected.items.map((item, i) => (
                <div key={i} className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                  <p className="font-semibold text-indigo-900">{item.name}</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-slate-500">Ordered: {item.ordered_qty} {item.unit}</span>
                    <span className={`font-semibold ${item.received_qty < item.ordered_qty ? 'text-amber-600' : 'text-emerald-600'}`}>Received: {item.received_qty} {item.unit}</span>
                  </div>
                  <Badge className={item.condition === 'good' ? 'bg-emerald-100 text-emerald-700 mt-1' : 'bg-red-100 text-red-700 mt-1'}>{item.condition}</Badge>
                </div>
              ))}
              {selected.notes && (
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-1">Notes</p>
                  <p className="text-slate-700">{selected.notes}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}