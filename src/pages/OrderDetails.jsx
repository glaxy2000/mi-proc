import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  User,
  Calendar,
  DollarSign,
  FileText,
  Download,
  ArrowLeft,
  Phone,
  Mail,
  Star,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

export default function OrderDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('orderId') || 'ORD-2024-156';

  // Mock data - in production, fetch from API based on orderId
  const orderDetails = {
    id: orderId,
    type: 'goods',
    rfqId: 'RFQ-2024-001',
    rfqTitle: 'Construction Materials - Steel Rebar',
    status: 'in_transit',
    progress: 70,
    
    // Supplier Info
    supplier: {
      name: 'ABC Steel Co.',
      email: 'contact@abcsteel.sa',
      phone: '+966 11 234 5678',
      address: 'Industrial City, Jeddah, Saudi Arabia',
      rating: 4.8
    },
    
    // Order Details
    orderDate: 'Jan 10, 2026',
    expectedDelivery: 'Jan 15, 2026',
    deliveryAddress: 'Construction Site Alpha, Riyadh, Saudi Arabia',
    
    // Financial
    subtotal: 140000,
    tax: 10000,
    shipping: 5000,
    total: 155000,
    paymentTerms: '50% Advance, 50% on Delivery',
    paymentStatus: 'Partially Paid',
    
    // Items
    items: [
      {
        name: 'Steel Rebar Grade 60 - 16mm',
        description: 'High-strength deformed steel bars',
        quantity: 50,
        unit: 'tons',
        unitPrice: 2500,
        total: 125000
      },
      {
        name: 'Steel Rebar Grade 60 - 12mm',
        description: 'High-strength deformed steel bars',
        quantity: 10,
        unit: 'tons',
        unitPrice: 1500,
        total: 15000
      }
    ],
    
    // Shipping
    trackingNumber: 'TRK-8821-SA',
    carrier: 'Saudi Express Logistics',
    
    // Documents
    documents: [
      { name: 'Purchase Order', date: 'Jan 10, 2026', type: 'PDF' },
      { name: 'Invoice', date: 'Jan 10, 2026', type: 'PDF' },
      { name: 'Delivery Note', date: 'Jan 11, 2026', type: 'PDF' }
    ],
    
    // Timeline
    timeline: [
      { date: 'Jan 13, 2026', status: 'In Transit', description: 'Package arrived at Riyadh distribution center' },
      { date: 'Jan 12, 2026', status: 'In Transit', description: 'Package departed from Mecca sorting facility' },
      { date: 'Jan 11, 2026', status: 'Shipped', description: 'Package picked up by carrier' },
      { date: 'Jan 10, 2026', status: 'Confirmed', description: 'Order confirmed by supplier' }
    ]
  };

  const statusConfig = {
    in_transit: { bg: 'bg-indigo-100', text: 'text-indigo-700', label: 'In Transit', icon: Truck },
    in_progress: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'In Progress', icon: Clock },
    delivered: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Delivered', icon: CheckCircle2 },
    completed: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Completed', icon: CheckCircle2 }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to={createPageUrl('Orders')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Details</h1>
              <p className="text-slate-600">Order ID: {orderDetails.id}</p>
            </div>
            <Badge className={`${statusConfig[orderDetails.status].bg} ${statusConfig[orderDetails.status].text} text-lg px-4 py-2`}>
              {React.createElement(statusConfig[orderDetails.status].icon, { className: 'h-5 w-5 mr-2' })}
              {statusConfig[orderDetails.status].label}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  Order Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">RFQ Reference</p>
                    <p className="font-semibold text-slate-900">{orderDetails.rfqId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Order Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <p className="font-semibold text-slate-900">{orderDetails.orderDate}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Expected Delivery</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <p className="font-semibold text-slate-900">{orderDetails.expectedDelivery}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Payment Status</p>
                    <Badge className="bg-amber-100 text-amber-700">{orderDetails.paymentStatus}</Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">{orderDetails.rfqTitle}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    <span>Delivery: {orderDetails.deliveryAddress}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-indigo-600" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderDetails.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-slate-50 rounded-xl"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-900">{item.name}</h4>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                        <p className="text-lg font-bold text-slate-900">SAR {item.total.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>Qty: {item.quantity} {item.unit}</span>
                        <span>•</span>
                        <span>Unit Price: SAR {item.unitPrice.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                {/* Pricing Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-semibold text-slate-900">SAR {orderDetails.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">VAT (15%)</span>
                    <span className="font-semibold text-slate-900">SAR {orderDetails.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Shipping</span>
                    <span className="font-semibold text-slate-900">SAR {orderDetails.shipping.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900">Total Amount</span>
                    <span className="text-2xl font-bold text-indigo-600">SAR {orderDetails.total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <DollarSign className="h-4 w-4" />
                    <span>Payment Terms: {orderDetails.paymentTerms}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderDetails.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                        </div>
                        {index < orderDetails.timeline.length - 1 && (
                          <div className="w-0.5 h-12 bg-slate-200 my-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-slate-900">{event.status}</p>
                          <Badge variant="outline" className="text-xs">{event.date}</Badge>
                        </div>
                        <p className="text-sm text-slate-600">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {orderDetails.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{doc.name}</p>
                          <p className="text-xs text-slate-500">{doc.date} • {doc.type}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Supplier Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-indigo-600" />
                  Supplier Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{orderDetails.supplier.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="font-medium text-slate-900">{orderDetails.supplier.rating}</span>
                    <span className="text-sm text-slate-500">(245 reviews)</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">{orderDetails.supplier.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">{orderDetails.supplier.phone}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                    <span className="text-slate-600">{orderDetails.supplier.address}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Supplier
                </Button>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            {orderDetails.type === 'goods' && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-teal-600" />
                    Shipping Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Tracking Number</p>
                    <p className="font-semibold text-slate-900">{orderDetails.trackingNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Carrier</p>
                    <p className="font-semibold text-slate-900">{orderDetails.carrier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Delivery Progress</p>
                    <Progress value={orderDetails.progress} className="h-2 mb-2" />
                    <p className="text-sm text-slate-600">{orderDetails.progress}% Complete</p>
                  </div>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to={`${createPageUrl('TrackShipment')}?orderId=${orderDetails.id}&tracking=${orderDetails.trackingNumber}`}>
                      <Truck className="h-4 w-4 mr-2" />
                      Track Shipment
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                <Button className="w-full text-red-600 border-red-200 hover:bg-red-50" variant="outline" asChild>
                  <Link to={createPageUrl('Escrow')}>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Raise Dispute
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}