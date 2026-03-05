import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  FileText, Settings, Users, CheckCircle2, ArrowRight,
  ClipboardList, Package, Receipt, BarChart3, Shield,
  Zap, DollarSign, Building2, Factory, Stethoscope,
  ShoppingCart, Plus, TrendingDown, Clock, Lock, Wallet,
  MessageSquare, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ServicesSlider from '@/components/ServicesSlider';

const modules = [
  { icon: ClipboardList, label: 'Purchase Requisitions', color: 'bg-teal-100 text-teal-700' },
  { icon: Settings, label: 'Customizable Approval Workflow', color: 'bg-purple-100 text-purple-700' },
  { icon: FileText, label: 'Sourcing (RFQ/RFP/RFI)', color: 'bg-blue-100 text-blue-700' },
  { icon: Package, label: 'Catalog Management', color: 'bg-amber-100 text-amber-700' },
  { icon: ShoppingCart, label: 'Purchase Orders', color: 'bg-pink-100 text-pink-700' },
  { icon: CheckCircle2, label: 'Good Received Note (GRN)', color: 'bg-green-100 text-green-700' },
  { icon: Receipt, label: 'Bill & Payment', color: 'bg-orange-100 text-orange-700' },
  { icon: BarChart3, label: 'Reports & Analysis', color: 'bg-cyan-100 text-cyan-700' },
  { icon: Users, label: 'Vendor Management', color: 'bg-rose-100 text-rose-700' },
  { icon: Lock, label: 'Contract Management', color: 'bg-indigo-100 text-indigo-700' },
  { icon: Wallet, label: 'Budget Management', color: 'bg-emerald-100 text-emerald-700' },
  { icon: Plus, label: 'And More...', color: 'bg-slate-100 text-slate-500', isMore: true },
];

const values = [
  {
    number: 'Value 01',
    icon: Shield,
    title: 'Professional Procurement Support',
    description: 'Mi-Proc provides specialised procurement expertise that helps organizations streamline purchasing operations and improve overall efficiency. By aligning procurement practices with business goals, our services ensure better control, smarter sourcing decisions, and stronger operational performance.',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    number: 'Value 02',
    icon: Settings,
    title: 'Tailored Procurement Solutions',
    description: 'With Mi-Proc, organizations can implement procurement strategies that are customized to their specific operational requirements. Our flexible solutions are designed to support unique workflows, enabling businesses to optimize their procurement processes while achieving strategic objectives.',
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    number: 'Value 03',
    icon: Users,
    title: 'Advanced Supplier Relationship Management',
    description: "Strengthen supplier collaboration and performance with Mi-Proc's comprehensive supplier management capabilities. Our platform enables better communication, transparency, and performance tracking, ensuring reliable deliveries and high-quality results from trusted suppliers.",
    gradient: 'from-purple-500 to-pink-600',
  },
];

const stats = [
  { value: '13.5%', label: 'Average cost savings' },
  { value: '75%', label: 'Cycle time reduction' },
  { value: '30K+', label: 'Target platform users' },
  { value: '99.99%', label: 'Platform uptime SLA' },
];

const testimonials = [
  {
    quote: 'Mi-Proc transformed how we handle procurement. The RFQ module alone saved us weeks of back-and-forth with suppliers.',
    name: 'Ahmad Al-Otaibi',
    role: 'Procurement Manager, Construction Firm',
    rating: 5,
  },
  {
    quote: 'The supplier management features gave us full visibility into performance. Our on-time delivery rate improved significantly.',
    name: 'Sara Al-Zahrani',
    role: 'Operations Director, Healthcare Group',
    rating: 5,
  },
  {
    quote: 'Budget controls and 3-way invoice matching eliminated overspending. Our finance team loves the dashboard.',
    name: 'Khalid Al-Rasheed',
    role: 'CFO, Manufacturing Company',
    rating: 5,
  },
];

export default function ProcurementServices() {
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
            <Link to={createPageUrl('ProcurementServices')} className="text-indigo-600">Procurement Services</Link>
            <Link to={createPageUrl('Contact')} className="text-slate-600 hover:text-slate-900">Contact</Link>
          </div>
          <div className="flex gap-2">
            <Link to={createPageUrl('Signin')}><Button variant="outline" size="sm">Sign In</Button></Link>
            <Link to={createPageUrl('Contact')}><Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Request a Demo</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#0f1729] min-h-[580px] flex items-center overflow-hidden relative">
        {/* Background grid dots */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="bg-teal-500/20 text-teal-300 mb-4 uppercase tracking-wide">Procurement Services</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Enhance procurement outcomes with{' '}
              <span className="text-teal-400">AI-Driven solutions.</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-lg">
              Leverage Mi-Proc's expert procurement services to enhance operational efficiency. Our solutions address specific organizational needs, driving better outcomes.
            </p>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
                Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Right: Module Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-3"
          >
            {modules.map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className={`rounded-2xl p-4 flex flex-col items-start gap-2 ${
                  mod.isMore
                    ? 'border-2 border-dashed border-teal-500/40 bg-transparent flex items-center justify-center'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 transition-colors'
                }`}
              >
                {mod.isMore ? (
                  <div className="flex flex-col items-center justify-center w-full h-full gap-1">
                    <Plus className="h-7 w-7 text-teal-400" />
                    <span className="text-teal-300 text-xs font-semibold text-center">And More</span>
                  </div>
                ) : (
                  <>
                    <div className={`p-2 rounded-xl ${mod.color}`}>
                      <mod.icon className="h-5 w-5" />
                    </div>
                    <p className="text-white text-xs font-medium leading-snug">{mod.label}</p>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
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

      {/* Values / Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="bg-indigo-100 text-indigo-700 mb-4">What We Offer</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Three Pillars of <span className="text-indigo-600">Procurement Excellence</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our procurement services are built around three core principles that drive measurable results for your organization.
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
                className={`grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Gradient panel */}
                <div className={`bg-gradient-to-br ${val.gradient} p-10 lg:p-14 flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <span className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">{val.number}</span>
                  <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mb-5">
                    <val.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{val.title}</h3>
                </div>
                {/* Description panel */}
                <div className={`bg-slate-50 p-10 lg:p-14 flex items-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="text-slate-600 text-lg leading-relaxed">{val.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Slider */}
      <ServicesSlider />

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted by Organizations Across Saudi Arabia</h2>
            <p className="text-slate-600 max-w-xl mx-auto">See how Mi-Proc has transformed procurement for companies like yours.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, si) => (
                        <Star key={si} className="h-4 w-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-700 italic mb-5 leading-relaxed">"{t.quote}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-slate-900">{t.name}</p>
                      <p className="text-sm text-slate-500">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0f1729] to-indigo-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Modernize procurement with Mi-Proc.
          </h2>
          <p className="text-indigo-200 text-lg mb-8">
            Your customizable AI-driven solution — learn how our platform uses AI to understand and meet your specific procurement demands, driving operational excellence.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold">Request a Demo</Button>
            </Link>
            <Link to={createPageUrl('Signin')}>
              <Button size="lg" className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white hover:bg-white/20 hover:border-white shadow-lg">Sign In</Button>
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