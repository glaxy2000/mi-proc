import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { FileText, Download, Eye, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function DocumentList({ filterByPO, filterBySupplier }) {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['documents', filterByPO, filterBySupplier],
    queryFn: async () => {
      let query = {};
      if (filterByPO) query.purchase_order_id = filterByPO;
      if (filterBySupplier) query.supplier_email = filterBySupplier;
      
      return await base44.entities.Document.filter(query, '-created_date');
    }
  });

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.document_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeColor = (type) => {
    switch (type) {
      case 'contract': return 'bg-blue-100 text-blue-700';
      case 'invoice': return 'bg-green-100 text-green-700';
      case 'certificate': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeIcon = (type) => {
    return <FileText className="h-5 w-5" />;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDelete = async (docId) => {
    if (confirm('Delete this document?')) {
      await base44.entities.Document.delete(docId);
      window.location.reload();
    }
  };

  if (isLoading) {
    return <div className="text-center py-8 text-slate-500">Loading documents...</div>;
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            No documents found
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-2 rounded-lg ${getTypeColor(doc.document_type)}`}>
                    {getTypeIcon(doc.document_type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{doc.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <Badge variant="outline" className={getTypeColor(doc.document_type)}>
                        {doc.document_type}
                      </Badge>
                      <span>{formatFileSize(doc.file_size)}</span>
                      {doc.is_verified && (
                        <div className="flex items-center gap-1 text-emerald-600">
                          <CheckCircle2 className="h-3 w-3" />
                          Verified
                        </div>
                      )}
                      {doc.expiry_date && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Expires: {new Date(doc.expiry_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </a>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(doc.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}