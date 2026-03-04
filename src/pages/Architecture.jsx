import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Server, Database, Shield, Globe, Users, Zap, Cloud, Lock,
  ArrowRight, ArrowDown, Layers, Activity, TrendingUp, AlertCircle,
  CheckCircle2, Cpu, HardDrive, Network, BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

// ─── Data ────────────────────────────────────────────────────────────────────

const userGrowthData = [
  { month: 'Q1 2025', buyers: 500, suppliers: 300, total: 800 },
  { month: 'Q2 2025', buyers: 1200, suppliers: 700, total: 1900 },
  { month: 'Q3 2025', buyers: 2500, suppliers: 1400, total: 3900 },
  { month: 'Q4 2025', buyers: 4200, suppliers: 2300, total: 6500 },
  { month: 'Q1 2026', buyers: 6800, suppliers: 3600, total: 10400 },
  { month: 'Q2 2026', buyers: 10000, suppliers: 5200, total: 15200 },
  { month: 'Q3 2026', buyers: 14000, suppliers: 7000, total: 21000 },
  { month: 'Q4 2026', buyers: 20000, suppliers: 10000, total: 30000 },
];

const trafficDistribution = [
  { name: 'RFQ Management', value: 35, color: '#6366f1' },
  { name: 'Bidding & Quotes', value: 28, color: '#8b5cf6' },
  { name: 'Order Tracking', value: 18, color: '#14b8a6' },
  { name: 'Payments & Escrow', value: 12, color: '#f59e0b' },
  { name: 'Analytics & Reports', value: 7, color: '#10b981' },
];

const capacityTiers = [
  {
    tier: 'Launch (MVP)',
    period: 'Q1–Q2 2025',
    users: '< 2,000',
    concurrentUsers: '200',
    rps: '500',
    db: '50 GB',
    infra: 'Single Region (Riyadh)',
    sla: '99.5%',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200'
  },
  {
    tier: 'Growth',
    period: 'Q3 2025 – Q2 2026',
    users: '2,000 – 15,000',
    concurrentUsers: '1,500',
    rps: '3,000',
    db: '500 GB',
    infra: 'Multi-AZ (KSA)',
    sla: '99.9%',
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200'
  },
  {
    tier: 'Scale',
    period: 'Q3 2026+',
    users: '15,000 – 50,000',
    concurrentUsers: '5,000',
    rps: '10,000',
    db: '2 TB+',
    infra: 'Multi-Region (KSA + UAE)',
    sla: '99.99%',
    color: 'bg-purple-100 text-purple-700 border-purple-200'
  },
];

const techStack = [
  { layer: 'Frontend', tech: 'React 18, Vite, Tailwind CSS, Framer Motion', icon: Globe, color: 'bg-blue-100 text-blue-700' },
  { layer: 'CDN / Edge', tech: 'Cloudflare CDN, WAF, DDoS Protection', icon: Shield, color: 'bg-orange-100 text-orange-700' },
  { layer: 'API Gateway', tech: 'REST API, Rate Limiting, Auth Middleware', icon: Network, color: 'bg-indigo-100 text-indigo-700' },
  { layer: 'Backend BaaS', tech: 'Base44 Platform (Deno Functions, SDK)', icon: Server, color: 'bg-purple-100 text-purple-700' },
  { layer: 'Database', tech: 'PostgreSQL (Primary), Redis (Cache)', icon: Database, color: 'bg-teal-100 text-teal-700' },
  { layer: 'File Storage', tech: 'Supabase Storage (Documents, KYB Files)', icon: HardDrive, color: 'bg-emerald-100 text-emerald-700' },
  { layer: 'AI / LLM', tech: 'Base44 AI (LLM Integration, Voice Assistant)', icon: Cpu, color: 'bg-pink-100 text-pink-700' },
  { layer: 'Payments', tech: 'SAMA-Compliant Escrow, Bank Transfers', icon: Lock, color: 'bg-amber-100 text-amber-700' },
];

const securityLayers = [
  { name: 'Identity & Access', items: ['OAuth 2.0 / JWT Auth', 'Role-Based Access Control', 'MFA Support', 'Session Management'] },
  { name: 'Data Security', items: ['AES-256 Encryption at Rest', 'TLS 1.3 in Transit', 'Field-level Encryption (PII)', 'Secure File Upload'] },
  { name: 'Compliance', items: ['SAMA Regulations', 'ZATCA Integration', 'SASO Standards', 'NDA Workflow'] },
  { name: 'Infrastructure', items: ['WAF & DDoS Protection', 'IP Allowlisting', 'Audit Logs', 'Vulnerability Scanning'] },
];

