import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
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
  AlertCircle,
  Loader2
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
import { format } from 'date-fns';

export default function RFQList() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRFQs = async () => {
      setLoading(true);
      const [goodsRFQs, servicesRFQs] = await Promise.all([
        base44.entities.GoodsRFQ.list('-created_date'),
        base44.entities.ServicesRFQ.list('-created_date'),
      ]);
      const combined = [
        ...goodsRFQs.map(r => ({ ...r, rfqType: 'goods' })),
        ...servicesRFQs.map(r => ({ ...r, rfqType: 'services' })),
      ].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
      setRfqs(combined);
      setLoading(false);
    };
    fetchRFQs();
  }, []);

  const statusConfig = {
    active: { bg: 'bg-teal-100', text: 'text-teal-700', icon: Clock },
    negotiating: { bg: 'bg-amber-100', text: 'text-amber-700', icon: MessageSquare },
    completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle2 },
    draft: { bg: 'bg-slate-100', text: 'text-slate-600', icon: FileText },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle },
  };

  const getDeadlineLabel = (deadline) => {
    if (!deadline) return '-';
    const diff = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 'Closed';
    if (diff === 0) return 'Due today';
    return `${diff} day${diff === 1 ? '' : 's'} left`;
  };

  const filteredRFQs = rfqs.filter(r => {
    const matchesTab = activeTab === 'all' || r.status === activeTab;
    const matchesSearch = !searchQuery || r.title?.toLowerCase().includes(searchQuery.toLowerCase()) || r.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

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
            <Button className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
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
                  <p className="text-2xl font-bold text-slate-900">{rfqs.filter(r => r.status === 'negotiating').length}</p>
                  <p className="text-xs text-slate-500">Negotiating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{rfqs.filter(r => r.status === 'completed').length}</p>
                  <p className="text-xs text-slate-500">Completed</p>
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
                <Input
                  placeholder="Search RFQs..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All ({rfqs.length})</TabsTrigger>
                <TabsTrigger value="active">Active ({rfqs.filter(r => r.status === 'active').length})</TabsTrigger>
                <TabsTrigger value="draft">Draft ({rfqs.filter(r => r.status === 'draft').length})</TabsTrigger>
                <TabsTrigger value="negotiating">Negotiating ({rfqs.filter(r => r.status === 'negotiating').length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({rfqs.filter(r => r.status === 'completed').length})</TabsTrigger>
              </TabsList>

              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                </div>
              ) : filteredRFQs.length === 0 ? (
                <div className="text-center py-16">
                  <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">No RFQs found</p>
                  <p className="text-sm text-slate-400 mt-1">Create your first RFQ to get started</p>
                  <Link to={createPageUrl('CreateRFQ')}>
                    <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New RFQ
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRFQs.map((rfq, index) => {
                    const status = rfq.status || 'draft';
                    const config = statusConfig[status] || statusConfig.draft;
                    const StatusIcon = config.icon;
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
                                <Badge variant="outline" className="text-xs capitalize">{rfq.rfqType}</Badge>
                              </div>
                              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                                <span>{rfq.category}</span>
                                <span>•</span>
                                <span>{rfq.created_date ? format(new Date(rfq.created_date), 'MMM d, yyyy') : '-'}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                            <div className="text-center">
                              <p className="text-sm font-medium text-slate-900">
                                {rfq.budget ? `SAR ${rfq.budget.toLocaleString()}` : '-'}
                              </p>
                              <p className="text-xs text-slate-500">Budget</p>
                            </div>
                            <Badge className={`${config.bg} ${config.text}`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status}
                            </Badge>
                            <div className="text-sm text-slate-500">{getDeadlineLabel(rfq.deadline)}</div>
                            
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
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}