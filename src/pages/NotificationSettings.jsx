import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone, Save, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    // Channels
    channels: {
      inApp: true,
      email: true,
      whatsapp: false,
      sms: false
    },
    // RFQ Notifications
    rfq: {
      newRFQMatches: { enabled: true, channels: ['inApp', 'email'], priority: 'high' },
      rfqDeadlineSoon: { enabled: true, channels: ['inApp', 'email', 'whatsapp'], priority: 'high' },
      rfqAwarded: { enabled: true, channels: ['inApp', 'email', 'whatsapp'], priority: 'high' },
      rfqCancelled: { enabled: true, channels: ['inApp', 'email'], priority: 'medium' },
      rfqEdited: { enabled: false, channels: ['inApp'], priority: 'low' }
    },
    // Bid Notifications
    bids: {
      newBidReceived: { enabled: true, channels: ['inApp', 'email'], priority: 'high' },
      bidShortlisted: { enabled: true, channels: ['inApp', 'email', 'whatsapp'], priority: 'high' },
      bidAccepted: { enabled: true, channels: ['inApp', 'email', 'whatsapp'], priority: 'high' },
      bidRejected: { enabled: true, channels: ['inApp', 'email'], priority: 'medium' },
      counterOfferReceived: { enabled: true, channels: ['inApp', 'email'], priority: 'high' }
    },
    // Order Notifications
    orders: {
      orderConfirmed: { enabled: true, channels: ['inApp', 'email', 'whatsapp'], priority: 'high' },
      orderShipped: { enabled: true, channels: ['inApp', 'email', 'whatsapp'], priority: 'high' },
      orderDelivered: { enabled: true, channels: ['inApp', 'email', 'whatsapp'], priority: 'high' },
      deliveryDelayed: { enabled: true, channels: ['inApp', 'email', 'whatsapp', 'sms'], priority: 'critical' },
      orderCompleted: { enabled: true, channels: ['inApp', 'email'], priority: 'medium' }
    },
    // Payment & Escrow
    payments: {
      escrowFunded: { enabled: true, channels: ['inApp', 'email'], priority: 'high' },
      paymentReleased: { enabled: true, channels: ['inApp', 'email', 'whatsapp'], priority: 'high' },
      paymentReceived: { enabled: true, channels: ['inApp', 'email', 'whatsapp'], priority: 'high' },
      lowBalance: { enabled: true, channels: ['inApp', 'email'], priority: 'medium' },
      disputeRaised: { enabled: true, channels: ['inApp', 'email', 'whatsapp', 'sms'], priority: 'critical' }
    },
    // System & Account
    system: {
      kybApproved: { enabled: true, channels: ['inApp', 'email', 'whatsapp'], priority: 'high' },
      kybRejected: { enabled: true, channels: ['inApp', 'email', 'whatsapp'], priority: 'high' },
      documentExpiring: { enabled: true, channels: ['inApp', 'email'], priority: 'medium' },
      securityAlert: { enabled: true, channels: ['inApp', 'email', 'whatsapp', 'sms'], priority: 'critical' },
      systemMaintenance: { enabled: true, channels: ['inApp', 'email'], priority: 'low' }
    },
    // Escalation Settings
    escalation: {
      enableEscalation: true,
      escalateAfterHours: 24,
      escalationChannels: ['email', 'whatsapp', 'sms']
    }
  });

  const toggleChannel = (channel) => {
    setSettings({
      ...settings,
      channels: { ...settings.channels, [channel]: !settings.channels[channel] }
    });
  };

  const toggleNotification = (category, notificationType) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [notificationType]: {
          ...settings[category][notificationType],
          enabled: !settings[category][notificationType].enabled
        }
      }
    });
  };

  const handleSave = () => {
    // In production, save to backend
    toast.success('Notification settings saved successfully');
  };

  const priorityColors = {
    critical: 'bg-red-100 text-red-700 border-red-300',
    high: 'bg-orange-100 text-orange-700 border-orange-300',
    medium: 'bg-blue-100 text-blue-700 border-blue-300',
    low: 'bg-slate-100 text-slate-700 border-slate-300'
  };

  const notificationCategories = [
    {
      key: 'rfq',
      title: 'RFQ Notifications',
      icon: Bell,
      items: [
        { key: 'newRFQMatches', label: 'New RFQ Matches Your Profile' },
        { key: 'rfqDeadlineSoon', label: 'RFQ Deadline Approaching (24h)' },
        { key: 'rfqAwarded', label: 'RFQ Awarded to Supplier' },
        { key: 'rfqCancelled', label: 'RFQ Cancelled' },
        { key: 'rfqEdited', label: 'RFQ Details Updated' }
      ]
    },
    {
      key: 'bids',
      title: 'Bid Notifications',
      icon: MessageSquare,
      items: [
        { key: 'newBidReceived', label: 'New Bid Received on Your RFQ' },
        { key: 'bidShortlisted', label: 'Your Bid Shortlisted' },
        { key: 'bidAccepted', label: 'Your Bid Accepted' },
        { key: 'bidRejected', label: 'Bid Not Selected' },
        { key: 'counterOfferReceived', label: 'Counter-Offer Received' }
      ]
    },
    {
      key: 'orders',
      title: 'Order Notifications',
      icon: CheckCircle2,
      items: [
        { key: 'orderConfirmed', label: 'Order Confirmed' },
        { key: 'orderShipped', label: 'Order Shipped' },
        { key: 'orderDelivered', label: 'Order Delivered' },
        { key: 'deliveryDelayed', label: 'Delivery Delayed (Critical)' },
        { key: 'orderCompleted', label: 'Order Completed' }
      ]
    },
    {
      key: 'payments',
      title: 'Payment & Escrow',
      icon: Smartphone,
      items: [
        { key: 'escrowFunded', label: 'Escrow Account Funded' },
        { key: 'paymentReleased', label: 'Payment Released from Escrow' },
        { key: 'paymentReceived', label: 'Payment Received in Wallet' },
        { key: 'lowBalance', label: 'Low Wallet Balance Warning' },
        { key: 'disputeRaised', label: 'Dispute Raised (Critical)' }
      ]
    },
    {
      key: 'system',
      title: 'System & Account',
      icon: Bell,
      items: [
        { key: 'kybApproved', label: 'KYB Verification Approved' },
        { key: 'kybRejected', label: 'KYB Verification Rejected' },
        { key: 'documentExpiring', label: 'Document Expiring Soon (90 days)' },
        { key: 'securityAlert', label: 'Security Alert (Login from new device)' },
        { key: 'systemMaintenance', label: 'System Maintenance Scheduled' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Notification Settings</h1>
          <p className="text-slate-600">
            Customize how and when you receive notifications about your procurement activities
          </p>
        </div>

        {/* Notification Channels */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Notification Channels</CardTitle>
            <CardDescription>Choose how you want to receive notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-indigo-600" />
                  <div>
                    <p className="font-medium">In-App Notifications</p>
                    <p className="text-sm text-slate-500">Notifications within the platform</p>
                  </div>
                </div>
                <Switch
                  checked={settings.channels.inApp}
                  onCheckedChange={() => toggleChannel('inApp')}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-slate-500">Sent to your registered email</p>
                  </div>
                </div>
                <Switch
                  checked={settings.channels.email}
                  onCheckedChange={() => toggleChannel('email')}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">WhatsApp Notifications</p>
                    <p className="text-sm text-slate-500">Messages via WhatsApp Business</p>
                  </div>
                </div>
                <Switch
                  checked={settings.channels.whatsapp}
                  onCheckedChange={() => toggleChannel('whatsapp')}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-slate-500">Critical alerts via SMS</p>
                  </div>
                </div>
                <Switch
                  checked={settings.channels.sms}
                  onCheckedChange={() => toggleChannel('sms')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Escalation Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Escalation Settings</CardTitle>
            <CardDescription>Automatically escalate overdue actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Enable Escalation</Label>
                <p className="text-sm text-slate-500">
                  Send reminders for overdue RFQ responses, pending approvals, etc.
                </p>
              </div>
              <Switch
                checked={settings.escalation.enableEscalation}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    escalation: { ...settings.escalation, enableEscalation: checked }
                  })
                }
              />
            </div>
            {settings.escalation.enableEscalation && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-900 font-medium mb-2">
                  Escalation after <span className="font-bold">{settings.escalation.escalateAfterHours} hours</span> of inactivity
                </p>
                <p className="text-xs text-amber-700">
                  Channels: Email, WhatsApp, SMS for critical actions
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Categories */}
        <div className="space-y-4">
          {notificationCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.key}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-indigo-600" />
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.items.map((item) => {
                      const notification = settings[category.key][item.key];
                      return (
                        <div key={item.key} className="flex items-center justify-between py-3 border-b last:border-b-0">
                          <div className="flex items-center gap-4 flex-1">
                            <Switch
                              checked={notification.enabled}
                              onCheckedChange={() => toggleNotification(category.key, item.key)}
                            />
                            <div className="flex-1">
                              <p className="font-medium text-slate-900">{item.label}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${priorityColors[notification.priority]}`}
                                >
                                  {notification.priority.toUpperCase()}
                                </Badge>
                                {notification.enabled && (
                                  <p className="text-xs text-slate-500">
                                    Via: {notification.channels.join(', ')}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Save Button */}
        <div className="sticky bottom-6 mt-8 flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 shadow-xl"
            size="lg"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Notification Settings
          </Button>
        </div>
      </div>
    </div>
  );
}