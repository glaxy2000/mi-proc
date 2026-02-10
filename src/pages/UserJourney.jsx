import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Mail,
  FileText,
  Upload,
  Building2,
  CreditCard,
  Shield,
  Users,
  Package,
  ArrowRight,
  AlertCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function UserJourney() {
  const [activeRole, setActiveRole] = useState('supplier');

  const supplierSteps = [
    {
      number: 1,
      title: 'Initial Registration & Role Selection',
      icon: Mail,
      status: 'Email Pending Verification',
      description: 'Create your account and verify your email',
      fields: [
        'Email Address',
        'Password (min 12 characters)',
        'Confirm Password',
        'Business Type',
        'Terms & Privacy Policy Agreement'
      ],
      actions: [
        'Validate email format and uniqueness',
        'Send verification email',
        'Create temporary user account'
      ]
    },
    {
      number: 2,
      title: 'Business Information Collection',
      icon: Building2,
      status: 'Information Collection',
      description: 'Provide detailed business information',
      fields: [
        'Business Name (Arabic & English)',
        'Business Registration Number (CR)',
        'Business Registration Date',
        'Business Sector',
        'Primary & Secondary Products/Services',
        'Years in Business',
        'Number of Employees',
        'Business Address & Contact Details'
      ],
      actions: [
        'Validate all required fields',
        'Save business information',
        'Progress to document verification'
      ]
    },
    {
      number: 3,
      title: 'KYB Document Verification',
      icon: Upload,
      status: 'Pending Verification',
      description: 'Upload required business documents',
      documents: [
        'Commercial Registration (CR) Certificate',
        'Tax Registration Certificate (VAT)',
        'Bank Account Verification',
        'Ownership/Authorization Document',
        'Identification Document (Owner/Authorized Person)'
      ],
      verification: '24-48 hours review by compliance team'
    },
    {
      number: 4,
      title: 'Bank Account Linking & Completion',
      icon: CreditCard,
      status: 'Final Setup',
      description: 'Link your bank account for payments',
      fields: [
        'Account Holder Name',
        'Bank Name',
        'IBAN',
        'Account Type',
        'Account Currency',
        'Preferred Settlement Method'
      ],
      completion: 'Account Ready for Activation'
    }
  ];

  const buyerSteps = [
    {
      number: 1,
      title: 'Initial Registration & Role Selection',
      icon: Mail,
      status: 'Email Pending Verification',
      description: 'Create your account and verify your email',
      fields: [
        'Email Address',
        'Password (min 12 characters)',
        'Confirm Password',
        'Organization Type',
        'Terms & Privacy Policy Agreement'
      ],
      actions: [
        'Validate email format and uniqueness',
        'Send verification email',
        'Create temporary user account'
      ]
    },
    {
      number: 2,
      title: 'Organization Information Collection',
      icon: Building2,
      status: 'Information Collection',
      description: 'Provide detailed organization information',
      fields: [
        'Organization Name (Arabic & English)',
        'Business Registration Number (CR)',
        'Business Registration Date',
        'Industry/Sector',
        'Organization Type',
        'Primary Procurement Categories',
        'Number of Employees',
        'Organization Address & Contact Details'
      ],
      actions: [
        'Validate all required fields',
        'Save organization information',
        'Progress to document verification'
      ]
    },
    {
      number: 3,
      title: 'KYC Document Verification',
      icon: Upload,
      status: 'Pending Verification',
      description: 'Upload required organizational documents',
      documents: [
        'Commercial Registration (CR) Certificate',
        'Tax Registration Certificate (VAT)',
        'Bank Account Verification',
        'Ownership/Authorization Document',
        'Identification Document (Owner/Authorized Person)'
      ],
      verification: '24-48 hours review by compliance team'
    },
    {
      number: 4,
      title: 'Procurement Preferences & Bank Setup',
      icon: CreditCard,
      status: 'Final Setup',
      description: 'Set preferences and link bank account',
      fields: [
        'Average Monthly Procurement Budget',
        'Preferred Procurement Categories',
        'Payment Terms Preference',
        'Preferred Delivery Timeline',
        'Bank Account Details (IBAN)',
        'Preferred Funding Method'
      ],
      completion: 'Account Ready for Activation'
    }
  ];

  const accountStatuses = [
    { status: 'Registration', icon: Mail, color: 'bg-blue-100 text-blue-700' },
    { status: 'Email Verification', icon: CheckCircle2, color: 'bg-green-100 text-green-700' },
    { status: 'Info Collection', icon: Building2, color: 'bg-purple-100 text-purple-700' },
    { status: 'Document Upload', icon: Upload, color: 'bg-indigo-100 text-indigo-700' },
    { status: 'Bank Linking', icon: CreditCard, color: 'bg-teal-100 text-teal-700' },
    { status: 'KYB/KYC Pending', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
    { status: 'Approved & Active', icon: CheckCircle2, color: 'bg-green-100 text-green-700' }
  ];

  const postApprovalFeatures = {
    supplier: [
      'Welcome dashboard with onboarding checklist',
      'Complete profile (add logo, detailed description, certifications)',
      'Browse available RFQs matching your business type',
      'Set up notification preferences',
      'Receive notifications for new RFQs, messages, and payments'
    ],
    buyer: [
      'Welcome dashboard with quick-start guide',
      'Complete profile (add logo, procurement team details)',
      'Tutorial on creating first RFQ',
      'Access verified suppliers in your procurement categories',
      'Receive notifications for bids, messages, and confirmations'
    ]
  };

  const steps = activeRole === 'supplier' ? supplierSteps : buyerSteps;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Your Journey on Mi-Proc
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              A step-by-step guide to onboarding as a {activeRole === 'supplier' ? 'Supplier' : 'Buyer'}
            </p>
          </motion.div>

          {/* Role Switcher */}
          <div className="flex justify-center">
            <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-xl p-1">
              <button
                onClick={() => setActiveRole('supplier')}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  activeRole === 'supplier'
                    ? 'bg-white text-indigo-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Package className="inline-block h-5 w-5 mr-2" />
                Supplier Journey
              </button>
              <button
                onClick={() => setActiveRole('buyer')}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  activeRole === 'buyer'
                    ? 'bg-white text-indigo-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Users className="inline-block h-5 w-5 mr-2" />
                Buyer Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 via-purple-200 to-teal-200 transform -translate-x-1/2" />

            <div className="space-y-16">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`lg:grid lg:grid-cols-2 gap-8 items-start ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 0 ? '' : 'lg:col-start-2'}>
                    <Card className="hover:shadow-xl transition-shadow border-2">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xl">{step.number}</span>
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                            <Badge className="bg-indigo-100 text-indigo-700">
                              {step.status}
                            </Badge>
                          </div>
                          <step.icon className="h-8 w-8 text-indigo-300" />
                        </div>
                        <p className="text-slate-600 mt-4">{step.description}</p>
                      </CardHeader>
                      <CardContent>
                        {step.fields && (
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-3">Required Fields:</h4>
                            <ul className="space-y-2">
                              {step.fields.map((field, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                                  {field}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {step.documents && (
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-3">Required Documents:</h4>
                            <ul className="space-y-2">
                              {step.documents.map((doc, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                  <Upload className="h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                                  {doc}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <p className="text-sm text-yellow-800 flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {step.verification}
                              </p>
                            </div>
                          </div>
                        )}

                        {step.actions && (
                          <div className="mt-4">
                            <h4 className="font-semibold text-slate-900 mb-3">System Actions:</h4>
                            <ul className="space-y-2">
                              {step.actions.map((action, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                  <ArrowRight className="h-4 w-4 text-teal-500 flex-shrink-0 mt-0.5" />
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {step.completion && (
                          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm font-semibold text-green-800 flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5" />
                              {step.completion}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Account Status Flow */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Account Status Flow
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {accountStatuses.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge className={`${item.color} px-4 py-2 text-sm font-medium flex items-center gap-2`}>
                  <item.icon className="h-4 w-4" />
                  {item.status}
                </Badge>
                {index < accountStatuses.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-slate-400" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-50 border border-red-200 rounded-lg">
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-red-800">
                {activeRole === 'supplier' ? 'KYB' : 'KYC'} Rejected (with reason) - Resubmit Documents
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Approval Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            After Approval: Your Dashboard Awaits
          </h2>
          <p className="text-center text-slate-600 mb-12">
            Once your account is approved, here's what you can do:
          </p>

          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle2 className="h-6 w-6" />
                Welcome to Mi-Proc!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {postApprovalFeatures[activeRole].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Dual Role Management */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-8">
            <Badge className="bg-purple-100 text-purple-700 mb-4">
              Advanced Feature
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Dual Role Management
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Your organization can function as both a Buyer and Supplier on Mi-Proc
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                  Add Additional Role
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <p>If you already have one role and want to add another:</p>
                <ol className="space-y-2 list-decimal list-inside">
                  <li>Navigate to Account Settings → Manage Roles</li>
                  <li>Select "Add New Role"</li>
                  <li>Complete abbreviated onboarding (skip verified documents)</li>
                  <li>Await compliance review</li>
                  <li>Switch between roles in your dashboard</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-teal-600" />
                  Role Switching
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <p>Once both roles are approved:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Use "Switch Role" dropdown in your dashboard
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Each role has separate dashboard and history
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Seamlessly switch between buying and selling
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Begin your journey on Mi-Proc today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={createPageUrl(activeRole === 'supplier' ? 'SupplierSignup' : 'BuyerSignup')}>
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white w-full sm:w-auto">
                {activeRole === 'supplier' ? (
                  <>
                    <Package className="mr-2 h-5 w-5" />
                    Register as Supplier
                  </>
                ) : (
                  <>
                    <Users className="mr-2 h-5 w-5" />
                    Register as Buyer
                  </>
                )}
              </Button>
            </Link>
            <Link to={createPageUrl('Home')}>
              <Button size="lg" variant="outline" className="bg-white text-indigo-600 hover:bg-white/90 w-full sm:w-auto">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}