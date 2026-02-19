import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Ban,
  Star,
  Building2,
  MapPin,
  CheckCircle2,
  Award,
  TrendingUp,
  AlertCircle,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

export default function BlacklistSuppliers() {
  const [user, setUser] = useState(null);
  const [blacklist, setBlacklist] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [blockReason, setBlockReason] = useState('');
  const [activeTab, setActiveTab] = useState('blacklisted');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);

      const blacklistData = await base44.entities.Blacklist.filter({
        buyer_email: currentUser.email
      });
      setBlacklist(blacklistData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const allSuppliers = [
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
      performanceScore: 92,
      onTimeRate: 95,
      specialties: ['Steel Rebar', 'Structural Steel', 'Metal Sheets']
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
      performanceScore: 96,
      onTimeRate: 98,
      specialties: ['PPE', 'Medical Equipment', 'Pharmaceuticals']
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
      performanceScore: 85,
      onTimeRate: 87,
      specialties: ['Servers', 'Networking', 'Components']
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
      performanceScore: 88,
      onTimeRate: 90,
      specialties: ['Motors', 'Bearings', 'Hydraulics']
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
      performanceScore: 83,
      onTimeRate: 85,
      specialties: ['Boxes', 'Labels', 'Custom Packaging']
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
      performanceScore: 81,
      onTimeRate: 83,
      specialties: ['Furniture', 'Stationery', 'Electronics']
    }
  ];

  const isBlacklisted = (supplierEmail) => {
    return blacklist.some(b => b.supplier_email === supplierEmail);
  };

  const isSelected = (supplierEmail) => {
    return selectedSuppliers.includes(supplierEmail);
  };

  const toggleSelection = (supplierEmail) => {
    if (isSelected(supplierEmail)) {
      setSelectedSuppliers(selectedSuppliers.filter(e => e !== supplierEmail));
    } else {
      setSelectedSuppliers([...selectedSuppliers, supplierEmail]);
    }
  };

  const handleBlockSelected = () => {
    if (selectedSuppliers.length === 0) {
      toast.error('Please select at least one supplier');
      return;
    }
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

    setLoading(true);
    const results = { success: 0, failed: 0 };
    try {
      const newBlacklist = selectedSuppliers.filter(email => !isBlacklisted(email));
      
      for (const supplierEmail of newBlacklist) {
        try {
          const payload = {
            buyer_email: user.email,
            supplier_email: supplierEmail,
            reason: blockReason.trim()
          };
          console.log('Creating blacklist:', payload);
          const created = await base44.entities.Blacklist.create(payload);
          console.log('Blacklist created:', created);
          results.success++;
        } catch (err) {
          console.error(`Failed to blacklist ${supplierEmail}:`, err);
          results.failed++;
        }
      }

      if (results.success > 0) {
        toast.success(`${results.success} supplier(s) blacklisted`);
      }
      if (results.failed > 0) {
        toast.error(`${results.failed} failed to blacklist`);
      }
      setSelectedSuppliers([]);
      setBlockReason('');
      setShowBlockDialog(false);
      await loadData();
    } catch (error) {
      console.error('Blacklist error:', error);
      toast.error(`Failed: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUnblock = async (blacklistEntry) => {
    setLoading(true);
    try {
      await base44.entities.Blacklist.delete(blacklistEntry.id);
      toast.success('Supplier removed from blacklist');
      await loadData();
    } catch (error) {
      toast.error('Failed to remove from blacklist');
    } finally {
      setLoading(false);
    }
  };

  const filteredSuppliers = allSuppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const blacklistedSuppliers = allSuppliers.filter(s => 
    blacklist.some(b => b.supplier_email === s.email)
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Ban className="h-8 w-8 text-red-600" />
            Blacklisted Suppliers
          </h1>
          <p className="text-slate-500 mt-1">
            Manage suppliers who cannot bid on your RFQs
          </p>
        </div>

        {/* Info Banner */}
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <Shield className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-900 mb-1">How Blacklisting Works</p>
            <p className="text-sm text-red-700">
              Blacklisted suppliers will not be able to see or bid on any of your RFQs. 
              This is a company-specific setting and does not affect other buyers.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Blacklisted</p>
                  <p className="text-2xl font-bold text-red-600">{blacklist.length}</p>
                </div>
                <Ban className="h-10 w-10 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Selected</p>
                  <p className="text-2xl font-bold text-indigo-600">{selectedSuppliers.length}</p>
                </div>
                <CheckCircle2 className="h-10 w-10 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Available</p>
                  <p className="text-2xl font-bold text-slate-900">{allSuppliers.length}</p>
                </div>
                <Building2 className="h-10 w-10 text-slate-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="blacklisted">
              Blacklisted ({blacklist.length})
            </TabsTrigger>
            <TabsTrigger value="add-suppliers">
              Add to Blacklist
            </TabsTrigger>
          </TabsList>

          {/* Blacklisted Tab */}
          <TabsContent value="blacklisted" className="space-y-4">
            {blacklistedSuppliers.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Ban className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    No Blacklisted Suppliers
                  </h3>
                  <p className="text-slate-500 mb-4">
                    You haven't blacklisted any suppliers yet
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {blacklistedSuppliers.map((supplier) => {
                  const blacklistEntry = blacklist.find(b => b.supplier_email === supplier.email);
                  return (
                    <Card key={supplier.id} className="border-2 border-red-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                              <Building2 className="h-7 w-7 text-red-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-slate-900">{supplier.name}</h3>
                                {supplier.verified && (
                                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                )}
                                <Badge className="bg-red-100 text-red-700">
                                  <Ban className="h-3 w-3 mr-1" />
                                  Blacklisted
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-500">{supplier.category}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                  <span className="font-medium">{supplier.rating}</span>
                                </div>
                                <div className="flex items-center gap-1 text-slate-500">
                                  <MapPin className="h-4 w-4" />
                                  {supplier.location}
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                            onClick={() => handleUnblock(blacklistEntry)}
                            disabled={loading}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Remove from Blacklist
                          </Button>
                        </div>

                        {blacklistEntry?.reason && (
                          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-xs font-medium text-red-800 mb-1">
                                  Reason for Blacklisting:
                                </p>
                                <p className="text-sm text-red-900">{blacklistEntry.reason}</p>
                                <p className="text-xs text-red-600 mt-2">
                                  Blacklisted on: {new Date(blacklistEntry.blacklisted_date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Add to Blacklist Tab */}
          <TabsContent value="add-suppliers" className="space-y-6">
            {/* Search and Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      placeholder="Search suppliers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    onClick={handleBlockSelected}
                    disabled={loading || selectedSuppliers.length === 0}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Ban className="h-4 w-4 mr-2" />
                    Blacklist {selectedSuppliers.length > 0 ? `${selectedSuppliers.length} ` : ''}Supplier(s)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Supplier List with Checkboxes */}
            <div className="space-y-4">
              {filteredSuppliers.map((supplier) => (
                <Card 
                  key={supplier.id}
                  className={`transition-all ${
                    isSelected(supplier.email) ? 'border-2 border-red-500 bg-red-50' : ''
                  } ${isBlacklisted(supplier.email) ? 'opacity-50' : ''}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="pt-1">
                        <Checkbox
                          checked={isSelected(supplier.email)}
                          onCheckedChange={() => toggleSelection(supplier.email)}
                          disabled={isBlacklisted(supplier.email)}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                              <Building2 className="h-6 w-6 text-slate-500" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-slate-900">{supplier.name}</h3>
                                {supplier.verified && (
                                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                )}
                                {isBlacklisted(supplier.email) && (
                                  <Badge className="bg-red-100 text-red-700">
                                    <Ban className="h-3 w-3 mr-1" />
                                    Already Blacklisted
                                  </Badge>
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

                        <div className="flex items-center gap-6 text-sm mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span className="font-medium">{supplier.rating}</span>
                            <span className="text-slate-400">({supplier.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500">
                            <MapPin className="h-4 w-4" />
                            {supplier.location}
                          </div>
                          <div className="flex items-center gap-1 text-emerald-600">
                            <TrendingUp className="h-4 w-4" />
                            {supplier.performanceScore}/100
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {supplier.specialties.map((spec, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Block Confirmation Dialog */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Blacklist Suppliers</DialogTitle>
            <DialogDescription>
              You are about to blacklist {selectedSuppliers.length} supplier(s). 
              They will not be able to see or bid on your RFQs.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Reason for blacklisting *
              </label>
              <Textarea
                placeholder="e.g., Poor quality, Late deliveries, Unprofessional behavior..."
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowBlockDialog(false);
                  setBlockReason('');
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmBlock}
                disabled={loading || !blockReason.trim()}
                className="bg-red-600 hover:bg-red-700"
              >
                {loading ? 'Blacklisting...' : 'Confirm Blacklist'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}