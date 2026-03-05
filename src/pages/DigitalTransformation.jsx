import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  Layers, Workflow, Database, ArrowRight, CheckCircle2,
  Cpu, Globe, BarChart3, RefreshCw, Lock, Zap, GitMerge
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ServicesSlider from '@/components/ServicesSlider';

const values = [
  {
    number: 'Value 01',
    icon: Layers,
    title: 'Comprehensive Spend Digitization',
    gradient: 'from-violet-600 to-purple-700',
    description:
      'Digitize procurement processes for all spend categories — including indirect spend, direct spend, services procurement, and project-driven spend. Enhance control and visibility across the entire procurement lifecycle with Mi-Proc\'s unified digital platform.',
  },
  {
    number: 'Value 02',
    icon: Workflow,
    title: 'Flexible Workflows',
    gradient: 'from-teal-500 to-cyan-600',
    description:
      'Leverage Mi-Proc\'s powerful and flexible workflow engine to automate and optimize every procurement process. Customize workflows to meet your specific organizational needs, ensuring maximum efficiency, compliance, and governance across all departments.',
  },
  {
    number: 'Value 03',
    icon: Database,
    title: 'Unified Spend Management',
    gradient: 'from-indigo-600 to-blue-700',
    description:
      'Centralize and digitize all procurement processes across various spend categories with Mi-Proc\'s AI-driven platform. Achieve seamless integration and unified data management for improved efficiency, accuracy, and organization-wide spend intelligence.',
  },
];

const features = [
  {
    icon: Cpu,
    title: 'AI-Driven Insights',
    desc: 'Get real-time recommendations on best offers, top vendors, and savings opportunities powered by Mi-Proc\'s AI engine.',
  },
  {
    icon: Globe,
    title: 'End-to-End Digitization',
    desc: 'Replace paper-based processes with digital workflows across sourcing, purchasing, invoicing, and payments.',
  },
  {
    icon: GitMerge,
    title: 'ERP & System Integration',
    desc: 'Connect Mi-Proc with your existing ERP, accounting, and financial systems for seamless data flow and zero duplication.',
  },
  {
    icon: RefreshCw,
    title: 'Automated Process Orchestration',
    desc: 'Trigger workflows automatically based on events — approvals, deliveries, invoices, and budget thresholds.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics Dashboard',
    desc: 'Monitor KPIs, spending patterns, supplier performance, and savings in real time across the entire organization.',
  },
  {
    icon: Lock,
    title: 'Governance & Compliance',
    desc: 'Enforce procurement policies, audit every action, and stay compliant with ZATCA, SAMA, and internal controls.',
  },
];

const stats = [
  { value: '100%', label: 'Paperless procurement' },
  { value: '60%', label: 'Faster cycle times' },
  { value: '4x', label: 'ROI within first year' },
  { value: 'One', label: 'Unified platform for all spend' },
];

const transformationSteps = [
  { step: '01', title: 'Assess', desc: 'Evaluate your current procurement maturity and identify digitization opportunities.' },
  { step: '02', title: 'Configure', desc: 'Tailor workflows, approval chains, and categories to your organizational structure.' },
  { step: '03', title: 'Integrate', desc: 'Connect Mi-Proc with your ERP, finance systems, and supplier networks.' },
  { step: '04', title: 'Automate', desc: 'Go live with automated workflows, AI insights, and real-time dashboards.' },
];

export default function DigitalTransformation() {
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
            <Link to={createPageUrl('DigitalTransformation')} className="text-indigo-600">Digital Transformation</Link>
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
            <Badge className="bg-violet-500/20 text-violet-300 mb-4 uppercase tracking-wide">Digital Transformation</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Seamlessly{' '}
              <span className="text-violet-400">automate procurement processes</span>{' '}
              for maximum value.
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-lg">
              Mi-Proc digitizes your entire procurement lifecycle — eliminating manual effort, unifying spend data, and giving your organization the visibility needed to make smarter decisions faster.
            </p>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white">
                Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Right: AI Insights Mock UI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* Card 1: AI Insights */}
            <div className="bg-white rounded-2xl shadow-2xl p-5">
              <p className="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-violet-600" /> Mi-Proc AI Insights
              </p>
              <div className="flex flex-wrap gap-2">
                {['Best offer', 'Value for money', 'Compare offers', 'Know which vendor has best prices',
                  'Compare with frequent buyer', 'Top vendors with offer', 'Prioritize frequent vendors',
                  'Send reminder to pending'].map((tag, i) => (
                  <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium ${i === 0 ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Card 2: Auto-fill */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl shadow-xl p-5 text-white text-center">
              <p className="font-semibold mb-1">Use AI to autofill your RFQs & quotations</p>
              <p className="text-violet-200 text-sm">Say goodbye to manual data entry hassle.</p>
              <div className="mt-3 flex items-center justify-center gap-2 text-violet-200 text-xs">
                <span className="underline cursor-pointer">📎 Drag & drop document / Upload file</span>
              </div>
            </div>

            {/* Card 3: Recommendations */}
            <div className="bg-white rounded-2xl shadow-xl p-5">
              <p className="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-violet-600" /> Mi-Proc AI Recommendations
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                {[
                  'View few recommendations for verified suppliers',
                  'Show vendors with most recent transactions',
                  'Recommend vendors with value for money',
                  'Vendors with less return policy period',
                ].map((rec, i) => (
                  <div key={i} className={`p-2 rounded-lg ${i === 0 ? 'bg-violet-50 border border-violet-200 text-violet-700' : 'bg-slate-50'}`}>{rec}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-violet-600 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-violet-200 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Three Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="bg-violet-100 text-violet-700 mb-4">Core Benefits</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Three pillars of <span className="text-violet-600">Digital Transformation</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Mi-Proc's digital transformation approach is built around three core principles that drive measurable results across your entire organization.
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

      {/* Transformation Journey */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="bg-indigo-100 text-indigo-700 mb-4">Your Journey</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Digital Transformation Roadmap</h2>
            <p className="text-slate-600 max-w-xl mx-auto text-lg">Go from legacy processes to a fully digital procurement operation in four structured steps.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transformationSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-sm">{step.step}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="bg-teal-100 text-teal-700 mb-4">Platform Capabilities</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to transform procurement</h2>
            <p className="text-slate-600 max-w-xl mx-auto text-lg">
              A complete digital toolkit to replace manual processes with intelligent, automated workflows.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center mb-4">
                      <f.icon className="h-6 w-6 text-violet-600" />
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
      <section className="py-20 bg-gradient-to-br from-[#0f1729] to-violet-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Modernize procurement with Mi-Proc.
          </h2>
          <p className="text-violet-200 text-lg mb-8">
            Your customizable AI-driven solution — learn how our platform digitizes and automates your specific procurement demands, driving operational excellence.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold">Request a Demo</Button>
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