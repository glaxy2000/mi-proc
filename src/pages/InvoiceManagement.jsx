import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, CheckCircle2, Clock, XCircle, AlertCircle,
  Search, Upload, DollarSign, Building2, Calendar, Link2, Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const mockInvoices = [
  {
    id: 'INV-2024-001', po_number: 'PO-2024-045', grn_number: 'GRN-2024-032',
    supplier: 'ABC Steel Industries', supplier_email: 'supplier@abcsteel.com',
    amount: 148000, tax: 22200, total: 170200, currency: 'SAR',
    invoice_date: '2024-01-10', due_date: '2024-02-10',
    status: 'matched', payment_status: 'paid',
    items: [{ desc: 'Steel Rebar - 50 tons', qty: 50, unit_price: 2960, total: 148000 }],
    matching: { po: true, grn: true, amount: true }
  },
  {
    id: 'INV-2024-002', po_number: 'PO-2024-046', grn_number: 'GRN-2024-033',
    supplier: 'MedSupply Ltd.', supplier_email: 'billing@medsupply.com',
    amount: 42500, tax: 6375, total: 48875, currency: 'SAR',
    invoice_date: '2024-01-14', due_date: '2024-02-14',
    status: 'pending_match', payment_status: 'unpaid',
    items: [{ desc: 'PPE Kits - 500 units', qty: 500, unit_price: 85, total: 42500 }],
    matching: { po: true, grn: false, amount: true }
  },
  {
    id: 'INV-2024-003', po_number: 'PO-2024-047', grn_number: null,
    supplier: 'TechParts Inc.', supplier_email: 'invoices@techparts.com',
    amount: 95000, tax: 14250, total: 109250, currency: 'SAR',
    invoice_date: '2024-01-16', due_date: '2024-02-16',
    status: 'dispute', payment_status: 'on_hold',
    items: [{ desc: 'Server Hardware', qty: 5, unit_price: 19000, total: 95000 }],
    matching: { po: true, grn: false, amount: false }
  },
  {
    id: 'INV-2024-004', po_number: 'PO-2024-048', grn_number: 'GRN-2024-035',
    supplier: 'CleanCo Services', supplier_email: 'billing@cleanco.sa',
    amount: 8500, tax: 1275, total: 9775, currency: 'SAR',
    invoice_date: '2024-01-18', due_date: '2024-02-18',
    status: 'approved', payment_status: 'scheduled',
    items: [{ desc: 'Monthly Cleaning Services - Jan 2024', qty: 1, unit_price: 8500, total: 8500 }],
    matching: { po: true, grn: true, amount: true }
  },
  {
    id: 'INV-2024-005', po_number: 'PO-2024-040', grn_number: 'GRN-2024-030',
    supplier: 'Riyadh Consulting Group', supplier_email: 'finance@rcg.sa',
    amount: 45000, tax: 6750, total: 51750, currency: 'SAR',
    invoice_date: '2024-01-05', due_date: '2024-02-05',
    status: 'overdue', payment_status: 'overdue',
    items: [{ desc: 'HR Strategy Consulting - Q4 2023', qty: 1, unit_price: 45000, total: 45000 }],
    matching: { po: true, grn: true, amount: true }
  },
];

