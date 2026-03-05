import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  FileText, Package, DollarSign, ArrowRight, CheckCircle2,
  ClipboardList, Receipt, Wallet, BarChart3, ShoppingCart,
  Users, Zap, Shield, Building2, ChevronRight, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const products = [
  {
    id: 'source-to-pay',
    category: 'Source-to-Pay',
    headline: 'Faster buying and smarter spend in one intuitive platform',
    description: 'Transform your entire procurement cycle – from purchase requests to payments into one seamless, intelligent workflow. Automated sourcing, smarter purchase decisions and full, real-time insights.',
    color: 'from-indigo-600 to-purple-600',
    lightColor: 'bg-indigo-50',
    accentColor: 'text-indigo-600',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    icon: FileText,
    benefits: [
      { icon: DollarSign, title: 'Hard savings, zero trade-offs', desc: 'Save 5% or more on every sourced purchase. Advanced e-sourcing, market benchmarks, and automated spend controls.' },
      { icon: Zap, title: 'Cut cycle times by 4x', desc: 'Cut request-to-PO lead time by up to 75%. Self-service requisitions flow through auto-approvals instantly.' },
      { icon: BarChart3, title: 'Real-time spend visibility', desc: 'Live dashboards track every request, contract, and invoice, exposing 100% of spend in real time.' },
      { icon: CheckCircle2, title: 'Adopt with ease', desc: 'Go live in days and gain value immediately. No heavy IT lift required.' },
    ],
    modules: [
      {
        name: 'Core Sourcing',
        icon: ClipboardList,
        color: 'bg-indigo-500',
        features: [
          { name: 'Purchase Requests', desc: 'Structured forms guide requesters to the right category, budget, and supplier, cutting errors while automated checks speed up approvals.', href: 'PurchaseRequests' },
          { name: 'E-Sourcing / RFQ', desc: 'Run RFQs, RFPs, and RFIs in one place. Compare bids side-by-side, communicate with vendors and let automated scoring uncover the best total cost.', href: 'RFQList' },
          { name: 'POs & Awards', desc: 'Create purchase orders automatically from approved requests. Each order stays linked to budgets and supplier records for full audit traceability.', href: 'Orders' },
          { name: 'Vendor Portal', desc: 'Centralize supplier data, performance insights, and onboarding for smarter sourcing and long-term, reliable partnerships.', href: 'Suppliers' },
        ]
      },
      {
        name: 'Purchase',
        icon: Package,
        color: 'bg-teal-500',
        features: [
          { name: 'GRN / Receiving', desc: 'Simple goods-receipt screens confirm quantity and quality, instantly updating downstream matching and inventory steps to prevent over-billing.', href: 'GoodsReceipt' },
          { name: 'Billing Management', desc: 'Automate three-way matching between invoices, POs, and receipts to eliminate errors and ensure compliance.', href: 'InvoiceManagement' },
          { name: 'Payments', desc: 'Take full control of the invoicing cycle with end-to-end visibility, built-in compliance checks, and seamless ERP alignment.', href: 'Wallet' },
        ]
      },
      {
        name: 'Finance',
        icon: DollarSign,
        color: 'bg-emerald-500',
        features: [
          { name: 'Budget Management', desc: 'Live dashboards compare committed, invoiced, and remaining funds in real time, letting budget owners make informed decisions before overruns hit.', href: 'BudgetManagement' },
          { name: 'Expense Accounts', desc: 'Get actionable insights into spending patterns, supplier performance, and savings opportunities, backed by real-time data.', href: 'Analytics' },
        ]
      },
    ]
  },
  {
    id: 'b2b-ecommerce',
    category: 'B2B E-Commerce Platform',
    headline: 'Empower your B2B business with a white-labelled procurement platform',
    description: 'Everything in Source-to-Pay, plus white-labelling, client management, commissions, and advanced approval workflows designed for B2B complexity.',
    color: 'from-teal-600 to-emerald-600',
    lightColor: 'bg-teal-50',
    accentColor: 'text-teal-600',
    badgeColor: 'bg-teal-100 text-teal-700',
    icon: ShoppingCart,
    benefits: [
      { icon: Building2, title: 'White Labelled', desc: 'Customise branding to match your organisation\'s identity. Tailored emails, your logo and domain.' },
      { icon: Users, title: 'Client Management', desc: 'Centralized system or portal for your client\'s information. Access control and interaction tracking.' },
      { icon: Shield, title: 'Approval Workflow', desc: 'Customisable multi-level workflow. Add remarks to approvals, rejections and multiple approvers.' },
      { icon: DollarSign, title: 'Commissions & Mark-ups', desc: 'Set mark-ups as fixed or percentages by client, category, or catalog. Prioritize your mark-up rules.' },
    ],
    modules: [
      {
        name: 'Platform Features',
        icon: Star,
        color: 'bg-teal-500',
        features: [
          { name: 'White Labelled Portal', desc: 'Customise branding, domain, and emails to fully match your organisation\'s identity.', href: 'Dashboard' },
          { name: 'Client Management', desc: 'Centralized portal for client information, access control, and interaction tracking.', href: 'Suppliers' },
          { name: 'Supplier Management', desc: 'Invite, authorize, and control vendors with full interaction history.', href: 'Suppliers' },
          { name: 'Commissions & Mark-ups', desc: 'Set flexible mark-up rules by client, category, or catalog with priority ordering.', href: 'Analytics' },
          { name: 'Approval Workflow', desc: 'Customisable multi-level approvals with remarks, rejections, and escalation rules.', href: 'PurchaseRequests' },
          { name: 'RFQ Management', desc: 'Source from multiple vendors, control RFQ parameters, negotiate and compare offers.', href: 'RFQList' },
        ]
      }
    ]
  }
];

