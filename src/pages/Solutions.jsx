import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  Building2, Factory, Stethoscope, ShoppingCart, Globe, Truck,
  CheckCircle2, ArrowRight, Shield, Zap, DollarSign, Users,
  BarChart3, Cpu, Lock, ChevronRight, TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServicesSlider from '@/components/ServicesSlider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicNavbar from '@/components/PublicNavbar';

const solutions = [
  {
    id: 'by-industry',
    label: 'By Industry',
    items: [
      {
        icon: Building2, name: 'Construction', color: 'bg-amber-500',
        headline: 'Procurement built for construction complexity',
        description: 'Manage materials, subcontractors, and project-based budgets with full traceability from RFQ to delivery on-site.',
        savings: '15–25%', metric: 'Cost Savings',
        features: ['Project-based budget tracking', 'Multi-site delivery management', 'Subcontractor onboarding', 'Bill of Quantities (BoQ) RFQs', 'SASO-compliant materials sourcing'],
        industries: ['Developers', 'Contractors', 'Infrastructure firms']
      },
      {
        icon: Factory, name: 'Manufacturing', color: 'bg-blue-500',
        headline: 'Streamline raw material and component sourcing',
        description: 'Reduce lead times and production delays by automating supplier selection, purchase orders, and goods receipt.',
        savings: '20%', metric: 'Cost Savings',
        features: ['Raw material RFQs', 'Just-in-time procurement', 'Supplier quality scorecards', 'Multi-currency POs', 'ERP integration ready'],
        industries: ['Factories', 'Assembly plants', 'OEMs']
      },
      {
        icon: Stethoscope, name: 'Healthcare', color: 'bg-red-500',
        headline: 'Compliant medical procurement at scale',
        description: 'Ensure regulatory compliance for medical supplies and equipment with full audit trails and SFDA-approved supplier management.',
        savings: '10–20%', metric: 'Cost Savings',
        features: ['SFDA-compliant vendor registry', 'Medical equipment RFQs', 'Expiry tracking & GRN', 'Department-level budgets', 'Emergency procurement workflows'],
        industries: ['Hospitals', 'Clinics', 'Pharma distributors']
      },
      {
        icon: ShoppingCart, name: 'Trading & Retail', color: 'bg-purple-500',
        headline: 'Buy smarter, move faster in trading',
        description: 'Source products from multiple suppliers simultaneously, compare quotes side-by-side, and track delivery to warehouse.',
        savings: '15–25%', metric: 'Cost Savings',
        features: ['Catalog-based purchasing', 'Bulk RFQ processing', 'Delivery tracking & GRN', 'Mark-up management', 'Multi-supplier comparison'],
        industries: ['Wholesalers', 'Importers', 'Retailers']
      },
      {
        icon: Truck, name: 'Logistics & Transport', color: 'bg-teal-500',
        headline: 'Procurement for a fleet-dependent business',
        description: 'Manage spare parts, fuel contracts, and service agreements with automated renewal workflows and spend tracking.',
        savings: '12–18%', metric: 'Cost Savings',
        features: ['Fleet parts sourcing', 'Service contract management', 'Fuel procurement RFQs', 'Maintenance GRN tracking', 'Vendor SLA monitoring'],
        industries: ['3PLs', 'Freight companies', 'Courier networks']
      },
      {
        icon: Globe, name: 'Government & Public Sector', color: 'bg-indigo-500',
        headline: 'Transparent, auditable public procurement',
        description: 'Meet Etimad and Monafasat requirements with full audit trails, e-bidding, and compliance-first workflows.',
        savings: '20%+', metric: 'Efficiency Gain',
        features: ['Open & closed tender management', 'Full audit trail & e-signatures', 'ZATCA-integrated invoicing', 'Budget commitment controls', 'NDA & compliance workflows'],
        industries: ['Ministries', 'Municipalities', 'Government entities']
      },
    ]
  },
  {
    id: 'by-use-case',
    label: 'By Use Case',
    items: [
      {
        icon: DollarSign, name: 'Cost Reduction', color: 'bg-emerald-500',
        headline: 'Drive measurable savings on every purchase',
        description: 'Use competitive bidding, market benchmarks, and spend analytics to negotiate better deals and eliminate maverick buying.',
        savings: '5–25%', metric: 'Average Savings',
        features: ['Anonymous competitive bidding', 'Real-time market benchmarks', 'Spend analytics dashboard', 'Preferred supplier pricing', 'Bulk order consolidation'],
        industries: ['CFOs', 'Finance teams', 'Procurement managers']
      },
      {
        icon: Shield, name: 'Governance & Compliance', color: 'bg-slate-600',
        headline: 'Maintain full control with governance-first procurement',
        description: 'Multi-level approval workflows, segregation of duties, and full audit trails keep every purchase aligned with policy.',
        savings: '100%', metric: 'Audit Readiness',
        features: ['Multi-level approval workflows', 'Segregation of duties', 'Complete audit trail', 'Policy enforcement rules', 'SAMA / ZATCA compliance'],
        industries: ['Internal audit teams', 'Compliance officers', 'Legal departments']
      },
      {
        icon: Zap, name: 'Process Automation', color: 'bg-yellow-500',
        headline: 'Eliminate manual work across your procurement cycle',
        description: 'Auto-route purchase requests, trigger POs on approval, auto-match invoices to POs and GRNs, and auto-escalate overdue items.',
        savings: '75%', metric: 'Cycle Time Reduction',
        features: ['Auto-approval routing', 'Automatic PO generation', '3-way invoice matching', 'Escalation automation', 'Supplier onboarding automation'],
        industries: ['Operations teams', 'Shared services', 'IT departments']
      },
      {
        icon: Users, name: 'Supplier Management', color: 'bg-pink-500',
        headline: 'Build a high-performing supplier network',
        description: 'Onboard, rate, and monitor all suppliers in one place. Use performance data to make smarter sourcing decisions.',
        savings: '30%', metric: 'Faster Onboarding',
        features: ['Digital supplier onboarding (KYB)', 'Performance scorecards', 'Favorite & blacklist management', 'NDA workflow management', 'Bid win rate analytics'],
        industries: ['Procurement teams', 'Category managers', 'Vendor managers']
      },
      {
        icon: Lock, name: 'Contract Management', color: 'bg-indigo-700',
        headline: 'Centralize, sign, and track every contract in one place',
        description: 'Eliminate contract chaos with a digital repository that stores, organizes, and tracks all supplier agreements. Get expiry alerts, collect e-signatures, and automate renewals.',
        savings: '100%', metric: 'Contract Visibility',
        features: ['Digital contract repository', 'Buyer & supplier e-signatures', 'Automated expiry reminders', 'One-click contract renewal', 'PO-linked contract tracking', 'Termination & status workflows'],
        industries: ['Legal teams', 'Procurement managers', 'Finance departments']
      },
    ]
  }
];

