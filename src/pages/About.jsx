import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import PublicNavbar from '@/components/PublicNavbar';
import ServicesSlider from '@/components/ServicesSlider';
import {
  Target,
  Eye,
  Lightbulb,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  Users,
  Globe,
  Award,
  Building2,
  Rocket,
  Heart
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const pillars = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    subtitle: 'FUTURE PROOFING',
    description: 'Modern fintech tools engineered for real-world procurement challenges. We leverage cutting-edge AI and automation to transform how your business handles sourcing, purchasing, and payments.',
    color: 'from-indigo-500 to-purple-600',
    bg: 'bg-indigo-50'
  },
  {
    icon: Rocket,
    title: 'Future-Proof',
    subtitle: 'SCALABILITY',
    description: 'Scalable infrastructure designed to support your growth trajectory. Our architecture adapts seamlessly as your business expands, ensuring you never outgrow your procurement solutions.',
    color: 'from-teal-500 to-cyan-600',
    bg: 'bg-teal-50'
  },
  {
    icon: Shield,
    title: 'Viability',
    subtitle: 'RELIABILITY',
    description: 'Reliable systems built for real-time transaction processing with enterprise-grade stability. Every procurement workflow flows through robust, redundant infrastructure.',
    color: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-50'
  },
  {
    icon: Zap,
    title: 'Synergies',
    subtitle: 'INTEGRATION',
    description: 'Integrates seamlessly into your existing business workflows. Our APIs connect effortlessly with your ERP, accounting software, and e-commerce platforms — no disruption, just enhancement.',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50'
  }
];