export default function Products() {
  const [activeProduct, setActiveProduct] = useState('source-to-pay');
  const product = products.find(p => p.id === activeProduct);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={createPageUrl('Home')} className="flex items-center gap-2">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698475e8a83c0e60c7a78100/def2d3f5f_MI-logo-color.png" alt="MI Technologies" className="h-8" />
            <span className="font-bold text-slate-900">Mi-Proc</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <Link to={createPageUrl('Home')} className="text-slate-600 hover:text-slate-900">Home</Link>
            <Link to={createPageUrl('Products')} className="text-indigo-600">Products</Link>
            <Link to={createPageUrl('Solutions')} className="text-slate-600 hover:text-slate-900">Solutions</Link>
            <span className="text-slate-600 cursor-pointer hover:text-slate-900">How It Works</span>
            <span className="text-slate-600 cursor-pointer hover:text-slate-900">Features</span>
            <span className="text-slate-600 cursor-pointer hover:text-slate-900">Security</span>
            <Link to={createPageUrl('Contact')} className="text-slate-600 hover:text-slate-900">Contact</Link>
          </div>
          <div className="flex gap-2">
            <Link to={createPageUrl('Signin')}><Button variant="outline" size="sm">Sign In</Button></Link>
            <Link to={createPageUrl('Contact')}><Button variant="outline" size="sm">Request a Demo</Button></Link>
            <Link to={createPageUrl('Register')}><Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#5b4fb8] via-[#4a8fb9] to-[#2bb3b3] py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-white/20 text-white mb-4">Mi-Proc Products</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">One Intelligent Platform for<br /><span className="text-teal-300">Modern Procurement</span></h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              From sourcing to payment, our AI-driven platform delivers a streamlined, efficient procurement process, empowering enterprises to capture and maximize value seamlessly.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              {products.map(p => (
                <button key={p.id} onClick={() => setActiveProduct(p.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeProduct === p.id ? 'bg-white text-indigo-700 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'}`}>
                  {p.category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div key={activeProduct} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
            <Badge className={product.badgeColor + ' mb-3'}>{product.category}</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{product.headline}</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">{product.description}</p>
          </motion.div>

          {/* Benefits */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {product.benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${product.color}`}>
                      <b.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{b.title}</h3>
                    <p className="text-sm text-slate-600">{b.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Modules */}
          {product.modules.map((mod, mi) => (
            <div key={mi} className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className={`p-2 rounded-xl ${mod.color}`}><mod.icon className="h-5 w-5 text-white" /></div>
                <h3 className="text-2xl font-bold text-slate-900">{mod.name}</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mod.features.map((feat, fi) => (
                  <motion.div key={fi} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: fi * 0.1 }}>
                    <Card className="border-0 shadow-md hover:shadow-xl transition-all group cursor-pointer h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className={`font-semibold text-slate-900 group-hover:${product.accentColor} transition-colors`}>{feat.name}</h4>
                          <ChevronRight className={`h-4 w-4 text-slate-300 group-hover:${product.accentColor} transition-colors flex-shrink-0`} />
                        </div>
                        <p className="text-sm text-slate-600 mb-4">{feat.desc}</p>
                        <Link to={createPageUrl(feat.href)}>
                          <span className={`text-xs font-semibold ${product.accentColor} flex items-center gap-1 hover:underline`}>
                            Explore feature <ArrowRight className="h-3 w-3" />
                          </span>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 bg-gradient-to-r ${product.color}`}>
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to modernize your procurement?</h2>
          <p className="text-white/80 mb-8 text-lg">Join thousands of enterprises using Mi-Proc to drive efficiency and real-time budget visibility.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to={createPageUrl('Register')}><Button size="lg" className="bg-white text-indigo-700 hover:bg-white/90 font-semibold">Get Started Free</Button></Link>
            <Link to={createPageUrl('Contact')}><Button size="lg" className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white hover:bg-white/20 hover:border-white shadow-lg">Request a Demo</Button></Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>&copy; 2026 MI Technologies. All rights reserved. Licensed by SAMA.</p>
      </footer>
    </div>
  );
}