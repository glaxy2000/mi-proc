import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  TrendingDown, Eye, Users, ArrowRight, CheckCircle2,
  DollarSign, BarChart3, ShoppingCart, Zap, Shield, PieChart, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ServicesSlider from '@/components/ServicesSlider';

const values = [
  {
    number: 'Value 01',
    icon: DollarSign,
    title: 'Comprehensive Cost Management',
    gradient: 'from-emerald-600 to-teal-700',
    description:
      "Implement Mi-Proc's integrated Source-to-Pay suite to minimize maverick spending, secure early payment discounts, and optimize stock replacement strategies. Streamline procurement processes for maximum efficiency and savings.",
  },
  {
    number: 'Value 02',
    icon: Eye,
    title: 'Insightful Spend Visibility',
    gradient: 'from-indigo-600 to-blue-700',
    description:
      "Gain complete visibility into all procurement expenses with Mi-Proc's AI-driven platform. Access real-time insights across all spend categories, enabling better cost management and strategic decision-making.",
  },
  {
    number: 'Value 03',
    icon: Users,
    title: 'Profitable Supplier Relationships',
    gradient: 'from-violet-600 to-purple-700',
    description:
      "Build strong, cost-effective relationships with reliable suppliers through Mi-Proc's Supplier Management solutions. Identify economical suppliers that meet your criteria, reducing both short-term and long-term costs.",
  },
];

const features = [
  {
    icon: TrendingDown,
    title: 'Reduce Maverick Spending',
    desc: 'Enforce purchasing policies and channel all spend through approved workflows, eliminating off-contract buying.',
  },
  {
    icon: Zap,
    title: 'Early Payment Discounts',
    desc: 'Automate payment scheduling to capture early-pay discounts and optimize cash flow with supplier terms.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Spend Analytics',
    desc: 'Monitor spending patterns, budget consumption, and savings opportunities live across all categories and departments.',
  },
  {
    icon: ShoppingCart,
    title: 'Competitive Sourcing',
    desc: 'Run multi-supplier RFQs and reverse auctions to drive competitive pricing and secure the best total cost of ownership.',
  },
  {
    icon: PieChart,
    title: 'Budget Control & Visibility',
    desc: 'Compare committed, invoiced, and remaining funds in real time so budget owners can act before overruns occur.',
  },
  {
    icon: RefreshCw,
    title: 'Automated 3-Way Matching',
    desc: 'Eliminate billing errors and overpayments with automatic matching of invoices, purchase orders, and goods receipts.',
  },
];

const stats = [
  { value: '13.5%', label: 'Average cost savings' },
  { value: '25%', label: 'Reduction in maverick spend' },
  { value: '3x', label: 'Faster supplier sourcing' },
  { value: '100%', label: 'Spend visibility' },
];

export default function CostOptimisation() {
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
            <Link to={createPageUrl('Automation')} className="text-slate-600 hover:text-slate-900">Automation</Link>
            <Link to={createPageUrl('DigitalTransformation')} className="text-slate-600 hover:text-slate-900">Digital Transformation</Link>
            <Link to={createPageUrl('CostOptimisation')} className="text-emerald-600">Cost Optimisation</Link>
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
      <section className="bg-[#0b1f1a] min-h-[540px] flex items-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />
        <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="bg-emerald-500/20 text-emerald-300 mb-4 uppercase tracking-wide">Cost Optimisation</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Unlock cost efficiency with{' '}
              <span className="text-emerald-400">AI-driven procurement solutions.</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-lg">
              Mi-Proc helps organizations minimize maverick spending, increase spend visibility, and build profitable supplier relationships — all within one intelligent platform.
            </p>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Right: Mock Cost Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <p className="text-xs font-semibold text-slate-500 mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-emerald-600" /> Spend Overview — Q1 2026
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'Total Spend', value: 'SAR 4.2M', change: '-13.5%', up: false },
                  { label: 'Budget Remaining', value: 'SAR 1.8M', change: '+8%', up: true },
                  { label: 'Savings Captured', value: 'SAR 580K', change: '+22%', up: true },
                  { label: 'Maverick Spend', value: '3.1%', change: '-18%', up: false },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-3">
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <p className="text-lg font-bold text-slate-900">{item.value}</p>
                    <span className={`text-xs font-semibold ${item.up ? 'text-emerald-600' : 'text-emerald-600'}`}>{item.change} vs last Q</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  { category: 'IT & Hardware', pct: 72, color: 'bg-indigo-500' },
                  { category: 'Professional Services', pct: 55, color: 'bg-emerald-500' },
                  { category: 'Office Supplies', pct: 88, color: 'bg-teal-500' },
                  { category: 'Logistics', pct: 43, color: 'bg-violet-500' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>{item.category}</span><span>{item.pct}% of budget</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full">
                      <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-emerald-600 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-emerald-200 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Three Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="bg-emerald-100 text-emerald-700 mb-4">Core Benefits</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Three pillars of <span className="text-emerald-600">Cost Optimisation</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Mi-Proc's cost optimisation approach is built around three principles that deliver measurable savings across your entire procurement operation.
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
                className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl"
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
            <Badge className="bg-teal-100 text-teal-700 mb-4">Platform Capabilities</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to cut costs intelligently</h2>
            <p className="text-slate-600 max-w-xl mx-auto text-lg">
              A complete toolkit to drive savings, enforce policy, and gain full visibility across all spend categories.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                      <f.icon className="h-6 w-6 text-emerald-600" />
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
      <section className="py-20 bg-gradient-to-br from-[#0b1f1a] to-emerald-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Modernize procurement with Mi-Proc.
          </h2>
          <p className="text-emerald-200 text-lg mb-8">
            Your customizable AI-driven solution — learn how our platform drives cost efficiency and strategic savings across your procurement operation.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">Request a Demo</Button>
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