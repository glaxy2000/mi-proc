import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function WorkflowList({ workflows, isLoading, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-slate-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">No workflows yet</h3>
        <p className="text-slate-600">Create your first approval workflow to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {workflows.map((workflow, idx) => (
        <motion.div
          key={workflow.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{workflow.name}</h3>
                    <Badge
                      className={
                        workflow.active
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-200 text-slate-700'
                      }
                    >
                      {workflow.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  {workflow.description && (
                    <p className="text-sm text-slate-600 mb-3">{workflow.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <Button
                    onClick={() => onEdit(workflow)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => onDelete(workflow.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Conditions and Levels Summary */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Conditions</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {workflow.conditions?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Approval Levels</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {workflow.approvalLevels?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Total Approvers</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {workflow.approvalLevels?.reduce((sum, level) => sum + (level.approvers?.length || 0), 0) || 0}
                  </p>
                </div>
              </div>

              {/* Approval Levels Preview */}
              {workflow.approvalLevels && workflow.approvalLevels.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-3">Approval Sequence</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {workflow.approvalLevels.map((level, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-indigo-50">
                          {level.name}
                        </Badge>
                        {i < workflow.approvalLevels.length - 1 && (
                          <span className="text-slate-400">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}