import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PublicNavbar from '@/components/PublicNavbar';
import { Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', company: '', phone: '+966', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar activePage="Contact" />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-sm font-bold text-teal-500 uppercase tracking-widest mb-3">Get in Touch</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Let's Build Together</h1>
              <p className="text-lg text-slate-600 mb-10">
                Ready to transform your payment infrastructure? Get in touch with our team for a free consultation.
              </p>

              <div className="space-y-6 mb-8">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-teal-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">Contact Us</p>
                    <a href="mailto:info@mi-technologies.sa" className="text-teal-500 hover:underline">
                      info@mi-technologies.sa
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-teal-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">Visit Us</p>
                    <p className="text-slate-600">Al Kifah Tower, King Fahd Road</p>
                    <p className="text-slate-600">Dhahran 34232, Saudi Arabia</p>
                  </div>
                </div>
              </div>

              {/* Quick Response */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-start gap-3">
                <Clock className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-800">Quick Response Time:</span> We typically respond within 24 hours during business days.
                </p>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              {formSubmitted ? (
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-10 text-center">
                    <CheckCircle2 className="h-16 w-16 text-teal-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-600">We'll get back to you within 24 hours.</p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="fullName"
                          placeholder="Your name"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="company">Company <span className="text-red-500">*</span></Label>
                        <Input
                          id="company"
                          placeholder="Company name"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          placeholder="+966"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your business needs..."
                          rows={5}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full h-12 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                        style={{ background: 'linear-gradient(90deg, #5b4fb8, #2bb3b3)' }}
                      >
                        Send Message <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>&copy; 2026 MI Technologies. All rights reserved. Licensed by SAMA.</p>
      </footer>
    </div>
  );
}