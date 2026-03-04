import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Search, Filter, Clock, CheckCircle2, XCircle, AlertCircle,
  ChevronRight, FileText, DollarSign, User, Building2, ArrowRight,
  MoreVertical, MessageSquare, Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const mockPRs = [
  {
    id: 'PR-2024-001', title: 'Office Furniture - Standing Desks', requester: 'Ahmed Al-Sayed',
    department: 'Operations', category: 'Furniture', estimated_value: 45000, currency: 'SAR',
    status: 'pending_approval', priority: 'medium', created_date: '2024-01-15',
    justification: 'Team expansion requires additional workstations.',
    approvers: [{ name: 'Mohammed Al-Rashid', role: 'Manager', status: 'approved', date: '2024-01-16' }, { name: 'Khalid Ibrahim', role: 'Finance', status: 'pending' }]
  },
  {
    id: 'PR-2024-002', title: 'IT Hardware - Laptops x20', requester: 'Sara Al-Hamdan',
    department: 'IT', category: 'IT & Hardware', estimated_value: 180000, currency: 'SAR',
    status: 'approved', priority: 'high', created_date: '2024-01-12',
    justification: 'Replacement for end-of-life devices.',
    approvers: [{ name: 'Mohammed Al-Rashid', role: 'Manager', status: 'approved', date: '2024-01-13' }, { name: 'Khalid Ibrahim', role: 'Finance', status: 'approved', date: '2024-01-14' }]
  },
  {
    id: 'PR-2024-003', title: 'Cleaning Supplies - Monthly Stock', requester: 'Nora Al-Ghamdi',
    department: 'Facilities', category: 'Supplies', estimated_value: 8500, currency: 'SAR',
    status: 'draft', priority: 'low', created_date: '2024-01-17',
    justification: 'Regular monthly replenishment.',
    approvers: []
  },
  {
    id: 'PR-2024-004', title: 'Security Cameras - Warehouse', requester: 'Faisal Al-Otaibi',
    department: 'Security', category: 'Electronics', estimated_value: 62000, currency: 'SAR',
    status: 'rejected', priority: 'high', created_date: '2024-01-10',
    justification: 'Security upgrade for new warehouse.',
    approvers: [{ name: 'Mohammed Al-Rashid', role: 'Manager', status: 'rejected', date: '2024-01-11', remark: 'Budget not available this quarter.' }]
  },
  {
    id: 'PR-2024-005', title: 'Consulting Services - HR Strategy', requester: 'Lina Al-Zahrani',
    department: 'HR', category: 'Consulting', estimated_value: 95000, currency: 'SAR',
    status: 'converted_to_rfq', priority: 'medium', created_date: '2024-01-08',
    justification: 'Annual HR strategy consultation.',
    approvers: [{ name: 'Mohammed Al-Rashid', role: 'Manager', status: 'approved' }, { name: 'Khalid Ibrahim', role: 'Finance', status: 'approved' }]
  },
];

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-slate-100 text-slate-600', icon: FileText },
  pending_approval: { label: 'Pending Approval', color: 'bg-amber-100 text-amber-700', icon: Clock },
  approved: { label: 'Approved', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle },
  converted_to_rfq: { label: 'Converted to RFQ', color: 'bg-indigo-100 text-indigo-700', icon: ArrowRight },
};

const priorityColors = { low: 'bg-slate-100 text-slate-600', medium: 'bg-amber-100 text-amber-700', high: 'bg-red-100 text-red-700' };

