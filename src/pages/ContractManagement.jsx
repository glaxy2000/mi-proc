import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Search, FileText, AlertTriangle, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ContractStatusBadge from '@/components/contracts/ContractStatusBadge';
import ContractUploadForm from '@/components/contracts/ContractUploadForm';
import ContractDetail from '@/components/contracts/ContractDetail';
import { format, differenceInDays, parseISO, isPast } from 'date-fns';

export default function ContractManagement() {
  const [showForm, setShowForm] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const queryClient = useQueryClient();

  const { data: contracts = [], isLoading } = useQuery({
    queryKey: ['contracts'],
    queryFn: () => base44.entities.Contract.list('-created_date'),
  });

  const { data: purchaseOrders = [] } = useQuery({
    queryKey: ['purchaseOrders'],
    queryFn: () => base44.entities.GoodsOrder.list(),
  });

  const filtered = contracts.filter(c => {
    const matchSearch = !search ||
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.supplier_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.contract_number?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Summary stats
  const now = new Date();
  const active = contracts.filter(c => c.status === 'active').length;
  const expiringSoon = contracts.filter(c => {
    if (!c.expiry_date || c.status !== 'active') return false;
    const days = differenceInDays(parseISO(c.expiry_date), now);
    return days >= 0 && days <= (c.renewal_reminder_days || 30);
  }).length;
  const expired = contracts.filter(c => c.status === 'expired' || (c.expiry_date && isPast(parseISO(c.expiry_date)) && c.status === 'active')).length;
  const pending = contracts.filter(c => c.status === 'pending_signature').length;

  const statusTabs = [
    { key: 'all', label: 'All' },
    { key: 'draft', label: 'Draft' },
    { key: 'pending_signature', label: 'Pending Signature' },
    { key: 'active', label: 'Active' },
    { key: 'expired', label: 'Expired' },
    { key: 'renewed', label: 'Renewed' },
    { key: 'terminated', label: 'Terminated' },
  ];

  if (selectedContract) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <ContractDetail
            contract={selectedContract}
            onBack={() => { setSelectedContract(null); queryClient.invalidateQueries({ queryKey: ['contracts'] }); }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Contract Management</h1>
              <p className="text-slate-600 mt-1">Upload, sign, and track digital contracts with expiry alerts</p>
            </div>
            <Button onClick={() => setShowForm(true)} className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-2" /> New Contract
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Upload Form */}
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <ContractUploadForm
              purchaseOrders={purchaseOrders}
              onSave={() => { setShowForm(false); queryClient.invalidateQueries({ queryKey: ['contracts'] }); }}
              onCancel={() => setShowForm(false)}
            />
          </motion.div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryCard icon={<CheckCircle className="h-5 w-5 text-emerald-600" />} label="Active" value={active} bg="from-emerald-50 to-teal-100" color="text-emerald-700" />
          <SummaryCard icon={<AlertTriangle className="h-5 w-5 text-amber-600" />} label="Expiring Soon" value={expiringSoon} bg="from-amber-50 to-orange-100" color="text-amber-700" />
          <SummaryCard icon={<Clock className="h-5 w-5 text-slate-500" />} label="Pending Signature" value={pending} bg="from-slate-50 to-slate-100" color="text-slate-700" />
          <SummaryCard icon={<RefreshCw className="h-5 w-5 text-red-500" />} label="Expired" value={expired} bg="from-red-50 to-rose-100" color="text-red-700" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              className="pl-9"
              placeholder="Search by title, supplier, or contract number..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 flex-wrap">
          {statusTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                statusFilter === tab.key
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contract List */}
        {isLoading ? (
          <div className="text-center py-16 text-slate-400">Loading contracts...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No contracts found</p>
            <p className="text-slate-400 text-sm mt-1">Create your first contract to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(contract => (
              <ContractRow
                key={contract.id}
                contract={contract}
                onClick={() => setSelectedContract(contract)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value, bg, color }) {
  return (
    <Card className={`border-0 shadow-md bg-gradient-to-br ${bg}`}>
      <CardContent className="p-5 flex items-center gap-4">
        <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
        <div>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          <p className="text-xs text-slate-600">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ContractRow({ contract, onClick }) {
  const expiryDate = contract.expiry_date ? parseISO(contract.expiry_date) : null;
  const daysLeft = expiryDate ? differenceInDays(expiryDate, new Date()) : null;
  const isExpiringSoon = daysLeft !== null && daysLeft >= 0 && daysLeft <= (contract.renewal_reminder_days || 30);
  const isExpired = expiryDate && isPast(expiryDate);

  return (
    <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
      <Card
        className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={onClick}
      >
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-indigo-50 rounded-lg">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-slate-900 truncate">{contract.title}</p>
                <ContractStatusBadge status={contract.status} />
                {isExpiringSoon && !isExpired && (
                  <Badge className="bg-amber-100 text-amber-700 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Expiring in {daysLeft}d
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 flex-wrap">
                <span>{contract.contract_number}</span>
                {contract.supplier_name && <span>· {contract.supplier_name}</span>}
                {contract.purchase_order_number && <span>· PO: {contract.purchase_order_number}</span>}
              </div>
            </div>
            <div className="text-right shrink-0 space-y-1">
              {contract.contract_value > 0 && (
                <p className="text-sm font-semibold text-slate-800">SAR {Number(contract.contract_value).toLocaleString()}</p>
              )}
              {expiryDate && (
                <p className={`text-xs ${isExpired ? 'text-red-600' : 'text-slate-500'}`}>
                  Expires {format(expiryDate, 'MMM d, yyyy')}
                </p>
              )}
              <div className="flex items-center gap-2 justify-end text-xs text-slate-400">
                <span className={`flex items-center gap-1 ${contract.buyer_signed ? 'text-emerald-600' : ''}`}>
                  <CheckCircle className="h-3 w-3" /> Buyer
                </span>
                <span className={`flex items-center gap-1 ${contract.supplier_signed ? 'text-emerald-600' : ''}`}>
                  <CheckCircle className="h-3 w-3" /> Supplier
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}