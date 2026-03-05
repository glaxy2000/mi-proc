import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DocumentUpload from '@/components/documents/DocumentUpload';
import DocumentList from '@/components/documents/DocumentList';

export default function DocumentManagement() {
  const [filterPO, setFilterPO] = useState('');
  const [filterSupplier, setFilterSupplier] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <FileText className="h-8 w-8 text-indigo-600" />
            Document Management
          </h1>
          <p className="text-slate-600">Upload and manage contracts, invoices, and certificates</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <DocumentUpload
              onUploadSuccess={handleUploadSuccess}
              linkedPO={filterPO}
              linkedSupplier={filterSupplier ? { email: filterSupplier } : null}
            />
          </div>

          {/* Documents Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 p-4 bg-white rounded-lg border border-slate-200"
            >
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Filter by PO #"
                  value={filterPO}
                  onChange={(e) => setFilterPO(e.target.value)}
                />
                <Input
                  placeholder="Filter by supplier email"
                  value={filterSupplier}
                  onChange={(e) => setFilterSupplier(e.target.value)}
                />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="contract">Contracts</SelectItem>
                    <SelectItem value="invoice">Invoices</SelectItem>
                    <SelectItem value="certificate">Certificates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              key={refreshTrigger}
            >
              <DocumentList
                filterByPO={filterPO}
                filterBySupplier={filterSupplier}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}