export default function PurchaseRequests() {
  const [prs, setPRs] = useState(mockPRs);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [selectedPR, setSelectedPR] = useState(null);
  const [form, setForm] = useState({ title: '', department: '', category: '', estimated_value: '', justification: '', priority: 'medium' });

  const filtered = prs.filter(pr => {
    const matchSearch = pr.title.toLowerCase().includes(search.toLowerCase()) || pr.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || pr.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = [
    { label: 'Total PRs', value: prs.length, color: 'bg-indigo-500', icon: FileText },
    { label: 'Pending Approval', value: prs.filter(p => p.status === 'pending_approval').length, color: 'bg-amber-500', icon: Clock },
    { label: 'Approved', value: prs.filter(p => p.status === 'approved').length, color: 'bg-emerald-500', icon: CheckCircle2 },
    { label: 'Total Value', value: 'SAR ' + (prs.reduce((s, p) => s + p.estimated_value, 0) / 1000).toFixed(0) + 'K', color: 'bg-purple-500', icon: DollarSign },
  ];

  const handleCreate = () => {
    const newPR = {
      id: `PR-2024-00${prs.length + 1}`, title: form.title, requester: 'Ahmed Al-Sayed',
      department: form.department, category: form.category,
      estimated_value: parseFloat(form.estimated_value) || 0, currency: 'SAR',
      status: 'draft', priority: form.priority, created_date: new Date().toISOString().split('T')[0],
      justification: form.justification, approvers: []
    };
    setPRs([newPR, ...prs]);
    setShowCreate(false);
    setForm({ title: '', department: '', category: '', estimated_value: '', justification: '', priority: 'medium' });
  };

  const handleSubmitForApproval = (pr) => {
    setPRs(prs.map(p => p.id === pr.id ? { ...p, status: 'pending_approval', approvers: [{ name: 'Mohammed Al-Rashid', role: 'Manager', status: 'pending' }, { name: 'Khalid Ibrahim', role: 'Finance', status: 'pending' }] } : p));
    setSelectedPR(null);
  };

  const handleConvertToRFQ = (pr) => {
    setPRs(prs.map(p => p.id === pr.id ? { ...p, status: 'converted_to_rfq' } : p));
    setSelectedPR(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Purchase Requests</h1>
              <p className="text-indigo-100">Create, track and manage purchase requests through approval workflows before converting to RFQs.</p>
            </div>
            <Button onClick={() => setShowCreate(true)} className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold">
              <Plus className="h-4 w-4 mr-2" /> New Purchase Request
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

        {/* Filters */}
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-4 flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search purchase requests..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
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

        {/* PR List */}
        <div className="space-y-4">
          {filtered.map((pr, i) => {
            const sc = statusConfig[pr.status];
            return (
              <motion.div key={pr.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setSelectedPR(pr)}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-xs font-mono text-slate-400">{pr.id}</span>
                            <Badge className={`${sc.color} text-xs`}>{sc.label}</Badge>
                            <Badge className={`${priorityColors[pr.priority]} text-xs`}>{pr.priority}</Badge>
                          </div>
                          <h3 className="font-semibold text-slate-900 mb-1">{pr.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
                            <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{pr.requester}</span>
                            <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" />{pr.department}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{pr.created_date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-slate-900">SAR {pr.estimated_value.toLocaleString()}</p>
                        <p className="text-xs text-slate-400 mt-1">{pr.category}</p>
                        <div className="flex items-center gap-1 mt-2 justify-end">
                          {pr.approvers.map((a, ai) => (
                            <div key={ai} title={`${a.name}: ${a.status}`}
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold border-2 border-white ${a.status === 'approved' ? 'bg-emerald-400' : a.status === 'rejected' ? 'bg-red-400' : 'bg-slate-300'}`}>
                              {a.name[0]}
                            </div>
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

      {/* Create PR Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>New Purchase Request</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Request Title</Label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Office Chairs x10" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Department</Label>
                <Select value={form.department} onValueChange={v => setForm({ ...form, department: v })}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {['IT', 'Operations', 'HR', 'Finance', 'Facilities', 'Security', 'Marketing'].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Category</Label>
                <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {['IT & Hardware', 'Furniture', 'Supplies', 'Electronics', 'Consulting', 'Services', 'Raw Materials'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Estimated Value (SAR)</Label>
                <Input type="number" value={form.estimated_value} onChange={e => setForm({ ...form, estimated_value: e.target.value })} placeholder="0.00" className="mt-1" />
              </div>
              <div>
                <Label>Priority</Label>
                <Select value={form.priority} onValueChange={v => setForm({ ...form, priority: v })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Justification</Label>
              <Textarea value={form.justification} onChange={e => setForm({ ...form, justification: e.target.value })} placeholder="Business justification for this purchase..." className="mt-1" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!form.title} className="bg-indigo-600 hover:bg-indigo-700">Create Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PR Detail Dialog */}
      {selectedPR && (
        <Dialog open={!!selectedPR} onOpenChange={() => setSelectedPR(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span className="font-mono text-sm text-slate-400">{selectedPR.id}</span>
                <Badge className={statusConfig[selectedPR.status].color}>{statusConfig[selectedPR.status].label}</Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <h3 className="font-semibold text-lg text-slate-900">{selectedPR.title}</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-slate-50 rounded-lg p-3"><span className="text-slate-500">Requester</span><p className="font-medium">{selectedPR.requester}</p></div>
                <div className="bg-slate-50 rounded-lg p-3"><span className="text-slate-500">Department</span><p className="font-medium">{selectedPR.department}</p></div>
                <div className="bg-slate-50 rounded-lg p-3"><span className="text-slate-500">Category</span><p className="font-medium">{selectedPR.category}</p></div>
                <div className="bg-slate-50 rounded-lg p-3"><span className="text-slate-500">Estimated Value</span><p className="font-bold text-indigo-600">SAR {selectedPR.estimated_value.toLocaleString()}</p></div>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Justification</p>
                <p className="text-sm text-slate-700">{selectedPR.justification}</p>
              </div>
              {selectedPR.approvers.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">Approval Chain</p>
                  <div className="space-y-2">
                    {selectedPR.approvers.map((a, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{a.name}</p>
                          <p className="text-xs text-slate-500">{a.role}</p>
                          {a.remark && <p className="text-xs text-red-600 mt-0.5">"{a.remark}"</p>}
                        </div>
                        <Badge className={a.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : a.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}>
                          {a.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="flex gap-2 flex-wrap">
              {selectedPR.status === 'draft' && (
                <Button onClick={() => handleSubmitForApproval(selectedPR)} className="bg-amber-500 hover:bg-amber-600">Submit for Approval</Button>
              )}
              {selectedPR.status === 'approved' && (
                <Button onClick={() => handleConvertToRFQ(selectedPR)} className="bg-indigo-600 hover:bg-indigo-700">
                  <ArrowRight className="h-4 w-4 mr-2" /> Convert to RFQ
                </Button>
              )}
              <Button variant="outline" onClick={() => setSelectedPR(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}