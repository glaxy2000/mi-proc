import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  FileText, Zap, BarChart3, CheckCircle2, ArrowRight,
  RefreshCw, Bell, Shield, Clock, TrendingDown, Users, Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ServicesSlider from '@/components/ServicesSlider';

const values = [
  {
    number: 'Value 01',
    icon: FileText,
    title: 'Streamlined Invoice Processing',
    gradient: 'from-indigo-600 to-purple-700',
    description:
      'Leverage Mi-Proc\'s touchless invoicing with 2-way and 3-way matching and built-in approval workflows. Reduce manual effort and ensure accuracy, enabling your team to capitalize on early payment discounts and strengthen supplier relationships.',
  },
  {
    number: 'Value 02',
    icon: Zap,
    title: 'Enhanced Efficiency',
    gradient: 'from-teal-500 to-emerald-600',
    description:
      'Transform your procurement team with Mi-Proc\'s market-leading automation. Save time and money by automating purchase requests, RFQ processing, and invoice workflows — freeing up your team to focus on strategic, value-adding tasks.',
  },
  {
    number: 'Value 03',
    icon: BarChart3,
    title: 'Real-Time Financial Visibility',
    gradient: 'from-blue-600 to-cyan-600',
    description:
      'Gain full visibility into cash movements with Mi-Proc\'s automation suite. Streamline accruals, optimize cash flow, and take control of spend with real-time insights and live budget dashboards across your entire organization.',
  },
];

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Invoice Capture',
    desc: 'Automatically extract and validate invoice data using AI — no manual entry required.',
  },
  {
    icon: RefreshCw,
    title: '2-Way & 3-Way Matching',
    desc: 'Auto-match invoices against purchase orders and goods receipts to eliminate errors and prevent overpayment.',
  },
  {
    icon: CheckCircle2,
    title: 'Automated Approval Workflows',
    desc: 'Route approvals to the right stakeholders automatically based on spend thresholds, categories, or supplier type.',
  },
  {
    icon: Bell,
    title: 'Smart Notifications & Escalations',
    desc: 'Instantly alert approvers and auto-escalate overdue items so nothing falls through the cracks.',
  },
  {
    icon: Shield,
    title: 'Compliance & Audit Trail',
    desc: 'Every automated action is logged with full audit trails, ensuring ZATCA and SAMA compliance at all times.',
  },
  {
    icon: Clock,
    title: 'Early Payment Discounts',
    desc: 'Accelerate invoice cycles to capture early payment discounts and strengthen supplier relationships.',
  },
];

const stats = [
  { value: '80%', label: 'Reduction in manual data entry' },
  { value: '4x', label: 'Faster invoice processing' },
  { value: '99%', label: 'Matching accuracy rate' },
  { value: 'SAR 0', label: 'Manual errors cost' },
];

export default function Automation() {
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
            <Link to={createPageUrl('Products')} className="text-slate-600 hover:text-slate-900">Products</Link>
            <Link to={createPageUrl('Solutions')} className="text-slate-600 hover:text-slate-900">Solutions</Link>
            <Link to={createPageUrl('ProcurementServices')} className="text-slate-600 hover:text-slate-900">Procurement Services</Link>
            <Link to={createPageUrl('Automation')} className="text-indigo-600">Automation</Link>
            <Link to={createPageUrl('DigitalTransformation')} className="text-slate-600 hover:text-slate-900">Digital Transformation</Link>
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
      <section className="bg-[#0f1729] min-h-[580px] flex items-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />
        <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="bg-indigo-500/20 text-indigo-300 mb-4 uppercase tracking-wide">AP Automation</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Revolutionize{' '}
              <span className="text-indigo-400">invoice processing</span>{' '}
              with AI-Driven automation.
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-lg">
              Eliminate manual procurement tasks with Mi-Proc's intelligent automation engine — from purchase requests to payment, every step runs faster, smarter, and with zero errors.
            </p>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Right: Mock invoice UI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/10">
              <div className="bg-indigo-600 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-white" />
                  <span className="text-white font-semibold text-sm">Invoice #INV-2024-0892</span>
                </div>
                <Badge className="bg-green-400/20 text-green-300 text-xs">Auto-Matched ✓</Badge>
              </div>
              <div className="p-5 text-xs text-slate-700 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 mb-1">Invoice Date</p>
                    <p className="font-medium">Jan 15, 2026</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1">Due Date</p>
                    <p className="font-medium">Feb 15, 2026</p>
                  </div>
                </div>
                <table className="w-full text-xs mt-3">
                  <thead>
                    <tr className="border-b text-slate-400">
                      <th className="text-left pb-2">Item</th>
                      <th className="text-right pb-2">Qty</th>
                      <th className="text-right pb-2">Unit Price</th>
                      <th className="text-right pb-2">Total</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-1">
                    {[
                      { name: 'Office Chairs', qty: 10, price: 'SAR 850', total: 'SAR 8,500' },
                      { name: 'Laptop Stands', qty: 5, price: 'SAR 220', total: 'SAR 1,100' },
                      { name: 'Desk Organizers', qty: 20, price: 'SAR 75', total: 'SAR 1,500' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-slate-100">
                        <td className="py-2">{row.name}</td>
                        <td className="py-2 text-right">{row.qty}</td>
                        <td className="py-2 text-right">{row.price}</td>
                        <td className="py-2 text-right font-medium">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between pt-2 font-semibold text-slate-900">
                  <span>Total Amount</span>
                  <span>SAR 11,100</span>
                </div>
                <div className="flex items-center gap-2 mt-3 p-2 bg-green-50 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-green-700 text-xs">3-way match verified — ready for payment</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-indigo-600 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-indigo-200 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Three Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="bg-indigo-100 text-indigo-700 mb-4">Core Benefits</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Three pillars of <span className="text-indigo-600">AP Automation Excellence</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Mi-Proc's automation is built around three core principles that drive measurable results for your finance and procurement teams.
            </p>
          </div>
          <div className="space-y-10">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl`}
              >
                <div className={`bg-gradient-to-br ${val.gradient} p-10 lg:p-14 flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <span className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">{val.number}</span>
                  <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mb-5">
                    <val.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{val.title}</h3>
                </div>
                <div className={`bg-slate-50 p-10 lg:p-14 flex items-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="text-slate-600 text-lg leading-relaxed">{val.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="bg-teal-100 text-teal-700 mb-4">Platform Features</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to automate AP</h2>
            <p className="text-slate-600 max-w-xl mx-auto text-lg">
              Built-in automation tools that reduce cycle times, eliminate errors, and keep your team focused on what matters.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                      <f.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-600">{f.desc}</p>
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
      <section className="py-20 bg-gradient-to-br from-[#0f1729] to-indigo-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Modernize procurement with Mi-Proc.
          </h2>
          <p className="text-indigo-200 text-lg mb-8">
            Your customizable AI-driven automation solution — learn how our platform eliminates manual work and drives operational excellence.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">Request a Demo</Button>
            </Link>
            <Link to={createPageUrl('Register')}>
              <Button size="lg" className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white hover:bg-white/20 hover:border-white shadow-lg">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>&copy; 2026 MI Technologies. All rights reserved. Licensed by SAMA.</p>
      </footer>
    </div>
  );
}