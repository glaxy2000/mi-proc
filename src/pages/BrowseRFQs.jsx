import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Search,
  Filter,
  Calendar,
  Package,
  MapPin,
  TrendingUp,
  Eye,
  FileText,
  Building2,
  DollarSign
} from 'lucide-react';

export default function BrowseRFQs() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');
  const [selectedRegion, setSelectedRegion] = React.useState('all');

  const rfqs = [
    {
      id: 'RFQ-2024-156',
      title: 'Office Supplies - Bulk Order',
      category: 'Office Supplies',
      status: 'active',
      biddingEnds: '2025-02-15',
      items: 12,
      estimatedValue: 'SAR 45,000',
      location: 'Riyadh',
      buyer: 'Anonymous',
      description: 'Looking for quality office supplies including paper, pens, folders, and desk accessories.',
      isBlind: true
    },
    {
      id: 'RFQ-2024-157',
      title: 'Industrial Equipment Parts',
      category: 'Manufacturing',
      status: 'active',
      biddingEnds: '2025-02-18',
      items: 8,
      estimatedValue: 'SAR 125,000',
      location: 'Dammam',
      buyer: 'Industrial Corp',
      description: 'Spare parts for industrial machinery and equipment maintenance.',
      isBlind: false
    },
    {
      id: 'RFQ-2024-158',
      title: 'Medical Supplies Package',
      category: 'Healthcare',
      status: 'active',
      biddingEnds: '2025-02-20',
      items: 25,
      estimatedValue: 'SAR 89,000',
      location: 'Jeddah',
      buyer: 'Anonymous',
      description: 'Medical consumables and supplies for healthcare facility.',
      isBlind: true
    },
    {
      id: 'RFQ-2024-159',
      title: 'Construction Materials',
      category: 'Construction',
      status: 'active',
      biddingEnds: '2025-02-12',
      items: 15,
      estimatedValue: 'SAR 210,000',
      location: 'Riyadh',
      buyer: 'BuildTech LLC',
      description: 'Cement, steel reinforcement, and construction materials.',
      isBlind: false
    },
    {
      id: 'RFQ-2024-160',
      title: 'IT Hardware & Software',
      category: 'Technology',
      status: 'active',
      biddingEnds: '2025-02-22',
      items: 10,
      estimatedValue: 'SAR 156,000',
      location: 'Khobar',
      buyer: 'Anonymous',
      description: 'Computers, software licenses, and networking equipment.',
      isBlind: true
    }
  ];

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    closing_soon: 'bg-orange-100 text-orange-700',
    closed: 'bg-slate-100 text-slate-600'
  };

  const tabs = [
    { id: 'all', label: 'All RFQs', count: 5 },
    { id: 'blind', label: 'Blind RFQs', count: 3 },
    { id: 'closing_soon', label: 'Closing Soon', count: 1 }
  ];

  const filteredRFQs = rfqs.filter(rfq => {
    // Filter by tab
    if (activeTab === 'blind' && !rfq.isBlind) return false;
    if (activeTab === 'closing_soon') {
      const daysUntilEnd = Math.ceil((new Date(rfq.biddingEnds) - new Date()) / (1000 * 60 * 60 * 24));
      if (daysUntilEnd > 3) return false;
    }
    
    // Filter by region
    if (selectedRegion !== 'all') {
      const locationRegionMap = {
        'Riyadh': 'riyadh',
        'Jeddah': 'jeddah',
        'Dammam': 'eastern',
        'Khobar': 'eastern',
        'Mecca': 'mecca',
        'Medina': 'medina'
      };
      const rfqRegion = locationRegionMap[rfq.location] || rfq.location.toLowerCase();
      if (rfqRegion !== selectedRegion) return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Browse RFQs</h1>
          <p className="text-slate-600">Discover new opportunities and submit competitive bids</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Active RFQs</p>
                  <p className="text-2xl font-bold text-slate-900">5</p>
                </div>
                <FileText className="h-10 w-10 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Value</p>
                  <p className="text-2xl font-bold text-slate-900">SAR 625K</p>
                </div>
                <DollarSign className="h-10 w-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Blind RFQs</p>
                  <p className="text-2xl font-bold text-slate-900">3</p>
                </div>
                <Eye className="h-10 w-10 text-teal-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Closing Soon</p>
                  <p className="text-2xl font-bold text-slate-900">1</p>
                </div>
                <Calendar className="h-10 w-10 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Search RFQs by title, category, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="office">Office Supplies</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="riyadh">Riyadh Region</SelectItem>
                  <SelectItem value="jeddah">Jeddah Region</SelectItem>
                  <SelectItem value="eastern">Eastern Province</SelectItem>
                  <SelectItem value="mecca">Mecca Region</SelectItem>
                  <SelectItem value="medina">Medina Region</SelectItem>
                  <SelectItem value="northern">Northern Region</SelectItem>
                  <SelectItem value="southern">Southern Region</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
              <Badge className="ml-2 bg-white/20">{tab.count}</Badge>
            </button>
          ))}
        </div>

        {/* RFQ List */}
        <div className="space-y-4">
          {filteredRFQs.map((rfq) => (
            <Card key={rfq.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{rfq.title}</h3>
                      <Badge className={statusColors[rfq.status]}>
                        Active
                      </Badge>
                      {rfq.isBlind && (
                        <Badge className="bg-purple-100 text-purple-700">
                          <Eye className="h-3 w-3 mr-1" />
                          Blind RFQ
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{rfq.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{rfq.id}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        <span>{rfq.items} items</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{rfq.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span>{rfq.buyer}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Closes: {rfq.biddingEnds}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm text-slate-600 mb-1">Estimated Value</p>
                    <p className="text-xl font-bold text-indigo-600">{rfq.estimatedValue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t">
                  <Link to={createPageUrl('RFQDetails')} className="flex-1">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Submit Bid
                    </Button>
                  </Link>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}