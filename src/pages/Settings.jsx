import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings as SettingsIcon,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Shield,
  User,
  Mail,
  Smartphone
} from 'lucide-react';

export default function Settings() {
  const [user, setUser] = React.useState({
    role: 'buyer',
    email: 'contact@smecorp.com',
    phone: '+966 XX XXX XXXX'
  });

  const userRole = user?.role || 'buyer';

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1">Manage your account preferences and settings</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-white p-1 shadow-sm">
            <TabsTrigger value="general" className="gap-2">
              <User className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Payments
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Email Address</Label>
                    <Input type="email" defaultValue={user.email} className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input type="tel" defaultValue={user.phone} className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">العربية (Arabic)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Time Zone</Label>
                    <Select defaultValue="riyadh">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="riyadh">Riyadh (GMT+3)</SelectItem>
                        <SelectItem value="dubai">Dubai (GMT+4)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            {userRole !== 'admin' && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Business Preferences</CardTitle>
                  <CardDescription>Configure your {userRole} preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userRole === 'buyer' && (
                    <>
                      <div>
                        <Label>Default Budget Currency</Label>
                        <Select defaultValue="sar">
                          <SelectTrigger className="mt-1.5">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sar">SAR - Saudi Riyal</SelectItem>
                            <SelectItem value="usd">USD - US Dollar</SelectItem>
                            <SelectItem value="eur">EUR - Euro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Auto-match suppliers for RFQs</Label>
                          <p className="text-sm text-slate-500">Automatically notify relevant suppliers</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </>
                  )}
                  {userRole === 'supplier' && (
                    <>
                      <div>
                        <Label>Business Categories</Label>
                        <Select defaultValue="construction">
                          <SelectTrigger className="mt-1.5">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="construction">Construction Materials</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="furniture">Furniture</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Receive RFQ notifications</Label>
                          <p className="text-sm text-slate-500">Get notified for matching opportunities</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Choose what updates you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'New RFQ matches', desc: 'Receive emails when new RFQs match your profile', checked: true },
                  { title: 'Bid updates', desc: 'Updates on bids you submitted or received', checked: true },
                  { title: 'Order status', desc: 'Notifications about order status changes', checked: true },
                  { title: 'Payment notifications', desc: 'Alerts for payments and wallet transactions', checked: true },
                  { title: 'Marketing emails', desc: 'Promotional offers and platform updates', checked: false }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.checked} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>Manage mobile and browser notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'Desktop notifications', desc: 'Show browser notifications', checked: true },
                  { title: 'Mobile push', desc: 'Receive notifications on your mobile device', checked: true }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.checked} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password regularly for security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Current Password</Label>
                  <Input type="password" className="mt-1.5" />
                </div>
                <div>
                  <Label>New Password</Label>
                  <Input type="password" className="mt-1.5" />
                </div>
                <div>
                  <Label>Confirm New Password</Label>
                  <Input type="password" className="mt-1.5" />
                </div>
                <div className="flex justify-end pt-4">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Update Password</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-8 w-8 text-indigo-600" />
                    <div>
                      <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-500">Not enabled</p>
                    </div>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage devices where you're currently logged in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { device: 'Chrome on Windows', location: 'Riyadh, Saudi Arabia', current: true },
                  { device: 'Safari on iPhone', location: 'Dhahran, Saudi Arabia', current: false }
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="font-medium text-slate-900">{session.device}</p>
                        <p className="text-sm text-slate-500">{session.location}</p>
                      </div>
                    </div>
                    {session.current ? (
                      <span className="text-sm text-green-600 font-medium">Current</span>
                    ) : (
                      <Button variant="outline" size="sm">Revoke</Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments */}
          <TabsContent value="payments" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Bank Accounts</CardTitle>
                <CardDescription>Manage your linked bank accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Al Rajhi Bank</p>
                    <p className="text-sm text-slate-500">Account ending in ****4567</p>
                  </div>
                  <Button variant="outline" size="sm">Remove</Button>
                </div>
                <Button variant="outline" className="w-full">
                  + Add Bank Account
                </Button>
              </CardContent>
            </Card>

            {userRole === 'supplier' && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Payment Preferences</CardTitle>
                  <CardDescription>Configure how you receive payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Default withdrawal method</Label>
                    <Select defaultValue="bank">
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="wallet">Keep in Mi-Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-withdraw earnings</Label>
                      <p className="text-sm text-slate-500">Automatically transfer to bank account</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Transaction Limits</CardTitle>
                <CardDescription>Your current transaction limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-600">Daily limit</span>
                  <span className="font-semibold text-slate-900">SAR 500,000</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-600">Monthly limit</span>
                  <span className="font-semibold text-slate-900">SAR 5,000,000</span>
                </div>
                <Button variant="outline" className="w-full">
                  Request Limit Increase
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}