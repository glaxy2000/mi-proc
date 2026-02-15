import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingDown, TrendingUp, Calendar, Package, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

export default function HistoricPricingView({ itemName }) {
  const [historicData, setHistoricData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(itemName || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadData();
  }, [searchTerm]);

  const loadData = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);

      if (searchTerm) {
        const data = await base44.entities.HistoricPricing.filter({
          buyer_email: currentUser.email,
          item_name: { $regex: searchTerm, $options: 'i' }
        }, '-order_date', 50);
        setHistoricData(data);
      }
    } catch (error) {
      console.error('Error loading historic pricing:', error);
    }
  };

  const groupedBySupplier = historicData.reduce((acc, item) => {
    if (!acc[item.supplier_email]) {
      acc[item.supplier_email] = {
        name: item.supplier_name,
        orders: []
      };
    }
    acc[item.supplier_email].orders.push(item);
    return acc;
  }, {});

  const getAveragePrice = (orders) => {
    const total = orders.reduce((sum, order) => sum + order.unit_price, 0);
    return (total / orders.length).toFixed(2);
  };

  const getLowestPrice = (orders) => {
    return Math.min(...orders.map(o => o.unit_price)).toFixed(2);
  };

  const getTrend = (orders) => {
    if (orders.length < 2) return null;
    const sorted = [...orders].sort((a, b) => new Date(a.order_date) - new Date(b.order_date));
    const first = sorted[0].unit_price;
    const last = sorted[sorted.length - 1].unit_price;
    return ((last - first) / first * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search item name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {historicData.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No historic pricing data found for this item</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Total Orders</p>
                    <p className="text-2xl font-bold text-slate-900">{historicData.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Lowest Price</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {Math.min(...historicData.map(h => h.unit_price)).toFixed(2)} SAR
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Suppliers</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {Object.keys(groupedBySupplier).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {Object.entries(groupedBySupplier).map(([email, data]) => {
              const trend = getTrend(data.orders);
              return (
                <Card key={email}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{data.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{data.orders.length} orders</Badge>
                        {trend && (
                          <Badge className={
                            parseFloat(trend) > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                          }>
                            {parseFloat(trend) > 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(parseFloat(trend))}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-500">Average Price</p>
                        <p className="text-lg font-semibold text-slate-900">
                          {getAveragePrice(data.orders)} SAR
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Lowest Price</p>
                        <p className="text-lg font-semibold text-green-600">
                          {getLowestPrice(data.orders)} SAR
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-slate-700 mb-3">Order History</p>
                      <div className="space-y-2">
                        {data.orders.slice(0, 5).map((order, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm p-2 bg-slate-50 rounded">
                            <div>
                              <span className="font-medium">{order.quantity} {order.item_description}</span>
                              <span className="text-slate-500 ml-2">
                                • {format(new Date(order.order_date), 'MMM d, yyyy')}
                              </span>
                            </div>
                            <span className="font-semibold">{order.unit_price} SAR</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}