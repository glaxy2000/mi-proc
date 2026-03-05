import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ChevronLeft, Plus, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import ConditionEditor from './ConditionEditor';
import ApprovalLevelManager from './ApprovalLevelManager';

export default function WorkflowBuilder({ workflow, onClose, onSuccess }) {
  const [formData, setFormData] = useState(workflow || {
    name: '',
    description: '',
    active: true,
    conditions: [],
    approvalLevels: [],
  });

  const createWorkflow = useMutation({
    mutationFn: (data) => {
      if (workflow?.id) {
        return base44.entities.ApprovalWorkflow.update(workflow.id, data);
      }
      return base44.entities.ApprovalWorkflow.create(data);
    },
    onSuccess: onSuccess,
  });

  const handleSubmit = () => {
    if (!formData.name || formData.approvalLevels.length === 0) {
      alert('Please enter a name and at least one approval level');
      return;
    }
    createWorkflow.mutate(formData);
  };

  const handleAddCondition = () => {
    setFormData({
      ...formData,
      conditions: [...formData.conditions, { type: 'spend_amount', operator: 'gte', value: '' }],
    });
  };

  const handleUpdateCondition = (index, condition) => {
    const newConditions = [...formData.conditions];
    newConditions[index] = condition;
    setFormData({ ...formData, conditions: newConditions });
  };

  const handleRemoveCondition = (index) => {
    setFormData({
      ...formData,
      conditions: formData.conditions.filter((_, i) => i !== index),
    });
  };

  const handleAddApprovalLevel = () => {
    setFormData({
      ...formData,
      approvalLevels: [
        ...formData.approvalLevels,
        {
          level: formData.approvalLevels.length + 1,
          name: `Level ${formData.approvalLevels.length + 1}`,
          approvers: [],
          requireAllApprovals: false,
        },
      ],
    });
  };

  const handleUpdateApprovalLevel = (index, level) => {
    const newLevels = [...formData.approvalLevels];
    newLevels[index] = level;
    setFormData({ ...formData, approvalLevels: newLevels });
  };

  const handleRemoveApprovalLevel = (index) => {
    setFormData({
      ...formData,
      approvalLevels: formData.approvalLevels.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {workflow ? 'Edit Workflow' : 'Create New Workflow'}
          </h2>
          <p className="text-slate-600 text-sm">Configure approval rules and conditions</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Workflow Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Standard Purchase Orders"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe when this workflow applies..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
                <Label className="cursor-pointer flex-1">
                  {formData.active ? 'Active' : 'Inactive'}
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    {formData.active ? 'This workflow is currently in use' : 'This workflow is disabled'}
                  </p>
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Conditions */}
          <Card className="border-0 shadow-md">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Trigger Conditions</CardTitle>
              <Button
                onClick={handleAddCondition}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Condition
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.conditions.length === 0 ? (
                <p className="text-slate-500 text-sm">No conditions set. Add one to specify when this workflow applies.</p>
              ) : (
                formData.conditions.map((condition, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ConditionEditor
                      condition={condition}
                      onUpdate={(updated) => handleUpdateCondition(idx, updated)}
                      onRemove={() => handleRemoveCondition(idx)}
                    />
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Approval Levels */}
          <Card className="border-0 shadow-md">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Approval Levels</CardTitle>
              <Button
                onClick={handleAddApprovalLevel}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Level
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.approvalLevels.length === 0 ? (
                <p className="text-slate-500 text-sm">No approval levels defined. Add at least one.</p>
              ) : (
                formData.approvalLevels.map((level, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ApprovalLevelManager
                      level={level}
                      onUpdate={(updated) => handleUpdateApprovalLevel(idx, updated)}
                      onRemove={() => handleRemoveApprovalLevel(idx)}
                    />
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div>
          <Card className="border-0 shadow-md sticky top-20">
            <CardHeader>
              <CardTitle className="text-base">Workflow Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Status</p>
                <Badge className={formData.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}>
                  {formData.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Conditions</p>
                <p className="text-2xl font-bold text-slate-900">{formData.conditions.length}</p>
                <p className="text-xs text-slate-600">trigger rules defined</p>
              </div>

              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Approval Levels</p>
                <p className="text-2xl font-bold text-slate-900">{formData.approvalLevels.length}</p>
                <p className="text-xs text-slate-600">sequential levels</p>
              </div>

              <div className="pt-4 border-t space-y-2">
                <Button
                  onClick={handleSubmit}
                  disabled={createWorkflow.isPending}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {workflow ? 'Update Workflow' : 'Create Workflow'}
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full"
                >
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