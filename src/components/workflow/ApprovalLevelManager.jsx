import React, { useState } from 'react';
import { Trash2, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ApprovalLevelManager({ level, onUpdate, onRemove }) {
  const [approverEmail, setApproverEmail] = useState('');

  const handleAddApprover = () => {
    if (approverEmail) {
      onUpdate({
        ...level,
        approvers: [...(level.approvers || []), approverEmail],
      });
      setApproverEmail('');
    }
  };

  const handleRemoveApprover = (email) => {
    onUpdate({
      ...level,
      approvers: level.approvers.filter(a => a !== email),
    });
  };

  return (
    <Card className="border border-slate-200 bg-white">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold">
                  {level.level}
                </span>
                <Input
                  placeholder="Level name (e.g., Manager Approval)"
                  value={level.name}
                  onChange={(e) => onUpdate({ ...level, name: e.target.value })}
                  className="h-9"
                />
              </div>
            </div>
            <button
              onClick={onRemove}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Approvers */}
          <div>
            <Label className="text-xs font-semibold text-slate-700 mb-2">Approvers</Label>
            <div className="flex gap-2 mb-3">
              <Input
                type="email"
                placeholder="Add approver email..."
                value={approverEmail}
                onChange={(e) => setApproverEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddApprover()}
              />
              <Button
                onClick={handleAddApprover}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {(level.approvers || []).length > 0 ? (
              <div className="space-y-2">
                {level.approvers.map(approver => (
                  <div
                    key={approver}
                    className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
                  >
                    <span className="text-sm text-slate-700">{approver}</span>
                    <button
                      onClick={() => handleRemoveApprover(approver)}
                      className="text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">No approvers added yet</p>
            )}
          </div>

          {/* Settings */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <Switch
              checked={level.requireAllApprovals}
              onCheckedChange={(checked) => onUpdate({ ...level, requireAllApprovals: checked })}
            />
            <Label className="cursor-pointer flex-1">
              Require All Approvals
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                {level.requireAllApprovals
                  ? 'All approvers must approve to proceed'
                  : 'Any approver can approve to proceed'}
              </p>
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}