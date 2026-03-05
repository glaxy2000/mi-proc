import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

const statusColors = {
  'Draft': 'bg-slate-100 text-slate-700',
  'Pending Approval': 'bg-amber-100 text-amber-700',
  'Approved': 'bg-blue-100 text-blue-700',
  'Completed': 'bg-emerald-100 text-emerald-700',
  'Cancelled': 'bg-red-100 text-red-700',
};

export default function PurchaseOrderList({ orders, isLoading, onSelect }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-slate-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">No purchase orders</h3>
        <p className="text-slate-600">Create your first purchase order to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {orders.map((order, idx) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
        >
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent 
              className="p-6"
              onClick={() => onSelect(order)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{order.order_number}</h3>
                    <Badge className={statusColors[order.status] || 'bg-slate-100 text-slate-700'}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">
                    Supplier: <span className="font-medium">{order.supplier_name || order.supplier_email}</span>
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-4 py-3 border-t border-b">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Items</p>
                  <p className="text-lg font-bold text-slate-900">{order.items?.length || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Total Amount</p>
                  <p className="text-lg font-bold text-indigo-600">SAR {order.total_amount?.toLocaleString() || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Expected Delivery</p>
                  <p className="text-sm text-slate-900 font-medium">{order.expected_delivery_date || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Payment Status</p>
                  <Badge variant="outline" className="bg-slate-50">
                    {order.payment_status}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                <span>Payment Terms: {order.payment_terms || 'Not specified'}</span>
                <span>{order.updated_date ? formatDistanceToNow(new Date(order.updated_date), { addSuffix: true }) : 'Just now'}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}