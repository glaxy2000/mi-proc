import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SupplierSelectionModal({
  open,
  onOpenChange,
  suppliers,
  selectedSuppliers,
  onSelectSupplier,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(s =>
      s.supplier_email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [suppliers, searchTerm]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-emerald-50';
    if (score >= 60) return 'bg-amber-50';
    return 'bg-red-50';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Suppliers to Compare</DialogTitle>
          <DialogDescription>
            Choose multiple suppliers to view their quotes, pricing history, and compliance status side-by-side.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Suppliers List */}
          <div className="max-h-96 overflow-y-auto space-y-2 border rounded-lg p-3">
            {filteredSuppliers.length === 0 ? (
              <p className="text-center py-8 text-slate-500">No suppliers found</p>
            ) : (
              filteredSuppliers.map(supplier => (
                <motion.div
                  key={supplier.supplier_email}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-slate-50 transition-colors"
                >
                  <Checkbox
                    checked={selectedSuppliers.includes(supplier.supplier_email)}
                    onCheckedChange={() => onSelectSupplier(supplier.supplier_email)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">
                      {supplier.supplier_email}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-slate-600">
                          {supplier.average_rating?.toFixed(1) || 'N/A'}/5
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-600">
                        {supplier.total_ratings || 0} ratings
                      </span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-lg ${getScoreBg(supplier.overall_score || 0)}`}>
                    <p className={`text-sm font-semibold ${getScoreColor(supplier.overall_score || 0)}`}>
                      {supplier.overall_score || 0}%
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700"
              disabled={selectedSuppliers.length === 0}
              onClick={() => onOpenChange(false)}
            >
              Compare ({selectedSuppliers.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}