import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Send,
  Lock,
  Shield,
  CheckCircle2,
  FileText,
  Clock,
  User,
  Building2,
  ArrowRight,
  Paperclip,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Negotiations() {
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(0);

  const negotiations = [
    {
      id: 1,
      supplier: 'Supplier #8291',
      rfq: 'RFQ-2024-001',
      title: 'Construction Materials - Steel',
      status: 'active',
      lastMessage: 'We can offer SAR 450/unit...',
      time: '10:23 AM',
      unread: 2
    },
    {
      id: 2,
      supplier: 'Supplier #4512',
      rfq: 'RFQ-2024-002',
      title: 'IT Hardware - Servers',
      status: 'pending',
      lastMessage: 'Waiting for your response...',
      time: 'Yesterday',
      unread: 0
    },
    {
      id: 3,
      supplier: 'Supplier #7834',
      rfq: 'RFQ-2024-001',
      title: 'Construction Materials - Steel',
      status: 'completed',
      lastMessage: 'Deal confirmed. Proceeding...',
      time: '2 days ago',
      unread: 0
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'supplier',
      content: 'Thank you for your RFQ. We have reviewed your requirements for 500 units of steel rebar.',
      time: '10:15 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'supplier',
      content: 'We can offer the 500 units at SAR 450/unit if delivery is extended by 5 days.',
      time: '10:23 AM',
      type: 'text',
      attachment: { name: 'Revised_Quote_v2.pdf', type: 'pdf' }
    },
    {
      id: 3,
      sender: 'buyer',
      content: 'The timeline is critical. How about SAR 460/unit with standard delivery? I\'ve attached our updated specs.',
      time: '10:25 AM',
      type: 'text'
    },
    {
      id: 4,
      sender: 'system',
      content: 'Official Counter-Offer Created: SAR 230,000 (Saved 8%)',
      time: '10:26 AM',
      type: 'offer'
    }
  ];

  const statusColors = {
    active: 'bg-teal-100 text-teal-700',
    pending: 'bg-amber-100 text-amber-700',
    completed: 'bg-emerald-100 text-emerald-700'
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Virtual Negotiations</h1>
          <p className="text-slate-500 mt-1">Secure, structured deal making with full audit trails</p>
        </div>

        {/* Security Banner */}
        <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100 mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Lock className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-indigo-900">End-to-End Encrypted</p>
            <p className="text-sm text-indigo-600">All communications are secured and logged for audit compliance</p>
          </div>
          <Badge className="bg-indigo-100 text-indigo-700">
            <Shield className="h-3 w-3 mr-1" />
            Anonymous Mode
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat List */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Active Negotiations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                {negotiations.map((neg, index) => (
                  <div
                    key={neg.id}
                    onClick={() => setSelectedChat(index)}
                    className={`p-4 border-b cursor-pointer transition-colors ${
                      selectedChat === index ? 'bg-indigo-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{neg.supplier}</p>
                          <p className="text-xs text-slate-500">{neg.rfq}</p>
                        </div>
                      </div>
                      {neg.unread > 0 && (
                        <Badge className="bg-indigo-600 text-white">{neg.unread}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-900 font-medium mb-1">{neg.title}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500 truncate">{neg.lastMessage}</p>
                      <span className="text-xs text-slate-400">{neg.time}</span>
                    </div>
                    <Badge className={`${statusColors[neg.status]} mt-2`}>
                      {neg.status}
                    </Badge>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg h-full">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Supplier #8291 (Anonymous)</p>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span className="text-sm text-slate-500">Online • Verified</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Accept Offer
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button variant="outline" size="sm">
                      Modify Terms
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-[400px] p-6">
                  <div className="text-center mb-6">
                    <Badge className="bg-slate-100 text-slate-600">
                      <Lock className="h-3 w-3 mr-1" />
                      Today, 10:23 AM • End-to-End Encrypted
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'buyer' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'}`}
                      >
                        {msg.type === 'offer' ? (
                          <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-full">
                            <CheckCircle2 className="h-4 w-4 text-teal-600" />
                            <span className="text-sm text-teal-700">{msg.content}</span>
                          </div>
                        ) : (
                          <div className={`max-w-[70%] ${
                            msg.sender === 'buyer' ? 'bg-indigo-600 text-white' : 'bg-white border'
                          } rounded-2xl p-4 shadow-sm`}>
                            <p className={msg.sender === 'buyer' ? 'text-white' : 'text-slate-700'}>
                              {msg.content}
                            </p>
                            {msg.attachment && (
                              <div className={`flex items-center gap-2 mt-3 p-2 rounded-lg ${
                                msg.sender === 'buyer' ? 'bg-indigo-500' : 'bg-slate-50'
                              }`}>
                                <FileText className={`h-4 w-4 ${msg.sender === 'buyer' ? 'text-white' : 'text-red-500'}`} />
                                <span className={`text-sm ${msg.sender === 'buyer' ? 'text-white' : 'text-indigo-600'}`}>
                                  {msg.attachment.name}
                                </span>
                              </div>
                            )}
                            <p className={`text-xs mt-2 ${msg.sender === 'buyer' ? 'text-indigo-200' : 'text-slate-400'}`}>
                              {msg.time}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5 text-slate-500" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 border-0 bg-white"
                    />
                    <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full w-10 h-10 p-0">
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Business Impact */}
        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Negotiation Impact</h3>
              <p className="text-indigo-200">Average price improvement via competitive negotiation</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold">5-15%</p>
                <p className="text-indigo-200 text-sm">Savings</p>
              </div>
              <div className="h-12 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <span className="text-sm">End-to-End Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}