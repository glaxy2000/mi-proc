import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Heart,
  Star,
  Building2,
  MapPin,
  Trash2,
  Edit,
  Plus,
  CheckCircle2,
  Award,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

export default function FavoriteSuppliers() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [editingFavorite, setEditingFavorite] = useState(null);
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('my-favorites');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);

      const favoritesData = await base44.entities.FavoriteSupplier.filter({
        buyer_email: currentUser.email
      });
      setFavorites(favoritesData);
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

  const isFavorite = (supplierEmail) => {
    return favorites.some(f => f.supplier_email === supplierEmail);
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

  const handleAddSelectedToFavorites = async () => {
    if (selectedSuppliers.length === 0) {
      toast.error('Please select at least one supplier');
      return;
    }

    setLoading(true);
    try {
      const newFavorites = selectedSuppliers.filter(email => !isFavorite(email));
      
      for (const supplierEmail of newFavorites) {
        const supplier = allSuppliers.find(s => s.email === supplierEmail);
        await base44.entities.FavoriteSupplier.create({
          buyer_email: user.email,
          supplier_email: supplierEmail,
          supplier_name: supplier.name,
          added_date: new Date().toISOString()
        });
      }

      toast.success(`${newFavorites.length} supplier(s) added to favorites`);
      setSelectedSuppliers([]);
      await loadData();
    } catch (error) {
      toast.error('Failed to add favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (favorite) => {
    setLoading(true);
    try {
      await base44.entities.FavoriteSupplier.delete(favorite.id);
      toast.success('Supplier removed from favorites');
      await loadData();
    } catch (error) {
      toast.error('Failed to remove favorite');
    } finally {
      setLoading(false);
    }
  };

  const handleEditNotes = (favorite) => {
    setEditingFavorite(favorite);
    setNotes(favorite.notes || '');
    setShowNotesDialog(true);
  };

  const handleSaveNotes = async () => {
    setLoading(true);
    try {
      await base44.entities.FavoriteSupplier.update(editingFavorite.id, {
        notes: notes
      });
      toast.success('Notes updated');
      setShowNotesDialog(false);
      await loadData();
    } catch (error) {
      toast.error('Failed to update notes');
    } finally {
      setLoading(false);
    }
  };

  const filteredSuppliers = allSuppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteSuppliers = allSuppliers.filter(s => 
    favorites.some(f => f.supplier_email === s.email)
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Heart className="h-8 w-8 text-pink-600 fill-pink-600" />
            Favorite Suppliers
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your preferred suppliers for faster RFQ assignments
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Favorites</p>
                  <p className="text-2xl font-bold text-pink-600">{favorites.length}</p>
                </div>
                <Heart className="h-10 w-10 text-pink-600 fill-pink-100" />
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
            <TabsTrigger value="my-favorites">
              My Favorites ({favorites.length})
            </TabsTrigger>
            <TabsTrigger value="add-suppliers">
              Add from Suppliers
            </TabsTrigger>
          </TabsList>

          {/* My Favorites Tab */}
          <TabsContent value="my-favorites" className="space-y-4">
            {favoriteSuppliers.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    No Favorite Suppliers Yet
                  </h3>
                  <p className="text-slate-500 mb-4">
                    Add suppliers to your favorites for quick access and exclusive RFQ targeting
                  </p>
                  <Button onClick={() => setActiveTab('add-suppliers')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Suppliers
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {favoriteSuppliers.map((supplier) => {
                  const favorite = favorites.find(f => f.supplier_email === supplier.email);
                  return (
                    <Card key={supplier.id} className="border-2 border-pink-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center">
                              <Building2 className="h-7 w-7 text-pink-600" />
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
                          <Heart className="h-5 w-5 text-pink-600 fill-pink-600" />
                        </div>

                        <div className="flex items-center gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span className="font-medium">{supplier.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500">
                            <MapPin className="h-4 w-4" />
                            {supplier.location}
                          </div>
                        </div>

                        {favorite?.notes && (
                          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-xs font-medium text-amber-800 mb-1">Private Notes:</p>
                            <p className="text-sm text-amber-900">{favorite.notes}</p>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1"
                            onClick={() => handleEditNotes(favorite)}
                          >
                            <Edit className="h-3 w-3 mr-2" />
                            {favorite?.notes ? 'Edit Notes' : 'Add Notes'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleRemoveFavorite(favorite)}
                            disabled={loading}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Add Suppliers Tab */}
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
                    onClick={handleAddSelectedToFavorites}
                    disabled={loading || selectedSuppliers.length === 0}
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Add {selectedSuppliers.length > 0 ? `${selectedSuppliers.length} ` : ''}to Favorites
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
                    isSelected(supplier.email) ? 'border-2 border-indigo-500 bg-indigo-50' : ''
                  } ${isFavorite(supplier.email) ? 'opacity-50' : ''}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="pt-1">
                        <Checkbox
                          checked={isSelected(supplier.email)}
                          onCheckedChange={() => toggleSelection(supplier.email)}
                          disabled={isFavorite(supplier.email)}
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
                                {isFavorite(supplier.email) && (
                                  <Badge className="bg-pink-100 text-pink-700">
                                    <Heart className="h-3 w-3 mr-1 fill-pink-700" />
                                    Already in Favorites
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

      {/* Notes Dialog */}
      <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Supplier Notes</DialogTitle>
            <DialogDescription>
              Add private notes about {editingFavorite?.supplier_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Best pricing for steel, fast delivery, reliable quality..."
              rows={5}
            />
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowNotesDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveNotes} disabled={loading}>
                {loading ? 'Saving...' : 'Save Notes'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}