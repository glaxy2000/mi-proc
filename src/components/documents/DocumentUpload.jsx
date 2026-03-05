import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function DocumentUpload({ onUploadSuccess, linkedPO, linkedSupplier }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState('contract');
  const [description, setDescription] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError('');
      if (!title) {
        setTitle(selectedFile.name.split('.')[0]);
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setError('Please select a file and enter a title');
      return;
    }

    setIsLoading(true);
    try {
      const uploadedFile = await base44.integrations.Core.UploadFile({ file });
      
      await base44.entities.Document.create({
        title,
        document_type: docType,
        file_url: uploadedFile.file_url,
        file_size: file.size,
        file_type: file.type,
        purchase_order_id: linkedPO || null,
        supplier_email: linkedSupplier?.email || null,
        supplier_name: linkedSupplier?.name || null,
        description,
        expiry_date: expiryDate || null,
        uploaded_by: (await base44.auth.me())?.email
      });

      setFile(null);
      setTitle('');
      setDescription('');
      setExpiryDate('');
      setError('');
      onUploadSuccess?.();
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload} className="space-y-6">
          {/* File Input */}
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
            <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <label htmlFor="file-input" className="cursor-pointer">
              <p className="text-sm font-medium text-slate-900 mb-1">
                {file ? file.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-slate-500">PDF, DOC, DOCX, XLS, XLSX up to 50MB</p>
              <input
                id="file-input"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
              />
            </label>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium">Document Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Contract Agreement 2026"
              className="mt-1"
            />
          </div>

          {/* Document Type */}
          <div>
            <Label htmlFor="docType" className="text-sm font-medium">Document Type *</Label>
            <Select value={docType} onValueChange={setDocType}>
              <SelectTrigger id="docType" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="invoice">Invoice</SelectItem>
                <SelectItem value="certificate">Certificate</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Expiry Date (for certificates) */}
          {docType === 'certificate' && (
            <div>
              <Label htmlFor="expiryDate" className="text-sm font-medium">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="mt-1"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes about this document..."
              className="mt-1"
              rows={3}
            />
          </div>

          {/* Linked Info */}
          {(linkedPO || linkedSupplier) && (
            <div className="bg-indigo-50 p-3 rounded-lg text-sm">
              <p className="font-medium text-indigo-900">Linked to:</p>
              {linkedPO && <p className="text-indigo-700">PO: {linkedPO}</p>}
              {linkedSupplier && <p className="text-indigo-700">Supplier: {linkedSupplier.name}</p>}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 p-3 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={!file || isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            {isLoading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}