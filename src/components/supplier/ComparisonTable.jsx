import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingDown, TrendingUp, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ComparisonTable({ suppliers, historicalPricing }) {
  // Calculate average price per supplier
  const priceStats = useMemo(() => {
    const stats = {};
    suppliers.forEach(supplier => {
      const supplierPrices = historicalPricing.filter(
        p => p.supplier_email === supplier.supplier_email
      );
      if (supplierPrices.length > 0) {
        const avgPrice = supplierPrices.reduce((sum, p) => sum + (p.unit_price || 0), 0) / supplierPrices.length;
        stats[supplier.supplier_email] = {
          avgPrice,
          count: supplierPrices.length,
          minPrice: Math.min(...supplierPrices.map(p => p.unit_price || 0)),
          maxPrice: Math.max(...supplierPrices.map(p => p.unit_price || 0)),
        };
      }
    });
    return stats;
  }, [suppliers, historicalPricing]);

  // Find best and worst prices
  const sortedByPrice = Object.entries(priceStats)
    .sort(([, a], [, b]) => a.avgPrice - b.avgPrice);
  const bestPrice = sortedByPrice[0]?.[1].avgPrice;

  const getComplianceStatus = (supplier) => {
    const score = supplier.overall_score || 0;
    if (score >= 80) return { label: 'Compliant', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 };
    if (score >= 60) return { label: 'Fair', color: 'text-amber-600', bg: 'bg-amber-50', icon: AlertCircle };
    return { label: 'Needs Review', color: 'text-red-600', bg: 'bg-red-50', icon: AlertCircle };
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {suppliers.map((supplier, idx) => {
          const stats = priceStats[supplier.supplier_email];
          const compliance = getComplianceStatus(supplier);
          const ComplianceIcon = compliance.icon;
          
          return (
            <motion.div
              key={supplier.supplier_email}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm truncate">
                        {supplier.supplier_email.split('@')[0]}
                      </CardTitle>
                    </div>
                    {stats && stats.avgPrice === bestPrice && (
                      <Badge className="bg-emerald-100 text-emerald-700 text-xs">Best</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Rating */}
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Rating</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(supplier.average_rating || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm font-medium ml-1">
                        {supplier.average_rating?.toFixed(1) || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Average Price */}
                  {stats && (
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Avg Unit Price</p>
                      <p className="text-lg font-bold text-slate-900">
                        SAR {stats.avgPrice.toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {stats.minPrice.toFixed(2)} - {stats.maxPrice.toFixed(2)}
                      </p>
                    </div>
                  )}

                  {/* On-Time Delivery */}
                  <div>
                    <p className="text-xs text-slate-500 mb-1">On-Time Delivery</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full"
                          style={{ width: `${supplier.on_time_delivery_rate || 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900 min-w-fit">
                        {supplier.on_time_delivery_rate || 0}%
                      </span>
                    </div>
                  </div>

                  {/* Compliance Status */}
                  <div>
                    <p className="text-xs text-slate-500 mb-2">Compliance</p>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${compliance.bg}`}>
                      <ComplianceIcon className={`h-4 w-4 ${compliance.color}`} />
                      <span className={`text-sm font-medium ${compliance.color}`}>
                        {compliance.label}
                      </span>
                    </div>
                  </div>

                  {/* Overall Score */}
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Overall Score</p>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden mr-2">
                        <div
                          className={`h-full rounded-full ${
                            supplier.overall_score >= 80
                              ? 'bg-emerald-500'
                              : supplier.overall_score >= 60
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${supplier.overall_score || 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-900 min-w-fit">
                        {supplier.overall_score || 0}%
                      </span>
                    </div>
                  </div>

                  {/* Orders Count */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-slate-500">Total Orders</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {supplier.total_orders || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Completed</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {supplier.completed_orders || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Price Comparison Detail */}
      {Object.keys(priceStats).length > 0 && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Historical Pricing Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-3 font-semibold text-slate-900">Metric</th>
                    {suppliers.map(supplier => (
                      <th
                        key={supplier.supplier_email}
                        className="text-left py-3 px-3 font-semibold text-slate-900"
                      >
                        {supplier.supplier_email.split('@')[0]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-slate-50">
                    <td className="py-3 px-3 font-medium text-slate-700">Average Price</td>
                    {suppliers.map(supplier => (
                      <td key={supplier.supplier_email} className="py-3 px-3 text-slate-600">
                        {priceStats[supplier.supplier_email] ? (
                          <span className={`font-semibold ${
                            priceStats[supplier.supplier_email].avgPrice === bestPrice
                              ? 'text-emerald-600'
                              : 'text-slate-900'
                          }`}>
                            SAR {priceStats[supplier.supplier_email].avgPrice.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-slate-400">No data</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-slate-50">
                    <td className="py-3 px-3 font-medium text-slate-700">Price Range</td>
                    {suppliers.map(supplier => (
                      <td key={supplier.supplier_email} className="py-3 px-3 text-slate-600">
                        {priceStats[supplier.supplier_email] ? (
                          <span className="text-sm">
                            SAR {priceStats[supplier.supplier_email].minPrice.toFixed(2)} - {priceStats[supplier.supplier_email].maxPrice.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-slate-400">No data</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-medium text-slate-700">Transactions</td>
                    {suppliers.map(supplier => (
                      <td key={supplier.supplier_email} className="py-3 px-3 text-slate-600">
                        {priceStats[supplier.supplier_email]?.count || 0}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}