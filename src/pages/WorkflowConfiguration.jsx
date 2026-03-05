import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WorkflowBuilder from '@/components/workflow/WorkflowBuilder';
import WorkflowList from '@/components/workflow/WorkflowList';

export default function WorkflowConfiguration() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState(null);
  const queryClient = useQueryClient();

  // Fetch approval workflows
  const { data: workflows = [], isLoading } = useQuery({
    queryKey: ['approvalWorkflows'],
    queryFn: () => base44.entities.ApprovalWorkflow.list(),
  });

  // Delete workflow
  const deleteWorkflow = useMutation({
    mutationFn: (id) => base44.entities.ApprovalWorkflow.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approvalWorkflows'] });
    },
  });

  const handleEdit = (workflow) => {
    setEditingWorkflow(workflow);
    setShowBuilder(true);
  };

  const handleClose = () => {
    setShowBuilder(false);
    setEditingWorkflow(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Approval Workflows</h1>
              <p className="text-slate-600 mt-1">Create and manage multi-level approval workflows with custom conditions</p>
            </div>
            <Button
              onClick={() => setShowBuilder(true)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Workflow
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {showBuilder ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <WorkflowBuilder
              workflow={editingWorkflow}
              onClose={handleClose}
              onSuccess={() => {
                queryClient.invalidateQueries({ queryKey: ['approvalWorkflows'] });
                handleClose();
              }}
            />
          </motion.div>
        ) : (
          <WorkflowList
            workflows={workflows}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={(id) => deleteWorkflow.mutate(id)}
          />
        )}
      </div>
    </div>
  );
}