import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Star,
  CheckCircle2,
  Building2,
  MapPin,
  Package,
  Shield,
  TrendingUp,
  Clock,
  Award,
  ThumbsUp,
  Ban,
  AlertCircle,
  Heart
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function Suppliers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [blacklist, setBlacklist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [blockReason, setBlockReason] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserAndBlacklist();
  }, []);

  const loadUserAndBlacklist = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      
      const blacklistData = await base44.entities.Blacklist.filter({ 
        buyer_email: currentUser.email 
      });
      setBlacklist(blacklistData);

      const favoritesData = await base44.entities.FavoriteSupplier.filter({ 
        buyer_email: currentUser.email 
      });
      setFavorites(favoritesData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const isBlacklisted = (supplierEmail) => {
    return blacklist.some(b => b.supplier_email === supplierEmail);
  };

  const isFavorite = (supplierEmail) => {
    return favorites.some(f => f.supplier_email === supplierEmail);
  };

  const handleToggleFavorite = async (supplier) => {
    setLoading(true);
    try {
      if (isFavorite(supplier.email)) {
        const favoriteEntry = favorites.find(f => f.supplier_email === supplier.email);
        await base44.entities.FavoriteSupplier.delete(favoriteEntry.id);
        toast.success(`${supplier.name} removed from favorites`);
      } else {
        await base44.entities.FavoriteSupplier.create({
          buyer_email: user.email,
          supplier_email: supplier.email,
          supplier_name: supplier.name,
          added_date: new Date().toISOString()
        });
        toast.success(`${supplier.name} added to favorites`);
      }
      await loadUserAndBlacklist();
    } catch (error) {
      toast.error('Failed to update favorites');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setShowBlockDialog(true);
  };

  const confirmBlock = async () => {
    if (!blockReason.trim()) {
      toast.error('Please provide a reason for blacklisting');
      return;
    }

    setLoading(true);
    try {
      await base44.entities.Blacklist.create({
        buyer_email: user.email,
        supplier_email: selectedSupplier.email,
        reason: blockReason,
        blacklisted_date: new Date().toISOString()
      });

      toast.success(`${selectedSupplier.name} has been blacklisted`);
      await loadUserAndBlacklist();
      setShowBlockDialog(false);
      setBlockReason('');
      setSelectedSupplier(null);
    } catch (error) {
      toast.error('Failed to blacklist supplier');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnblock = async (supplier) => {
    setLoading(true);
    try {
      const blacklistEntry = blacklist.find(b => b.supplier_email === supplier.email);
      if (blacklistEntry) {
        await base44.entities.Blacklist.delete(blacklistEntry.id);
        toast.success(`${supplier.name} has been removed from blacklist`);
        await loadUserAndBlacklist();
      }
    } catch (error) {
      toast.error('Failed to unblock supplier');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const suppliers = [
    {
      id: 1,
      email: 'abc.steel@example.com',
      name: 'ABC Steel Industries',
      category: 'Construction Materials',
      location: 'Riyadh',
      rating: 4.8,
      reviews: 156,
      verified: true,
      gold: true,
      deliveryTime: '3-5 days',
      responseRate: '98%',
      completedDeals: 342,
      specialties: ['Steel Rebar', 'Structural Steel', 'Metal Sheets'],
      performanceScore: 92,
      onTimeRate: 95,
      recommendRate: 88
    },
    {
      id: 2,
      email: 'medsupply@example.com',
      name: 'MedSupply Arabia',
      category: 'Medical Supplies',
      location: 'Jeddah',
      rating: 4.9,
      reviews: 89,
      verified: true,
      gold: true,
      deliveryTime: '1-2 days',
      responseRate: '99%',
      completedDeals: 567,
      specialties: ['PPE', 'Medical Equipment', 'Pharmaceuticals'],
      performanceScore: 96,
      onTimeRate: 98,
      recommendRate: 94
    },
    {
      id: 3,
      email: 'techparts@example.com',
      name: 'TechParts Global',
      category: 'IT & Hardware',
      location: 'Dammam',
      rating: 4.6,
      reviews: 234,
      verified: true,
      gold: false,
      deliveryTime: '5-7 days',
      responseRate: '95%',
      completedDeals: 189,
      specialties: ['Servers', 'Networking', 'Components'],
      performanceScore: 85,
      onTimeRate: 87,
      recommendRate: 82
    },
    {
      id: 4,
      email: 'industrial@example.com',
      name: 'Industrial Components Co.',
      category: 'Manufacturing',
      location: 'Riyadh',
      rating: 4.7,
      reviews: 78,
      verified: true,
      gold: false,
      deliveryTime: '7-10 days',
      responseRate: '92%',
      completedDeals: 124,
      specialties: ['Motors', 'Bearings', 'Hydraulics'],
      performanceScore: 88,
      onTimeRate: 90,
      recommendRate: 85
    },
    {
      id: 5,
      email: 'packpro@example.com',
      name: 'PackPro Solutions',
      category: 'Packaging',
      location: 'Jeddah',
      rating: 4.5,
      reviews: 167,
      verified: true,
      gold: true,
      deliveryTime: '2-4 days',
      responseRate: '97%',
      completedDeals: 456,
      specialties: ['Boxes', 'Labels', 'Custom Packaging'],
      performanceScore: 83,
      onTimeRate: 85,
      recommendRate: 80
    },
    {
      id: 6,
      email: 'officeessentials@example.com',
      name: 'Office Essentials KSA',
      category: 'Office Supplies',
      location: 'Riyadh',
      rating: 4.4,
      reviews: 312,
      verified: true,
      gold: false,
      deliveryTime: '1-3 days',
      responseRate: '94%',
      completedDeals: 789,
      specialties: ['Furniture', 'Stationery', 'Electronics'],
      performanceScore: 81,
      onTimeRate: 83,
      recommendRate: 78
    }
  ];

  const categories = [
    'All Categories',
    'Construction Materials',
    'Medical Supplies',
    'IT & Hardware',
    'Manufacturing',
    'Packaging',
    'Office Supplies'
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Suppliers</h1>
          <p className="text-slate-500 mt-1">Browse our network of suppliers (including new suppliers)</p>
        </div>

        {/* Search & Filters */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search suppliers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat.toLowerCase().replace(/ /g, '_')}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="riyadh">Riyadh</SelectItem>
                  <SelectItem value="jeddah">Jeddah</SelectItem>
                  <SelectItem value="dammam">Dammam</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-indigo-600">2,500+</p>
              <p className="text-sm text-slate-500">Total Suppliers</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-teal-600">50+</p>
              <p className="text-sm text-slate-500">Categories</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">95%</p>
              <p className="text-sm text-slate-500">Response Rate</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600">4.7</p>
              <p className="text-sm text-slate-500">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Supplier Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier, index) => (
            <motion.div
              key={supplier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center">
                        <Building2 className="h-7 w-7 text-slate-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900">{supplier.name}</h3>
                          {supplier.verified && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          )}
                        </div>
                        <p className="text-sm text-slate-500">{supplier.category}</p>
                      </div>
                    </div>
                    {supplier.gold && (
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                        <Award className="h-3 w-3 mr-1" />
                        Gold
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="font-medium">{supplier.rating}</span>
                      <span className="text-slate-400">({supplier.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <MapPin className="h-4 w-4" />
                      {supplier.location}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {supplier.specialties.map((spec, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-4 border-t">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-slate-500">
                        <TrendingUp className="h-3 w-3" />
                      </div>
                      <p className="text-xs font-medium text-emerald-600 mt-1">{supplier.performanceScore}/100</p>
                      <p className="text-xs text-slate-400">Score</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-slate-500">
                        <Clock className="h-3 w-3" />
                      </div>
                      <p className="text-xs font-medium text-slate-900 mt-1">{supplier.onTimeRate}%</p>
                      <p className="text-xs text-slate-400">On-Time</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-slate-500">
                        <ThumbsUp className="h-3 w-3" />
                      </div>
                      <p className="text-xs font-medium text-slate-900 mt-1">{supplier.recommendRate}%</p>
                      <p className="text-xs text-slate-400">Recommend</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-slate-500">
                        <Package className="h-3 w-3" />
                      </div>
                      <p className="text-xs font-medium text-slate-900 mt-1">{supplier.completedDeals}</p>
                      <p className="text-xs text-slate-400">Orders</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                      View Profile
                    </Button>
                    {user && user.role === 'buyer' && (
                      <>
                        <Button 
                          variant="outline" 
                          className={isFavorite(supplier.email) ? 
                            "border-pink-200 text-pink-600 hover:bg-pink-50" : 
                            "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }
                          onClick={() => handleToggleFavorite(supplier)}
                          disabled={loading}
                        >
                          <Heart className={`h-4 w-4 ${isFavorite(supplier.email) ? 'fill-pink-600' : ''}`} />
                        </Button>
                        {isBlacklisted(supplier.email) ? (
                          <Button 
                            variant="outline" 
                            className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                            onClick={() => handleUnblock(supplier)}
                            disabled={loading}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            className="border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() => handleBlockSupplier(supplier)}
                            disabled={loading}
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                  {isBlacklisted(supplier.email) && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                      <AlertCircle className="h-3 w-3" />
                      <span>Blacklisted - Cannot bid on your RFQs</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Verification Badge Info */}
        <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 bg-emerald-100 rounded-2xl">
              <Shield className="h-10 w-10 text-emerald-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">All Suppliers are KYC/KYB Verified</h3>
              <p className="text-slate-500">
                Every supplier on Mi-Proc undergoes mandatory verification checks to ensure legitimacy and compliance.
                This ensures safe, trustworthy B2B transactions for all ecosystem participants.
              </p>
            </div>
            <div className="flex gap-4">
              <Badge variant="outline" className="px-4 py-2">CR Verified</Badge>
              <Badge variant="outline" className="px-4 py-2">VAT Registered</Badge>
              <Badge variant="outline" className="px-4 py-2">SAC Certified</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Block Supplier Dialog */}
      <AlertDialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Blacklist Supplier</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to blacklist <strong>{selectedSupplier?.name}</strong>? 
              This supplier will not be able to bid on any of your RFQs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Reason for blacklisting *
            </label>
            <Textarea
              placeholder="e.g., Poor quality, Late deliveries, Unprofessional behavior..."
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setBlockReason('');
              setSelectedSupplier(null);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmBlock}
              disabled={loading || !blockReason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Blacklisting...' : 'Blacklist Supplier'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}