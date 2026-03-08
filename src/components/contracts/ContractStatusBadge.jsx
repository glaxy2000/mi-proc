import React from 'react';
import { Badge } from '@/components/ui/badge';

const statusConfig = {
  draft:             { label: 'Draft',            className: 'bg-slate-100 text-slate-700' },
  pending_signature: { label: 'Pending Signature', className: 'bg-amber-100 text-amber-700' },
  active:            { label: 'Active',            className: 'bg-emerald-100 text-emerald-700' },
  expired:           { label: 'Expired',           className: 'bg-red-100 text-red-700' },
  terminated:        { label: 'Terminated',        className: 'bg-rose-100 text-rose-800' },
  renewed:           { label: 'Renewed',           className: 'bg-blue-100 text-blue-700' },
};

export default function ContractStatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.draft;
  return <Badge className={config.className}>{config.label}</Badge>;
}