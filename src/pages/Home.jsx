import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  TrendingDown, 
  Building2, 
  Factory, 
  Stethoscope, 
  ShoppingCart,
  CheckCircle2,
  Users,
  DollarSign,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: 'Blind RFQs & Matching',
      description: 'AI-driven anonymous sourcing to prevent bias and ensure fair pricing.',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      icon: Zap,
      title: 'Instant Settlements',
      description: 'Real-time transfers improving cash flow velocity for all parties.',
      color: 'bg-teal-100 text-teal-600'
    },
    {
      icon: TrendingDown,
      title: 'Cost Reduction',
      description: 'Lower payment & transaction costs by 20-25%.',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const sectors = [
    { icon: Building2, name: 'Construction', savings: '15-25%' },
    { icon: Factory, name: 'Manufacturing', savings: '20%' },
    { icon: Stethoscope, name: 'Healthcare', savings: '10-20%' },
    { icon: ShoppingCart, name: 'Trading & Retail', savings: '15-25%' }
  ];

  const stats = [
    { value: '2.0M+', label: 'Active SMEs in KSA', icon: Users },
    { value: '~300B', label: 'SAR B2B Procurement', icon: DollarSign },
    { value: '30-40%', label: 'Faster Procurement', icon: Clock },
    { value: '<1%', label: 'Transaction Fees', icon: TrendingDown }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30 mb-6">
                MI TECHNOLOGIES
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Mi-Proc Supply
                <span className="block text-teal-400">Aggregator Platform</span>
              </h1>
              <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                with Integrated B2B Digital Wallet
              </p>
              <p className="text-indigo-200 mb-8 max-w-lg">
                Revolutionizing SME B2B procurement and payments in Saudi Arabia by creating a trusted, end-to-end digital ecosystem.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to={createPageUrl('Dashboard')}>
                  <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
                    View Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to={createPageUrl('CreateRFQ')}>
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90 font-semibold">
                    Create RFQ
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">mi</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">Mi Technologies</p>
                      <p className="text-indigo-200 text-sm">Strategy Office • January 2026</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {['Blind RFQ System', 'Integrated Escrow', 'SAMA Compliance', 'Instant Settlement'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-white">
                        <CheckCircle2 className="h-5 w-5 text-teal-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white shadow-xl border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
                        <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                      </div>
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <stat.icon className="h-5 w-5 text-indigo-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-teal-100 text-teal-700 mb-4">THE PRODUCT</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              A unified platform combining supply aggregation
              <span className="text-indigo-600"> with embedded finance</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Outcomes */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-indigo-100 text-indigo-700 mb-4">TARGET OUTCOMES</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">
                Delivering measurable business impact
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm">
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Efficiency</p>
                    <p className="text-sm text-slate-600">Faster procurement cycles</p>
                  </div>
                  <div className="text-4xl font-bold text-teal-500">30-40%↓</div>
                </div>
                
                <div className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm">
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Cost Reduction</p>
                    <p className="text-sm text-slate-600">Lower payment & transaction costs</p>
                  </div>
                  <div className="text-4xl font-bold text-teal-500">20-25%↓</div>
                </div>
                
                <div className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm">
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Trust & Cash Flow</p>
                    <p className="text-sm text-slate-600">Settlements via Escrow</p>
                  </div>
                  <div className="text-4xl font-bold text-indigo-600">Instant⚡</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {sectors.map((sector, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <sector.icon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-1">{sector.name}</h4>
                      <p className="text-teal-600 font-bold">{sector.savings} savings</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Ready to transform your B2B procurement?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join the digital procurement revolution with Mi-Proc
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('CreateRFQ')}>
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                Create Your First RFQ
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={createPageUrl('Wallet')}>
              <Button size="lg" variant="outline">
                Explore Mi-Wallet
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}