import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  TrendingDown,
  Users,
  DollarSign,
  Clock,
  CheckCircle2,
  FileText,
  MessageSquare,
  Package,
  Wallet,
  Lock,
  Building2,
  Factory,
  Stethoscope,
  ShoppingCart,
  Globe,
  Server,
  Eye,
  ChevronDown,
  CreditCard,
  TrendingUp,
  Handshake,
  Receipt,
  ClipboardList,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ServicesSlider from '@/components/ServicesSlider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const [activeTab, setActiveTab] = React.useState('buyer');

  const buyerBenefits = [
    { icon: DollarSign, title: 'Competitive Pricing', description: 'Access 50+ verified suppliers anonymously' },
    { icon: Clock, title: 'Speed', description: 'Reduce procurement cycle from weeks to 3-7 days' },
    { icon: Shield, title: 'Secure Payments', description: 'Built-in escrow and instant settlements' },
    { icon: TrendingDown, title: 'Cost Savings', description: '20-25% reduction in procurement costs' }
  ];

  const supplierBenefits = [
    { icon: Globe, title: 'Broader Market Access', description: 'Reach 2,500+ SME buyers' },
    { icon: Zap, title: 'Faster Payments', description: 'Instant settlements instead of T+3 to T+30 days' },
    { icon: TrendingDown, title: 'Lower Fees', description: 'Sub-1% transaction costs vs. 2-3% traditional methods' },
    { icon: Eye, title: 'Fair Competition', description: 'Compete on merit with blind bidding' }
  ];

  const howItWorksSteps = [
    { number: 1, title: 'Create RFQ / Blind RFQ', subtitle: 'Buyers post needs / Suppliers browse', icon: FileText },
    { number: 2, title: 'AI Matching & Anonymous Bids', subtitle: 'Smart supplier matching', icon: Users },
    { number: 3, title: 'Secure Virtual Negotiations', subtitle: 'End-to-end encrypted communication', icon: MessageSquare },
    { number: 4, title: 'Escrow Funding & Deal Confirmation', subtitle: 'Secure payment guarantee', icon: Lock },
    { number: 5, title: 'Delivery & Verification', subtitle: 'Track and confirm delivery', icon: Package },
    { number: 6, title: 'Instant Settlement', subtitle: 'Immediate fund release', icon: Wallet }
  ];

  const securityFeatures = [
    { title: 'AES-256 Encryption', description: 'Data at rest' },
    { title: 'TLS 1.3 Encryption', description: 'Data in transit' },
    { title: 'End-to-End Encrypted', description: 'Communications' },
    { title: 'Zero-Trust Architecture', description: 'Network security' },
    { title: 'Multi-Factor Authentication', description: 'MFA' }
  ];

  const complianceCertifications = [
    { title: 'SAMA PSP License', description: 'Saudi Central Bank approved' },
    { title: 'PCI-DSS Level 1', description: 'Payment security certified' },
    { title: 'NCA Compliance', description: 'National Cybersecurity Authority' },
    { title: 'Data Sovereignty', description: 'KSA-hosted on STC Cloud / AWS Riyadh' }
  ];

  const sectors = [
    { icon: Building2, name: 'Construction', savings: '15-25%' },
    { icon: Factory, name: 'Manufacturing', savings: '20%' },
    { icon: Stethoscope, name: 'Healthcare', savings: '10-20%' },
    { icon: ShoppingCart, name: 'Trading & Retail', savings: '15-25%' }
  ];

  const faqs = [
    {
      question: 'What is a blind / RFQ and why is it important?',
      answer: 'A blind RFQ (Request for Quotation) keeps your identity anonymous during the bidding process, preventing supplier bias and ensuring you receive the most competitive pricing based on merit rather than relationship.'
    },
    {
      question: 'How long does the onboarding process take?',
      answer: 'The onboarding process typically takes 24-48 hours for document verification. You can complete the registration form in about 15-20 minutes, and our compliance team will review your documents within 2-3 business days.'
    },
    {
      question: 'What documents do I need to provide for KYB verification?',
      answer: 'You\'ll need: Commercial Registration (CR) Certificate, Tax Registration Certificate (VAT), Bank Account Verification, Ownership/Authorization Document, and Identification Document (Owner/Authorized Person).'
    },
    {
      question: 'How are disputes resolved?',
      answer: 'Our platform includes a built-in dispute resolution mechanism with escrow protection. Our team mediates disputes and ensures fair outcomes based on delivery confirmations and transaction records.'
    },
    {
      question: 'What are the transaction fees?',
      answer: 'Mi-Proc charges sub-1% transaction fees, significantly lower than traditional payment methods (2-3%). This helps both buyers and suppliers save on procurement costs.'
    },
    {
      question: 'Is my data secure on Mi-Proc?',
      answer: 'Yes. We use AES-256 encryption for data at rest, TLS 1.3 for data in transit, and maintain SAMA PSP licensing, PCI-DSS Level 1 certification, and NCA compliance. All data is hosted in Saudi Arabia.'
    }
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698475e8a83c0e60c7a78100/def2d3f5f_MI-logo-color.png" 
                alt="MI Technologies" 
                className="h-8"
              />
              <span className="font-bold text-slate-900">Mi-Proc</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
              <button onClick={() => scrollToSection('home')} className="text-slate-600 hover:text-slate-900">Home</button>
              <Link to={createPageUrl('Products')} className="text-slate-600 hover:text-slate-900">Products</Link>
              <Link to={createPageUrl('Solutions')} className="text-slate-600 hover:text-slate-900">Solutions</Link>
              <Link to={createPageUrl('ProcurementServices')} className="text-slate-600 hover:text-slate-900">Procurement Services</Link>
            <Link to={createPageUrl('Automation')} className="text-slate-600 hover:text-slate-900">Automation</Link>
            <Link to={createPageUrl('DigitalTransformation')} className="text-slate-600 hover:text-slate-900">Digital Transformation</Link>
              <Link to={createPageUrl('Contact')} className="text-slate-600 hover:text-slate-900">Contact</Link>
            </div>

            <div className="flex items-center gap-3">
              <Link to={createPageUrl('Signin')}>
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to={createPageUrl('Register')}>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-[#5b4fb8] via-[#4a8fb9] to-[#2bb3b3]">

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Transform Your B2B
                <span className="block mt-2">Procurement & Payments</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-xl">
                Discover competitive suppliers, negotiate securely, and settle instantly with Mi-Proc.
              </p>
              <p className="text-base text-white/80 mb-8 max-w-xl">
                Global Business Solutions For Best Strategies
              </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={createPageUrl('Register')}>
                <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
                  Get Started - Sign Up
                </Button>
              </Link>
              <Link to={createPageUrl('Signin')}>
                <Button size="lg" className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white hover:bg-white/20 hover:border-white shadow-lg">
                  Sign In
                </Button>
              </Link>
            </div>
            </motion.div>

            {/* Hero Image/Illustration */}
            <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
            >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 blur-3xl rounded-full" />
              <div className="relative grid grid-cols-2 gap-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="space-y-4"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <FileText className="w-12 h-12 text-teal-400 mb-3" />
                    <h3 className="text-white font-semibold mb-1">RFQ Management</h3>
                    <p className="text-slate-300 text-sm">Create & track requests</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <Shield className="w-12 h-12 text-indigo-400 mb-3" />
                    <h3 className="text-white font-semibold mb-1">Secure Escrow</h3>
                    <p className="text-slate-300 text-sm">Protected payments</p>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="space-y-4 pt-12"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <MessageSquare className="w-12 h-12 text-purple-400 mb-3" />
                    <h3 className="text-white font-semibold mb-1">Negotiations</h3>
                    <p className="text-slate-300 text-sm">Secure messaging</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <Zap className="w-12 h-12 text-teal-400 mb-3" />
                    <h3 className="text-white font-semibold mb-1">Instant Settlement</h3>
                    <p className="text-slate-300 text-sm">Fast payments</p>
                  </div>
                </motion.div>
              </div>
            </div>
            </motion.div>
            </div>
            </div>
            </section>

      {/* Services Slider */}
      <ServicesSlider />

      {/* Value Proposition Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Built for <span className="text-indigo-600">Buyers & Suppliers</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Mi-Proc delivers value to both sides of the B2B marketplace
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setActiveTab('buyer')}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'buyer'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Buyers
              </button>
              <button
                onClick={() => setActiveTab('supplier')}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'supplier'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Suppliers
              </button>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeTab === 'buyer' ? buyerBenefits : supplierBenefits).map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-slate-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Source-to-Pay Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="bg-indigo-100 text-indigo-700 mb-4">Source-to-Pay Platform</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              One Intelligent Platform for <span className="text-indigo-600">Core Sourcing, Purchase & Finance</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Procurement teams face fragmented workflows, manual processes, and unclear spend tracking. Mi-Proc replaces fragmented systems with one centralized procurement hub.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: ClipboardList, title: 'Core Sourcing', color: 'bg-indigo-500', lightColor: 'bg-indigo-50',
                features: [
                  { name: 'Purchase Requests', desc: 'Structured forms with automated approval routing.' },
                  { name: 'E-Sourcing / RFQ', desc: 'Run RFQs, RFPs and RFIs with side-by-side bid comparison.' },
                  { name: 'POs & Awards', desc: 'Auto-generate purchase orders from approved requests.' },
                  { name: 'Vendor Portal', desc: 'Centralize supplier data, onboarding and performance.' },
                ]
              },
              {
                icon: Package, title: 'Purchase', color: 'bg-teal-500', lightColor: 'bg-teal-50',
                features: [
                  { name: 'GRN / Receiving', desc: 'Confirm quantity & quality on delivery to prevent over-billing.' },
                  { name: 'Billing Management', desc: 'Automate 3-way matching: Invoice ↔ PO ↔ GRN.' },
                  { name: 'Payments', desc: 'SAMA-compliant payments with escrow protection and full visibility.' },
                ]
              },
              {
                icon: Receipt, title: 'Finance', color: 'bg-emerald-500', lightColor: 'bg-emerald-50',
                features: [
                  { name: 'Budget Management', desc: 'Live dashboards: committed, invoiced, and remaining per department.' },
                  { name: 'Expense Accounts', desc: 'Actionable insights into spending patterns and savings opportunities.' },
                ]
              },
            ].map((module, mi) => (
              <motion.div key={mi} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: mi * 0.15 }}>
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-shadow">
                  <div className={`${module.color} rounded-t-xl p-6 text-white`}>
                    <module.icon className="h-8 w-8 mb-3" />
                    <h3 className="text-xl font-bold">{module.title}</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {module.features.map((f, fi) => (
                      <div key={fi} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{f.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                    <Link to={createPageUrl('Products')}>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        Learn More <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-teal-100 text-teal-700 mb-4">HOW IT WORKS</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              From RFQ to Payment in <span className="text-teal-600">6 Simple Steps</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-teal-200 to-purple-200 transform -translate-x-1/2" />

            <div className="space-y-12">
              {howItWorksSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`lg:grid lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 0 ? 'lg:text-right' : 'lg:col-start-2'}>
                    <Card className="inline-block hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">{step.number}</span>
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
                            <p className="text-sm text-slate-600">{step.subtitle}</p>
                          </div>
                          <step.icon className="h-8 w-8 text-indigo-300 ml-auto" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Target Sectors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Proven Results Across <span className="text-teal-600">Multiple Industries</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sector, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <sector.icon className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-2">{sector.name}</h4>
                    <p className="text-teal-600 font-bold text-lg">{sector.savings}</p>
                    <p className="text-sm text-slate-500">Cost Savings</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about Mi-Proc
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-xl border px-6">
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-indigo-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your B2B Procurement?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join 2,500+ SMEs already using Mi-Proc for secure, efficient procurement
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={createPageUrl('Register')}>
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white w-full sm:w-auto">
                Create Account
              </Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white hover:bg-white/20 hover:border-white shadow-lg w-full sm:w-auto">
                Talk to an Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Compliance Footer Section */}
          <div id="security" className="mb-12 pb-12 border-b border-slate-800">
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {/* Security */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-teal-400" />
                  Security
                </h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  {securityFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-teal-400 flex-shrink-0 mt-0.5" />
                      <span>{feature.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Compliance */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-teal-400" />
                  Compliance
                </h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  {complianceCertifications.map((cert, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Server className="h-4 w-4 text-teal-400 flex-shrink-0 mt-0.5" />
                      <span>{cert.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust & Licensing */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-teal-400" />
                  Licensed & Regulated
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  Mi-Proc is fully licensed by SAMA as a Payment Service Provider and complies with all local and international security standards.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-teal-900 text-teal-200 border-teal-700">SAMA Licensed</Badge>
                  <Badge className="bg-indigo-900 text-indigo-200 border-indigo-700">PCI-DSS L1</Badge>
                  <Badge className="bg-purple-900 text-purple-200 border-purple-700">NCA Compliant</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698475e8a83c0e60c7a78100/f81a0c650_MITechLogoblack.png" 
                  alt="MI Technologies" 
                  className="h-8 brightness-0 invert"
                />
              </div>
              <p className="text-sm text-slate-400">
                Revolutionizing B2B procurement and payments in Saudi Arabia
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white">Compliance</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Email: info@mi-technologies.sa</li>
                <li>Phone: +966 XX XXX XXXX</li>
                <li>Address: Al Kifah Tower, King Fahd Road, Dhahran 34232, Saudi Arabia</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2026 MI Technologies. All rights reserved. Licensed by SAMA.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}