const values = [
  {
    icon: Target,
    title: 'Simplicity First',
    description: 'We remove complexity from procurement. We automate first, manual second. We are efficient, highly organised and effective collaborators — easy to work with, easy to use, and minimalist in design.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-100'
  },
  {
    icon: Award,
    title: 'Chase Excellence',
    description: 'We strive for perfection but know we will never reach it. We build. We value giving and receiving feedback. We never sit still. We\'re always learning. Excellence today is not excellence tomorrow.',
    color: 'text-teal-600',
    bg: 'bg-teal-100'
  },
  {
    icon: Heart,
    title: 'Always Fair',
    description: 'We are open and honest. We don\'t carry bias. We proactively create a level playing field. We\'re diverse, equal, and respectful. We are humble and active listeners.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-100'
  },
  {
    icon: Users,
    title: 'Take Responsibility',
    description: 'We are innovators, solution architects, and collaborators. We empower with unrivalled access. We unleash efficiency, free from constraint. We take ownership and embrace a culture of freedom.',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  {
    icon: TrendingUp,
    title: 'Ambitious Mindset',
    description: 'We are tenacious, hungry, passionate and energetic. We set and achieve audacious goals. We dream big and execute. We partner with, hire, and embolden the ambitious.',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  {
    icon: Globe,
    title: 'Vision 2030 Aligned',
    description: 'As a subsidiary of Al-Kifah Holding Company, we are dedicated to supporting the Kingdom\'s Vision 2030 objectives, increasing exposure to the digital economy and financial technology.',
    color: 'text-rose-600',
    bg: 'bg-rose-100'
  }
];

const stats = [
  { value: '500+', label: 'Enterprise Clients' },
  { value: '5%+', label: 'Avg Cost Savings' },
  { value: '75%', label: 'Faster Procurement' },
  { value: '100%', label: 'Spend Visibility' },
];

const team = [
  { name: 'Ahmad Al-Mansouri', title: 'CEO & Co-founder', initials: 'AM' },
  { name: 'Khalid Al-Rashid', title: 'CFO & COO', initials: 'KR' },
  { name: 'Sara Al-Otaibi', title: 'CTO & Co-founder', initials: 'SO' },
  { name: 'Faisal Al-Ghamdi', title: 'Head of Business Development', initials: 'FG' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar activePage="About" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#5b4fb8] via-[#4a8fb9] to-[#2bb3b3] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="bg-white/20 text-white mb-4">WHO WE ARE</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                About MI Technologies
              </h1>
              <p className="text-xl text-indigo-100 mb-6 leading-relaxed">
                Leading innovator in Saudi's fintech landscape, empowering your business and supporting Vision 2030.
              </p>
              <p className="text-indigo-200 leading-relaxed mb-8">
                Modern Impact Technologies (MI Technologies) is established as a leading innovator in the Saudi fintech landscape, dedicated to empowering Small and Medium Enterprises (SMEs) and supporting the Kingdom's Vision 2030 objectives.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to={createPageUrl('Contact')}>
                  <Button size="lg" className="bg-white text-indigo-700 hover:bg-white/90 font-semibold">
                    Get in Touch
                  </Button>
                </Link>
                <Link to={createPageUrl('Products')}>
                  <Button size="lg" className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white hover:bg-white/20">
                    Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((s, i) => (
                    <div key={i} className="text-center p-4 bg-white/10 rounded-2xl">
                      <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
                      <div className="text-indigo-200 text-sm">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                  <p className="text-indigo-200 text-sm">Proudly serving businesses across Saudi Arabia</p>
                  <div className="flex justify-center gap-4 mt-3">
                    <Badge className="bg-white/20 text-white">SAMA Licensed</Badge>
                    <Badge className="bg-white/20 text-white">Vision 2030</Badge>
                    <Badge className="bg-white/20 text-white">Al-Kifah Group</Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card className="h-full border-0 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="h-7 w-7 text-white" />
                  </div>
                  <Badge className="bg-white/20 text-white mb-3">MISSION</Badge>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-indigo-100 leading-relaxed text-lg">
                    To create value and support growth of MSMEs and our communities by introducing innovative, and integrated solutions.
                  </p>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {['Empowering SMEs across Saudi Arabia', 'Driving digital procurement adoption', 'Supporting Vision 2030 objectives'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <Card className="h-full border-0 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-8 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <Eye className="h-7 w-7 text-white" />
                  </div>
                  <Badge className="bg-white/20 text-white mb-3">VISION</Badge>
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-teal-100 leading-relaxed text-lg">
                    To be at the forefront of delivering innovative, convenient, integrated solutions that empower MSMEs and our community to thrive.
                  </p>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {['Leading fintech innovator in Saudi Arabia', 'Global business platform rebuilding trade', 'Simplifying B2B procurement worldwide'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="bg-indigo-100 text-indigo-700 mb-4">OUR PILLARS</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">What We Offer</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Four foundational principles that drive everything we build</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all group">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br ${p.color}`}>
                      <p.icon className="h-7 w-7 text-white" />
                    </div>
                    <Badge className="text-xs mb-3 bg-slate-100 text-slate-600">{p.subtitle}</Badge>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{p.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Badge className="bg-indigo-100 text-indigo-700 mb-4">OUR STORY</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                Established to Transform Saudi Procurement
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Established as a subsidiary of Al-Kifah Holding Company, MI Technologies was founded with a clear mandate: to increase Saudi Arabia's exposure to the digital economy and financial technology sector.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                We're creating value and supporting growth of your business by introducing innovative, integrated solutions that help businesses thrive in the digital age — from contactless payments to intelligent procurement platforms.
              </p>
              <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 bg-white rounded-r-xl shadow-sm">
                <p className="text-slate-700 italic text-lg mb-2">
                  "I never understood why B2B platforms have to be dull and complicated. At Mi-Proc, we believe in simplicity, design, and excellence."
                </p>
                <footer className="text-indigo-600 font-semibold text-sm">— CEO, MI Technologies</footer>
              </blockquote>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="space-y-4">
                {[
                  { year: '2020', event: 'Founded as a subsidiary of Al-Kifah Holding Company' },
                  { year: '2021', event: 'Launched Mi-Proc B2B procurement platform' },
                  { year: '2022', event: 'Achieved SAMA licensing and regulatory compliance' },
                  { year: '2023', event: 'Expanded to 500+ enterprise clients across KSA' },
                  { year: '2024', event: 'Launched AI-powered cost optimization and automation' },
                  { year: '2025', event: 'Regional expansion and Vision 2030 integration' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex gap-4 items-start bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <div className="w-16 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">{item.year}</span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed pt-1">{item.event}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="bg-teal-100 text-teal-700 mb-4">OUR VALUES</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">What We Stand For</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Core principles that define our culture and guide our decisions</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${v.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <v.icon className={`h-6 w-6 ${v.color}`} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-3 text-lg">{v.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{v.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge className="bg-purple-100 text-purple-700 mb-4">LEADERSHIP</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Experienced leaders driving innovation in Saudi fintech</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all text-center">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-xl font-bold">{member.initials}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-indigo-600">{member.title}</p>
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
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Join us in shaping the future of fintech in Saudi Arabia. Let's discuss how we can help your business thrive.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-white/90 font-semibold">Get in Touch</Button>
            </Link>
            <Link to={createPageUrl('Register')}>
              <Button size="lg" className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white hover:bg-white/20">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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