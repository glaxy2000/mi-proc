import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PurchaseOrderForm from '@/components/purchase-order/PurchaseOrderForm';
import PurchaseOrderList from '@/components/purchase-order/PurchaseOrderList';
import PurchaseOrderDetail from '@/components/purchase-order/PurchaseOrderDetail';

const statuses = ['All', 'Draft', 'Pending Approval', 'Approved', 'Completed', 'Cancelled'];

export default function PurchaseOrderManagement() {
  const [showForm, setShowForm] = useState(false);
  const [selectedPO, setSelectedPO] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['purchaseOrders'],
    queryFn: () => base44.entities.GoodsOrder.list(),
  });

  const { data: workflows = [] } = useQuery({
    queryKey: ['approvalWorkflows'],
    queryFn: () => base44.entities.ApprovalWorkflow.list(),
  });

  const filteredOrders = orders.filter(order =>
    filterStatus === 'All' || order.status === filterStatus
  );

  const handleCloseForm = () => {
    setShowForm(false);
    queryClient.invalidateQueries({ queryKey: ['purchaseOrders'] });
  };

  const statusCounts = {
    draft: orders.filter(o => o.status === 'Draft').length,
    pending: orders.filter(o => o.status === 'Pending Approval').length,
    approved: orders.filter(o => o.status === 'Approved').length,
    completed: orders.filter(o => o.status === 'Completed').length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Purchase Orders</h1>
              <p className="text-slate-600 mt-1">Create, track, and manage purchase orders with approval workflows</p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Purchase Order
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {showForm ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PurchaseOrderForm
              workflows={workflows}
              onClose={handleCloseForm}
            />
          </motion.div>
        ) : selectedPO ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PurchaseOrderDetail
              order={selectedPO}
              workflows={workflows}
              onBack={() => setSelectedPO(null)}
              onUpdate={() => queryClient.invalidateQueries({ queryKey: ['purchaseOrders'] })}
            />
          </motion.div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card className="border-0 shadow-md bg-gradient-to-br from-slate-50 to-slate-100">
                <CardContent className="p-6">
                  <p className="text-sm text-slate-600 mb-1">Draft</p>
                  <p className="text-3xl font-bold text-slate-900">{statusCounts.draft}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-orange-100">
                <CardContent className="p-6">
                  <p className="text-sm text-amber-700 mb-1">Pending Approval</p>
                  <p className="text-3xl font-bold text-amber-600">{statusCounts.pending}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-cyan-100">
                <CardContent className="p-6">
                  <p className="text-sm text-blue-700 mb-1">Approved</p>
                  <p className="text-3xl font-bold text-blue-600">{statusCounts.approved}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md bg-gradient-to-br from-emerald-50 to-teal-100">
                <CardContent className="p-6">
                  <p className="text-sm text-emerald-700 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-emerald-600">{statusCounts.completed}</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="mb-8 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-end gap-4">
                  <Filter className="h-5 w-5 text-slate-400 mt-6" />
                  <div className="flex-1 min-w-48">
                    <label className="text-sm font-medium text-slate-700 block mb-2">Status</label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={() => setFilterStatus('All')}
                    variant="outline"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Orders List */}
            <PurchaseOrderList
              orders={filteredOrders}
              isLoading={isLoading}
              onSelect={setSelectedPO}
            />
          </>
        )}
      </div>
    </div>
  );
}