import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function BulkItemUpload({ onItemsExtracted }) {
  const [loading, setLoading] = useState(false);

  const downloadTemplate = () => {
    const csvContent = `Item Name,Description,Quantity,Unit,Specifications\nSteel Rebar,Grade 60 reinforcement bars,1000,kg,12mm diameter\nCement Bags,Portland cement,500,bags,50kg each\nConstruction Sand,Fine aggregate,10,cubic meters,Washed and graded`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rfq_items_template.csv';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  };

  const handleFileUpload = async (file) => {
    setLoading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });

      const schema = {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            item_name: { type: 'string' },
            description: { type: 'string' },
            quantity: { type: 'number' },
            unit: { type: 'string' },
            specifications: { type: 'string' }
          }
        }
      };

      const result = await base44.integrations.Core.ExtractDataFromUploadedFile({
        file_url,
        json_schema: schema
      });

      if (result.status === 'success' && result.output) {
        const items = result.output.map(item => ({
          name: item.item_name || '',
          description: item.description || '',
          quantity: item.quantity || 1,
          unit: item.unit || 'units',
          specifications: item.specifications || ''
        }));

        onItemsExtracted(items);
        toast.success(`Successfully imported ${items.length} items`);
      } else {
        toast.error('Failed to extract data from file');
      }
    } catch (error) {
      toast.error('Failed to process file');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-2 border-dashed border-indigo-200 bg-indigo-50">
      <CardContent className="p-6">
        <div className="text-center">
          <FileSpreadsheet className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-900 mb-2">Bulk Upload Items</h3>
          <p className="text-sm text-slate-600 mb-4">
            Upload a CSV, Excel, or JSON file with multiple items to save time
          </p>

          <div className="flex gap-3 justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadTemplate}
            >
              Download Template
            </Button>
            <label>
              <Button 
                size="sm" 
                className="bg-indigo-600 hover:bg-indigo-700"
                disabled={loading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {loading ? 'Processing...' : 'Upload File'}
              </Button>
              <input
                type="file"
                className="hidden"
                accept=".csv,.xlsx,.xls,.json"
                onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
              />
            </label>
          </div>

          <div className="mt-4 pt-4 border-t border-indigo-200">
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <p className="text-left">
                Supported formats: CSV, Excel (.xlsx, .xls), JSON. 
                Make sure your file has columns: Item Name, Description, Quantity, Unit, Specifications
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}