export default function Solutions() {
  const [activeTab, setActiveTab] = useState('by-industry');
  const [selected, setSelected] = useState(solutions[0].items[0]);

  const currentTab = solutions.find(s => s.id === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar activePage="Solutions" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#5b4fb8] via-[#4a8fb9] to-[#2bb3b3] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-teal-400/20 text-teal-200 mb-4">Solutions</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Procurement Solutions<br /><span className="text-teal-300">Built for Your Needs</span></h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Whether you're a manufacturer, healthcare provider, or government entity — Mi-Proc adapts to your industry's unique procurement challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-indigo-600 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
            {[
              { value: '13.5%', label: 'Average cost savings' },
              { value: '75%', label: 'Cycle time reduction' },
              { value: '30K+', label: 'Target platform users' },
              { value: '99.99%', label: 'Platform uptime SLA' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold">{s.value}</p>
                <p className="text-indigo-200 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Explorer */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tab switcher */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white rounded-xl p-1 shadow-sm border">
              {solutions.map(s => (
                <button key={s.id} onClick={() => { setActiveTab(s.id); setSelected(solutions.find(x => x.id === s.id).items[0]); }}
                  className={`px-8 py-3 rounded-lg font-medium transition-all ${activeTab === s.id ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="space-y-3">
              {currentTab.items.map((item, i) => (
                <motion.button key={i} onClick={() => setSelected(item)} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${selected.name === item.name ? 'border-indigo-400 bg-indigo-50' : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50'}`}>
                  <div className={`p-2 rounded-lg ${item.color}`}><item.icon className="h-5 w-5 text-white" /></div>
                  <div className="flex-1">
                    <p className={`font-semibold ${selected.name === item.name ? 'text-indigo-700' : 'text-slate-900'}`}>{item.name}</p>
                    <p className="text-xs text-slate-500">{item.industries.slice(0, 2).join(' · ')}</p>
                  </div>
                  <ChevronRight className={`h-4 w-4 ${selected.name === item.name ? 'text-indigo-500' : 'text-slate-300'}`} />
                </motion.button>
              ))}
            </div>

            {/* Detail panel */}
            {selected && (
              <motion.div key={selected.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 rounded-2xl ${selected.color}`}><selected.icon className="h-8 w-8 text-white" /></div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">{selected.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-2xl font-bold text-indigo-600">{selected.savings}</span>
                          <span className="text-sm text-slate-500">{selected.metric}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{selected.headline}</h3>
                    <p className="text-slate-600 mb-6">{selected.description}</p>

                    <div className="mb-6">
                      <p className="text-sm font-semibold text-slate-700 mb-3">Key Features</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {selected.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {selected.industries.map((ind, i) => (
                        <Badge key={i} className="bg-slate-100 text-slate-700">{ind}</Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Link to={createPageUrl('Register')}>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                          Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={createPageUrl('Contact')}>
                        <Button variant="outline">Request Demo</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Why Mi-Proc section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Organizations Choose Mi-Proc</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Designed to make complex procurement processes easy, consolidating all purchasing needs into one intelligent system.</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Cpu, label: 'AI-Driven' },
              { icon: BarChart3, label: 'Highly Customizable' },
              { icon: Zap, label: 'Quick Implementation' },
              { icon: Shield, label: 'SAMA Compliant' },
              { icon: TrendingDown, label: 'Cost Reduction' },
              { icon: Users, label: 'Dedicated CSM' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow text-center">
                  <CardContent className="p-5">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <item.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <p className="font-semibold text-sm text-slate-800">{item.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Slider */}
      <ServicesSlider />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Find Your Solution Today</h2>
          <p className="text-indigo-100 mb-8 text-lg">Talk to our procurement experts and discover how Mi-Proc fits your industry.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to={createPageUrl('Register')}><Button size="lg" className="bg-white text-indigo-700 hover:bg-white/90 font-semibold">Start Free Trial</Button></Link>
            <Link to={createPageUrl('Contact')}><Button size="lg" className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white hover:bg-white/20 hover:border-white shadow-lg">Talk to an Expert</Button></Link>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>&copy; 2026 MI Technologies. All rights reserved. Licensed by SAMA.</p>
      </footer>
    </div>
  );
}