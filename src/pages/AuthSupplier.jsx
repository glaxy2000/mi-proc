import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { Package, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AuthSupplier() {
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Sign In State
  const [signinData, setSigninData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [signinErrors, setSigninErrors] = useState({});

  // Sign Up State
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    businessType: '',
    registerAsBoth: false,
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [signupErrors, setSignupErrors] = useState({});

  const validatePassword = (password) => {
    const minLength = password.length >= 12;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUppercase && hasLowercase && hasNumber && hasSpecial
    };
  };

  const handleSignin = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!signinData.email) newErrors.email = 'Email is required';
    if (!signinData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setSigninErrors(newErrors);
      return;
    }

    // Simulate sign in
    localStorage.setItem('selectedRole', 'supplier');
    window.location.href = createPageUrl('Dashboard');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const newErrors = {};
    const passwordValidation = validatePassword(signupData.password);

    if (!signupData.email) newErrors.email = 'Email is required';
    if (!passwordValidation.isValid) newErrors.password = 'Password does not meet requirements';
    if (signupData.password !== signupData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!signupData.businessType) newErrors.businessType = 'Business type is required';
    if (!signupData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to Terms of Service';
    if (!signupData.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to Privacy Policy';

    if (Object.keys(newErrors).length > 0) {
      setSignupErrors(newErrors);
      return;
    }

    // Store dual registration preference
    if (signupData.registerAsBoth) {
      localStorage.setItem('dualRegistration', 'true');
    }

    window.location.href = createPageUrl('SupplierOnboarding');
  };

  const passwordValidation = validatePassword(signupData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <Link to={createPageUrl('Home')} className="inline-flex items-center gap-2 mb-6">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698475e8a83c0e60c7a78100/def2d3f5f_MI-logo-color.png" 
              alt="MI Technologies" 
              className="h-8"
            />
            <span className="font-bold text-slate-900">Mi-Proc</span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Supplier Portal</h1>
          <p className="text-slate-600">Sign in or create your supplier account</p>
        </div>

        <Card className="border-0 shadow-xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-teal-50 border-b pb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Package className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <CardTitle>Supplier Account</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Access your supplier dashboard</p>
                </div>
              </div>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="p-6">
              <TabsContent value="signin">
                <form onSubmit={handleSignin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email Address</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={signinData.email}
                      onChange={(e) => setSigninData({ ...signinData, email: e.target.value })}
                      className={signinErrors.email ? 'border-red-500' : ''}
                    />
                    {signinErrors.email && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {signinErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showPassword ? 'text' : 'password'}
                        value={signinData.password}
                        onChange={(e) => setSigninData({ ...signinData, password: e.target.value })}
                        className={signinErrors.password ? 'border-red-500' : ''}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {signinErrors.password && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {signinErrors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="rememberMe"
                        checked={signinData.rememberMe}
                        onCheckedChange={(checked) => setSigninData({ ...signinData, rememberMe: checked })}
                      />
                      <Label htmlFor="rememberMe" className="text-sm font-normal">Remember me</Label>
                    </div>
                    <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
                  </div>

                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 h-12">
                    Sign In
                  </Button>

                  <div className="text-center text-sm text-slate-600">
                    Are you a buyer?{' '}
                    <Link to={createPageUrl('AuthBuyer')} className="text-teal-600 hover:underline font-medium">
                      Go to Buyer Portal
                    </Link>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address *</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className={signupErrors.email ? 'border-red-500' : ''}
                    />
                    {signupErrors.email && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {signupErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className={signupErrors.password ? 'border-red-500' : ''}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="signup-confirm"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        className={signupErrors.confirmPassword ? 'border-red-500' : ''}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {signupErrors.confirmPassword && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {signupErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select
                      value={signupData.businessType}
                      onValueChange={(value) => setSignupData({ ...signupData, businessType: value })}
                    >
                      <SelectTrigger className={signupErrors.businessType ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sole_proprietor">Sole Proprietor</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                        <SelectItem value="jsc">Joint Stock Company (JSC)</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {signupErrors.businessType && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {signupErrors.businessType}
                      </p>
                    )}
                  </div>

                  <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="registerAsBoth"
                        checked={signupData.registerAsBoth}
                        onCheckedChange={(checked) => setSignupData({ ...signupData, registerAsBoth: checked })}
                      />
                      <div>
                        <Label htmlFor="registerAsBoth" className="text-sm font-medium text-teal-900">
                          Also register as a Buyer
                        </Label>
                        <p className="text-xs text-teal-700 mt-1">
                          Check this if you want to both sell and purchase on the platform
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agreeToTerms"
                        checked={signupData.agreeToTerms}
                        onCheckedChange={(checked) => setSignupData({ ...signupData, agreeToTerms: checked })}
                        className={signupErrors.agreeToTerms ? 'border-red-500' : ''}
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm font-normal leading-relaxed">
                        I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> *
                      </Label>
                    </div>
                    {signupErrors.agreeToTerms && (
                      <p className="text-sm text-red-600 flex items-center gap-1 ml-7">
                        <AlertCircle className="h-3 w-3" />
                        {signupErrors.agreeToTerms}
                      </p>
                    )}

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agreeToPrivacy"
                        checked={signupData.agreeToPrivacy}
                        onCheckedChange={(checked) => setSignupData({ ...signupData, agreeToPrivacy: checked })}
                        className={signupErrors.agreeToPrivacy ? 'border-red-500' : ''}
                      />
                      <Label htmlFor="agreeToPrivacy" className="text-sm font-normal leading-relaxed">
                        I agree to the <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a> *
                      </Label>
                    </div>
                    {signupErrors.agreeToPrivacy && (
                      <p className="text-sm text-red-600 flex items-center gap-1 ml-7">
                        <AlertCircle className="h-3 w-3" />
                        {signupErrors.agreeToPrivacy}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 h-12">
                    Create Account & Continue
                  </Button>

                  <div className="text-center text-sm text-slate-600">
                    Are you a buyer?{' '}
                    <Link to={createPageUrl('AuthBuyer')} className="text-teal-600 hover:underline font-medium">
                      Go to Buyer Portal
                    </Link>
                  </div>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <div className="text-center mt-6">
          <Link to={createPageUrl('Home')} className="text-sm text-slate-600 hover:text-slate-900">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}