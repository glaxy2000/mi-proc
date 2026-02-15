import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Plus,
  Trash2,
  Calendar,
  Building2,
  Package,
  FileText,
  CheckCircle2,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import BulkItemUpload from '../components/rfq/BulkItemUpload';

export default function CreateRFQ() {
  const [step, setStep] = useState(1);
  const [blindRFQ, setBlindRFQ] = useState(true);
  const [items, setItems] = useState([
    { id: 1, description: '', quantity: '', unit: 'units', specifications: '' }
  ]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [externalLinks, setExternalLinks] = useState([]);

  const categories = [
    'Construction Materials',
    'Office Supplies',
    'IT & Hardware',
    'Medical Supplies',
    'Raw Materials',
    'Industrial Components',
    'Packaging',
    'Other'
  ];

  const addItem = () => {
    setItems([...items, { id: items.length + 1, description: '', quantity: '', unit: 'units', specifications: '' }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleBulkItemsExtracted = (extractedItems) => {
    const newItems = extractedItems.map((item, index) => ({
      id: items.length + index + 1,
      description: item.name,
      quantity: item.quantity,
      unit: item.unit,
      specifications: item.specifications
    }));
    setItems([...items, ...newItems]);
  };

  const addExternalLink = () => {
    setExternalLinks([...externalLinks, { url: '', description: '' }]);
  };

  const removeExternalLink = (index) => {
    setExternalLinks(externalLinks.filter((_, i) => i !== index));
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        return {
          name: file.name,
          url: file_url,
          size: (file.size / 1024).toFixed(2) + ' KB',
          uploadedAt: new Date().toISOString()
        };
      });

      const newDocuments = await Promise.all(uploadPromises);
      setUploadedDocuments([...uploadedDocuments, ...newDocuments]);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeDocument = (url) => {
    setUploadedDocuments(uploadedDocuments.filter(doc => doc.url !== url));
  };

  const steps = [
    { number: 1, title: 'Basic Info', icon: FileText },
    { number: 2, title: 'Line Items', icon: Package },
    { number: 3, title: 'Settings', icon: Shield },
    { number: 4, title: 'Review', icon: CheckCircle2 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to={createPageUrl('Dashboard')} className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Create RFQ / Blind RFQ</h1>
          <p className="text-slate-500 mt-1">Post an anonymous request for quotation to verified suppliers</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <React.Fragment key={s.number}>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s.number ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className={`ml-3 font-medium hidden sm:block ${
                    step >= s.number ? 'text-indigo-600' : 'text-slate-500'
                  }`}>
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${
                    step > s.number ? 'bg-indigo-600' : 'bg-slate-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Blind / RFQ Badge */}
        <div className="flex items-center gap-3 mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <div className="p-2 bg-indigo-100 rounded-lg">
            {blindRFQ ? <EyeOff className="h-5 w-5 text-indigo-600" /> : <Eye className="h-5 w-5 text-indigo-600" />}
          </div>
          <div className="flex-1">
            <p className="font-medium text-indigo-900">
              {blindRFQ ? 'RFQ / Blind RFQ Mode Active' : 'Standard RFQ Mode'}
            </p>
            <p className="text-sm text-indigo-600">
              {blindRFQ ? 'Your identity is hidden from suppliers until you choose to reveal it' : 'Suppliers can see your company information'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="blind-mode" className="text-sm text-indigo-700">Blind Mode</Label>
            <Switch id="blind-mode" checked={blindRFQ} onCheckedChange={setBlindRFQ} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>RFQ Details</CardTitle>
                  <CardDescription>Provide basic information about your procurement request</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">RFQ Title *</Label>
                    <Input id="title" placeholder="e.g., Construction Materials - Q1 2026 Project" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat.toLowerCase().replace(/ /g, '_')}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Budget Range</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under_50k">Under SAR 50,000</SelectItem>
                          <SelectItem value="50k_100k">SAR 50,000 - 100,000</SelectItem>
                          <SelectItem value="100k_500k">SAR 100,000 - 500,000</SelectItem>
                          <SelectItem value="over_500k">Over SAR 500,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Provide detailed requirements, specifications, and any additional information..."
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Response Deadline *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input type="date" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Delivery Location</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="riyadh">Riyadh</SelectItem>
                          <SelectItem value="jeddah">Jeddah</SelectItem>
                          <SelectItem value="dammam">Dammam</SelectItem>
                          <SelectItem value="mecca">Mecca</SelectItem>
                          <SelectItem value="medina">Medina</SelectItem>
                          <SelectItem value="khobar">Khobar</SelectItem>
                          <SelectItem value="tabuk">Tabuk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Limit RFQ to Specific Region(s)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All regions (no restriction)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="riyadh">Riyadh Region Only</SelectItem>
                        <SelectItem value="jeddah">Jeddah Region Only</SelectItem>
                        <SelectItem value="eastern">Eastern Province Only</SelectItem>
                        <SelectItem value="mecca">Mecca Region Only</SelectItem>
                        <SelectItem value="medina">Medina Region Only</SelectItem>
                        <SelectItem value="northern">Northern Region Only</SelectItem>
                        <SelectItem value="southern">Southern Region Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-slate-500">
                      Only suppliers from selected region(s) will see this RFQ
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label>Supporting Documents (Multiple files supported)</Label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors">
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.zip"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                        <p className="text-sm font-medium text-slate-700">
                          {uploading ? 'Uploading...' : 'Click to upload multiple files'}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          PDF, DOC, XLS, PNG, JPG, ZIP (up to 50MB per file, multiple files supported)
                        </p>
                      </label>
                    </div>

                    {uploadedDocuments.length > 0 && (
                      <div className="space-y-2">
                        {uploadedDocuments.map((doc) => (
                          <div key={doc.url} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-3 flex-1">
                              <FileText className="h-5 w-5 text-indigo-600" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">{doc.name}</p>
                                <p className="text-xs text-slate-500">{doc.size}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDocument(doc.url)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>External Document Links</Label>
                      {externalLinks.map((link, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder="https://drive.google.com/..."
                            value={link.url}
                            onChange={(e) => {
                              const newLinks = [...externalLinks];
                              newLinks[index].url = e.target.value;
                              setExternalLinks(newLinks);
                            }}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExternalLink(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={addExternalLink}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add External Link
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Line Items */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Line Items</CardTitle>
                  <CardDescription>Add items you need to procure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <BulkItemUpload onItemsExtracted={handleBulkItemsExtracted} />
                  {items.map((item, index) => (
                    <div key={item.id} className="p-4 bg-slate-50 rounded-xl space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Item {index + 1}</Badge>
                        {items.length > 1 && (
                          <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-2">
                          <Label>Item Description *</Label>
                          <Input placeholder="e.g., Steel Rebar 12mm" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label>Quantity *</Label>
                            <Input type="number" placeholder="100" />
                          </div>
                          <div className="space-y-2">
                            <Label>Unit</Label>
                            <Select defaultValue="units">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="units">Units</SelectItem>
                                <SelectItem value="kg">KG</SelectItem>
                                <SelectItem value="tons">Tons</SelectItem>
                                <SelectItem value="meters">Meters</SelectItem>
                                <SelectItem value="boxes">Boxes</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Specifications</Label>
                        <Textarea placeholder="Size, grade, material specifications, certifications required..." rows={2} />
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" onClick={addItem} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Item
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Settings */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>RFQ Settings</CardTitle>
                  <CardDescription>Configure matching and notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-teal-100 rounded-lg">
                        <Shield className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-teal-900">AI Smart Matching</h4>
                        <p className="text-sm text-teal-700 mt-1">
                          Our AI will automatically match your RFQ with verified suppliers based on capability, inventory, and ratings.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-900">Require Escrow</p>
                        <p className="text-sm text-slate-500">Funds held securely until delivery confirmation</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-900">Allow Negotiations</p>
                        <p className="text-sm text-slate-500">Enable virtual negotiation room for counter-offers</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-900">Exclude New Suppliers</p>
                        <p className="text-sm text-slate-500">Only receive quotes from verified suppliers (exclude new suppliers)</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-900">Email Notifications</p>
                        <p className="text-sm text-slate-500">Get notified when you receive new quotes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Payment Terms</Label>
                    <Input 
                      placeholder="e.g., 30 days, 60 days, 50% advance, Net 30, LC, etc." 
                    />
                    <p className="text-xs text-slate-500">Enter your preferred payment terms (suppliers can propose alternatives)</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Review & Submit</CardTitle>
                  <CardDescription>Review your RFQ before broadcasting to suppliers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
                    <CheckCircle2 className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-indigo-900 mb-2">Ready to Broadcast</h3>
                    <p className="text-indigo-700">
                      Your RFQ / Blind RFQ will be sent to verified suppliers matching your requirements.
                      You'll receive anonymous quotes within your deadline.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-900">RFQ Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Category</span>
                          <span className="font-medium">Construction Materials</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Items</span>
                          <span className="font-medium">{items.length} item(s)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Budget</span>
                          <span className="font-medium">SAR 100,000 - 500,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Deadline</span>
                          <span className="font-medium">7 days</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-900">Settings</h4>
                      <div className="space-y-2">
                        <Badge className="bg-indigo-100 text-indigo-700 mr-2">RFQ / Blind RFQ</Badge>
                        <Badge className="bg-teal-100 text-teal-700 mr-2">Escrow Required</Badge>
                        <Badge className="bg-purple-100 text-purple-700 mr-2">Negotiations Enabled</Badge>
                        <Badge className="bg-emerald-100 text-emerald-700">New Suppliers Welcome</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {step < 4 ? (
            <Button
              onClick={() => setStep(Math.min(4, step + 1))}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Link to={createPageUrl('RFQList')}>
              <Button className="bg-teal-500 hover:bg-teal-600">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Submit RFQ
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}