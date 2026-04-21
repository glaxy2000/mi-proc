import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Settings as SettingsIcon,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Shield,
  User,
  Mail,
  Smartphone,
  ShoppingCart
} from 'lucide-react';

const procurementCategoryOptions = [
  'Raw Materials', 'Equipment', 'Services', 'Supplies', 'IT & Software',
  'Construction Materials', 'Office Supplies', 'Marketing & Advertising'
];

export default function Settings() {
  const [user, setUser] = useState(null);
  const [procPrefs, setProcPrefs] = useState({
    monthlyBudget: '',
    preferredCategories: [],
    preferredSuppliers: '',
    specialRequirements: '',
    paymentTerms: '',
    deliveryTimeline: '',
  });
  const [bankInfo, setBankInfo] = useState({
    accountHolderName: '',
    bankName: '',
    accountType: '',
    iban: '',
    currency: 'SAR',
    fundingMethod: '',
  });

  useEffect(() => {
    // In production: const userData = await base44.auth.me(); setUser(userData);
    const path = window.location.pathname;
    if (path.includes('Supplier')) {
      setUser({
        full_name: 'Khalid Mohammed',
        email: 'khalid@abcsteel.com',
        role: 'supplier',
        phone: '+966 50 123 4567',
        company: 'ABC Steel Industries'
      });
    } else {
      setUser({
        full_name: 'Ahmed Al-Sayed',
        email: 'ahmed@smecorp.com',
        role: 'buyer',
        phone: '+966 55 987 6543',
        company: 'SME Corporation Ltd.'
      });
    }
  }, []);

  const userRole = user?.role || 'buyer';

  if (!user) {
    return <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1">Manage your account preferences and settings</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-white p-1 shadow-sm flex-wrap h-auto gap-1">
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
              Payments & Bank
            </TabsTrigger>
            {userRole === 'buyer' && (
              <TabsTrigger value="procurement" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Procurement Preferences
              </TabsTrigger>
            )}
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
                    <Label>Full Name</Label>
                    <Input 
                      value={user.full_name} 
                      onChange={(e) => setUser({...user, full_name: e.target.value})}
                      className="mt-1.5" 
                    />
                  </div>
                  <div>
                    <Label>Company Name</Label>
                    <Input 
                      value={user.company} 
                      onChange={(e) => setUser({...user, company: e.target.value})}
                      className="mt-1.5" 
                    />
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input 
                      type="email" 
                      value={user.email}
                      onChange={(e) => setUser({...user, email: e.target.value})}
                      className="mt-1.5" 
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input 
                      type="tel" 
                      value={user.phone}
                      onChange={(e) => setUser({...user, phone: e.target.value})}
                      className="mt-1.5" 
                    />
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

          {/* Payments & Bank */}
          <TabsContent value="payments" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Bank Account Linking</CardTitle>
                <CardDescription>Link your bank account for payments and disbursements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Account Holder Name</Label>
                  <Input
                    value={bankInfo.accountHolderName}
                    onChange={(e) => setBankInfo({ ...bankInfo, accountHolderName: e.target.value })}
                    placeholder="Name as it appears on bank account"
                    className="mt-1.5"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Bank Name</Label>
                    <Select value={bankInfo.bankName} onValueChange={(v) => setBankInfo({ ...bankInfo, bankName: v })}>
                      <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select bank" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alrajhi">Al Rajhi Bank</SelectItem>
                        <SelectItem value="ncb">National Commercial Bank</SelectItem>
                        <SelectItem value="samba">Samba Financial Group</SelectItem>
                        <SelectItem value="riyadbank">Riyad Bank</SelectItem>
                        <SelectItem value="alinma">Alinma Bank</SelectItem>
                        <SelectItem value="sab">Saudi British Bank</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Account Type</Label>
                    <Select value={bankInfo.accountType} onValueChange={(v) => setBankInfo({ ...bankInfo, accountType: v })}>
                      <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>IBAN</Label>
                  <Input
                    value={bankInfo.iban}
                    onChange={(e) => setBankInfo({ ...bankInfo, iban: e.target.value })}
                    placeholder="SA00 0000 0000 0000 0000 0000"
                    maxLength={34}
                    className="mt-1.5"
                  />
                  <p className="text-xs text-slate-500 mt-1">Enter your full IBAN including country code</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Account Currency</Label>
                    <Select value={bankInfo.currency} onValueChange={(v) => setBankInfo({ ...bankInfo, currency: v })}>
                      <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAR">SAR (Saudi Riyal)</SelectItem>
                        <SelectItem value="USD">USD (US Dollar)</SelectItem>
                        <SelectItem value="EUR">EUR (Euro)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Preferred Funding Method</Label>
                    <Select value={bankInfo.fundingMethod} onValueChange={(v) => setBankInfo({ ...bankInfo, fundingMethod: v })}>
                      <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select method" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                        <SelectItem value="debit_card">Debit Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Save Bank Details</Button>
                </div>
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
                      <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
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
                <Button variant="outline" className="w-full">Request Limit Increase</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Procurement Preferences (Buyer only) */}
          {userRole === 'buyer' && (
            <TabsContent value="procurement" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Procurement Preferences</CardTitle>
                  <CardDescription>Configure your procurement defaults and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Average Monthly Procurement Budget (SAR)</Label>
                    <Input
                      type="number"
                      value={procPrefs.monthlyBudget}
                      onChange={(e) => setProcPrefs({ ...procPrefs, monthlyBudget: e.target.value })}
                      placeholder="0"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">Preferred Procurement Categories</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border rounded-lg p-4">
                      {procurementCategoryOptions.map((category) => (
                        <div key={category} className="flex items-center gap-2">
                          <Checkbox
                            id={`set-${category}`}
                            checked={procPrefs.preferredCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              setProcPrefs({
                                ...procPrefs,
                                preferredCategories: checked
                                  ? [...procPrefs.preferredCategories, category]
                                  : procPrefs.preferredCategories.filter(c => c !== category)
                              });
                            }}
                          />
                          <Label htmlFor={`set-${category}`} className="text-sm font-normal cursor-pointer">{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Preferred Suppliers (Optional)</Label>
                    <Textarea
                      value={procPrefs.preferredSuppliers}
                      onChange={(e) => setProcPrefs({ ...procPrefs, preferredSuppliers: e.target.value })}
                      rows={3}
                      placeholder="List any preferred suppliers or supplier types"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label>Special Requirements (Optional)</Label>
                    <Textarea
                      value={procPrefs.specialRequirements}
                      onChange={(e) => setProcPrefs({ ...procPrefs, specialRequirements: e.target.value })}
                      rows={3}
                      placeholder="Any special requirements (e.g., local suppliers, specific certifications)"
                      className="mt-1.5"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Payment Terms Preference</Label>
                      <Select value={procPrefs.paymentTerms} onValueChange={(v) => setProcPrefs({ ...procPrefs, paymentTerms: v })}>
                        <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select payment terms" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate (Escrow)</SelectItem>
                          <SelectItem value="7days">7 Days</SelectItem>
                          <SelectItem value="14days">14 Days</SelectItem>
                          <SelectItem value="30days">30 Days</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Preferred Delivery Timeline</Label>
                      <Select value={procPrefs.deliveryTimeline} onValueChange={(v) => setProcPrefs({ ...procPrefs, deliveryTimeline: v })}>
                        <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select timeline" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-7days">1-7 Days</SelectItem>
                          <SelectItem value="1-2weeks">1-2 Weeks</SelectItem>
                          <SelectItem value="2-4weeks">2-4 Weeks</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button className="bg-indigo-600 hover:bg-indigo-700">Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}