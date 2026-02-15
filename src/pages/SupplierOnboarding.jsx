import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  FileText,
  Wallet,
  CheckCircle2,
  Upload,
  X,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import ContactPersonForm from '../components/contacts/ContactPersonForm';

export default function SupplierOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [validationStatus, setValidationStatus] = useState({
    isValidating: false,
    isValid: null,
    message: '',
    zatcaData: null
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [formData, setFormData] = useState({
    contacts: [],
    vatNumber: '',
    zatcaCertificate: null,
    // Step 2: Business Information
    businessNameArabic: '',
    businessNameEnglish: '',
    crNumber: '',
    registrationDate: '',
    businessSector: '',
    primaryProducts: '',
    secondaryProducts: '',
    yearsInBusiness: '',
    numberOfEmployees: '',
    street: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
    businessEmail: '',
    website: '',
    // Step 3: Documents
    documents: {
      cr: null,
      vat: null,
      bank: null,
      ownership: null,
      id: null
    },
    // Step 4: Bank Account
    accountHolderName: '',
    bankName: '',
    iban: '',
    accountType: '',
    currency: 'SAR',
    settlementMethod: '',
    confirmAccuracy: false
  });

  const businessCategories = [
    'Construction Materials', 'Medical Supplies', 'IT & Hardware', 'Manufacturing',
    'Packaging', 'Office Supplies', 'Electronics', 'Furniture', 'Raw Materials',
    'Industrial Equipment', 'Consulting', 'IT Services', 'Marketing', 'Legal Services'
  ];

  const steps = [
    { number: 1, title: 'Email Verified', icon: CheckCircle2, completed: true },
    { number: 2, title: 'Business Information', icon: Building2, completed: currentStep > 2 },
    { number: 3, title: 'Trade Validation', icon: ShieldCheck, completed: currentStep > 3 },
    { number: 4, title: 'Document Verification', icon: FileText, completed: currentStep > 4 },
    { number: 5, title: 'Bank Account', icon: Wallet, completed: currentStep > 5 }
  ];

  const handleFileUpload = (docType, file) => {
    if (file && file.size <= 10 * 1024 * 1024) {
      setFormData({
        ...formData,
        documents: { ...formData.documents, [docType]: file }
      });
    }
  };

  const removeFile = (docType) => {
    setFormData({
      ...formData,
      documents: { ...formData.documents, [docType]: null }
    });
  };

  const handleZatcaValidation = async () => {
    if (!formData.vatNumber || !formData.zatcaCertificate || selectedCategories.length === 0) {
      setValidationStatus({
        isValidating: false,
        isValid: false,
        message: 'Please provide VAT number, upload Zatca certificate, and select categories.',
        zatcaData: null
      });
      return;
    }

    setValidationStatus({ ...validationStatus, isValidating: true });

    // Simulate Zatca validation
    setTimeout(() => {
      // In production, call actual Zatca API
      const mockZatcaData = {
        businessName: formData.businessNameEnglish,
        vatNumber: formData.vatNumber,
        registeredCategories: ['Construction Materials', 'Raw Materials', 'Industrial Equipment'],
        licenseStatus: 'active',
        validUntil: '2027-12-31'
      };

      const selectedCategoriesLower = selectedCategories.map(c => c.toLowerCase());
      const registeredCategoriesLower = mockZatcaData.registeredCategories.map(c => c.toLowerCase());
      
      const isValid = selectedCategoriesLower.every(category => 
        registeredCategoriesLower.some(registered => 
          registered.includes(category.toLowerCase()) || category.toLowerCase().includes(registered)
        )
      );

      setValidationStatus({
        isValidating: false,
        isValid: isValid,
        message: isValid 
          ? 'Trade validation successful! Your business categories match Zatca records.'
          : 'Validation failed: Selected categories do not match your Zatca certificate registration.',
        zatcaData: mockZatcaData
      });
    }, 2000);
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Submit form and redirect to dashboard
    window.location.href = createPageUrl('Dashboard');
  };

  const progress = (currentStep / 5) * 100;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link to={createPageUrl('Home')} className="inline-flex items-center gap-2 mb-6">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698475e8a83c0e60c7a78100/def2d3f5f_MI-logo-color.png" 
              alt="MI Technologies" 
              className="h-8"
            />
            <span className="font-bold text-slate-900">Mi-Proc</span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Supplier Onboarding</h1>
          <p className="text-slate-600">Complete your profile to start receiving RFQs</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    step.completed || currentStep === step.number
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}>
                    {step.completed ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <step.icon className="h-6 w-6" />
                    )}
                  </div>
                  <p className={`text-xs mt-2 text-center max-w-[100px] ${
                    currentStep === step.number ? 'text-indigo-600 font-semibold' : 'text-slate-600'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-24 mx-4 ${
                    step.completed ? 'bg-indigo-600' : 'bg-slate-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-teal-50 border-b">
                  <CardTitle>Step 2: Business Information</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Provide details about your business</p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Business Name (Arabic) *</Label>
                      <Input
                        value={formData.businessNameArabic}
                        onChange={(e) => setFormData({ ...formData, businessNameArabic: e.target.value })}
                        placeholder="اسم الشركة"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Business Name (English) *</Label>
                      <Input
                        value={formData.businessNameEnglish}
                        onChange={(e) => setFormData({ ...formData, businessNameEnglish: e.target.value })}
                        placeholder="Business Name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Commercial Registration (CR) Number *</Label>
                      <Input
                        value={formData.crNumber}
                        onChange={(e) => setFormData({ ...formData, crNumber: e.target.value })}
                        placeholder="CR Number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Business Registration Date *</Label>
                      <Input
                        type="date"
                        value={formData.registrationDate}
                        onChange={(e) => setFormData({ ...formData, registrationDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Business Sector *</Label>
                      <Select
                        value={formData.businessSector}
                        onValueChange={(value) => setFormData({ ...formData, businessSector: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select sector" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="trading">Trading</SelectItem>
                          <SelectItem value="logistics">Logistics</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Years in Business *</Label>
                      <Input
                        type="number"
                        value={formData.yearsInBusiness}
                        onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Products/Services * (Max 500 characters)</Label>
                    <Textarea
                      value={formData.primaryProducts}
                      onChange={(e) => setFormData({ ...formData, primaryProducts: e.target.value })}
                      maxLength={500}
                      rows={4}
                      placeholder="Describe your main products or services"
                    />
                    <p className="text-xs text-slate-500 text-right">{formData.primaryProducts.length}/500</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Secondary Products/Services (Optional, Max 500 characters)</Label>
                    <Textarea
                      value={formData.secondaryProducts}
                      onChange={(e) => setFormData({ ...formData, secondaryProducts: e.target.value })}
                      maxLength={500}
                      rows={3}
                      placeholder="Additional products or services"
                    />
                    <p className="text-xs text-slate-500 text-right">{formData.secondaryProducts.length}/500</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Number of Employees *</Label>
                    <Select
                      value={formData.numberOfEmployees}
                      onValueChange={(value) => setFormData({ ...formData, numberOfEmployees: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5</SelectItem>
                        <SelectItem value="6-20">6-20</SelectItem>
                        <SelectItem value="21-50">21-50</SelectItem>
                        <SelectItem value="51-100">51-100</SelectItem>
                        <SelectItem value="100+">100+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Business Address</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Street Address *</Label>
                        <Input
                          value={formData.street}
                          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                          placeholder="Street address"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>City *</Label>
                          <Select
                            value={formData.city}
                            onValueChange={(value) => setFormData({ ...formData, city: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="riyadh">Riyadh</SelectItem>
                              <SelectItem value="jeddah">Jeddah</SelectItem>
                              <SelectItem value="dammam">Dammam</SelectItem>
                              <SelectItem value="dhahran">Dhahran</SelectItem>
                              <SelectItem value="khobar">Khobar</SelectItem>
                              <SelectItem value="mecca">Mecca</SelectItem>
                              <SelectItem value="medina">Medina</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Postal Code *</Label>
                          <Input
                            value={formData.postalCode}
                            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                            placeholder="12345"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>National Address</Label>
                        <Input
                          value={formData.nationalAddress || ''}
                          onChange={(e) => setFormData({ ...formData, nationalAddress: e.target.value })}
                          placeholder="National Address (e.g., AAAA1234 / 1234 / 12345)"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <ContactPersonForm 
                      contacts={formData.contacts}
                      onChange={(contacts) => setFormData({...formData, contacts})}
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Primary Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Business Phone Number *</Label>
                        <Input
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          placeholder="+966 XX XXX XXXX"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Business Email *</Label>
                        <Input
                          type="email"
                          value={formData.businessEmail}
                          onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                          placeholder="business@company.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label>Website (Optional)</Label>
                      <Input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://www.yourcompany.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-teal-50 border-b">
                  <CardTitle>Step 3: Trade Validation (Zatca)</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Validate your business trade using Zatca certificate</p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-900 mb-1">Trade Validation Required</p>
                        <p className="text-sm text-amber-700">
                          We validate your business trade using your Zatca certificate to ensure you deal with the 
                          categories you're registering for. This protects buyers and maintains platform integrity.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>VAT Number (TIN) *</Label>
                    <Input
                      value={formData.vatNumber}
                      onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                      placeholder="e.g., 300000000000003"
                      maxLength={15}
                    />
                    <p className="text-xs text-slate-500">Enter your 15-digit VAT registration number</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Upload Zatca Certificate *</Label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors">
                      {!formData.zatcaCertificate ? (
                        <>
                          <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                          <p className="text-sm text-slate-600 mb-3">Upload your Zatca tax certificate</p>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => setFormData({ ...formData, zatcaCertificate: e.target.files[0] })}
                            className="max-w-xs mx-auto"
                          />
                        </>
                      ) : (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium text-green-900">{formData.zatcaCertificate.name}</p>
                              <p className="text-sm text-green-700">
                                {(formData.zatcaCertificate.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFormData({ ...formData, zatcaCertificate: null })}
                            className="text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Select Business Categories You Deal With *</Label>
                    <p className="text-sm text-slate-500">
                      Select all categories that apply to your business. These will be validated against your Zatca certificate.
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {businessCategories.map((category) => (
                        <div
                          key={category}
                          onClick={() => toggleCategory(category)}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            selectedCategories.includes(category)
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-slate-200 hover:border-indigo-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <span className="text-sm font-medium">{category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleZatcaValidation}
                    disabled={validationStatus.isValidating || !formData.vatNumber || !formData.zatcaCertificate || selectedCategories.length === 0}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    {validationStatus.isValidating ? (
                      <>Validating with Zatca...</>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        Validate Trade
                      </>
                    )}
                  </Button>

                  {validationStatus.message && (
                    <div className={`border rounded-lg p-4 ${
                      validationStatus.isValid 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-start gap-3">
                        {validationStatus.isValid ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className={`font-medium mb-1 ${
                            validationStatus.isValid ? 'text-green-900' : 'text-red-900'
                          }`}>
                            {validationStatus.isValid ? 'Validation Successful' : 'Validation Failed'}
                          </p>
                          <p className={`text-sm ${
                            validationStatus.isValid ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {validationStatus.message}
                          </p>
                          {validationStatus.zatcaData && (
                            <div className="mt-3 text-sm space-y-1">
                              <p className="text-slate-700">
                                <span className="font-medium">Registered Categories:</span>{' '}
                                {validationStatus.zatcaData.registeredCategories.join(', ')}
                              </p>
                              <p className="text-slate-700">
                                <span className="font-medium">License Valid Until:</span>{' '}
                                {validationStatus.zatcaData.validUntil}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-teal-50 border-b">
                  <CardTitle>Step 4: Document Verification (KYB)</CardTitle>
                  <CardDescription>Upload required business documents (Max 10MB each)</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {[
                    { key: 'cr', label: 'Commercial Registration (CR) Certificate', required: true },
                    { key: 'vat', label: 'Tax Registration Certificate (VAT)', required: true },
                    { key: 'bank', label: 'Bank Account Verification', required: true },
                    { key: 'ownership', label: 'Ownership/Authorization Document', required: true },
                    { key: 'id', label: 'Identification Document (Owner/Authorized Person)', required: true }
                  ].map((doc) => (
                    <div key={doc.key} className="border rounded-xl p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-900">{doc.label}</h4>
                          <p className="text-sm text-slate-500 mt-1">
                            Accepted formats: PDF, JPG, PNG • Max size: 10MB
                          </p>
                        </div>
                        {doc.required && (
                          <Badge variant="outline" className="text-red-600 border-red-200">Required</Badge>
                        )}
                      </div>

                      {!formData.documents[doc.key] ? (
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors">
                          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                          <p className="text-sm text-slate-600 mb-4">
                            Drag and drop your file here, or click to browse
                          </p>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(doc.key, e.target.files[0])}
                            className="max-w-xs mx-auto"
                          />
                        </div>
                      ) : (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium text-green-900">{formData.documents[doc.key].name}</p>
                              <p className="text-sm text-green-700">
                                {(formData.documents[doc.key].size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(doc.key)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900 mb-1">Verification Process</p>
                        <p className="text-sm text-blue-700">
                          Your documents will be reviewed by our compliance team within 24-48 hours. 
                          You'll receive an email notification once the verification is complete.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-teal-50 border-b">
                  <CardTitle>Step 5: Bank Account Linking</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Link your bank account for fund disbursements</p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Account Holder Name *</Label>
                    <Input
                      value={formData.accountHolderName}
                      onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                      placeholder="Name as it appears on bank account"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Bank Name *</Label>
                      <Select
                        value={formData.bankName}
                        onValueChange={(value) => setFormData({ ...formData, bankName: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alrajhi">Al Rajhi Bank</SelectItem>
                          <SelectItem value="ncb">National Commercial Bank</SelectItem>
                          <SelectItem value="samba">Samba Financial Group</SelectItem>
                          <SelectItem value="riyadbank">Riyad Bank</SelectItem>
                          <SelectItem value="alinma">Alinma Bank</SelectItem>
                          <SelectItem value="sab">Saudi British Bank</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Account Type *</Label>
                      <Select
                        value={formData.accountType}
                        onValueChange={(value) => setFormData({ ...formData, accountType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="checking">Checking</SelectItem>
                          <SelectItem value="savings">Savings</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>IBAN (International Bank Account Number) *</Label>
                    <Input
                      value={formData.iban}
                      onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                      placeholder="SA00 0000 0000 0000 0000 0000"
                      maxLength={34}
                    />
                    <p className="text-xs text-slate-500">Enter your full IBAN including country code</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Account Currency *</Label>
                      <Select
                        value={formData.currency}
                        onValueChange={(value) => setFormData({ ...formData, currency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAR">SAR (Saudi Riyal)</SelectItem>
                          <SelectItem value="USD">USD (US Dollar)</SelectItem>
                          <SelectItem value="EUR">EUR (Euro)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Settlement Method *</Label>
                      <Select
                        value={formData.settlementMethod}
                        onValueChange={(value) => setFormData({ ...formData, settlementMethod: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instant">Instant Transfer (SARIE)</SelectItem>
                          <SelectItem value="same_day">Same-Day Transfer</SelectItem>
                          <SelectItem value="next_day">Next-Day Transfer</SelectItem>
                          <SelectItem value="bnpl">Buy Now, Pay Later (BNPL)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Review & Confirm</h3>
                    <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-500">Business Name</p>
                          <p className="font-medium text-slate-900">{formData.businessNameEnglish || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">CR Number</p>
                          <p className="font-medium text-slate-900">{formData.crNumber || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Business Email</p>
                          <p className="font-medium text-slate-900">{formData.businessEmail || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Bank Account</p>
                          <p className="font-medium text-slate-900">
                            {formData.iban ? `••••${formData.iban.slice(-4)}` : 'Not provided'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mt-6">
                      <Checkbox
                        id="confirmAccuracy"
                        checked={formData.confirmAccuracy}
                        onCheckedChange={(checked) => setFormData({ ...formData, confirmAccuracy: checked })}
                      />
                      <Label htmlFor="confirmAccuracy" className="text-sm font-normal leading-relaxed">
                        I confirm that all information provided is accurate and complete. I understand that providing 
                        false information may result in account suspension or termination.
                      </Label>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900 mb-1">Almost There!</p>
                        <p className="text-sm text-green-700">
                          Once you complete registration, your account will be reviewed within 2-3 business days. 
                          You'll receive an email notification once approved.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          {currentStep < 5 ? (
            <Button 
              onClick={handleNext} 
              disabled={currentStep === 3 && !validationStatus.isValid}
              className="bg-indigo-600 hover:bg-indigo-700 gap-2"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!formData.confirmAccuracy}
              className="bg-green-600 hover:bg-green-700 gap-2"
            >
              Complete Registration
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}