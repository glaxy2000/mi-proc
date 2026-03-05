import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { X, Plus, TrendingDown, Star, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import SupplierSelectionModal from '@/components/supplier/SupplierSelectionModal';
import ComparisonTable from '@/components/supplier/ComparisonTable';

export default function SupplierComparison() {
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all suppliers
  const { data: suppliers = [] } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => base44.entities.SupplierPerformance.list(),
  });

  // Fetch historical pricing for selected suppliers
  const { data: historicalPricing = [] } = useQuery({
    queryKey: ['historicalPricing', selectedSuppliers],
    queryFn: () => {
      if (selectedSuppliers.length === 0) return Promise.resolve([]);
      return base44.entities.HistoricPricing.filter({
        supplier_email: { $in: selectedSuppliers }
      });
    },
    enabled: selectedSuppliers.length > 0,
  });

  const handleSelectSupplier = (supplierEmail) => {
    setSelectedSuppliers(prev =>
      prev.includes(supplierEmail)
        ? prev.filter(s => s !== supplierEmail)
        : [...prev, supplierEmail]
    );
  };

  const handleRemoveSupplier = (supplierEmail) => {
    setSelectedSuppliers(prev => prev.filter(s => s !== supplierEmail));
  };

  const selectedSupplierData = suppliers.filter(s =>
    selectedSuppliers.includes(s.supplier_email)
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-slate-900">Supplier Comparison</h1>
            <Button 
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Suppliers
            </Button>
          </div>
          <p className="text-slate-600">Compare quotes, pricing history, and compliance across multiple suppliers to make informed decisions.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {selectedSuppliers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingDown className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No suppliers selected</h2>
            <p className="text-slate-600 mb-6">Select suppliers to compare their quotes, pricing history, and compliance status.</p>
            <Button 
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Select Suppliers
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Selected Suppliers Bar */}
            <Card className="mb-6 border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {selectedSupplierData.map(supplier => (
                    <motion.div
                      key={supplier.supplier_email}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">
                          {supplier.supplier_email.split('@')[0]}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-slate-600">
                            {supplier.average_rating?.toFixed(1) || 'N/A'}/5
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveSupplier(supplier.supplier_email)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ComparisonTable 
                suppliers={selectedSupplierData}
                historicalPricing={historicalPricing}
              />
            </motion.div>
          </>
        )}
      </div>

      {/* Selection Modal */}
      <SupplierSelectionModal
        open={showModal}
        onOpenChange={setShowModal}
        suppliers={suppliers}
        selectedSuppliers={selectedSuppliers}
        onSelectSupplier={handleSelectSupplier}
      />
    </div>
  );
}