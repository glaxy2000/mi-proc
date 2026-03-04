import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Server, Database, Shield, Globe, Users, Zap, Cloud, Lock,
  ArrowRight, ArrowDown, Layers, Activity, TrendingUp, AlertCircle,
  CheckCircle2, Cpu, HardDrive, Network, BarChart3, Download, FileText, Presentation
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { jsPDF } from 'jspdf';
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

function downloadPDF() {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const W = 297; const H = 210;
  const indigo = [99, 102, 241]; const purple = [139, 92, 246]; const teal = [20, 184, 166];
  const slate = [71, 85, 105]; const light = [248, 250, 252];

  const addHeader = (title, subtitle) => {
    doc.setFillColor(...indigo);
    doc.rect(0, 0, W, 28, 'F');
    doc.setFillColor(...purple);
    doc.rect(W - 60, 0, 60, 28, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16); doc.setFont('helvetica', 'bold');
    doc.text('Mi-Proc Platform', 12, 11);
    doc.setFontSize(11); doc.setFont('helvetica', 'normal');
    doc.text(title, 12, 19);
    doc.setFontSize(9);
    doc.text('Confidential | Architecture & Capacity', W - 58, 16);
    doc.setTextColor(...slate);
    doc.setFontSize(13); doc.setFont('helvetica', 'bold');
    doc.text(subtitle, 12, 40);
    doc.setDrawColor(...indigo); doc.setLineWidth(0.5);
    doc.line(12, 43, W - 12, 43);
  };

  const box = (x, y, w, h, label, sublabel, r, g, b) => {
    doc.setFillColor(r, g, b); doc.roundedRect(x, y, w, h, 3, 3, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.text(label, x + w / 2, y + h / 2 - 1, { align: 'center' });
    if (sublabel) { doc.setFontSize(6); doc.setFont('helvetica', 'normal'); doc.text(sublabel, x + w / 2, y + h / 2 + 4, { align: 'center' }); }
    doc.setTextColor(...slate);
  };

  // ── Slide 1: Architecture ──────────────────────────────────────────────────
  addHeader('High-Level System Design & Capacity Planning', 'System Architecture — Layered Diagram');

  const layers = [
    { label: 'CLIENT LAYER', items: ['Web App (React/Vite)', 'Mobile (PWA)', 'API Clients'], color: [59, 130, 246] },
    { label: 'EDGE / SECURITY', items: ['Cloudflare CDN / WAF', 'Auth Gateway (JWT)', 'Rate Limiter'], color: [249, 115, 22] },
    { label: 'APPLICATION LAYER (Base44 BaaS)', items: ['RFQ Service', 'Bid Engine', 'Escrow Service', 'AI Assistant', 'User Service'], color: [...indigo] },
    { label: 'DATA LAYER', items: ['PostgreSQL (Primary)', 'Redis Cache', 'File Storage', 'Analytics DB'], color: [...teal] },
    { label: 'EXTERNAL INTEGRATIONS', items: ['ZATCA', 'SAMA', 'SASO', 'Email/SMS', 'AI / LLM APIs'], color: [100, 116, 139] },
  ];

  let ly = 48;
  layers.forEach((layer, li) => {
    doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(...slate);
    doc.text(layer.label, 12, ly + 5);
    const bw = Math.min(42, (W - 24 - (layer.items.length - 1) * 4) / layer.items.length);
    const totalW = layer.items.length * bw + (layer.items.length - 1) * 4;
    let bx = (W - totalW) / 2;
    layer.items.forEach(item => {
      box(bx, ly + 7, bw, 14, item, '', ...layer.color);
      bx += bw + 4;
    });
    ly += 26;
    if (li < layers.length - 1) {
      doc.setDrawColor(180, 180, 200); doc.setLineWidth(0.4);
      doc.line(W / 2, ly - 5, W / 2, ly - 1);
      doc.setFillColor(180, 180, 200);
      doc.triangle(W / 2 - 2, ly - 2, W / 2 + 2, ly - 2, W / 2, ly, 'F');
    }
  });

  // Tech stack sidebar
  doc.setFillColor(240, 240, 255);
  doc.roundedRect(225, 46, 60, 140, 3, 3, 'F');
  doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(...indigo);
  doc.text('Technology Stack', 255, 54, { align: 'center' });
  doc.setDrawColor(...indigo); doc.line(228, 56, 282, 56);
  const stack = ['Frontend: React 18 + Vite', 'CDN: Cloudflare WAF', 'API: REST + Rate Limiting', 'BaaS: Base44 Platform', 'DB: PostgreSQL + Redis', 'Storage: Supabase', 'AI: Base44 LLM + Voice', 'Payments: SAMA Escrow'];
  doc.setFont('helvetica', 'normal'); doc.setFontSize(7); doc.setTextColor(...slate);
  stack.forEach((s, i) => doc.text('• ' + s, 229, 63 + i * 10));

  doc.setFontSize(8); doc.setTextColor(150, 150, 160);
  doc.text('Page 1 of 4', W / 2, H - 5, { align: 'center' });

  // ── Slide 2: Capacity Planning ─────────────────────────────────────────────
  doc.addPage();
  addHeader('High-Level System Design & Capacity Planning', 'Capacity Planning — Tier Table & Resource Utilization');

  const tiers = [
    { tier: 'Launch (MVP)', period: 'Q1–Q2 2025', users: '< 2,000', conc: '200', rps: '500', db: '50 GB', infra: 'Single Region (Riyadh)', sla: '99.5%' },
    { tier: 'Growth', period: 'Q3 2025–Q2 2026', users: '2,000–15,000', conc: '1,500', rps: '3,000', db: '500 GB', infra: 'Multi-AZ (KSA)', sla: '99.9%' },
    { tier: 'Scale', period: 'Q3 2026+', users: '15,000–50,000', conc: '5,000', rps: '10,000', db: '2 TB+', infra: 'Multi-Region (KSA+UAE)', sla: '99.99%' },
  ];
  const headers = ['Tier', 'Period', 'Total Users', 'Concurrent', 'Req/sec', 'DB Size', 'Infrastructure', 'SLA'];
  const cols = [12, 42, 75, 108, 132, 156, 178, 240];
  const tierColors = [[16, 185, 129], [...indigo], [...purple]];

  doc.setFillColor(240, 240, 255); doc.rect(12, 47, W - 24, 9, 'F');
  doc.setFontSize(7.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(...indigo);
  headers.forEach((h, i) => doc.text(h, cols[i] + 1, 53));

  tiers.forEach((t, i) => {
    const rowY = 60 + i * 18;
    if (i % 2 === 0) { doc.setFillColor(...light); doc.rect(12, rowY - 4, W - 24, 18, 'F'); }
    doc.setFillColor(...tierColors[i]); doc.roundedRect(cols[0], rowY - 2, 26, 10, 2, 2, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(7); doc.setFont('helvetica', 'bold');
    doc.text(t.tier, cols[0] + 13, rowY + 4, { align: 'center' });
    doc.setTextColor(...slate); doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5);
    [t.period, t.users, t.conc, t.rps, t.db, t.infra].forEach((v, j) => doc.text(v, cols[j + 1] + 1, rowY + 4));
    doc.setTextColor(16, 185, 129); doc.setFont('helvetica', 'bold');
    doc.text(t.sla, cols[7] + 1, rowY + 4);
    doc.setTextColor(...slate);
  });

  // Resource utilization bars
  doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(...slate);
  doc.text('Resource Utilization Targets', 12, 108);
  doc.setDrawColor(...indigo); doc.line(12, 111, W - 12, 111);

  const metrics = [
    { label: 'CPU Utilization Target', val: 70, color: [...indigo] },
    { label: 'Memory Utilization Target', val: 75, color: [...purple] },
    { label: 'DB Connection Pool', val: 60, color: [...teal] },
    { label: 'Cache Hit Rate Target', val: 85, color: [16, 185, 129] },
    { label: 'CDN Offload Rate', val: 80, color: [245, 158, 11] },
  ];
  metrics.forEach((m, i) => {
    const mx = 12 + (i % 3) * 90; const my = 118 + Math.floor(i / 3) * 26;
    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(...slate);
    doc.text(m.label, mx, my);
    doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(...m.color);
    doc.text(m.val + '%', mx + 72, my, { align: 'right' });
    doc.setFillColor(220, 220, 235); doc.roundedRect(mx, my + 2, 78, 5, 2, 2, 'F');
    doc.setFillColor(...m.color); doc.roundedRect(mx, my + 2, 78 * m.val / 100, 5, 2, 2, 'F');
    doc.setTextColor(...slate);
  });

  doc.setFontSize(8); doc.setTextColor(150, 150, 160);
  doc.text('Page 2 of 4', W / 2, H - 5, { align: 'center' });

  // ── Slide 3: User Load ─────────────────────────────────────────────────────
  doc.addPage();
  addHeader('High-Level System Design & Capacity Planning', 'User Load — Projected Growth & Quarterly Milestones');

  const growth = [
    { month: 'Q1 25', buyers: 500, suppliers: 300, total: 800 },
    { month: 'Q2 25', buyers: 1200, suppliers: 700, total: 1900 },
    { month: 'Q3 25', buyers: 2500, suppliers: 1400, total: 3900 },
    { month: 'Q4 25', buyers: 4200, suppliers: 2300, total: 6500 },
    { month: 'Q1 26', buyers: 6800, suppliers: 3600, total: 10400 },
    { month: 'Q2 26', buyers: 10000, suppliers: 5200, total: 15200 },
    { month: 'Q3 26', buyers: 14000, suppliers: 7000, total: 21000 },
    { month: 'Q4 26', buyers: 20000, suppliers: 10000, total: 30000 },
  ];

  // KPI cards
  const kpis = [
    { label: 'Target Buyers\n(EOY 2026)', value: '20,000', color: [...indigo] },
    { label: 'Target Suppliers\n(EOY 2026)', value: '10,000', color: [...teal] },
    { label: 'Peak Concurrent\nUsers', value: '5,000', color: [...purple] },
    { label: 'Daily Active\nUsers (DAU)', value: '8,000+', color: [245, 158, 11] },
  ];
  kpis.forEach((k, i) => {
    const kx = 12 + i * 68; const ky = 47;
    doc.setFillColor(240, 240, 255); doc.roundedRect(kx, ky, 64, 24, 3, 3, 'F');
    doc.setFillColor(...k.color); doc.roundedRect(kx, ky, 64, 8, 3, 3, 'F');
    doc.rect(kx, ky + 5, 64, 3, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(12); doc.setFont('helvetica', 'bold');
    doc.text(k.value, kx + 32, ky + 20, { align: 'center' });
    doc.setTextColor(...slate); doc.setFontSize(6.5); doc.setFont('helvetica', 'normal');
    k.label.split('\n').forEach((line, li) => doc.text(line, kx + 32, ky + 28 + li * 5, { align: 'center' }));
  });

  // Bar chart
  const chartX = 12; const chartY = 85; const chartW = 180; const chartH = 80;
  const maxVal = 30000; const barW = chartW / growth.length - 4;
  doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(...slate);
  doc.text('Quarterly Total User Milestones', chartX, chartY - 3);
  doc.setFillColor(245, 247, 250); doc.rect(chartX, chartY, chartW, chartH, 'F');
  doc.setDrawColor(210, 214, 220); doc.setLineWidth(0.2);
  [0, 0.25, 0.5, 0.75, 1].forEach(p => {
    const gy = chartY + chartH - chartH * p;
    doc.line(chartX, gy, chartX + chartW, gy);
    doc.setFontSize(6); doc.setTextColor(150, 150, 160);
    doc.text((maxVal * p / 1000).toFixed(0) + 'K', chartX - 8, gy + 1);
  });
  growth.forEach((d, i) => {
    const bx = chartX + i * (barW + 4) + 2;
    const bh = (d.total / maxVal) * chartH;
    const by = chartY + chartH - bh;
    const [r, g, b] = i < 4 ? indigo : purple;
    doc.setFillColor(r, g, b); doc.roundedRect(bx, by, barW, bh, 1, 1, 'F');
    doc.setFontSize(5.5); doc.setTextColor(...slate);
    doc.text(d.month, bx + barW / 2, chartY + chartH + 5, { align: 'center' });
    doc.setTextColor(r, g, b); doc.setFontSize(5);
    doc.text((d.total >= 1000 ? (d.total / 1000).toFixed(0) + 'K' : d.total + ''), bx + barW / 2, by - 1, { align: 'center' });
  });

  // Stacked area chart (buyers vs suppliers)
  const chart2X = 200; const chart2Y = 85; const chart2W = 85; const chart2H = 80;
  doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(...slate);
  doc.text('Buyers vs Suppliers', chart2X, chart2Y - 3);
  doc.setFillColor(245, 247, 250); doc.rect(chart2X, chart2Y, chart2W, chart2H, 'F');
  const maxB = 20000;
  growth.forEach((d, i) => {
    const px = chart2X + (i / (growth.length - 1)) * chart2W;
    if (i > 0) {
      const ppx = chart2X + ((i - 1) / (growth.length - 1)) * chart2W;
      const pby = chart2Y + chart2H - (growth[i - 1].buyers / maxB) * chart2H;
      const psy = chart2Y + chart2H - (growth[i - 1].suppliers / maxB) * chart2H;
      const cby = chart2Y + chart2H - (d.buyers / maxB) * chart2H;
      const csy = chart2Y + chart2H - (d.suppliers / maxB) * chart2H;
      doc.setDrawColor(...indigo); doc.setLineWidth(1.2); doc.line(ppx, pby, px, cby);
      doc.setDrawColor(...teal); doc.line(ppx, psy, px, csy);
    }
  });
  doc.setFillColor(...indigo); doc.circle(chart2X + chart2W - 20, chart2Y + chart2H + 8, 1.5, 'F');
  doc.setFontSize(6); doc.setTextColor(...slate); doc.text('Buyers', chart2X + chart2W - 16, chart2Y + chart2H + 9);
  doc.setFillColor(...teal); doc.circle(chart2X + chart2W - 20, chart2Y + chart2H + 14, 1.5, 'F');
  doc.text('Suppliers', chart2X + chart2W - 16, chart2Y + chart2H + 15);

  doc.setFontSize(8); doc.setTextColor(150, 150, 160);
  doc.text('Page 3 of 4', W / 2, H - 5, { align: 'center' });

  // ── Slide 4: Security & Compliance ────────────────────────────────────────
  doc.addPage();
  addHeader('High-Level System Design & Capacity Planning', 'Security & Compliance — SAMA/ZATCA/SASO, SLA & Disaster Recovery');

  const secGroups = [
    { name: 'Identity & Access', items: ['OAuth 2.0 / JWT Auth', 'Role-Based Access Control', 'MFA Support', 'Session Management'] },
    { name: 'Data Security', items: ['AES-256 Encryption at Rest', 'TLS 1.3 in Transit', 'Field-level Encryption (PII)', 'Secure File Upload'] },
    { name: 'Compliance', items: ['SAMA Regulations', 'ZATCA Integration', 'SASO Standards', 'NDA Workflow'] },
    { name: 'Infrastructure', items: ['WAF & DDoS Protection', 'IP Allowlisting', 'Audit Logs', 'Vulnerability Scanning'] },
  ];
  secGroups.forEach((g, i) => {
    const gx = 12 + (i % 2) * 135; const gy = 47 + Math.floor(i / 2) * 50;
    doc.setFillColor(240, 240, 255); doc.roundedRect(gx, gy, 128, 42, 3, 3, 'F');
    doc.setFillColor(...indigo); doc.roundedRect(gx, gy, 128, 9, 3, 3, 'F');
    doc.rect(gx, gy + 6, 128, 3, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.text(g.name, gx + 64, gy + 6, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5); doc.setTextColor(...slate);
    g.items.forEach((item, ii) => {
      doc.setFillColor(16, 185, 129); doc.circle(gx + 6, gy + 16 + ii * 8, 1.5, 'F');
      doc.text(item, gx + 10, gy + 17 + ii * 8);
    });
  });

  // SLA grid
  doc.setFontSize(10); doc.setFont('helvetica', 'bold'); doc.setTextColor(...slate);
  doc.text('SLA & Availability Targets', 12, 152);
  doc.setDrawColor(...indigo); doc.line(12, 154, W - 12, 154);

  const slas = [
    { label: 'API p95 Response', val: '< 300ms', ok: true },
    { label: 'API p99 Response', val: '< 1s', ok: true },
    { label: 'Uptime (Scale)', val: '99.99%', ok: true },
    { label: 'RTO', val: '< 1 hour', ok: false },
    { label: 'RPO', val: '< 15 min', ok: false },
    { label: 'Backup Frequency', val: 'Every 6h', ok: true },
    { label: 'Max Downtime/Year', val: '~52 min', ok: true },
    { label: 'CDN Cache TTL', val: '24 hours', ok: true },
    { label: 'Incident Response', val: '< 30 min', ok: false },
  ];
  slas.forEach((s, i) => {
    const sx = 12 + (i % 3) * 94; const sy = 159 + Math.floor(i / 3) * 16;
    const c = s.ok ? [209, 250, 229] : [254, 243, 199];
    const tc = s.ok ? [6, 95, 70] : [92, 45, 5];
    doc.setFillColor(...c); doc.roundedRect(sx, sy, 90, 12, 2, 2, 'F');
    doc.setFontSize(6.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 100, 120);
    doc.text(s.label, sx + 4, sy + 5);
    doc.setFontSize(8.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(...tc);
    doc.text(s.val, sx + 4, sy + 10);
  });

  // DR cards
  const drItems = [
    { title: 'Multi-AZ Deployment', desc: 'Active-Active across 2+ AZs in KSA. Zero single point of failure.' },
    { title: 'Database Replication', desc: 'Synchronous replication to standby. Automated failover < 60s.' },
    { title: 'Cross-Region Backup', desc: 'Daily snapshots replicated to UAE for geo-redundancy.' },
  ];
  doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(...indigo);
  doc.text('Disaster Recovery & Business Continuity', 12, H - 28);
  drItems.forEach((d, i) => {
    const dx = 12 + i * 94; const dy = H - 24;
    doc.setFillColor(238, 242, 255); doc.roundedRect(dx, dy, 90, 16, 2, 2, 'F');
    doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(...indigo);
    doc.text(d.title, dx + 4, dy + 6);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(...slate); doc.setFontSize(6);
    const lines = doc.splitTextToSize(d.desc, 82);
    doc.text(lines, dx + 4, dy + 11);
  });

  doc.setFontSize(8); doc.setTextColor(150, 150, 160);
  doc.text('Page 4 of 4', W / 2, H - 5, { align: 'center' });

  doc.save('MiProc-Architecture-Capacity.pdf');
}

function downloadPPT() {
  // Generate a PowerPoint-like HTML file that opens well and can be saved as PPTX via browser print/export
  const slides = [
    {
      title: 'System Architecture',
      subtitle: 'Layered Diagram: Client → Edge → App → Data → Integrations',
      bg: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
      content: `
        <div style="display:flex;gap:16px;flex-direction:column;margin-top:8px">
          ${[
            { label: 'CLIENT LAYER', items: ['Web App (React/Vite)', 'Mobile (PWA)', 'API Clients (B2B)'], color: '#3b82f6' },
            { label: 'EDGE / SECURITY', items: ['Cloudflare CDN/WAF', 'Auth Gateway (JWT/OAuth2)', 'Rate Limiter'], color: '#f97316' },
            { label: 'APPLICATION LAYER (Base44 BaaS)', items: ['RFQ Service', 'Bid Engine', 'Escrow Service', 'AI Assistant', 'User Service'], color: '#6366f1' },
            { label: 'DATA LAYER', items: ['PostgreSQL', 'Redis Cache', 'File Storage', 'Analytics DB'], color: '#14b8a6' },
            { label: 'EXTERNAL INTEGRATIONS', items: ['ZATCA', 'SAMA', 'SASO', 'Email/SMS', 'AI/LLM APIs'], color: '#64748b' },
          ].map(l => `
            <div>
              <div style="font-size:9px;font-weight:bold;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">${l.label}</div>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                ${l.items.map(i => `<div style="background:${l.color};color:#fff;padding:6px 12px;border-radius:8px;font-size:11px;font-weight:600">${i}</div>`).join('')}
              </div>
            </div>
          `).join('<div style="text-align:center;color:#aaa;font-size:16px">▼</div>')}
        </div>
        <div style="margin-top:16px;background:#f1f5ff;border-radius:10px;padding:12px">
          <div style="font-weight:bold;color:#6366f1;margin-bottom:6px;font-size:12px">Technology Stack</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:10px;color:#475569">
            ${['Frontend: React 18, Vite, Tailwind CSS','CDN: Cloudflare WAF + DDoS','API Gateway: REST + Rate Limiting','BaaS: Base44 Platform (Deno)','DB: PostgreSQL + Redis Cache','Storage: Supabase (Docs/KYB)','AI/LLM: Base44 AI + Voice','Payments: SAMA-Compliant Escrow'].map(s=>`<div>• ${s}</div>`).join('')}
          </div>
        </div>`
    },
    {
      title: 'Capacity Planning',
      subtitle: 'Infrastructure Tiers & Resource Utilization Targets',
      bg: 'linear-gradient(135deg,#0f172a,#1e3a5f)',
      content: `
        <table style="width:100%;border-collapse:collapse;font-size:11px;margin-bottom:16px">
          <tr style="background:#6366f1;color:#fff">
            ${['Tier','Period','Total Users','Concurrent','Req/sec','DB Size','Infrastructure','SLA'].map(h=>`<th style="padding:8px 6px;text-align:left">${h}</th>`).join('')}
          </tr>
          ${[
            ['Launch (MVP)','Q1–Q2 2025','< 2,000','200','500','50 GB','Single Region (Riyadh)','99.5%','#10b981'],
            ['Growth','Q3 2025–Q2 2026','2,000–15,000','1,500','3,000','500 GB','Multi-AZ (KSA)','99.9%','#6366f1'],
            ['Scale','Q3 2026+','15,000–50,000','5,000','10,000','2 TB+','Multi-Region (KSA+UAE)','99.99%','#8b5cf6'],
          ].map((t,i)=>`<tr style="background:${i%2?'#f8fafc':'#fff'}">
            <td style="padding:7px 6px"><span style="background:${t[8]};color:#fff;padding:2px 8px;border-radius:12px;font-weight:bold;font-size:10px">${t[0]}</span></td>
            ${t.slice(1,7).map(v=>`<td style="padding:7px 6px;color:#475569">${v}</td>`).join('')}
            <td style="padding:7px 6px;font-weight:bold;color:#10b981">${t[7]}</td>
          </tr>`).join('')}
        </table>
        <div style="font-weight:bold;color:#475569;margin-bottom:8px;font-size:13px">Resource Utilization Targets</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
          ${[['CPU Utilization',70,'#6366f1'],['Memory',75,'#8b5cf6'],['DB Connection Pool',60,'#14b8a6'],['Cache Hit Rate',85,'#10b981'],['CDN Offload',80,'#f59e0b']].map(m=>`
            <div style="background:#f8fafc;border-radius:8px;padding:8px">
              <div style="display:flex;justify-content:space-between;font-size:10px;color:#64748b;margin-bottom:4px"><span>${m[0]}</span><strong style="color:${m[2]}">${m[1]}%</strong></div>
              <div style="background:#e2e8f0;border-radius:4px;height:6px"><div style="background:${m[2]};width:${m[1]}%;height:6px;border-radius:4px"></div></div>
            </div>`).join('')}
        </div>`
    },
    {
      title: 'User Load Projections',
      subtitle: 'Buyers + Suppliers Growth to 30,000 Users by EOY 2026',
      bg: 'linear-gradient(135deg,#0f766e,#14b8a6)',
      content: `
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px">
          ${[['20,000','Target Buyers\n(EOY 2026)','#6366f1'],['10,000','Target Suppliers\n(EOY 2026)','#14b8a6'],['5,000','Peak Concurrent\nUsers','#8b5cf6'],['8,000+','Daily Active\nUsers (DAU)','#f59e0b']].map(k=>`
            <div style="background:#f1f5ff;border-radius:10px;padding:12px;text-align:center;border-top:4px solid ${k[2]}">
              <div style="font-size:22px;font-weight:900;color:${k[2]}">${k[0]}</div>
              <div style="font-size:10px;color:#64748b;margin-top:4px">${k[1].replace('\n','<br>')}</div>
            </div>`).join('')}
        </div>
        <div style="font-weight:bold;color:#475569;margin-bottom:8px;font-size:12px">Quarterly User Growth (Total Users)</div>
        <div style="display:flex;align-items:flex-end;gap:4px;height:80px;background:#f8fafc;border-radius:8px;padding:8px;border-bottom:2px solid #e2e8f0">
          ${[800,1900,3900,6500,10400,15200,21000,30000].map((v,i)=>{
            const labels=['Q1 25','Q2 25','Q3 25','Q4 25','Q1 26','Q2 26','Q3 26','Q4 26'];
            const h=Math.round((v/30000)*64);
            const c=i<4?'#6366f1':'#8b5cf6';
            return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
              <div style="font-size:7px;color:${c};font-weight:bold">${v>=1000?(v/1000).toFixed(0)+'K':v}</div>
              <div style="background:${c};width:100%;height:${h}px;border-radius:3px 3px 0 0"></div>
              <div style="font-size:7px;color:#94a3b8;white-space:nowrap">${labels[i]}</div>
            </div>`;}).join('')}
        </div>`
    },
    {
      title: 'Security & Compliance',
      subtitle: 'SAMA · ZATCA · SASO Compliance | SLA Targets | Disaster Recovery',
      bg: 'linear-gradient(135deg,#1e1b4b,#312e81)',
      content: `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
          ${[
            {name:'Identity & Access',items:['OAuth 2.0 / JWT Auth','Role-Based Access Control','MFA Support','Session Management']},
            {name:'Data Security',items:['AES-256 Encryption at Rest','TLS 1.3 in Transit','Field-level Encryption (PII)','Secure File Upload']},
            {name:'Compliance',items:['SAMA Regulations','ZATCA Integration','SASO Standards','NDA Workflow']},
            {name:'Infrastructure',items:['WAF & DDoS Protection','IP Allowlisting','Audit Logs','Vulnerability Scanning']},
          ].map(g=>`
            <div style="background:#f1f5ff;border-radius:10px;padding:10px;border-left:4px solid #6366f1">
              <div style="font-weight:bold;color:#4338ca;margin-bottom:6px;font-size:11px">${g.name}</div>
              ${g.items.map(i=>`<div style="font-size:10px;color:#475569;margin-bottom:3px">✅ ${i}</div>`).join('')}
            </div>`).join('')}
        </div>
        <div style="font-weight:bold;color:#475569;font-size:11px;margin-bottom:6px">SLA Targets</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin-bottom:10px">
          ${[['API p95','< 300ms',true],['API p99','< 1s',true],['Uptime (Scale)','99.99%',true],['RTO','< 1 hour',false],['RPO','< 15 min',false],['Backup','Every 6h',true],['Downtime/Yr','~52 min',true],['CDN TTL','24 hours',true],['Incident','< 30 min',false]].map(s=>`
            <div style="background:${s[2]?'#d1fae5':'#fef3c7'};border-radius:6px;padding:6px 8px">
              <div style="font-size:9px;color:#94a3b8">${s[0]}</div>
              <div style="font-size:12px;font-weight:bold;color:${s[2]?'#065f46':'#78350f'}">${s[1]}</div>
            </div>`).join('')}
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
          ${[['Multi-AZ Deployment','Active-Active across 2+ AZs in KSA for zero single point of failure.'],['Database Replication','Synchronous replication to standby with automated failover < 60 seconds.'],['Cross-Region Backup','Daily snapshots replicated to UAE region for geo-redundancy.']].map(d=>`
            <div style="background:#eef2ff;border-radius:8px;padding:8px">
              <div style="font-size:10px;font-weight:bold;color:#4338ca;margin-bottom:4px">${d[0]}</div>
              <div style="font-size:9px;color:#64748b">${d[1]}</div>
            </div>`).join('')}
        </div>`
    }
  ];

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Mi-Proc Platform Architecture & Capacity Planning</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background:#1e1b4b; display:flex; flex-direction:column; align-items:center; padding:20px; gap:20px; }
  .slide { width:960px; min-height:540px; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.4); }
  .slide-header { padding:28px 32px 20px; color:#fff; }
  .slide-header h1 { font-size:24px; font-weight:900; margin-bottom:4px; }
  .slide-header p { font-size:13px; opacity:0.85; }
  .slide-body { padding:16px 28px 20px; }
  .slide-num { font-size:11px; color:#94a3b8; text-align:center; margin-top:8px; }
  .top-bar { background:#111827; padding:12px 20px; display:flex; justify-content:space-between; align-items:center; }
  .top-bar img { height:28px; }
  .top-bar span { color:#94a3b8; font-size:12px; }
  @media print { body { background:#fff; padding:0; } .slide { box-shadow:none; page-break-after:always; border-radius:0; width:100%; } }
</style>
</head>
<body>
<div class="top-bar">
  <span style="color:#fff;font-weight:bold;font-size:16px">🔷 Mi-Proc Platform</span>
  <span>Architecture & Capacity Planning — Confidential</span>
</div>
${slides.map((s, i) => `
<div class="slide">
  <div class="slide-header" style="background:${s.bg}">
    <div style="font-size:11px;opacity:0.7;margin-bottom:4px">SLIDE ${i + 1} OF ${slides.length}</div>
    <h1>${s.title}</h1>
    <p>${s.subtitle}</p>
  </div>
  <div class="slide-body">${s.content}</div>
  <div class="slide-num">Mi-Proc Platform Architecture v1.0 | KSA B2B Procurement | Confidential</div>
</div>`).join('')}
<div style="color:#94a3b8;font-size:12px;text-align:center;padding:12px">To save as PDF or PPTX: File → Print → Save as PDF, or open in PowerPoint via Insert → Object</div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'MiProc-Architecture-Capacity.html';
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}

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
            <div className="flex flex-col gap-3 items-end">
              <div className="grid grid-cols-3 gap-3 text-center">
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
              <div className="flex gap-2 mt-1">
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-2 bg-white text-indigo-700 font-semibold text-sm px-4 py-2 rounded-lg shadow hover:bg-indigo-50 transition-all"
                >
                  <FileText className="h-4 w-4" />
                  Download PDF
                </button>
                <button
                  onClick={downloadPPT}
                  className="flex items-center gap-2 bg-white/20 border border-white/30 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
                >
                  <Download className="h-4 w-4" />
                  Download PPT (HTML)
                </button>
              </div>
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