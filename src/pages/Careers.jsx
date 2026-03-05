import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import PublicNavbar from '@/components/PublicNavbar';
import { MapPin, Clock, Briefcase, Lightbulb, Users, TrendingUp, Heart, Mail, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const positions = [
  { title: 'Application Development Manager', location: 'Saudi Arabia', type: 'Full-time', department: 'Management' },
  { title: 'Head of Systems Integration', location: 'Saudi Arabia', type: 'Full-time', department: 'Management' },
  { title: 'IT Project Manager', location: 'Saudi Arabia', type: 'Full-time', department: 'Management' },
  { title: 'Solution Architect', location: 'Saudi Arabia', type: 'Full-time', department: 'Architecture' },
];

const perks = [
  { icon: Lightbulb, title: 'Innovation First', description: 'We push boundaries and embrace cutting-edge technologies to build the future of fintech.', color: 'from-indigo-500 to-purple-600', bg: 'bg-indigo-50', text: 'text-indigo-600' },
  { icon: Users, title: 'Collaborative Culture', description: 'Teamwork drives our success. We value diverse perspectives and open communication.', color: 'from-teal-500 to-cyan-600', bg: 'bg-teal-50', text: 'text-teal-600' },
  { icon: TrendingUp, title: 'Growth & Learning', description: 'Continuous development is at our core. We invest in our team\'s professional growth.', color: 'from-emerald-500 to-green-600', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  { icon: Heart, title: 'Impact Driven', description: 'Our work empowers thousands of businesses. Every line of code makes a real difference.', color: 'from-rose-500 to-pink-600', bg: 'bg-rose-50', text: 'text-rose-600' },
];

const deptColors = {
  Management: 'bg-indigo-100 text-indigo-700',
  Architecture: 'bg-teal-100 text-teal-700',
};

export default function Careers() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar activePage="Careers" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#5b4fb8] via-[#4a8fb9] to-[#2bb3b3] py-24 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="bg-white/20 text-white mb-6">JOIN OUR TEAM</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Build the Future of Fintech</h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
              Join MI Technologies and help empower thousands of businesses across Saudi Arabia with innovative payment solutions.
            </p>
            <a href="mailto:recruitment@mi-technologies.sa">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-white/90 font-semibold">
                <Mail className="mr-2 h-5 w-5" /> Send Your CV
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="bg-indigo-100 text-indigo-700 mb-4">OPEN POSITIONS</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">Explore exciting career opportunities</h2>
            <p className="text-slate-600">Join our growing team in Saudi Arabia</p>
          </div>

          <div className="space-y-4">
            {positions.map((pos, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{pos.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{pos.location}</span>
                          <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{pos.type}</span>
                          <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" />{pos.department}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={deptColors[pos.department] || 'bg-slate-100 text-slate-700'}>{pos.department}</Badge>
                        <Button
                          size="sm"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                          onClick={() => setExpanded(expanded === i ? null : i)}
                        >
                          {expanded === i ? <><ChevronUp className="mr-1 h-4 w-4" /> Hide</> : <><ChevronDown className="mr-1 h-4 w-4" /> View Details</>}
                        </Button>
                      </div>
                    </div>
                    {expanded === i && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-slate-600 mb-4">
                          We're looking for a talented <strong>{pos.title}</strong> to join our team. If you're passionate about fintech and innovation, we'd love to hear from you.
                        </p>
                        <a href="mailto:recruitment@mi-technologies.sa">
                          <Button size="sm" variant="outline" className="border-indigo-300 text-indigo-600 hover:bg-indigo-50">
                            <Mail className="mr-2 h-4 w-4" /> Apply: recruitment@mi-technologies.sa
                          </Button>
                        </a>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="bg-teal-100 text-teal-700 mb-4">WHY JOIN US</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">Why Work With Us</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We're building something meaningful, and we want passionate people to join us on this journey.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${perk.color} flex items-center justify-center mb-5`}>
                      <perk.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-3 text-lg">{perk.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{perk.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-white/80 mb-8 text-lg">We're always looking for talented individuals who are passionate about fintech and innovation.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="mailto:recruitment@mi-technologies.sa">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-white/90 font-semibold">
                <Mail className="mr-2 h-5 w-5" /> Send Your CV
              </Button>
            </a>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-white/10 border-2 border-white/50 text-white hover:bg-white/20">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
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