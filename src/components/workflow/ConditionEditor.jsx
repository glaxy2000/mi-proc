import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const conditionTypes = [
  { value: 'spend_amount', label: 'Spend Amount' },
  { value: 'spend_category', label: 'Spend Category' },
  { value: 'region', label: 'Regional Compliance' },
  { value: 'department', label: 'Department' },
  { value: 'supplier', label: 'Supplier Type' },
];

const operators = {
  spend_amount: [
    { value: 'gte', label: 'Greater than or equal to (≥)' },
    { value: 'lte', label: 'Less than or equal to (≤)' },
    { value: 'eq', label: 'Equal to (=)' },
    { value: 'between', label: 'Between' },
  ],
  spend_category: [
    { value: 'equals', label: 'Equals' },
    { value: 'includes', label: 'Includes' },
  ],
  region: [
    { value: 'equals', label: 'Equals' },
    { value: 'includes', label: 'Includes' },
  ],
  department: [
    { value: 'equals', label: 'Equals' },
    { value: 'includes', label: 'Includes' },
  ],
  supplier: [
    { value: 'equals', label: 'Equals' },
    { value: 'includes', label: 'Includes' },
  ],
};

const categoryOptions = ['IT & Hardware', 'Office Supplies', 'Manufacturing', 'Services', 'Raw Materials'];
const regionOptions = ['Saudi Arabia', 'GCC', 'International'];
const departmentOptions = ['Finance', 'Operations', 'Engineering', 'Marketing', 'HR'];
const supplierOptions = ['Preferred', 'Approved', 'New', 'International'];

export default function ConditionEditor({ condition, onUpdate, onRemove }) {
  const handleTypeChange = (type) => {
    onUpdate({ ...condition, type, operator: operators[type][0].value, value: '' });
  };

  const getValueInput = () => {
    switch (condition.type) {
      case 'spend_amount':
        return (
          <Input
            type="number"
            placeholder="Enter amount (SAR)"
            value={condition.value}
            onChange={(e) => onUpdate({ ...condition, value: e.target.value })}
          />
        );
      case 'spend_category':
        return (
          <Select value={condition.value} onValueChange={(value) => onUpdate({ ...condition, value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'region':
        return (
          <Select value={condition.value} onValueChange={(value) => onUpdate({ ...condition, value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {regionOptions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'department':
        return (
          <Select value={condition.value} onValueChange={(value) => onUpdate({ ...condition, value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departmentOptions.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'supplier':
        return (
          <Select value={condition.value} onValueChange={(value) => onUpdate({ ...condition, value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select supplier type" />
            </SelectTrigger>
            <SelectContent>
              {supplierOptions.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="border border-slate-200 bg-slate-50">
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-3 items-end">
          <div>
            <Label className="text-xs mb-1">Condition Type</Label>
            <Select value={condition.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {conditionTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs mb-1">Operator</Label>
            <Select value={condition.operator} onValueChange={(operator) => onUpdate({ ...condition, operator })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {operators[condition.type].map(op => (
                  <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs mb-1">Value</Label>
            {getValueInput()}
          </div>

          <button
            onClick={onRemove}
            className="col-span-3 flex items-center justify-center gap-1 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
          >
            <Trash2 className="h-4 w-4" />
            Remove Condition
          </button>
        </div>
      </CardContent>
    </Card>
  );
}