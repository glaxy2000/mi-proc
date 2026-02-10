import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Calendar,
  Shield,
  Award,
  Star,
  Edit,
  Camera
} from 'lucide-react';

export default function Profile() {
  // In production, get user from base44.auth.me()
  const [user, setUser] = React.useState({
    full_name: 'SME Corporation',
    email: 'contact@smecorp.com',
    role: 'buyer',
    phone: '+966 XX XXX XXXX',
    company: 'SME Corporation Ltd.',
    industry: 'Construction',
    address: 'Al Kifah Tower, King Fahd Road, Dhahran 34232',
    registrationDate: '2024-01-15',
    verificationStatus: 'verified',
    rating: 4.8,
    completedTransactions: 24,
    totalSpend: 'SAR 2.4M'
  });

  const userRole = user?.role || 'buyer';

  const getRoleBadge = (role) => {
    switch(role) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-700">Administrator</Badge>;
      case 'buyer':
        return <Badge className="bg-indigo-100 text-indigo-700">Verified Buyer</Badge>;
      case 'supplier':
        return <Badge className="bg-teal-100 text-teal-700">Verified Supplier</Badge>;
      default:
        return <Badge>User</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
          <p className="text-slate-600 mt-1">Manage your account information</p>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {user.full_name?.charAt(0)}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-slate-100 hover:bg-slate-50">
                  <Camera className="h-4 w-4 text-slate-600" />
                </button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{user.full_name}</h2>
                    <div className="flex items-center gap-2 mb-3">
                      {getRoleBadge(userRole)}
                      {user.verificationStatus === 'verified' && (
                        <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          KYB Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail className="h-5 w-5" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone className="h-5 w-5" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Building2 className="h-5 w-5" />
                    <span>{user.company}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Calendar className="h-5 w-5" />
                    <span>Member since {new Date(user.registrationDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Company Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-indigo-600" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-500">Company Name</label>
                <p className="text-slate-900 mt-1">{user.company}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500">Industry</label>
                <p className="text-slate-900 mt-1">{user.industry}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-500">Address</label>
                <p className="text-slate-900 mt-1 flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-slate-400" />
                  {user.address}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-600" />
                {userRole === 'buyer' ? 'Buyer Statistics' : userRole === 'supplier' ? 'Supplier Statistics' : 'Platform Statistics'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  <span className="text-slate-600">Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-slate-900">{user.rating}</span>
                  <span className="text-slate-400">/5.0</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Completed Transactions</span>
                <span className="text-xl font-bold text-slate-900">{user.completedTransactions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">{userRole === 'buyer' ? 'Total Spend' : 'Total Earnings'}</span>
                <span className="text-xl font-bold text-green-600">{user.totalSpend}</span>
              </div>
            </CardContent>
          </Card>

          {/* Verification Documents */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-600" />
                Verification Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Commercial Registration (CR)', status: 'verified' },
                { name: 'Tax Registration Certificate', status: 'verified' },
                { name: 'Bank Account Verification', status: 'verified' },
                { name: 'Trade License', status: 'pending' }
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-900">{doc.name}</span>
                  <Badge className={doc.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                    {doc.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Account Security */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-600" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">Password</p>
                  <p className="text-sm text-slate-500">Last changed 30 days ago</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                  <p className="text-sm text-slate-500">Not enabled</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}