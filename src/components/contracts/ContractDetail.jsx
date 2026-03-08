import React from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, PenLine, FileText, CheckCircle, AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';
import ContractStatusBadge from './ContractStatusBadge';
import { format, differenceInDays, isPast, parseISO } from 'date-fns';

export default function ContractDetail({ contract, onBack }) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (data) => base44.entities.Contract.update(contract.id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contracts'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => base44.entities.Contract.delete(contract.id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['contracts'] }); onBack(); },
  });

  const handleSign = async (party) => {
    const now = new Date().toISOString();
    const update = party === 'buyer'
      ? { buyer_signed: true, buyer_signed_date: now }
      : { supplier_signed: true, supplier_signed_date: now };

    // Auto-activate when both signed
    const bothSigned = party === 'buyer'
      ? contract.supplier_signed
      : contract.buyer_signed;

    if (bothSigned) update.status = 'active';
    else if (contract.status === 'draft') update.status = 'pending_signature';

    updateMutation.mutate(update);
  };

  const handleRenew = async () => {
    const newContract = await base44.entities.Contract.create({
      ...contract,
      id: undefined,
      status: 'draft',
      buyer_signed: false,
      supplier_signed: false,
      buyer_signed_date: null,
      supplier_signed_date: null,
      contract_number: `${contract.contract_number}-R`,
      title: `${contract.title} (Renewal)`,
      renewal_contract_id: null,
    });
    await base44.entities.Contract.update(contract.id, { status: 'renewed', renewal_contract_id: newContract.id });
    queryClient.invalidateQueries({ queryKey: ['contracts'] });
    onBack();
  };

  const expiryDate = contract.expiry_date ? parseISO(contract.expiry_date) : null;
  const daysUntilExpiry = expiryDate ? differenceInDays(expiryDate, new Date()) : null;
  const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry <= (contract.renewal_reminder_days || 30) && daysUntilExpiry >= 0;
  const isExpired = expiryDate ? isPast(expiryDate) : false;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900">{contract.title}</h2>
          <p className="text-slate-500 text-sm">{contract.contract_number}</p>
        </div>
        <ContractStatusBadge status={contract.status} />
      </div>

      {/* Expiry Alert */}
      {(isExpiringSoon || isExpired) && (
        <div className={`flex items-center gap-3 p-4 rounded-xl border ${isExpired ? 'bg-red-50 border-red-200 text-red-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-medium">
            {isExpired
              ? `This contract expired on ${format(expiryDate, 'MMM d, yyyy')}.`
              : `This contract expires in ${daysUntilExpiry} day(s) on ${format(expiryDate, 'MMM d, yyyy')}. Consider renewing.`}
          </p>
          {!isExpired && (
            <Button size="sm" onClick={handleRenew} className="ml-auto bg-amber-600 hover:bg-amber-700 text-white">
              <RefreshCw className="h-3 w-3 mr-1" /> Renew
            </Button>
          )}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader><CardTitle className="text-base">Contract Details</CardTitle></CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <Detail label="Supplier" value={contract.supplier_name} />
              <Detail label="Supplier Email" value={contract.supplier_email} />
              <Detail label="Linked PO" value={contract.purchase_order_number || '—'} />
              <Detail label="Contract Value" value={contract.contract_value ? `SAR ${Number(contract.contract_value).toLocaleString()}` : '—'} />
              <Detail label="Start Date" value={contract.start_date ? format(parseISO(contract.start_date), 'MMM d, yyyy') : '—'} />
              <Detail label="Expiry Date" value={expiryDate ? format(expiryDate, 'MMM d, yyyy') : '—'} />
              <Detail label="Renewal Reminder" value={`${contract.renewal_reminder_days || 30} days before expiry`} />
              {contract.notes && <div className="sm:col-span-2"><Detail label="Notes" value={contract.notes} /></div>}
            </CardContent>
          </Card>

          {/* Signatures */}
          <Card className="border-0 shadow-md">
            <CardHeader><CardTitle className="text-base">Signatures</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <SignatureRow
                label="Buyer"
                signed={contract.buyer_signed}
                signedDate={contract.buyer_signed_date}
                onSign={() => handleSign('buyer')}
                disabled={contract.buyer_signed || contract.status === 'expired' || contract.status === 'terminated'}
              />
              <SignatureRow
                label="Supplier"
                signed={contract.supplier_signed}
                signedDate={contract.supplier_signed_date}
                onSign={() => handleSign('supplier')}
                disabled={contract.supplier_signed || contract.status === 'expired' || contract.status === 'terminated'}
              />
            </CardContent>
          </Card>
        </div>

        {/* Actions Panel */}
        <div className="space-y-4">
          {contract.file_url && (
            <Card className="border-0 shadow-md">
              <CardHeader><CardTitle className="text-base">Document</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <span className="text-sm text-slate-700 truncate flex-1">{contract.file_name || 'Contract file'}</span>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a href={contract.file_url} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" /> Download
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="border-0 shadow-md">
            <CardHeader><CardTitle className="text-base">Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {contract.status === 'active' && (
                <Button onClick={handleRenew} variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" /> Renew Contract
                </Button>
              )}
              {!['terminated', 'expired', 'renewed'].includes(contract.status) && (
                <Button onClick={() => updateMutation.mutate({ status: 'terminated' })} variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                  Terminate Contract
                </Button>
              )}
              <Button onClick={() => { if (confirm('Delete this contract?')) deleteMutation.mutate(); }} variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-800">{value || '—'}</p>
    </div>
  );
}

function SignatureRow({ label, signed, signedDate, onSign, disabled }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
      <div className="flex items-center gap-3">
        {signed
          ? <CheckCircle className="h-5 w-5 text-emerald-500" />
          : <PenLine className="h-5 w-5 text-slate-400" />}
        <div>
          <p className="text-sm font-medium text-slate-800">{label}</p>
          {signed && signedDate && (
            <p className="text-xs text-slate-500">Signed {format(new Date(signedDate), 'MMM d, yyyy HH:mm')}</p>
          )}
        </div>
      </div>
      {!signed && (
        <Button size="sm" onClick={onSign} disabled={disabled} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Sign
        </Button>
      )}
      {signed && <Badge className="bg-emerald-100 text-emerald-700">Signed</Badge>}
    </div>
  );
}