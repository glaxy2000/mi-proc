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
  Settings
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

export default function BuyerOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    contacts: [],
    // Step 2
    orgNameArabic: '',
    orgNameEnglish: '',
    crNumber: '',
    registrationDate: '',
    industrySector: '',
    orgType: '',
    procurementCategories: [],
    numberOfEmployees: '',
    street: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
    orgEmail: '',
    website: '',
    // Step 3
    documents: {
      cr: null,
      vat: null,
      bank: null,
      ownership: null,
      id: null
    },
    // Step 4
    monthlyBudget: '',
    preferredCategories: [],
    preferredSuppliers: '',
    specialRequirements: '',
    paymentTerms: '',
    deliveryTimeline: '',
    accountHolderName: '',
    bankName: '',
    iban: '',
    accountType: '',
    currency: 'SAR',
    fundingMethod: '',
    confirmAccuracy: false
  });

  const generateRandomCompanyData = (crNumber) => {
    const companies = [
      { arabic: 'شركة الفيصل للتجارة', english: 'Al Faisal Trading Co.', sector: 'trading', type: 'sme', city: 'riyadh', street: 'King Fahd Road, Al Olaya District', postal: '11564', nationalAddress: 'OLYA2342', phone: '+966 11 234 5678', email: 'info@alfaisal-trading.com.sa', website: 'https://www.alfaisal-trading.com.sa', employees: '21-50', categories: ['Raw Materials', 'Office Supplies'] },
      { arabic: 'مجموعة النهدي الطبية', english: 'Al Nahdi Medical Group', sector: 'healthcare', type: 'large_enterprise', city: 'jeddah', street: 'Tahlia Street, Al Rawdah', postal: '21451', nationalAddress: 'RAWH5817', phone: '+966 12 345 6789', email: 'procurement@alnahdi.com.sa', website: 'https://www.alnahdi.com.sa', employees: '500+', categories: ['Medical Supplies', 'Services'] },
      { arabic: 'شركة الراجحي للمقاولات', english: 'Al Rajhi Construction Co.', sector: 'construction', type: 'large_enterprise', city: 'riyadh', street: 'Prince Mohammed Bin Abdulaziz Road', postal: '12211', nationalAddress: 'PMAB1193', phone: '+966 11 456 7890', email: 'ops@alrajhi-construction.com.sa', website: 'https://www.alrajhi-construction.com.sa', employees: '100-500', categories: ['Construction Materials', 'Equipment'] },
      { arabic: 'شركة سدير للتصنيع', english: 'Sudair Manufacturing Ltd.', sector: 'manufacturing', type: 'sme', city: 'dammam', street: 'Industrial City, 2nd Street', postal: '31952', nationalAddress: 'DMAG3000', phone: '+966 13 567 8901', email: 'info@sudair-mfg.com.sa', website: 'https://www.sudair-mfg.com.sa', employees: '51-100', categories: ['Raw Materials', 'IT & Software'] },
      { arabic: 'شركة الخليج للخدمات اللوجستية', english: 'Gulf Logistics Services Co.', sector: 'logistics', type: 'sme', city: 'khobar', street: 'King Abdul Aziz Street, Al Aqrabiyah', postal: '34445', nationalAddress: 'KBRA4421', phone: '+966 13 678 9012', email: 'logistics@gulf-ls.com.sa', website: 'https://www.gulf-ls.com.sa', employees: '6-20', categories: ['Services', 'Supplies'] },
    ];
    const idx = parseInt(crNumber.slice(-1)) % companies.length;
    const c = companies[idx];
    const regYear = 2010 + (parseInt(crNumber.slice(2, 4)) % 13);
    return {
      orgNameArabic: c.arabic,
      orgNameEnglish: c.english,
      crNumber,
      registrationDate: `${regYear}-0${(parseInt(crNumber.slice(4, 5)) % 9) + 1}-15`,
      industrySector: c.sector,
      orgType: c.type,
      numberOfEmployees: c.employees,
      street: c.street,
      city: c.city,
      postalCode: c.postal,
      nationalAddress: c.nationalAddress,
      phoneNumber: c.phone,
      orgEmail: c.email,
      website: c.website,
      procurementCategories: c.categories,
    };
  };

  const handleCrNumberChange = (value) => {
    setFormData({ ...formData, crNumber: value });
    if (/^\d{10}$/.test(value)) {
      const autoData = generateRandomCompanyData(value);
      setFormData(prev => ({ ...prev, ...autoData }));
    }
  };

  const steps = [
    { number: 1, title: 'Email Verified', icon: CheckCircle2, completed: true },
    { number: 2, title: 'Organisation Info', icon: Building2, completed: currentStep > 2 },
    { number: 3, title: 'Document Verification', icon: FileText, completed: currentStep > 3 },
    { number: 4, title: 'Preferences & Bank', icon: Settings, completed: currentStep > 4 }
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

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    window.location.href = createPageUrl('Dashboard');
  };

  const progress = (currentStep / 4) * 100;

  const procurementCategoryOptions = [
    'Raw Materials', 'Equipment', 'Services', 'Supplies', 'IT & Software', 
    'Construction Materials', 'Office Supplies', 'Marketing & Advertising'
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <Link to={createPageUrl('Home')} className="inline-flex items-center gap-2 mb-6">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698475e8a83c0e60c7a78100/def2d3f5f_MI-logo-color.png" 
              alt="MI Technologies" 
              className="h-8"
            />
            <span className="font-bold text-slate-900">Mi-Proc</span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Buyer Onboarding</h1>
          <p className="text-slate-600">Complete your profile to start creating RFQs</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    step.completed || currentStep === step.number
                      ? 'bg-teal-600 border-teal-600 text-white'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}>
                    {step.completed ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <step.icon className="h-6 w-6" />
                    )}
                  </div>
                  <p className={`text-xs mt-2 text-center max-w-[100px] ${
                    currentStep === step.number ? 'text-teal-600 font-semibold' : 'text-slate-600'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-24 mx-4 ${
                    step.completed ? 'bg-teal-600' : 'bg-slate-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-indigo-50 border-b">
                  <CardTitle>Step 2: Organisation Information</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Provide details about your organisation</p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Organisation Name (Arabic) *</Label>
                      <Input
                        value={formData.orgNameArabic}
                        onChange={(e) => setFormData({ ...formData, orgNameArabic: e.target.value })}
                        placeholder="اسم المنظمة"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Organisation Name (English) *</Label>
                      <Input
                        value={formData.orgNameEnglish}
                        onChange={(e) => setFormData({ ...formData, orgNameEnglish: e.target.value })}
                        placeholder="Organisation Name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Commercial Registration (CR) Number *</Label>
                      <Input
                        value={formData.crNumber}
                        onChange={(e) => handleCrNumberChange(e.target.value)}
                        placeholder="Enter 10-digit CR Number"
                        maxLength={10}
                      />
                      {/^\d{10}$/.test(formData.crNumber) ? (
                        <p className="text-xs text-teal-600 flex items-center gap-1">✓ Company data auto-filled from CR lookup</p>
                      ) : (
                        <p className="text-xs text-slate-400">Enter 10-digit CR number to auto-fill company details</p>
                      )}
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
                      <Label>Industry/Sector *</Label>
                      <Select
                        value={formData.industrySector}
                        onValueChange={(value) => setFormData({ ...formData, industrySector: value })}
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
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="hospitality">Hospitality</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Organisation Type *</Label>
                      <Select
                        value={formData.orgType}
                        onValueChange={(value) => setFormData({ ...formData, orgType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sole_proprietor">Sole Proprietor</SelectItem>
                          <SelectItem value="sme">SME</SelectItem>
                          <SelectItem value="large_enterprise">Large Enterprise</SelectItem>
                          <SelectItem value="government">Government</SelectItem>
                          <SelectItem value="nonprofit">Non-Profit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Procurement Categories * (Select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border rounded-lg p-4">
                      {procurementCategoryOptions.map((category) => (
                        <div key={category} className="flex items-center gap-2">
                          <Checkbox
                            id={category}
                            checked={formData.procurementCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({
                                  ...formData,
                                  procurementCategories: [...formData.procurementCategories, category]
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  procurementCategories: formData.procurementCategories.filter(c => c !== category)
                                });
                              }
                            }}
                          />
                          <Label htmlFor={category} className="text-sm font-normal cursor-pointer">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
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
                        <SelectItem value="100-500">100-500</SelectItem>
                        <SelectItem value="500+">500+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Organisation Address</h3>
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
                        <Label>Organisation Phone Number *</Label>
                        <Input
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          placeholder="+966 XX XXX XXXX"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Organisation Email *</Label>
                        <Input
                          type="email"
                          value={formData.orgEmail}
                          onChange={(e) => setFormData({ ...formData, orgEmail: e.target.value })}
                          placeholder="organisation@company.com"
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
                <CardHeader className="bg-gradient-to-r from-teal-50 to-indigo-50 border-b">
                  <CardTitle>Step 3: Document Verification (KYC)</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Upload required organisational documents (Max 10MB each)</p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">

                  {/* CR Integration Info Banner */}
                  {/^\d{10}$/.test(formData.crNumber) && (
                    <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-teal-800">CR Integration Active — Documents Auto-Attached</p>
                        <p className="text-sm text-teal-700 mt-1">
                          CR Number <span className="font-mono font-bold">{formData.crNumber}</span> was verified via the <strong>Ministry of Commerce (MoC) CR Lookup API</strong>. Certified copies of your CR Certificate and VAT Certificate have been automatically retrieved and attached from the national registry.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge className="bg-teal-100 text-teal-700">MoC API v2.1</Badge>
                          <Badge className="bg-teal-100 text-teal-700">ZATCA Verified</Badge>
                          <Badge className="bg-teal-100 text-teal-700">Live Registry</Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  {[
                    { key: 'cr', label: 'Commercial Registration (CR) Certificate', autoName: `CR_Certificate_${formData.crNumber}.pdf`, autoSize: '245 KB' },
                    { key: 'vat', label: 'Tax Registration Certificate (VAT)', autoName: `VAT_Certificate_${formData.crNumber}.pdf`, autoSize: '189 KB' },
                  ].map((doc) => {
                    const isAutoAttached = /^\d{10}$/.test(formData.crNumber);
                    return (
                      <div key={doc.key} className="border rounded-xl p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-slate-900">{doc.label}</h4>
                            <p className="text-sm text-slate-500 mt-1">
                              Accepted formats: PDF, JPG, PNG • Max size: 10MB
                            </p>
                          </div>
                          {isAutoAttached ? (
                            <Badge className="bg-teal-100 text-teal-700 border-teal-200">Auto-Attached</Badge>
                          ) : (
                            <Badge variant="outline" className="text-red-600 border-red-200">Required</Badge>
                          )}
                        </div>

                        {isAutoAttached ? (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                              <div>
                                <p className="font-medium text-green-900">{doc.autoName}</p>
                                <p className="text-sm text-green-700">{doc.autoSize} — Retrieved from MoC Registry</p>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-700">Verified</Badge>
                          </div>
                        ) : !formData.documents[doc.key] ? (
                          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-teal-400 transition-colors">
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
                    );
                  })}

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

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-indigo-50 border-b">
                  <CardTitle>Step 4: Procurement Preferences & Bank Account</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Set your preferences and link your bank account</p>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                  {/* Section A: Procurement Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Procurement Preferences</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Average Monthly Procurement Budget (SAR) *</Label>
                        <Input
                          type="number"
                          value={formData.monthlyBudget}
                          onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Preferred Procurement Categories * (Select all that apply)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border rounded-lg p-4">
                          {procurementCategoryOptions.map((category) => (
                            <div key={category} className="flex items-center gap-2">
                              <Checkbox
                                id={`pref-${category}`}
                                checked={formData.preferredCategories.includes(category)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFormData({
                                      ...formData,
                                      preferredCategories: [...formData.preferredCategories, category]
                                    });
                                  } else {
                                    setFormData({
                                      ...formData,
                                      preferredCategories: formData.preferredCategories.filter(c => c !== category)
                                    });
                                  }
                                }}
                              />
                              <Label htmlFor={`pref-${category}`} className="text-sm font-normal cursor-pointer">
                                {category}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Preferred Suppliers (Optional)</Label>
                        <Textarea
                          value={formData.preferredSuppliers}
                          onChange={(e) => setFormData({ ...formData, preferredSuppliers: e.target.value })}
                          rows={3}
                          placeholder="List any preferred suppliers or supplier types"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Special Requirements (Optional)</Label>
                        <Textarea
                          value={formData.specialRequirements}
                          onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                          rows={3}
                          placeholder="Any special requirements (e.g., local suppliers, specific certifications)"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>Payment Terms Preference *</Label>
                          <Select
                            value={formData.paymentTerms}
                            onValueChange={(value) => setFormData({ ...formData, paymentTerms: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment terms" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">Immediate (Escrow)</SelectItem>
                              <SelectItem value="7days">7 Days</SelectItem>
                              <SelectItem value="14days">14 Days</SelectItem>
                              <SelectItem value="30days">30 Days</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Preferred Delivery Timeline *</Label>
                          <Select
                            value={formData.deliveryTimeline}
                            onValueChange={(value) => setFormData({ ...formData, deliveryTimeline: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asap">ASAP</SelectItem>
                              <SelectItem value="1-7days">1-7 Days</SelectItem>
                              <SelectItem value="1-2weeks">1-2 Weeks</SelectItem>
                              <SelectItem value="2-4weeks">2-4 Weeks</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section B: Bank Account */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Bank Account Linking</h3>
                    <div className="space-y-6">
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
                          <Label>Preferred Funding Method *</Label>
                          <Select
                            value={formData.fundingMethod}
                            onValueChange={(value) => setFormData({ ...formData, fundingMethod: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                              <SelectItem value="credit_card">Credit Card</SelectItem>
                              <SelectItem value="debit_card">Debit Card</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review & Confirm */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Review & Confirm</h3>
                    <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-500">Organisation Name</p>
                          <p className="font-medium text-slate-900">{formData.orgNameEnglish || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">CR Number</p>
                          <p className="font-medium text-slate-900">{formData.crNumber || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Organisation Email</p>
                          <p className="font-medium text-slate-900">{formData.orgEmail || 'Not provided'}</p>
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

          {currentStep < 4 ? (
            <Button onClick={handleNext} className="bg-teal-600 hover:bg-teal-700 gap-2">
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