// ─── Architecture Box ─────────────────────────────────────────────────────────

function ArchBox({ icon: Icon, label, sublabel, color = 'bg-indigo-50 border-indigo-200', textColor = 'text-indigo-700' }) {
  return (
    <div className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 ${color} min-w-[110px] text-center`}>
      <Icon className={`h-6 w-6 mb-1 ${textColor}`} />
      <span className={`text-xs font-semibold ${textColor}`}>{label}</span>
      {sublabel && <span className="text-[10px] text-slate-500 mt-0.5">{sublabel}</span>}
    </div>
  );
}

function Arrow({ direction = 'right' }) {
  return direction === 'right'
    ? <ArrowRight className="h-5 w-5 text-slate-400 flex-shrink-0" />
    : <ArrowDown className="h-5 w-5 text-slate-400 flex-shrink-0 mx-auto" />;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Architecture() {
  const [activeTab, setActiveTab] = useState('architecture');

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Mi-Proc Platform Architecture</h1>
              <p className="text-indigo-100 text-lg">High-Level System Design & Capacity Planning</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-white/20 text-white border-white/30">Version 1.0</Badge>
                <Badge className="bg-white/20 text-white border-white/30">KSA B2B Procurement</Badge>
                <Badge className="bg-emerald-400/30 text-white border-emerald-300/30">SAMA Compliant</Badge>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: 'Target Users', value: '30K+' },
                { label: 'Uptime SLA', value: '99.99%' },
                { label: 'Regions', value: '2+' },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl p-3 min-w-[80px]">
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-indigo-200">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-white shadow-sm">
            <TabsTrigger value="architecture">System Architecture</TabsTrigger>
            <TabsTrigger value="capacity">Capacity Planning</TabsTrigger>
            <TabsTrigger value="userload">User Load</TabsTrigger>
            <TabsTrigger value="security">Security & Compliance</TabsTrigger>
          </TabsList>

          {/* ── ARCHITECTURE TAB ─────────────────────────────────────────── */}
          <TabsContent value="architecture">
            <div className="space-y-6">

              {/* High-Level Diagram */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-indigo-600" />
                    High-Level System Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Diagram */}
                  <div className="overflow-x-auto">
                    <div className="min-w-[700px] space-y-6 p-4">

                      {/* Row 1: Clients */}
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Client Layer</p>
                        <div className="flex gap-4 justify-center flex-wrap">
                          {[
                            { icon: Globe, label: 'Web App', sublabel: 'React / Vite' },
                            { icon: Users, label: 'Mobile', sublabel: 'Responsive PWA' },
                            { icon: Network, label: 'API Clients', sublabel: 'B2B Integrations' },
                          ].map((b) => (
                            <ArchBox key={b.label} icon={b.icon} label={b.label} sublabel={b.sublabel}
                              color="bg-blue-50 border-blue-200" textColor="text-blue-700" />
                          ))}
                        </div>
                      </div>

                      <Arrow direction="down" />

                      {/* Row 2: Edge */}
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Edge / Security Layer</p>
                        <div className="flex gap-4 justify-center flex-wrap">
                          <ArchBox icon={Shield} label="Cloudflare CDN" sublabel="WAF + DDoS" color="bg-orange-50 border-orange-200" textColor="text-orange-700" />
                          <ArchBox icon={Lock} label="Auth Gateway" sublabel="JWT / OAuth2" color="bg-orange-50 border-orange-200" textColor="text-orange-700" />
                          <ArchBox icon={Activity} label="Rate Limiter" sublabel="API Throttle" color="bg-orange-50 border-orange-200" textColor="text-orange-700" />
                        </div>
                      </div>

                      <Arrow direction="down" />

                      {/* Row 3: Application */}
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Application Layer (Base44 BaaS)</p>
                        <div className="flex gap-4 justify-center flex-wrap">
                          {[
                            { icon: Server, label: 'RFQ Service', sublabel: 'Goods & Services' },
                            { icon: Zap, label: 'Bid Engine', sublabel: 'Quote Processing' },
                            { icon: Lock, label: 'Escrow Service', sublabel: 'SAMA Compliant' },
                            { icon: Cpu, label: 'AI Assistant', sublabel: 'LLM + Voice' },
                            { icon: Users, label: 'User Service', sublabel: 'KYB / Auth' },
                          ].map((b) => (
                            <ArchBox key={b.label} icon={b.icon} label={b.label} sublabel={b.sublabel}
                              color="bg-indigo-50 border-indigo-200" textColor="text-indigo-700" />
                          ))}
                        </div>
                      </div>

                      <Arrow direction="down" />

                      {/* Row 4: Data */}
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Data Layer</p>
                        <div className="flex gap-4 justify-center flex-wrap">
                          {[
                            { icon: Database, label: 'PostgreSQL', sublabel: 'Primary DB', color: 'bg-teal-50 border-teal-200', tc: 'text-teal-700' },
                            { icon: Zap, label: 'Redis Cache', sublabel: 'Sessions / Hot Data', color: 'bg-teal-50 border-teal-200', tc: 'text-teal-700' },
                            { icon: HardDrive, label: 'File Storage', sublabel: 'Docs / KYB Files', color: 'bg-teal-50 border-teal-200', tc: 'text-teal-700' },
                            { icon: Activity, label: 'Analytics DB', sublabel: 'BI & Reporting', color: 'bg-teal-50 border-teal-200', tc: 'text-teal-700' },
                          ].map((b) => (
                            <ArchBox key={b.label} icon={b.icon} label={b.label} sublabel={b.sublabel}
                              color={b.color} textColor={b.tc} />
                          ))}
                        </div>
                      </div>

                      <Arrow direction="down" />

                      {/* Row 5: External */}
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">External Integrations</p>
                        <div className="flex gap-4 justify-center flex-wrap">
                          {[
                            { icon: Lock, label: 'ZATCA', sublabel: 'Tax Authority' },
                            { icon: Shield, label: 'SAMA', sublabel: 'Central Bank' },
                            { icon: Database, label: 'SASO', sublabel: 'Standards' },
                            { icon: Cloud, label: 'Email / SMS', sublabel: 'Notifications' },
                            { icon: Cpu, label: 'AI / LLM APIs', sublabel: 'OpenAI / Base44' },
                          ].map((b) => (
                            <ArchBox key={b.label} icon={b.icon} label={b.label} sublabel={b.sublabel}
                              color="bg-slate-100 border-slate-300" textColor="text-slate-600" />
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tech Stack Table */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-indigo-600" />
                    Technology Stack
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {techStack.map((t) => (
                      <div key={t.layer} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <div className={`p-2 rounded-lg ${t.color} flex-shrink-0`}>
                          <t.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{t.layer}</p>
                          <p className="text-slate-500 text-xs mt-0.5">{t.tech}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── CAPACITY TAB ─────────────────────────────────────────────── */}
          <TabsContent value="capacity">
            <div className="space-y-6">

              {/* Capacity Tiers */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-600" />
                    Capacity Tiers & Infrastructure Sizing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          {['Tier', 'Period', 'Total Users', 'Concurrent', 'Req/sec', 'DB Size', 'Infrastructure', 'SLA'].map((h) => (
                            <th key={h} className="text-left py-3 px-3 font-semibold text-slate-600 whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {capacityTiers.map((t, i) => (
                          <tr key={i} className="border-b hover:bg-slate-50">
                            <td className="py-4 px-3">
                              <Badge className={`${t.color} border`}>{t.tier}</Badge>
                            </td>
                            <td className="py-4 px-3 text-slate-600 whitespace-nowrap">{t.period}</td>
                            <td className="py-4 px-3 font-semibold text-slate-900">{t.users}</td>
                            <td className="py-4 px-3 text-slate-600">{t.concurrentUsers}</td>
                            <td className="py-4 px-3 text-slate-600">{t.rps}</td>
                            <td className="py-4 px-3 text-slate-600">{t.db}</td>
                            <td className="py-4 px-3 text-slate-600 whitespace-nowrap">{t.infra}</td>
                            <td className="py-4 px-3">
                              <span className="font-semibold text-emerald-600">{t.sla}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Load Metrics */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Activity className="h-4 w-4 text-indigo-600" />
                      Traffic Distribution by Module
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={trafficDistribution} cx="50%" cy="50%" outerRadius={90}
                            dataKey="value" label={({ name, value }) => `${value}%`} labelLine>
                            {trafficDistribution.map((entry, index) => (
                              <Cell key={index} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(v) => `${v}%`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-indigo-600" />
                      Resource Utilization Targets
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { label: 'CPU Utilization Target', value: 70, color: 'bg-indigo-500' },
                        { label: 'Memory Utilization Target', value: 75, color: 'bg-purple-500' },
                        { label: 'DB Connection Pool', value: 60, color: 'bg-teal-500' },
                        { label: 'Cache Hit Rate Target', value: 85, color: 'bg-emerald-500' },
                        { label: 'CDN Offload Rate', value: 80, color: 'bg-amber-500' },
                      ].map((m) => (
                        <div key={m.label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">{m.label}</span>
                            <span className="font-semibold text-slate-900">{m.value}%</span>
                          </div>
                          <Progress value={m.value} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ── USER LOAD TAB ─────────────────────────────────────────────── */}
          <TabsContent value="userload">
            <div className="space-y-6">

              {/* Growth Chart */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-600" />
                    Projected User Growth (2025–2026)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={userGrowthData}>
                        <defs>
                          <linearGradient id="gBuyers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gSuppliers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => v >= 1000 ? `${v / 1000}K` : v} />
                        <Tooltip formatter={(v) => v.toLocaleString()} />
                        <Legend />
                        <Area type="monotone" dataKey="buyers" name="Buyers" stroke="#6366f1" fill="url(#gBuyers)" strokeWidth={2} />
                        <Area type="monotone" dataKey="suppliers" name="Suppliers" stroke="#14b8a6" fill="url(#gSuppliers)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* User Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Target Buyers (EOY 2026)', value: '20,000', icon: Users, color: 'bg-indigo-500', sub: '67% of total users' },
                  { label: 'Target Suppliers (EOY 2026)', value: '10,000', icon: Building2, color: 'bg-teal-500', sub: '33% of total users' },
                  { label: 'Peak Concurrent Users', value: '5,000', icon: Activity, color: 'bg-purple-500', sub: 'Scale tier target' },
                  { label: 'Daily Active Users (DAU)', value: '8,000+', icon: TrendingUp, color: 'bg-amber-500', sub: 'Scale tier estimate' },
                ].map((s) => (
                  <Card key={s.label} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
                        <s.icon className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                      <p className="text-sm text-slate-600 mt-1">{s.label}</p>
                      <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Bar chart quarterly */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <BarChart3 className="h-4 w-4 text-indigo-600" />
                    Quarterly Total User Milestone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => v >= 1000 ? `${v / 1000}K` : v} />
                        <Tooltip formatter={(v) => v.toLocaleString()} />
                        <Bar dataKey="total" name="Total Users" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── SECURITY TAB ─────────────────────────────────────────────── */}
          <TabsContent value="security">
            <div className="space-y-6">

              <div className="grid md:grid-cols-2 gap-6">
                {securityLayers.map((layer) => (
                  <Card key={layer.name} className="border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Shield className="h-4 w-4 text-indigo-600" />
                        {layer.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {layer.items.map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* SLA Summary */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-indigo-600" />
                    SLA & Availability Targets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { label: 'API Response Time (p95)', target: '< 300ms', status: 'green' },
                      { label: 'API Response Time (p99)', target: '< 1s', status: 'green' },
                      { label: 'Uptime (Scale Tier)', target: '99.99%', status: 'green' },
                      { label: 'RTO (Recovery Time)', target: '< 1 hour', status: 'amber' },
                      { label: 'RPO (Recovery Point)', target: '< 15 min', status: 'amber' },
                      { label: 'Data Backup Frequency', target: 'Every 6 hours', status: 'green' },
                      { label: 'Max Downtime / Year', target: '~52 min', status: 'green' },
                      { label: 'CDN Cache TTL', target: '24 hours', status: 'green' },
                      { label: 'Incident Response SLA', target: '< 30 min', status: 'amber' },
                    ].map((s) => (
                      <div key={s.label} className={`p-4 rounded-xl border ${s.status === 'green' ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
                        <p className="text-xs text-slate-500 mb-1">{s.label}</p>
                        <p className={`font-bold text-lg ${s.status === 'green' ? 'text-emerald-700' : 'text-amber-700'}`}>{s.target}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Disaster Recovery */}
              <Card className="border-0 shadow-lg border-l-4 border-l-indigo-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <AlertCircle className="h-4 w-4 text-indigo-600" />
                    Disaster Recovery & Business Continuity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-700">
                    {[
                      { title: 'Multi-AZ Deployment', desc: 'Active-Active across 2+ availability zones within KSA for zero single point of failure.' },
                      { title: 'Database Replication', desc: 'Synchronous replication to standby with automated failover under 60 seconds.' },
                      { title: 'Cross-Region Backup', desc: 'Daily snapshots replicated to secondary region (UAE) for geo-redundancy.' },
                    ].map((d) => (
                      <div key={d.title} className="p-4 bg-indigo-50 rounded-xl">
                        <p className="font-semibold text-indigo-800 mb-1">{d.title}</p>
                        <p className="text-slate-600 text-xs">{d.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// local component used in userload tab
function Building2({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1M9 21v-3a2 2 0 012-2h2a2 2 0 012 2v3" />
    </svg>
  );
}