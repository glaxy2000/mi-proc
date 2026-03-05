import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import PublicNavbar from '@/components/PublicNavbar';
import ServicesSlider from '@/components/ServicesSlider';
import {
  ShieldCheck,
  Eye,
  Users,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Globe,
  Lock,
  TrendingDown,
  FileCheck,
} from 'lucide-react';

const values = [
  {
    number: '01',
    icon: Eye,
    title: 'Comprehensive Risk Visibility',
    description:
      'Leverage Mi-Proc\'s AI-driven platform to achieve a 360° view of supplier information and activity. Monitor and mitigate risks with timely, accurate insights across your entire supply chain.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    number: '02',
    icon: Users,
    title: 'Efficient Supplier Collaboration',
    description:
      'Enhance collaboration with suppliers through Mi-Proc\'s comprehensive platform. Improve supplier performance and reduce risk exposure by fostering transparent, data-driven relationships.',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    number: '03',
    icon: FileCheck,
    title: 'Unified Spend Management',
    description:
      'Streamline compliance processes with Mi-Proc\'s integrated tools. Automatically update supplier risk data and ensure adherence to global regulatory requirements, reducing the time and effort needed for manual compliance checks.',
    color: 'from-orange-500 to-red-500',
  },
];

const features = [
  { icon: ShieldCheck, title: 'Real-Time Risk Monitoring', desc: 'Continuous monitoring of supplier health, financial stability, and compliance status with automated alerts.' },
  { icon: AlertTriangle, title: 'Risk Scoring & Categorisation', desc: 'AI-powered risk scores for every supplier, enabling you to prioritise and act on the most critical risks first.' },
  { icon: Globe, title: 'Regulatory Compliance', desc: 'Stay compliant with global and regional regulations. Automated checks against SAMA, GDPR, ISO, and more.' },
  { icon: BarChart3, title: 'Performance Analytics', desc: 'Deep-dive analytics on supplier performance trends, delivery reliability, and risk exposure over time.' },
  { icon: Lock, title: 'Data Security & Audit Trails', desc: 'Full audit trails and role-based access controls ensure your supplier data is always secure and traceable.' },
  { icon: TrendingDown, title: 'Cost Risk Reduction', desc: 'Identify financial and operational risks early, preventing costly disruptions to your supply chain.' },
];

const stats = [
  { value: '60%', label: 'Reduction in supplier incidents' },
  { value: '3x', label: 'Faster risk assessment' },
  { value: '100%', label: 'Regulatory compliance coverage' },
  { value: '45%', label: 'Lower compliance costs' },
];

export default function RiskManagement() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar activePage="RiskManagement" />

      {/* Hero */}
      <section className="relative bg-slate-900 overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 opacity-90" />
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-bold text-teal-400 uppercase tracking-widest mb-4">Supplier Risk Management</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Drive <span className="text-teal-400">compliance</span> and{' '}
              <span className="text-teal-400">reduce supplier risks</span> with real-time insights.
            </h1>
            <p className="text-slate-300 text-lg mb-8">
              Mi-Proc gives you a unified view of supplier risk across your entire procurement ecosystem — so you can act before issues escalate.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={createPageUrl('Contact')}>
                <button className="px-6 py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-white font-semibold transition-colors flex items-center gap-2">
                  Request a Demo <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link to={createPageUrl('Solutions')}>
                <button className="px-6 py-3 rounded-lg border border-slate-500 text-slate-300 hover:border-slate-300 hover:text-white font-semibold transition-colors">
                  View All Solutions
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white font-semibold">Supplier Risk Dashboard</p>
                <span className="text-xs bg-teal-500/20 text-teal-400 px-2 py-1 rounded-full">Live</span>
              </div>
              {[
                { name: 'Al Amin Supplies Co.', risk: 'Low', score: 92, color: 'bg-green-500' },
                { name: 'Gulf Tech Solutions', risk: 'Medium', score: 67, color: 'bg-yellow-500' },
                { name: 'Eastern Industrial Ltd', risk: 'High', score: 34, color: 'bg-red-500' },
                { name: 'Riyadh Logistics Group', risk: 'Low', score: 88, color: 'bg-green-500' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-700/50 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-white text-sm font-medium">{s.name}</p>
                    <p className={`text-xs mt-0.5 ${s.risk === 'High' ? 'text-red-400' : s.risk === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                      {s.risk} Risk
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{s.score}</p>
                    <div className="w-20 h-1.5 bg-slate-600 rounded-full mt-1">
                      <div className={`h-1.5 rounded-full ${s.color}`} style={{ width: `${s.score}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-indigo-600 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl font-bold text-white">{s.value}</p>
              <p className="text-indigo-200 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-teal-500 uppercase tracking-widest mb-3">Core Value Pillars</p>
            <h2 className="text-3xl font-bold text-slate-900">Why Mi-Proc for Supplier Risk?</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow p-8">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-5`}>
                  <v.icon className="h-7 w-7 text-white" />
                </div>
                <span className="text-4xl font-black text-slate-100 select-none">{v.number}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">{v.title}</h3>
                <p className="text-slate-600 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-teal-500 uppercase tracking-widest mb-3">Platform Capabilities</p>
            <h2 className="text-3xl font-bold text-slate-900">Everything You Need to Manage Supplier Risk</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{f.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Slider */}
      <ServicesSlider />

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <CheckCircle2 className="h-4 w-4" /> No risk. Get started today.
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Ready to take control of your supplier risk?
            </h2>
            <p className="text-slate-600 mb-8">
              Join organisations already using Mi-Proc to protect their supply chain and achieve full compliance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={createPageUrl('Contact')}>
                <button className="px-8 py-3 rounded-lg bg-slate-900 hover:bg-slate-700 text-white font-semibold transition-colors flex items-center gap-2">
                  Request a Demo <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link to={createPageUrl('Register')}>
                <button className="px-8 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold transition-colors">
                  Get Started Free
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>&copy; 2026 MI Technologies. All rights reserved. Licensed by SAMA.</p>
      </footer>
    </div>
  );
}