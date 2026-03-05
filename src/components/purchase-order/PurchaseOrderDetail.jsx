import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ChevronLeft, Send, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const statusFlow = ['Draft', 'Pending Approval', 'Approved', 'Completed'];
const statusColors = {
  'Draft': 'bg-slate-100 text-slate-700',
  'Pending Approval': 'bg-amber-100 text-amber-700',
  'Approved': 'bg-blue-100 text-blue-700',
  'Completed': 'bg-emerald-100 text-emerald-700',
};

export default function PurchaseOrderDetail({ order, workflows, onBack, onUpdate }) {
  const [newStatus, setNewStatus] = useState(order.status);
  const [approvalNote, setApprovalNote] = useState('');

  const { data: suppliers = [] } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => base44.entities.SupplierPerformance.list(),
  });

  const supplier = suppliers.find(s => s.supplier_email === order.supplier_email);

  // Determine matching workflow based on order amount
  const matchingWorkflow = workflows.find(wf => {
    return wf.conditions?.some(cond => {
      if (cond.type === 'spend_amount') {
        const amount = order.total_amount;
        if (cond.operator === 'gte') return amount >= parseFloat(cond.value);
        if (cond.operator === 'lte') return amount <= parseFloat(cond.value);
        if (cond.operator === 'between') return true;
      }
      return false;
    });
  });

  const updateOrder = useMutation({
    mutationFn: (data) => base44.entities.GoodsOrder.update(order.id, data),
    onSuccess: onUpdate,
  });

  const handleStatusChange = () => {
    if (newStatus !== order.status) {
      updateOrder.mutate({
        status: newStatus,
      });
    }
  };

  const currentStatusIndex = statusFlow.indexOf(order.status);
  const canAdvance = newStatus !== order.status && statusFlow.indexOf(newStatus) > currentStatusIndex;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg">
          <ChevronLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{order.order_number}</h2>
          <p className="text-slate-600 text-sm">Manage and track this purchase order</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Details */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Supplier</p>
                  <p className="font-medium text-slate-900">{order.supplier_name || order.supplier_email}</p>
                  {supplier && (
                    <p className="text-xs text-slate-600 mt-1">Rating: {(supplier.average_rating || 0).toFixed(1)}/5</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-indigo-600">SAR {order.total_amount?.toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Delivery Address</p>
                <p className="text-sm text-slate-700">{order.delivery_address || 'Not specified'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Expected Delivery</p>
                  <p className="text-sm font-medium text-slate-900">{order.expected_delivery_date || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Payment Terms</p>
                  <p className="text-sm font-medium text-slate-900">{order.payment_terms}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Line Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{item.item_name}</p>
                      {item.description && (
                        <p className="text-xs text-slate-600 mt-1">{item.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">{item.quantity} x SAR {item.unit_price?.toLocaleString()}</p>
                      <p className="font-bold text-slate-900">SAR {(item.total_price || item.quantity * item.unit_price)?.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Approval Workflow Link */}
          {matchingWorkflow && (
            <Card className="border-0 shadow-md border-l-4 border-indigo-500">
              <CardHeader>
                <CardTitle className="text-base">Linked Approval Workflow</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-slate-900">{matchingWorkflow.name}</p>
                  <p className="text-xs text-slate-600 mt-1">{matchingWorkflow.description}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Approval Sequence</p>
                  <div className="space-y-2">
                    {matchingWorkflow.approvalLevels?.map((level, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                          {level.level}
                        </span>
                        <span className="font-medium text-slate-900">{level.name}</span>
                        <span className="text-xs text-slate-600">({level.approvers?.length} approver{level.approvers?.length !== 1 ? 's' : ''})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Status & Actions */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card className="border-0 shadow-md sticky top-20">
            <CardHeader>
              <CardTitle className="text-base">Order Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Current Status</p>
                <Badge className={statusColors[order.status]}>
                  {order.status}
                </Badge>
              </div>

              {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                <>
                  <div className="border-t pt-4">
                    <Label className="text-xs font-semibold text-slate-700 mb-2">Update Status</Label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusFlow.map(status => {
                          const idx = statusFlow.indexOf(status);
                          const currentIdx = statusFlow.indexOf(order.status);
                          const canSelect = idx >= currentIdx;
                          return (
                            <SelectItem 
                              key={status} 
                              value={status}
                              disabled={!canSelect}
                            >
                              {status}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {newStatus === 'Pending Approval' && (
                    <div className="border-t pt-4">
                      <Label className="text-xs font-semibold text-slate-700 mb-2">Approval Note</Label>
                      <Textarea
                        placeholder="Add any notes for approvers..."
                        value={approvalNote}
                        onChange={(e) => setApprovalNote(e.target.value)}
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                  )}

                  <Button
                    onClick={handleStatusChange}
                    disabled={!canAdvance || updateOrder.isPending}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Update Status
                  </Button>
                </>
              )}

              <div className="border-t pt-4">
                <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Payment Status</p>
                <Badge variant="outline" className="bg-slate-50">
                  {order.payment_status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Supplier Performance */}
          {supplier && (
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Supplier Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Overall Rating</span>
                    <span className="font-bold text-slate-900">{(supplier.average_rating || 0).toFixed(1)}/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Quality Score</span>
                    <span className="font-bold text-slate-900">{(supplier.quality_score || 0).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">On-Time Rate</span>
                    <span className="font-bold text-slate-900">{supplier.on_time_delivery_rate || 0}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Total Orders</span>
                    <span className="font-bold text-slate-900">{supplier.completed_orders || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}