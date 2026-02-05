import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  FileText,
  Clock,
  Users,
  DollarSign,
  Eye,
  MessageSquare,
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RFQList() {
  const [activeTab, setActiveTab] = useState('all');

  const rfqs = [
    {
      id: 'RFQ-2024-001',
      title: 'Construction Materials - Steel Rebar 500 Units',
      category: 'Construction Materials',
      status: 'active',
      quotes: 8,
      value: 'SAR 150,000 - 200,000',
      deadline: '3 days left',
      created: 'Jan 10, 2026',
      topQuote: 'SAR 165,000',
      blind: true
    },
    {
      id: 'RFQ-2024-002',
      title: 'IT Hardware - Server Infrastructure',
      category: 'IT & Hardware',
      status: 'negotiating',
      quotes: 5,
      value: 'SAR 45,000 - 60,000',
      deadline: '5 days left',
      created: 'Jan 8, 2026',
      topQuote: 'SAR 48,500',
      blind: true
    },
    {
      id: 'RFQ-2024-003',
      title: 'Medical Supplies - PPE Bulk Order',
      category: 'Medical Supplies',
      status: 'completed',
      quotes: 12,
      value: 'SAR 85,000',
      deadline: 'Closed',
      created: 'Jan 5, 2026',
      topQuote: 'SAR 82,000',
      blind: false
    },
    {
      id: 'RFQ-2024-004',
      title: 'Raw Materials - Aluminum Sheets',
      category: 'Manufacturing',
      status: 'pending',
      quotes: 0,
      value: 'SAR 200,000 - 250,000',
      deadline: '7 days left',
      created: 'Jan 12, 2026',
      topQuote: '-',
      blind: true
    },
    {
      id: 'RFQ-2024-005',
      title: 'Office Furniture - Executive Suite',
      category: 'Office Supplies',
      status: 'active',
      quotes: 6,
      value: 'SAR 35,000 - 50,000',
      deadline: '2 days left',
      created: 'Jan 11, 2026',
      topQuote: 'SAR 38,500',
      blind: true
    }
  ];

  const statusConfig = {
    active: { bg: 'bg-teal-100', text: 'text-teal-700', icon: Clock },
    negotiating: { bg: 'bg-amber-100', text: 'text-amber-700', icon: MessageSquare },
    completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle2 },
    pending: { bg: 'bg-slate-100', text: 'text-slate-700', icon: AlertCircle }
  };

  const filteredRFQs = activeTab === 'all' ? rfqs : rfqs.filter(r => r.status === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My RFQs</h1>
            <p className="text-slate-500 mt-1">Manage your procurement requests</p>
          </div>
          <Link to={createPageUrl('CreateRFQ')}>
            <Button className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Create New RFQ
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{rfqs.length}</p>
                  <p className="text-xs text-slate-500">Total RFQs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Clock className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{rfqs.filter(r => r.status === 'active').length}</p>
                  <p className="text-xs text-slate-500">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{rfqs.reduce((a, b) => a + b.quotes, 0)}</p>
                  <p className="text-xs text-slate-500">Total Quotes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">SAR 515K</p>
                  <p className="text-xs text-slate-500">Total Value</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Tabs */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input placeholder="Search RFQs..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All ({rfqs.length})</TabsTrigger>
                <TabsTrigger value="active">Active ({rfqs.filter(r => r.status === 'active').length})</TabsTrigger>
                <TabsTrigger value="negotiating">Negotiating ({rfqs.filter(r => r.status === 'negotiating').length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({rfqs.filter(r => r.status === 'completed').length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({rfqs.filter(r => r.status === 'pending').length})</TabsTrigger>
              </TabsList>

              <div className="space-y-4">
                {filteredRFQs.map((rfq, index) => {
                  const StatusIcon = statusConfig[rfq.status].icon;
                  return (
                    <motion.div
                      key={rfq.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <FileText className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-slate-900">{rfq.title}</h3>
                              {rfq.blind && (
                                <Badge variant="outline" className="text-xs">
                                  <Eye className="h-3 w-3 mr-1" />
                                  Blind
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                              <span>{rfq.id}</span>
                              <span>•</span>
                              <span>{rfq.category}</span>
                              <span>•</span>
                              <span>{rfq.created}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                          <div className="text-center">
                            <p className="text-lg font-semibold text-slate-900">{rfq.quotes}</p>
                            <p className="text-xs text-slate-500">Quotes</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-indigo-600">{rfq.topQuote}</p>
                            <p className="text-xs text-slate-500">Best Quote</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-slate-900">{rfq.value}</p>
                            <p className="text-xs text-slate-500">Budget</p>
                          </div>
                          <Badge className={`${statusConfig[rfq.status].bg} ${statusConfig[rfq.status].text}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {rfq.status}
                          </Badge>
                          <div className="text-sm text-slate-500">{rfq.deadline}</div>
                          
                          <div className="flex gap-2">
                            <Link to={createPageUrl('Negotiations')}>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </Link>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>Edit RFQ</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem>Extend Deadline</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Cancel RFQ</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}