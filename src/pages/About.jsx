import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  Target,
  Users,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle2,
  Building2,
  Factory,
  Briefcase,
  Globe,
  DollarSign,
  Clock,
  FileText,
  ArrowRight,
  Code,
  Server,
  Smartphone,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function About() {
  const businessObjectives = [
    {
      icon: Users,
      title: 'Market Leadership',
      description: '2,500 active SMEs and 200 verified suppliers by Year 1',
      metric: '2,500+ SMEs'
    },
    {
      icon: DollarSign,
      title: 'Transaction Volume',
      description: '6,000+ deals closed with 120M SAR cumulative value',
      metric: 'SAR 120M'
    },
    {
      icon: TrendingUp,
      title: 'Cost Efficiency',
      description: '20-25% reduction in procurement costs for buyers',
      metric: '20-25% ↓'
    },
    {
      icon: Clock,
      title: 'Speed to Market',
      description: 'Reduce procurement cycle from weeks to 3-7 days',
      metric: '3-7 Days'
    }
  ];

  const keyFeatures = [
    {
      category: 'Mi-Proc Core',
      icon: Building2,
      color: 'bg-indigo-100 text-indigo-600',
      features: [
        'Blind RFQ System - Anonymous procurement requests',
        'AI-Powered Supplier Matching - Intelligent pairing',
        'Virtual Negotiation Rooms - Secure encrypted communications',
        'Multi-Party Procurement - Collaborative buying',
        'Real-Time Analytics - Dashboard insights'
      ]
    },
    {
      category: 'Mi-Wallet',
      icon: Shield,
      color: 'bg-teal-100 text-teal-600',
      features: [
        'SAMA-Compliant PSP - Fully regulated payments',
        'Escrow & Milestone Payments - Transaction security',
        'Instant Settlements - Real-time fund transfers',
        'Multi-Currency Support - SAR, USD, EUR',
        'Invoice Financing - Working capital solutions'
      ]
    }
  ];

  const techStack = [
    {
      category: 'Frontend',
      icon: Smartphone,
      technologies: [
        { name: 'Next.js', description: 'Server-side rendering framework' },
        { name: 'TailwindCSS', description: 'Utility-first styling' },
        { name: 'TypeScript', description: 'Type-safe development' },
        { name: 'React Native', description: 'Mobile applications' }
      ]
    },
    {
      category: 'Backend',
      icon: Server,
      technologies: [
        { name: 'Node.js', description: 'Runtime environment' },
        { name: 'Microservices', description: 'Scalable architecture' },
        { name: 'GraphQL', description: 'API query language' },
        { name: 'Redis', description: 'Caching layer' }
      ]
    },
    {
      category: 'Infrastructure',
      icon: Globe,
      technologies: [
        { name: 'AWS Riyadh', description: 'Cloud hosting' },
        { name: 'STC Cloud', description: 'Data sovereignty' },
        { name: 'PostgreSQL', description: 'Primary database' },
        { name: 'MongoDB', description: 'Document storage' }
      ]
    },
    {
      category: 'Security',
      icon: Lock,
      technologies: [
        { name: 'Keycloak', description: 'Identity management' },
        { name: 'AES-256', description: 'Encryption at rest' },
        { name: 'TLS 1.3', description: 'Transport security' },
        { name: 'OAuth 2.0', description: 'Authorization' }
      ]
    }
  ];

  const targetSectors = [
    { name: 'Construction', icon: Building2 },
    { name: 'Manufacturing', icon: Factory },
    { name: 'Healthcare', icon: Briefcase },
    { name: 'Trading & Retail', icon: Globe }
  ];

  const roadmap = [
    {
      year: '2027',
      quarter: 'Q1-Q4',
      title: 'Year 1 Targets',
      goals: [
        '2,500 Active SMEs onboarded',
        '200 Verified Suppliers',
        '6,000+ Deals closed',
        'SAR 120M cumulative deal value'
      ]
    },
    {
      year: '2028',
      quarter: 'Q1',
      title: 'Break-Even Point',
      goals: [
        'Achieve operational profitability',
        'Expand to healthcare sector',
        'Launch mobile applications',
        'Regional expansion planning'
      ]
    },
    {
      year: '2027-2032',
      quarter: '5-Year',
      title: 'Financial Outlook',
      goals: [
        'SAR 3.8B cumulative deals value',
        '>55% Internal Rate of Return (IRR)',
        'Market leadership in KSA',
        'Platform scalability achieved'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698475e8a83c0e60c7a78100/def2d3f5f_MI-logo-color.png" 
                alt="MI Technologies" 
                className="h-12 brightness-0 invert"
              />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Business Requirements Document
            </h1>
            <p className="text-xl text-indigo-100 mb-2">Mi-Proc Supply Aggregator & B2B Digital Wallet</p>
            <div className="flex items-center gap-4 text-indigo-200">
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">Version 1.0</Badge>
              <span>February 9, 2026</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <FileText className="h-6 w-6 text-indigo-600" />
                  Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600">
                <p className="leading-relaxed">
                  This document outlines the business requirements for the Mi-Proc platform, a revolutionary B2B supply 
                  aggregator and digital wallet ecosystem developed by MI Technologies. The platform is designed to digitize 
                  and streamline procurement and payment processes for Small and Medium-sized Enterprises (SMEs) in the 
                  Kingdom of Saudi Arabia (KSA).
                </p>
                <p className="leading-relaxed">
                  By integrating a sophisticated aggregation engine with a SAMA-compliant digital wallet, Mi-Proc aims to 
                  create a trusted, efficient, and transparent marketplace. This BRD serves as a foundational guide for the 
                  development team, detailing the project's vision, objectives, functional and non-functional requirements, 
                  and technical architecture.
                </p>

                <div className="bg-indigo-50 rounded-xl p-6 mt-6">
                  <h3 className="font-semibold text-indigo-900 mb-3">Project Overview</h3>
                  <p className="text-slate-700 leading-relaxed">
                    The Mi-Proc project is a strategic initiative by MI Technologies to address critical inefficiencies in 
                    the Saudi B2B procurement landscape. The core of the project is a unified digital platform that combines 
                    two key components: <strong>Mi-Proc Core</strong>, an intelligent supply aggregation engine, and{' '}
                    <strong>Mi-Wallet</strong>, a secure, SAMA-compliant Payment Service Provider (PSP).
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Business Objectives */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <Badge className="bg-indigo-100 text-indigo-700 mb-4">BUSINESS OBJECTIVES</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Strategic Goals & <span className="text-indigo-600">Key Metrics</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                The platform's success will be measured against several key business goals
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {businessObjectives.map((objective, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                        <objective.icon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">{objective.title}</h3>
                      <p className="text-sm text-slate-600 mb-3">{objective.description}</p>
                      <div className="text-2xl font-bold text-indigo-600">{objective.metric}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="bg-teal-100 text-teal-700 mb-4">PLATFORM COMPONENTS</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Core Features & <span className="text-teal-600">Capabilities</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {keyFeatures.map((component, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl ${component.color} flex items-center justify-center`}>
                        <component.icon className="h-6 w-6" />
                      </div>
                      {component.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {component.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Sectors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-700 mb-4">TARGET MARKETS</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Initial Focus <span className="text-purple-600">Sectors</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Launch focused on construction and manufacturing, with plans for future expansion
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {targetSectors.map((sector, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <sector.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900">{sector.name}</h4>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="bg-indigo-100 text-indigo-700 mb-4">TECHNICAL ARCHITECTURE</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Technology <span className="text-indigo-600">Stack</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Modern, scalable, and secure microservices-based architecture
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {techStack.map((stack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <stack.icon className="h-5 w-5 text-indigo-600" />
                      </div>
                      {stack.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stack.technologies.map((tech, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                          <Code className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{tech.name}</p>
                            <p className="text-xs text-slate-500">{tech.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="bg-teal-100 text-teal-700 mb-4">ROADMAP & MILESTONES</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Strategic <span className="text-teal-600">Timeline</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {roadmap.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-gradient-to-br from-indigo-50 to-teal-50">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-indigo-600 text-white">{phase.year}</Badge>
                      <span className="text-sm text-slate-500">{phase.quarter}</span>
                    </div>
                    <CardTitle>{phase.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {phase.goals.map((goal, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 text-sm">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* 5-Year Outlook Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">5-Year Financial Outlook</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-indigo-200 text-sm mb-1">Cumulative Deals Value</p>
                    <p className="text-3xl font-bold text-teal-400">SAR 3.8B</p>
                  </div>
                  <div>
                    <p className="text-indigo-200 text-sm mb-1">Internal Rate of Return</p>
                    <p className="text-3xl font-bold text-teal-400">&gt;55%</p>
                  </div>
                  <div>
                    <p className="text-indigo-200 text-sm mb-1">Break-Even Point</p>
                    <p className="text-3xl font-bold text-teal-400">Q1 2028</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Conclusion & CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Join the Procurement Revolution
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              This comprehensive BRD provides the foundation for Mi-Proc's mission to position itself as a 
              leader in the B2B procurement and fintech landscape of Saudi Arabia. The successful execution 
              of this project will create a trusted, efficient, and transparent marketplace that significantly 
              benefits SMEs and suppliers across the Kingdom.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={createPageUrl('Dashboard')}>
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to={createPageUrl('Home')}>
                <Button size="lg" variant="outline">
                  Back to Homepage
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}