import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  MessageSquare,
  Clock,
  Building2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      detail: 'info@mi-technologies.sa',
      link: 'mailto:info@mi-technologies.sa'
    },
    {
      icon: MapPin,
      title: 'Address',
      detail: 'Al Kifah Tower, King Fahd Road, Dhahran 34232, Saudi Arabia',
      link: null
    },
    {
      icon: Phone,
      title: 'Phone',
      detail: '+966 XX XXX XXXX',
      link: 'tel:+966XXXXXXXX'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      detail: 'Sun - Thu: 9:00 AM - 6:00 PM',
      link: null
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-indigo-100">
              Have questions? We're here to help you transform your B2B procurement
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                      <info.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{info.title}</h3>
                    {info.link ? (
                      <a href={info.link} className="text-sm text-indigo-600 hover:text-indigo-700">
                        {info.detail}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-600">{info.detail}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <Badge className="bg-teal-100 text-teal-700 mb-4">SEND US A MESSAGE</Badge>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Contact Our Team
                </h2>
                <p className="text-slate-600">
                  Fill out the form and our team will get back to you within 24 hours
                </p>
              </div>

              {formSubmitted ? (
                <Card className="bg-teal-50 border-teal-200">
                  <CardContent className="p-8 text-center">
                    <CheckCircle2 className="h-16 w-16 text-teal-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-teal-900 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-teal-700">
                      We'll get back to you shortly.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input id="company" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input id="subject" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          rows={5}
                          required
                          placeholder="Tell us how we can help you..."
                        />
                      </div>

                      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </motion.div>

            {/* Office Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <Badge className="bg-indigo-100 text-indigo-700 mb-4">OUR OFFICE</Badge>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Visit Us
                </h2>
                <p className="text-slate-600">
                  Located in the heart of Dhahran's business district
                </p>
              </div>

              <Card className="border-0 shadow-lg mb-6">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">MI Technologies Headquarters</h3>
                      <p className="text-slate-600 leading-relaxed">
                        Al Kifah Tower, King Fahd Road<br />
                        Dhahran 34232<br />
                        Saudi Arabia
                      </p>
                    </div>
                  </div>

                  <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3573.6756923456!2d50.1234567!3d26.3456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDIwJzQ0LjQiTiA1MMKwMDcnMjQuNCJF!5e0!3m2!1sen!2ssa!4v1234567890123!5m2!1sen!2ssa"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-50 to-teal-50 border-indigo-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <MessageSquare className="h-6 w-6 text-indigo-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">
                        Need Immediate Assistance?
                      </h4>
                      <p className="text-slate-600 text-sm mb-4">
                        For urgent inquiries, please reach out directly via email or phone during business hours.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Link to={createPageUrl('Home')}>
                          <Button size="sm" variant="outline">
                            Contact Our Team
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Looking for Something Else?
          </h2>
          <p className="text-slate-600 mb-8">
            Explore our resources or get started with Mi-Proc
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={createPageUrl('Home')}>
              <Button variant="outline" size="lg">
                Homepage
              </Button>
            </Link>
            <Link to={createPageUrl('Home')}>
              <Button variant="outline" size="lg">
                About Mi-Proc
              </Button>
            </Link>
            <Link to={createPageUrl('Home')}>
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}