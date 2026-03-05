import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const departments = ['Finance', 'Operations', 'IT', 'Marketing', 'HR', 'Sales', 'Engineering'];
const projects = ['Office Renovation', 'System Upgrade', 'Marketing Campaign', 'New Product Launch'];

export default function BudgetForm({ budget, onClose, onSuccess }) {
  const [formData, setFormData] = useState(budget || {
    name: '',
    type: 'department',
    department_or_project: '',
    fiscal_year: new Date().getFullYear().toString(),
    allocated_amount: 0,
    threshold_percentage: 80,
    responsible_person_email: '',
    active: true,
  });

  const createBudget = useMutation({
    mutationFn: (data) => {
      if (budget?.id) {
        return base44.entities.Budget.update(budget.id, data);
      }
      return base44.entities.Budget.create(data);
    },
    onSuccess,
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.department_or_project || !formData.allocated_amount) {
      alert('Please fill in all required fields');
      return;
    }
    createBudget.mutate(formData);
  };

  const options = formData.type === 'department' ? departments : projects;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
          <ChevronLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {budget ? 'Edit Budget' : 'Create New Budget'}
          </h2>
          <p className="text-slate-600 text-sm">Set spending limits and alert thresholds</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Budget Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Budget Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Q1 2026 Operations"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Budget Type</Label>
                  <Select value={formData.type} onValueChange={(type) => setFormData({ ...formData, type, department_or_project: '' })}>
                    <SelectTrigger id="type" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="department">Department</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="depProj">{formData.type === 'department' ? 'Department' : 'Project'}</Label>
                  <Select value={formData.department_or_project} onValueChange={(val) => setFormData({ ...formData, department_or_project: val })}>
                    <SelectTrigger id="depProj" className="mt-1">
                      <SelectValue placeholder={`Select ${formData.type}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="year">Fiscal Year</Label>
                <Select value={formData.fiscal_year} onValueChange={(year) => setFormData({ ...formData, fiscal_year: year })}>
                  <SelectTrigger id="year" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[2024, 2025, 2026, 2027].map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="allocated">Allocated Amount (SAR)</Label>
                <Input
                  id="allocated"
                  type="number"
                  placeholder="0"
                  value={formData.allocated_amount}
                  onChange={(e) => setFormData({ ...formData, allocated_amount: parseFloat(e.target.value) })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Responsible Person Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="person@company.com"
                  value={formData.responsible_person_email}
                  onChange={(e) => setFormData({ ...formData, responsible_person_email: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="threshold">Alert Threshold (%)</Label>
                <Input
                  id="threshold"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.threshold_percentage}
                  onChange={(e) => setFormData({ ...formData, threshold_percentage: parseFloat(e.target.value) })}
                  className="mt-1"
                />
                <p className="text-xs text-slate-500 mt-1">Alert will trigger when budget utilization reaches this percentage</p>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="active" className="cursor-pointer flex-1">
                  Active Budget
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div>
          <Card className="border-0 shadow-md sticky top-20">
            <CardHeader>
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Type</p>
                <Badge className="capitalize bg-indigo-100 text-indigo-700">
                  {formData.type}
                </Badge>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Allocated Amount</p>
                <p className="text-2xl font-bold text-slate-900">
                  SAR {formData.allocated_amount?.toLocaleString() || 0}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Alert Threshold</p>
                <p className="text-lg font-bold text-slate-900">
                  {formData.threshold_percentage}%
                </p>
              </div>

              <div className="pt-4 border-t space-y-2">
                <Button
                  onClick={handleSubmit}
                  disabled={createBudget.isPending}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {budget ? 'Update Budget' : 'Create Budget'}
                </Button>
                <Button onClick={onClose} variant="outline" className="w-full">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}