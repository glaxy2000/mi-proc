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
  Heart,
  Sparkles
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
  const [filterType, setFilterType] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  useEffect(() => {
    loadUserAndBlacklist();
  }, []);

  const loadUserAndBlacklist = async () => {
    try {
      const currentUser = await base44.auth.me();
      console.log('Current user:', currentUser);
      setUser(currentUser);
      
      if (!currentUser || !currentUser.email) {
        console.error('No user email found');
        return;
      }

      const blacklistData = await base44.entities.Blacklist.filter({ 
        buyer_email: currentUser.email 
      });
      console.log('Blacklist data loaded:', blacklistData);
      setBlacklist(blacklistData);

      const favoritesData = await base44.entities.FavoriteSupplier.filter({ 
        buyer_email: currentUser.email 
      });
      console.log('Favorites data loaded:', favoritesData);
      setFavorites(favoritesData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load user data');
    }
  };

  const isBlacklisted = (supplierEmail) => {
    return blacklist.some(b => b.supplier_email === supplierEmail);
  };

  const isFavorite = (supplierEmail) => {
    return favorites.some(f => f.supplier_email === supplierEmail);
  };

  const handleToggleFavorite = async (supplier) => {
    if (!user || !user.email) {
      toast.error('User not authenticated');
      return;
    }

    setLoading(true);
    try {
      if (isFavorite(supplier.email)) {
        const favoriteEntry = favorites.find(f => f.supplier_email === supplier.email);
        if (favoriteEntry && favoriteEntry.id) {
          await base44.entities.FavoriteSupplier.delete(favoriteEntry.id);
          toast.success(`${supplier.name} removed from favorites`);
          await loadUserAndBlacklist();
        } else {
          toast.error('Favorite entry not found');
          setLoading(false);
          return;
        }
      } else {
        const payload = {
          buyer_email: user.email,
          supplier_email: supplier.email,
          supplier_name: supplier.name || 'Unknown'
        };
        console.log('Creating favorite with payload:', payload);
        const newFavorite = await base44.entities.FavoriteSupplier.create(payload);
        console.log('Favorite created successfully:', newFavorite);
        toast.success(`${supplier.name} added to favorites`);
        await loadUserAndBlacklist();
      }
    } catch (error) {
      console.error('Toggle favorite error details:', error);
      toast.error(`Failed: ${error.message || 'Unknown error'}`);
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

    if (!user || !user.email) {
      toast.error('User not authenticated');
      return;
    }

    if (!selectedSupplier || !selectedSupplier.email) {
      toast.error('Invalid supplier selection');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        buyer_email: user.email,
        supplier_email: selectedSupplier.email,
        reason: blockReason.trim()
      };
      console.log('Creating blacklist with payload:', payload);
      const newBlacklist = await base44.entities.Blacklist.create(payload);
      console.log('Blacklist created successfully:', newBlacklist);

      toast.success(`${selectedSupplier.name} has been blacklisted`);
      setShowBlockDialog(false);
      setBlockReason('');
      setSelectedSupplier(null);
      await loadUserAndBlacklist();
    } catch (error) {
      console.error('Blacklist error details:', error);
      toast.error(`Failed: ${error.message || 'Unknown error'}`);
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

  const supplierNames = [
    'Al-Noor', 'Al-Amal', 'Al-Rajhi', 'Al-Safa', 'Global Trade', 'Prime Industries', 
    'Tech Solutions', 'Quality Materials', 'Express Logistics', 'Precision Manufacturing', 
    'Desert Supplies', 'Modern Engineering', 'Elite Consultants', 'Swift Delivery',
    'Advanced Systems', 'ProSupply', 'TechHub', 'BuildRight', 'EcoSource', 'SmartLogistics'
  ];

  const categoryList = [
    'Construction Materials', 'Medical Supplies', 'IT & Hardware', 'Manufacturing',
    'Packaging', 'Office Supplies', 'Electronics', 'Furniture', 'Raw Materials',
    'Industrial Equipment', 'Consulting', 'Logistics'
  ];

  const locationList = ['Riyadh', 'Jeddah', 'Dammam', 'Abha', 'Taif', 'Khobar'];

  const specialtiesList = [
    ['Steel Rebar', 'Structural Steel', 'Metal Sheets'],
    ['PPE', 'Medical Equipment', 'Pharmaceuticals'],
    ['Servers', 'Networking', 'Components'],
    ['Motors', 'Bearings', 'Hydraulics'],
    ['Boxes', 'Labels', 'Custom Packaging'],
    ['Furniture', 'Stationery', 'Electronics'],
    ['Transformers', 'Cables', 'Switches'],
    ['Pipes', 'Fittings', 'Valves'],
    ['Chemicals', 'Solvents', 'Compounds'],
    ['Fabrics', 'Textiles', 'Materials']
  ];

  const baseSuppliers = [
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
      isNew: false,
      joinedDate: '2023-05-10',
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
      isNew: true,
      joinedDate: '2026-01-15',
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
      isNew: false,
      joinedDate: '2024-03-20',
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
      isNew: true,
      joinedDate: '2026-02-01',
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
      isNew: false,
      joinedDate: '2023-11-12',
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
      isNew: false,
      joinedDate: '2024-08-05',
      deliveryTime: '1-3 days',
      responseRate: '94%',
      completedDeals: 789,
      specialties: ['Furniture', 'Stationery', 'Electronics'],
      performanceScore: 81,
      onTimeRate: 83,
      recommendRate: 78
    }
  ];

  const suppliers = [
    ...baseSuppliers,
    ...Array.from({ length: 994 }, (_, i) => {
      const idx = i + 7;
      const nameBase = supplierNames[i % supplierNames.length];
      const numSuffix = Math.floor(i / supplierNames.length) + 1;
      
      return {
        id: idx,
        email: `supplier-${idx}@example.com`,
        name: `${nameBase} ${numSuffix}`,
        category: categoryList[i % categoryList.length],
        location: locationList[i % locationList.length],
        rating: (3.5 + Math.random() * 1.4).toFixed(1),
        reviews: Math.floor(Math.random() * 500) + 10,
        verified: true,
        gold: i % 5 === 0,
        isNew: i % 20 === 0,
        joinedDate: new Date(2023 + Math.floor(i / 500), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        deliveryTime: `${Math.floor(Math.random() * 10) + 1}-${Math.floor(Math.random() * 10) + 11} days`,
        responseRate: `${Math.floor(Math.random() * 20) + 80}%`,
        completedDeals: Math.floor(Math.random() * 1000) + 50,
        specialties: specialtiesList[i % specialtiesList.length],
        performanceScore: Math.floor(Math.random() * 30) + 70,
        onTimeRate: Math.floor(Math.random() * 30) + 70,
        recommendRate: Math.floor(Math.random() * 30) + 65
      };
    })
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

  const filteredSuppliers = suppliers.filter(supplier => {
    // Search filter
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter === 'all' || 
                           supplier.category.toLowerCase() === categoryFilter.toLowerCase().replace(/_/g, ' ');
    
    // Location filter
    const matchesLocation = locationFilter === 'all' || 
                           supplier.location.toLowerCase() === locationFilter.toLowerCase();
    
    // Type filter
    let matchesType = true;
    if (filterType === 'favorites') {
      matchesType = isFavorite(supplier.email);
    } else if (filterType === 'blacklisted') {
      matchesType = isBlacklisted(supplier.email);
    } else if (filterType === 'new') {
      matchesType = supplier.isNew;
    } else if (filterType === 'verified') {
      matchesType = supplier.verified;
    }

    return matchesSearch && matchesCategory && matchesLocation && matchesType;
  });

  const filterTabs = [
    { id: 'all', label: 'All Suppliers', count: suppliers.length, icon: Building2 },
    { id: 'favorites', label: 'Favorites', count: favorites.length, icon: Heart },
    { id: 'new', label: 'New Suppliers', count: suppliers.filter(s => s.isNew).length, icon: Sparkles },
    { id: 'blacklisted', label: 'Blacklisted', count: blacklist.length, icon: Ban },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Suppliers Directory</h1>
          <p className="text-slate-500 mt-1">Browse and manage your supplier network</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  filterType === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <Icon className={`h-4 w-4 ${filterType === tab.id ? 'text-white' : 'text-slate-400'}`} />
                {tab.label}
                <Badge 
                  className={filterType === tab.id 
                    ? "bg-white/20 text-white" 
                    : "bg-slate-100 text-slate-600"
                  }
                >
                  {tab.count}
                </Badge>
              </button>
            );
          })}
        </div>

        {/* Search & Filters */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search suppliers by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
              <Select value={locationFilter} onValueChange={setLocationFilter}>
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
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-indigo-600">{filteredSuppliers.length}</p>
              <p className="text-sm text-slate-500">Showing</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-pink-600">{favorites.length}</p>
              <p className="text-sm text-slate-500">Favorites</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">{suppliers.filter(s => s.isNew).length}</p>
              <p className="text-sm text-slate-500">New Suppliers</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{blacklist.length}</p>
              <p className="text-sm text-slate-500">Blacklisted</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600">4.7</p>
              <p className="text-sm text-slate-500">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Results Header */}
        {filteredSuppliers.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Building2 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No Suppliers Found</h3>
              <p className="text-slate-500">Try adjusting your filters or search query</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing {filteredSuppliers.length} {filteredSuppliers.length === 1 ? 'supplier' : 'suppliers'}
              </p>
            </div>

            {/* Supplier Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSuppliers.map((supplier, index) => (
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
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        isFavorite(supplier.email) ? 'bg-pink-100' : 
                        isBlacklisted(supplier.email) ? 'bg-red-100' :
                        'bg-slate-100'
                      }`}>
                        <Building2 className={`h-7 w-7 ${
                          isFavorite(supplier.email) ? 'text-pink-600' : 
                          isBlacklisted(supplier.email) ? 'text-red-600' :
                          'text-slate-500'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-slate-900">{supplier.name}</h3>
                          {supplier.verified && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          )}
                          {supplier.isNew && (
                            <Badge className="bg-purple-100 text-purple-700">
                              <Sparkles className="h-3 w-3 mr-1" />
                              New
                            </Badge>
                          )}
                          {isFavorite(supplier.email) && (
                            <Heart className="h-4 w-4 text-pink-600 fill-pink-600" />
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
                  {isFavorite(supplier.email) && !isBlacklisted(supplier.email) && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-pink-600 bg-pink-50 px-3 py-2 rounded-lg">
                      <Heart className="h-3 w-3 fill-pink-600" />
                      <span>In your favorites</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
              ))}
            </div>
          </>
        )}

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