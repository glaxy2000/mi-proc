import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { Package, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

export default function SupplierSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    businessType: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState({});

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

  const passwordValidation = validatePassword(formData.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!passwordValidation.isValid) newErrors.password = 'Password does not meet requirements';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to Terms of Service';
    if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to Privacy Policy';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Redirect to onboarding
    window.location.href = createPageUrl('SupplierOnboarding');
  };

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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Supplier Registration</h1>
          <p className="text-slate-600">Join our network of verified suppliers</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-teal-50 border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <CardTitle>Step 1: Initial Registration</CardTitle>
                <p className="text-sm text-slate-600 mt-1">Create your supplier account</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={errors.password ? 'border-red-500' : ''}
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Business Type */}
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                >
                  <SelectTrigger className={errors.businessType ? 'border-red-500' : ''}>
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
                {errors.businessType && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.businessType}
                  </p>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked })}
                    className={errors.agreeToTerms ? 'border-red-500' : ''}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm font-normal leading-relaxed">
                    I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> *
                  </Label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-sm text-red-600 flex items-center gap-1 ml-7">
                    <AlertCircle className="h-3 w-3" />
                    {errors.agreeToTerms}
                  </p>
                )}

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agreeToPrivacy"
                    checked={formData.agreeToPrivacy}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToPrivacy: checked })}
                    className={errors.agreeToPrivacy ? 'border-red-500' : ''}
                  />
                  <Label htmlFor="agreeToPrivacy" className="text-sm font-normal leading-relaxed">
                    I agree to the <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a> *
                  </Label>
                </div>
                {errors.agreeToPrivacy && (
                  <p className="text-sm text-red-600 flex items-center gap-1 ml-7">
                    <AlertCircle className="h-3 w-3" />
                    {errors.agreeToPrivacy}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 h-12">
                Create Account & Continue
              </Button>

              <div className="text-center text-sm text-slate-600">
                Already have an account?{' '}
                <Link to={createPageUrl('SupplierSignin')} className="text-indigo-600 hover:underline font-medium">
                  Sign In
                </Link>
              </div>
            </form>
          </CardContent>
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