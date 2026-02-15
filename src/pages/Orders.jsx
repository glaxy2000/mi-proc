import React from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Eye,
  MapPin,
  Star,
  Building2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import RatingModal from '../components/supplier/RatingModal';

export default function Orders() {
  const [ratingModalOpen, setRatingModalOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [orderType, setOrderType] = React.useState('all'); // all, goods, services
  
  const orders = [
    {
      id: 'ORD-2024-156',
      type: 'goods',
      rfqTitle: 'Construction Materials - Steel Rebar',
      supplier: 'ABC Steel Co.',
      supplier_email: 'supplier1@example.com',
      orderDate: 'Jan 10, 2026',
      totalAmount: 'SAR 150,000',
      status: 'in_transit',
      progress: 70,
      trackingNumber: 'TRK-8821-SA',
      estimatedDelivery: 'Jan 15, 2026'
    },
    {
      id: 'ORD-2024-155',
      type: 'services',
      rfqTitle: 'IT Consulting Services - System Integration',
      supplier: 'TechConsult Ltd.',
      supplier_email: 'supplier2@example.com',
      orderDate: 'Jan 8, 2026',
      totalAmount: 'SAR 45,000',
      status: 'in_progress',
      progress: 30,
      trackingNumber: 'N/A',
      estimatedDelivery: 'Feb 28, 2026',
      milestones: [
        { name: 'Requirements Analysis', status: 'completed' },
        { name: 'System Design', status: 'in_progress' },
        { name: 'Implementation', status: 'pending' }
      ]
    },
    {
      id: 'ORD-2024-154',
      type: 'goods',
      rfqTitle: 'Medical Supplies - PPE',
      supplier: 'MedSupply International',
      supplier_email: 'supplier3@example.com',
      orderDate: 'Jan 5, 2026',
      totalAmount: 'SAR 85,000',
      status: 'delivered',
      progress: 100,
      trackingNumber: 'TRK-8819-SA',
      estimatedDelivery: 'Delivered'
    }
  ];

  const filteredOrders = orders.filter(order => 
    orderType === 'all' || order.type === orderType
  );

  const statusConfig = {
    awaiting_shipment: {
      bg: 'bg-amber-100',
      text: 'text-amber-700',
      label: 'Awaiting Shipment',
      icon: Clock
    },
    in_transit: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-700',
      label: 'In Transit',
      icon: Truck
    },
    in_progress: {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      label: 'In Progress',
      icon: Clock
    },
    delivered: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-700',
      label: 'Delivered',
      icon: CheckCircle2
    },
    completed: {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      label: 'Completed',
      icon: CheckCircle2
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Management</h1>
          <p className="text-slate-600">Track active and completed orders (Goods & Services)</p>
          
          {/* Order Type Tabs */}
          <div className="flex gap-2 mt-4">
            <Button
              variant={orderType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setOrderType('all')}
            >
              All Orders
            </Button>
            <Button
              variant={orderType === 'goods' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setOrderType('goods')}
            >
              <Package className="h-4 w-4 mr-2" />
              Goods Orders
            </Button>
            <Button
              variant={orderType === 'services' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setOrderType('services')}
            >
              <Building2 className="h-4 w-4 mr-2" />
              Services Orders
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Orders', value: '12', icon: Package, color: 'bg-indigo-500' },
            { label: 'In Transit', value: '5', icon: Truck, color: 'bg-teal-500' },
            { label: 'Delivered', value: '28', icon: CheckCircle2, color: 'bg-emerald-500' },
            { label: 'Pending Confirmation', value: '3', icon: Clock, color: 'bg-amber-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-slate-50 border-b">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-slate-500">Order ID</p>
                        <p className="font-semibold text-slate-900">{order.id}</p>
                      </div>
                      <div className="h-8 w-px bg-slate-200" />
                      <div>
                        <p className="text-sm text-slate-500">Supplier</p>
                        <p className="font-semibold text-slate-900">{order.supplier}</p>
                      </div>
                      <div className="h-8 w-px bg-slate-200" />
                      <Badge variant="outline" className={order.type === 'goods' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}>
                        {order.type === 'goods' ? '📦 Goods' : '🛠️ Services'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={`${statusConfig[order.status].bg} ${statusConfig[order.status].text}`}>
                        {React.createElement(statusConfig[order.status].icon, { className: 'h-3 w-3 mr-1' })}
                        {statusConfig[order.status].label}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">Total Amount</p>
                        <p className="text-2xl font-bold text-slate-900">{order.totalAmount}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="font-semibold text-slate-900 mb-2">{order.rfqTitle}</h3>
                    <div className="flex items-center gap-6 text-sm text-slate-600">
                      <span>Order Date: {order.orderDate}</span>
                      <span>•</span>
                      <span>Est. Delivery: {order.estimatedDelivery}</span>
                      {order.trackingNumber !== 'Pending' && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Tracking: {order.trackingNumber}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">Order Progress</span>
                      <span className="font-medium">{order.progress}%</span>
                    </div>
                    <Progress value={order.progress} className="h-2" />
                  </div>

                  <div className="flex items-center gap-3">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {order.type === 'goods' && order.status === 'in_transit' && (
                      <Button size="sm" variant="outline">
                        <Truck className="h-4 w-4 mr-2" />
                        Track Shipment
                      </Button>
                    )}
                    {order.type === 'services' && order.status === 'in_progress' && (
                      <Button size="sm" variant="outline" className="text-purple-600">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        View Milestones
                      </Button>
                    )}
                    {order.status === 'delivered' && (
                      <>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Confirm Delivery
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedOrder(order);
                            setRatingModalOpen(true);
                          }}
                        >
                          <Star className="h-4 w-4 mr-2" />
                          Rate Supplier
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Invoice
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 ml-auto">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Raise Dispute
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Rating Modal */}
        {selectedOrder && (
          <RatingModal
            open={ratingModalOpen}
            onClose={() => {
              setRatingModalOpen(false);
              setSelectedOrder(null);
            }}
            order={selectedOrder}
            onRatingSubmitted={() => {
              // Refresh orders list if needed
              console.log('Rating submitted successfully');
            }}
          />
        )}
      </div>
    </div>
  );
}