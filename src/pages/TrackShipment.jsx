import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package,
  Truck,
  MapPin,
  CheckCircle2,
  Clock,
  Building2,
  Phone,
  Mail,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TrackShipment() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('orderId') || 'ORD-2024-156';
  const trackingNumber = searchParams.get('tracking') || 'TRK-8821-SA';

  const shipmentDetails = {
    orderId: orderId,
    trackingNumber: trackingNumber,
    rfqTitle: 'Construction Materials - Steel Rebar',
    supplier: 'ABC Steel Co.',
    carrier: 'Saudi Express Logistics',
    currentLocation: 'Riyadh Distribution Center',
    estimatedDelivery: 'Jan 15, 2026',
    status: 'in_transit',
    weight: '2,500 kg',
    packageCount: 15,
    origin: 'Jeddah, Saudi Arabia',
    destination: 'Riyadh, Saudi Arabia'
  };

  const trackingHistory = [
    {
      date: 'Jan 13, 2026 - 2:30 PM',
      location: 'Riyadh Distribution Center',
      status: 'In Transit',
      description: 'Package arrived at distribution center',
      completed: true
    },
    {
      date: 'Jan 12, 2026 - 8:15 AM',
      location: 'Mecca Sorting Facility',
      status: 'In Transit',
      description: 'Package departed from sorting facility',
      completed: true
    },
    {
      date: 'Jan 11, 2026 - 4:45 PM',
      location: 'Jeddah Processing Center',
      status: 'Picked Up',
      description: 'Package picked up from supplier',
      completed: true
    },
    {
      date: 'Jan 10, 2026 - 11:00 AM',
      location: 'Supplier Warehouse',
      status: 'Order Placed',
      description: 'Order confirmed and ready for pickup',
      completed: true
    }
  ];

  const carrierContact = {
    phone: '+966 11 234 5678',
    email: 'support@saudiexpress.sa',
    website: 'www.saudiexpress.sa'
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Track Shipment</h1>
          <p className="text-slate-600">Real-time tracking for your order</p>
        </div>

        {/* Shipment Overview */}
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">
                  {shipmentDetails.trackingNumber}
                </CardTitle>
                <p className="text-sm text-slate-600">Order ID: {shipmentDetails.orderId}</p>
              </div>
              <Badge className="bg-indigo-600 text-white">
                <Truck className="h-4 w-4 mr-2" />
                In Transit
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">{shipmentDetails.rfqTitle}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Building2 className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">Supplier:</span>
                    <span className="font-medium text-slate-900">{shipmentDetails.supplier}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Truck className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">Carrier:</span>
                    <span className="font-medium text-slate-900">{shipmentDetails.carrier}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Package className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">Packages:</span>
                    <span className="font-medium text-slate-900">{shipmentDetails.packageCount} packages ({shipmentDetails.weight})</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Origin</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <p className="font-semibold text-slate-900">{shipmentDetails.origin}</p>
                  </div>
                </div>
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <p className="text-xs text-indigo-600 mb-1">Current Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-indigo-600" />
                    <p className="font-semibold text-indigo-900">{shipmentDetails.currentLocation}</p>
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl">
                  <p className="text-xs text-emerald-600 mb-1">Destination</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    <p className="font-semibold text-emerald-900">{shipmentDetails.destination}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estimated Delivery */}
        <Card className="border-0 shadow-lg mb-6 bg-gradient-to-r from-emerald-50 to-teal-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-600 rounded-xl">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Estimated Delivery</p>
                  <p className="text-2xl font-bold text-emerald-900">{shipmentDetails.estimatedDelivery}</p>
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Confirm Delivery
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Timeline */}
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle>Tracking History</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
              
              <div className="space-y-6">
                {trackingHistory.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-12"
                  >
                    <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      event.completed ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}>
                      {event.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      ) : (
                        <Clock className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-slate-900">{event.status}</p>
                        <Badge variant="outline" className="text-xs">{event.date}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-1">{event.description}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Carrier Contact */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-indigo-600" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-sm text-slate-600 mb-4">Contact the carrier for any questions about your shipment</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <Phone className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="font-semibold text-slate-900">{carrierContact.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <Mail className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="font-semibold text-slate-900">{carrierContact.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <Truck className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="text-xs text-slate-500">Website</p>
                  <p className="font-semibold text-slate-900">{carrierContact.website}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}