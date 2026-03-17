import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle, Rocket, Globe, Users, TrendingUp, Zap, MapPin, Calendar } from 'lucide-react';

const stats = [
  { value: '600+', label: 'Startups' },
  { value: '1,000+', label: 'Speakers' },
  { value: '1,800+', label: 'Global Tech Brands' },
  { value: '201,000+', label: 'Visitors' },
];

const interestTypes = ['Exhibitor', 'Investor', 'Buyer', 'Supplier', 'Tech Enthusiast', 'Other'];

export default function Leap2026() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    job_title: '',
    country: '',
    interest_type: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.full_name || !form.email || !form.company || !form.interest_type) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    const res = await base44.functions.invoke('submitLeapLead', form);
    setLoading(false);
    if (res.data?.success) {
      setSubmitted(true);
    } else {
      setError(res.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white font-sans">
      {/* Hero */}
      <div className="relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#12103a] to-[#0a1a2a]" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(ellipse at 20% 50%, #7c3aed 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #06b6d4 0%, transparent 50%)',
        }} />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Badge className="bg-purple-600/30 text-purple-300 border border-purple-500/50 mb-6 px-4 py-1.5 text-sm">
              🚀 LEAP 2026 • Riyadh, Saudi Arabia
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-4">
              <span className="text-white">INTO NEW</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">WORLDS</span>
            </h1>
            <p className="text-xl text-slate-300 mt-6 max-w-2xl mx-auto">
              Join the global tech community at RECC Malham, Riyadh.<br />
              <span className="text-cyan-400 font-semibold">13–16 April 2026</span>
            </p>
            <div className="flex items-center justify-center gap-6 mt-4 text-slate-400 text-sm">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-purple-400" /> RECC Malham, Saudi Arabia</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-cyan-400" /> 13–16 April 2026</span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{s.value}</div>
                <div className="text-slate-400 text-sm mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-3xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Register Interest</span>
            </h2>
            <p className="text-slate-400 mt-3">Be part of the world's most impactful tech event. Fill in your details and our team will be in touch.</p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-purple-900/50 to-cyan-900/30 border border-purple-500/40 rounded-3xl p-16 text-center"
            >
              <CheckCircle className="h-20 w-20 text-cyan-400 mx-auto mb-6" />
              <h3 className="text-3xl font-black text-white mb-3">You're Registered!</h3>
              <p className="text-slate-300 text-lg">Thank you for your interest in LEAP 2026. Our team will contact you shortly.</p>
              <Button
                onClick={() => { setSubmitted(false); setForm({ full_name:'', email:'', phone:'', company:'', job_title:'', country:'', interest_type:'', message:'' }); }}
                className="mt-8 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold px-8 py-3"
              >
                Register Another
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm text-slate-300 font-medium">Full Name <span className="text-purple-400">*</span></label>
                  <Input
                    value={form.full_name}
                    onChange={e => handleChange('full_name', e.target.value)}
                    placeholder="John Doe"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-300 font-medium">Email Address <span className="text-purple-400">*</span></label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    placeholder="john@company.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-300 font-medium">Company <span className="text-purple-400">*</span></label>
                  <Input
                    value={form.company}
                    onChange={e => handleChange('company', e.target.value)}
                    placeholder="Acme Corp"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-300 font-medium">Job Title</label>
                  <Input
                    value={form.job_title}
                    onChange={e => handleChange('job_title', e.target.value)}
                    placeholder="CEO / Procurement Manager"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-300 font-medium">Phone Number</label>
                  <Input
                    value={form.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    placeholder="+966 5X XXX XXXX"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-300 font-medium">Country</label>
                  <Input
                    value={form.country}
                    onChange={e => handleChange('country', e.target.value)}
                    placeholder="Saudi Arabia"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-300 font-medium">I'm Interested As <span className="text-purple-400">*</span></label>
                <Select value={form.interest_type} onValueChange={v => handleChange('interest_type', v)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-purple-400">
                    <SelectValue placeholder="Select your role at LEAP 2026" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a3a] border-white/20 text-white">
                    {interestTypes.map(t => (
                      <SelectItem key={t} value={t} className="focus:bg-purple-600/30">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-300 font-medium">Message (Optional)</label>
                <Textarea
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                  placeholder="Tell us more about what you're looking for at LEAP 2026..."
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-purple-400 resize-none"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-lg py-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
              >
                {loading ? (
                  <span className="flex items-center gap-2"><Rocket className="h-5 w-5 animate-bounce" /> Submitting...</span>
                ) : (
                  <span className="flex items-center gap-2"><Rocket className="h-5 w-5" /> Register My Interest</span>
                )}
              </Button>

              <p className="text-center text-slate-500 text-xs">
                By submitting, you agree to be contacted by the Mi-Proc team regarding LEAP 2026 opportunities.
              </p>
            </form>
          )}
        </motion.div>
      </div>

      {/* Bottom CTA bar */}
      <div className="border-t border-white/10 bg-white/5 py-8 text-center">
        <p className="text-slate-400 text-sm">
          LEAP 2026 • <span className="text-cyan-400">13–16 April 2026</span> • RECC Malham, Riyadh, Saudi Arabia
        </p>
      </div>
    </div>
  );
}