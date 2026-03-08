import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, Loader2 } from 'lucide-react';

export default function ContractUploadForm({ onSave, onCancel, purchaseOrders = [] }) {
  const [form, setForm] = useState({
    title: '',
    contract_number: `CNT-${Date.now().toString().slice(-6)}`,
    purchase_order_id: '',
    purchase_order_number: '',
    supplier_email: '',
    supplier_name: '',
    contract_value: '',
    start_date: '',
    expiry_date: '',
    renewal_reminder_days: 30,
    notes: '',
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handlePOSelect = (e) => {
    const po = purchaseOrders.find(p => p.id === e.target.value);
    if (po) {
      setForm(f => ({
        ...f,
        purchase_order_id: po.id,
        purchase_order_number: po.order_number || po.id,
        supplier_email: po.supplier_email || '',
        supplier_name: po.supplier_name || '',
        contract_value: po.total_amount || '',
      }));
    } else {
      setForm(f => ({ ...f, purchase_order_id: '', purchase_order_number: '' }));
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    let file_url = '';
    let file_name = '';

    if (file) {
      setUploading(true);
      const result = await base44.integrations.Core.UploadFile({ file });
      file_url = result.file_url;
      file_name = file.name;
      setUploading(false);
    }

    const user = await base44.auth.me().catch(() => null);
    await base44.entities.Contract.create({
      ...form,
      contract_value: Number(form.contract_value) || 0,
      renewal_reminder_days: Number(form.renewal_reminder_days) || 30,
      buyer_email: user?.email || '',
      file_url,
      file_name,
      status: 'draft',
      buyer_signed: false,
      supplier_signed: false,
    });

    setSaving(false);
    onSave();
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>New Contract</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}><X className="h-4 w-4" /></Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Contract Title *</label>
              <Input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Supply Agreement 2026" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Contract Number</label>
              <Input value={form.contract_number} onChange={e => setForm(f => ({ ...f, contract_number: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Linked Purchase Order</label>
            <select
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.purchase_order_id}
              onChange={handlePOSelect}
            >
              <option value="">— None —</option>
              {purchaseOrders.map(po => (
                <option key={po.id} value={po.id}>{po.order_number || po.id} — {po.supplier_name}</option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Supplier Name</label>
              <Input value={form.supplier_name} onChange={e => setForm(f => ({ ...f, supplier_name: e.target.value }))} placeholder="Supplier name" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Supplier Email</label>
              <Input type="email" value={form.supplier_email} onChange={e => setForm(f => ({ ...f, supplier_email: e.target.value }))} placeholder="supplier@example.com" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Contract Value (SAR)</label>
              <Input type="number" value={form.contract_value} onChange={e => setForm(f => ({ ...f, contract_value: e.target.value }))} placeholder="0" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Start Date</label>
              <Input type="date" value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Expiry Date *</label>
              <Input required type="date" value={form.expiry_date} onChange={e => setForm(f => ({ ...f, expiry_date: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Renewal Reminder (days before expiry)</label>
            <Input type="number" value={form.renewal_reminder_days} onChange={e => setForm(f => ({ ...f, renewal_reminder_days: e.target.value }))} />
          </div>

          {/* File Upload */}
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Upload Contract Document</label>
            <label className="flex items-center gap-3 border-2 border-dashed border-slate-200 rounded-lg p-4 cursor-pointer hover:border-indigo-400 transition-colors">
              <Upload className="h-5 w-5 text-slate-400" />
              <span className="text-sm text-slate-500">{file ? file.name : 'Click to upload PDF or DOCX'}</span>
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            </label>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Notes</label>
            <textarea
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 h-20 resize-none"
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              placeholder="Additional terms or notes..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">Cancel</Button>
            <Button type="submit" disabled={saving || uploading} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
              {(saving || uploading) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {uploading ? 'Uploading...' : saving ? 'Saving...' : 'Create Contract'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}