const statusConfig = {
  matched: { label: '3-Way Matched', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  approved: { label: 'Approved', color: 'bg-teal-100 text-teal-700', icon: CheckCircle2 },
  pending_match: { label: 'Pending Match', color: 'bg-amber-100 text-amber-700', icon: Clock },
  dispute: { label: 'Dispute', color: 'bg-red-100 text-red-700', icon: XCircle },
  overdue: { label: 'Overdue', color: 'bg-red-100 text-red-700', icon: AlertCircle },
};

const paymentStatusColors = {
  paid: 'bg-emerald-100 text-emerald-700',
  unpaid: 'bg-slate-100 text-slate-600',
  on_hold: 'bg-red-100 text-red-700',
  scheduled: 'bg-blue-100 text-blue-700',
  overdue: 'bg-red-100 text-red-700',
};

export default function InvoiceManagement() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = mockInvoices.filter(inv => {
    const matchSearch = inv.id.toLowerCase().includes(search.toLowerCase()) || inv.supplier.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = [
    { label: 'Total Invoices', value: mockInvoices.length, color: 'bg-indigo-500', icon: FileText },
    { label: 'Pending Match', value: mockInvoices.filter(i => i.status === 'pending_match').length, color: 'bg-amber-500', icon: Clock },
    { label: 'Disputes', value: mockInvoices.filter(i => i.status === 'dispute').length, color: 'bg-red-500', icon: XCircle },
    { label: 'Total Value', value: 'SAR ' + (mockInvoices.reduce((s, i) => s + i.total, 0) / 1000).toFixed(0) + 'K', color: 'bg-emerald-500', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Invoice Management</h1>
              <p className="text-teal-100">Automated 3-way matching: Invoice ↔ PO ↔ GRN. Full payment lifecycle visibility.</p>
            </div>
            <Button className="bg-white text-teal-700 hover:bg-teal-50 font-semibold">
              <Upload className="h-4 w-4 mr-2" /> Upload Invoice
            </Button>
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

        {/* 3-Way Matching Explainer */}
        <Card className="border-0 shadow-sm mb-6 bg-indigo-50 border border-indigo-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <p className="text-sm font-semibold text-indigo-800">3-Way Matching Process:</p>
              {['Purchase Order (PO)', '→', 'Goods Receipt (GRN)', '→', 'Supplier Invoice'].map((s, i) => (
                <span key={i} className={s === '→' ? 'text-indigo-400 font-bold' : 'bg-white text-indigo-700 px-3 py-1 rounded-full text-sm font-medium border border-indigo-200'}>
                  {s}
                </span>
              ))}
              <span className="text-xs text-indigo-600 ml-auto">Auto-match on 3 criteria: supplier, amount, receipt confirmation</span>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-4 flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search invoices..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
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

        {/* Invoice List */}
        <div className="space-y-4">
          {filtered.map((inv, i) => {
            const sc = statusConfig[inv.status];
            return (
              <motion.div key={inv.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setSelected(inv)}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-teal-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-mono text-xs text-slate-400">{inv.id}</span>
                            <Badge className={`${sc.color} text-xs`}>{sc.label}</Badge>
                            <Badge className={`${paymentStatusColors[inv.payment_status]} text-xs`}>{inv.payment_status.replace('_', ' ')}</Badge>
                          </div>
                          <h3 className="font-semibold text-slate-900 mb-1">{inv.supplier}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
                            <span className="flex items-center gap-1"><Link2 className="h-3.5 w-3.5" />PO: {inv.po_number}</span>
                            {inv.grn_number && <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />GRN: {inv.grn_number}</span>}
                            {!inv.grn_number && <span className="flex items-center gap-1"><XCircle className="h-3.5 w-3.5 text-red-400" />GRN: Pending</span>}
                            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Due: {inv.due_date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-slate-900">SAR {inv.total.toLocaleString()}</p>
                        <p className="text-xs text-slate-400">incl. {((inv.tax / inv.total) * 100).toFixed(0)}% VAT</p>
                        <div className="flex gap-1 mt-2 justify-end">
                          {[
                            { label: 'PO', matched: inv.matching.po },
                            { label: 'GRN', matched: inv.matching.grn },
                            { label: 'Amt', matched: inv.matching.amount },
                          ].map(m => (
                            <span key={m.label} className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${m.matched ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                              {m.label} {m.matched ? '✓' : '✗'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Invoice Detail Dialog */}
      {selected && (
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selected.id}
                <Badge className={statusConfig[selected.status].color}>{statusConfig[selected.status].label}</Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-slate-50 rounded-lg p-3"><span className="text-slate-500 text-xs">Supplier</span><p className="font-medium">{selected.supplier}</p></div>
                <div className="bg-slate-50 rounded-lg p-3"><span className="text-slate-500 text-xs">Invoice Date</span><p className="font-medium">{selected.invoice_date}</p></div>
                <div className="bg-slate-50 rounded-lg p-3"><span className="text-slate-500 text-xs">PO Number</span><p className="font-medium">{selected.po_number}</p></div>
                <div className="bg-slate-50 rounded-lg p-3"><span className="text-slate-500 text-xs">GRN Number</span><p className={`font-medium ${!selected.grn_number ? 'text-red-500' : ''}`}>{selected.grn_number || 'Not received'}</p></div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-slate-600 mb-2">Line Items</p>
                {selected.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-slate-700">{item.desc}</span>
                    <span className="font-semibold">SAR {item.total.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t mt-2 pt-2 flex justify-between text-sm">
                  <span className="text-slate-500">VAT (15%)</span>
                  <span className="text-slate-600">SAR {selected.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Total</span>
                  <span className="text-indigo-600">SAR {selected.total.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-600 mb-2">3-Way Matching Status</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'PO Match', key: 'po' },
                    { label: 'GRN Match', key: 'grn' },
                    { label: 'Amount Match', key: 'amount' },
                  ].map(m => (
                    <div key={m.key} className={`p-3 rounded-lg text-center ${selected.matching[m.key] ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
                      {selected.matching[m.key]
                        ? <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                        : <XCircle className="h-5 w-5 text-red-500 mx-auto mb-1" />}
                      <p className="text-xs font-medium text-slate-700">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}