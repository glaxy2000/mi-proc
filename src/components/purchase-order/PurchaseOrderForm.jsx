import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft, Plus, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import BudgetAlert from '@/components/budget/BudgetAlert';

export default function PurchaseOrderForm({ workflows, onClose }) {
  const [formData, setFormData] = useState({
    order_number: `PO-${Date.now()}`,
    supplier_email: '',
    supplier_name: '',
    items: [{ item_name: '', description: '', quantity: 1, unit_price: 0 }],
    delivery_address: '',
    expected_delivery_date: '',
    payment_terms: '30 days',
    status: 'Draft',
  });

  const { data: suppliers = [] } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => base44.entities.SupplierPerformance.list(),
  });

  const { data: budgets = [] } = useQuery({
    queryKey: ['budgets'],
    queryFn: () => base44.entities.Budget.filter({ active: true }),
  });

  const createOrder = useMutation({
    mutationFn: (data) => {
      const totalAmount = data.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
      return base44.entities.GoodsOrder.create({
        ...data,
        total_amount: totalAmount,
        buyer_email: 'buyer@example.com',
        payment_status: 'pending',
      });
    },
    onSuccess: onClose,
  });

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { item_name: '', description: '', quantity: 1, unit_price: 0 }],
    });
  };

  const handleUpdateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const handleRemoveItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    if (!formData.supplier_email || formData.items.length === 0) {
      alert('Please select a supplier and add at least one item');
      return;
    }
    createOrder.mutate(formData);
  };

  const totalAmount = formData.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);

  // Check budget constraints
  const budgetAlert = budgets.find(b => {
    const supplier = suppliers.find(s => s.supplier_email === formData.supplier_email);
    if (!supplier || !b.department_or_project) return false;
    const remaining = b.allocated_amount - (b.spent_amount || 0) - (b.pending_amount || 0);
    return totalAmount > remaining;
  });

  const budgetWarning = budgets.find(b => {
    const supplier = suppliers.find(s => s.supplier_email === formData.supplier_email);
    if (!supplier || !b.department_or_project || budgetAlert?.id === b.id) return false;
    const used = (b.spent_amount || 0) + (b.pending_amount || 0) + totalAmount;
    const percentage = (used / b.allocated_amount) * 100;
    return percentage >= (b.threshold_percentage || 80);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
          <ChevronLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Create New Purchase Order</h2>
          <p className="text-slate-600 text-sm">Add items and select supplier</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Order Number</Label>
                <Input
                  value={formData.order_number}
                  disabled
                  className="mt-1 bg-slate-50"
                />
              </div>

              <div>
                <Label htmlFor="supplier">Supplier</Label>
                <Select value={formData.supplier_email} onValueChange={(email) => {
                  const supplier = suppliers.find(s => s.supplier_email === email);
                  setFormData({
                    ...formData,
                    supplier_email: email,
                    supplier_name: supplier?.supplier_email || '',
                  });
                }}>
                  <SelectTrigger id="supplier" className="mt-1">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map(supplier => (
                      <SelectItem key={supplier.supplier_email} value={supplier.supplier_email}>
                        {supplier.supplier_email} (Rating: {(supplier.average_rating || 0).toFixed(1)}/5)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter delivery address"
                  value={formData.delivery_address}
                  onChange={(e) => setFormData({ ...formData, delivery_address: e.target.value })}
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deliveryDate">Expected Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.expected_delivery_date}
                    onChange={(e) => setFormData({ ...formData, expected_delivery_date: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select value={formData.payment_terms} onValueChange={(terms) => setFormData({ ...formData, payment_terms: terms })}>
                    <SelectTrigger id="paymentTerms" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Immediate">Immediate</SelectItem>
                      <SelectItem value="15 days">15 days</SelectItem>
                      <SelectItem value="30 days">30 days</SelectItem>
                      <SelectItem value="45 days">45 days</SelectItem>
                      <SelectItem value="60 days">60 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Alerts */}
          {(budgetAlert || budgetWarning) && (
            <div className="space-y-3">
              {budgetAlert && (
                <BudgetAlert
                  budget={budgetAlert}
                  totalAmount={totalAmount}
                  isDanger={true}
                />
              )}
              {budgetWarning && (
                <BudgetAlert
                  budget={budgetWarning}
                  totalAmount={totalAmount}
                  isDanger={false}
                />
              )}
            </div>
          )}

          {/* Line Items */}
          <Card className="border-0 shadow-md">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Line Items</CardTitle>
              <Button onClick={handleAddItem} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.items.map((item, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-lg space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Item Name</Label>
                      <Input
                        placeholder="e.g., Office Chairs"
                        value={item.item_name}
                        onChange={(e) => handleUpdateItem(idx, 'item_name', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Quantity</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(idx, 'quantity', parseFloat(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Description</Label>
                    <Input
                      placeholder="Additional details"
                      value={item.description}
                      onChange={(e) => handleUpdateItem(idx, 'description', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-end gap-3">
                    <div className="flex-1">
                      <Label className="text-xs">Unit Price (SAR)</Label>
                      <Input
                        type="number"
                        value={item.unit_price}
                        onChange={(e) => handleUpdateItem(idx, 'unit_price', parseFloat(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-xs">Total</Label>
                      <div className="mt-1 p-2 bg-slate-50 rounded border">
                        SAR {(item.quantity * item.unit_price).toLocaleString()}
                      </div>
                    </div>
                    {formData.items.length > 1 && (
                      <button
                        onClick={() => handleRemoveItem(idx)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div>
          <Card className="border-0 shadow-md sticky top-20">
            <CardHeader>
              <CardTitle className="text-base">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium">SAR {totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-indigo-600">SAR {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Status</p>
                <Badge className="bg-slate-100 text-slate-700">Draft</Badge>
              </div>

              <div className="pt-4 space-y-2">
                <Button
                  onClick={handleSubmit}
                  disabled={createOrder.isPending}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Purchase Order
                </Button>
                <Button onClick={onClose} variant="outline" className="w-full">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}