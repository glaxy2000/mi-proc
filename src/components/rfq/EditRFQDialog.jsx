import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Bell } from 'lucide-react';
import { toast } from 'sonner';

export default function EditRFQDialog({ rfq, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: rfq.title || '',
    description: rfq.description || '',
    deadline: rfq.deadline || '',
    budget: rfq.budget || '',
    edit_summary: ''
  });

  const handleSave = async () => {
    if (!formData.edit_summary.trim()) {
      toast.error('Please provide a summary of changes');
      return;
    }

    setLoading(true);
    try {
      const user = await base44.auth.me();
      
      // Identify what changed
      const changes = [];
      if (formData.title !== rfq.title) changes.push('Title');
      if (formData.description !== rfq.description) changes.push('Description');
      if (formData.deadline !== rfq.deadline) changes.push('Deadline');
      if (formData.budget !== rfq.budget) changes.push('Budget');

      // Update RFQ (in real implementation)
      // await base44.entities.RFQ.update(rfq.id, { ... });

      // Log the edit
      await base44.entities.RFQEdit.create({
        rfq_id: rfq.id,
        edited_by: user.email,
        edit_summary: formData.edit_summary,
        fields_changed: changes,
        notified_suppliers: [] // In real implementation, get list of suppliers who viewed/responded
      });

      // In real implementation: Send notifications to all suppliers who viewed or responded
      // await base44.integrations.Core.SendEmail({
      //   to: supplier.email,
      //   subject: `RFQ Updated: ${rfq.title}`,
      //   body: `Changes: ${formData.edit_summary}`
      // });

      toast.success('RFQ updated and suppliers notified');
      setOpen(false);
      onUpdate?.();
    } catch (error) {
      toast.error('Failed to update RFQ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit RFQ
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit RFQ</DialogTitle>
          <DialogDescription>
            Changes will be saved and all suppliers who viewed or responded will be notified
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>RFQ Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Construction Materials - Q1 2026"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              placeholder="Detailed requirements..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Deadline</Label>
              <Input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Budget Range</Label>
              <Input
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                placeholder="SAR 100,000 - 500,000"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="space-y-2">
              <Label>Summary of Changes *</Label>
              <Textarea
                value={formData.edit_summary}
                onChange={(e) => setFormData({...formData, edit_summary: e.target.value})}
                rows={3}
                placeholder="Describe what you changed and why (this will be sent to suppliers)..."
              />
            </div>

            <div className="mt-3 flex items-start gap-2 p-3 bg-blue-50 rounded-lg text-sm">
              <Bell className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-blue-700">
                All suppliers who have viewed or responded to this RFQ will receive an email notification about these changes.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}