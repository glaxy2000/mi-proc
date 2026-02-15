import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus, Shield, Eye, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function TeamManagement() {
  const [user, setUser] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'viewer',
    permissions: {
      can_create_rfq: false,
      can_edit_rfq: false,
      can_delete_rfq: false,
      can_view_bids: true,
      can_accept_bids: false,
      can_manage_users: false,
      can_view_analytics: true,
      can_manage_payments: false,
      can_sign_nda: false
    }
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      
      const members = await base44.entities.CompanyUser.filter({
        company_email: currentUser.email
      });
      setTeamMembers(members);
    } catch (error) {
      console.error('Error loading team:', error);
    }
  };

  const handleInvite = async () => {
    try {
      await base44.entities.CompanyUser.create({
        company_email: user.email,
        user_email: inviteForm.email,
        role: inviteForm.role,
        permissions: inviteForm.permissions,
        invited_by: user.email,
        status: 'pending'
      });

      toast.success('Team member invited successfully');
      setShowInviteDialog(false);
      setInviteForm({
        email: '',
        role: 'viewer',
        permissions: {
          can_create_rfq: false,
          can_edit_rfq: false,
          can_delete_rfq: false,
          can_view_bids: true,
          can_accept_bids: false,
          can_manage_users: false,
          can_view_analytics: true,
          can_manage_payments: false,
          can_sign_nda: false
        }
      });
      loadData();
    } catch (error) {
      toast.error('Failed to invite team member');
    }
  };

  const handleRoleChange = (role) => {
    const rolePermissions = {
      admin: {
        can_create_rfq: true,
        can_edit_rfq: true,
        can_delete_rfq: true,
        can_view_bids: true,
        can_accept_bids: true,
        can_manage_users: true,
        can_view_analytics: true,
        can_manage_payments: true,
        can_sign_nda: true
      },
      manager: {
        can_create_rfq: true,
        can_edit_rfq: true,
        can_delete_rfq: false,
        can_view_bids: true,
        can_accept_bids: true,
        can_manage_users: false,
        can_view_analytics: true,
        can_manage_payments: false,
        can_sign_nda: true
      },
      contributor: {
        can_create_rfq: true,
        can_edit_rfq: false,
        can_delete_rfq: false,
        can_view_bids: true,
        can_accept_bids: false,
        can_manage_users: false,
        can_view_analytics: true,
        can_manage_payments: false,
        can_sign_nda: false
      },
      viewer: {
        can_create_rfq: false,
        can_edit_rfq: false,
        can_delete_rfq: false,
        can_view_bids: true,
        can_accept_bids: false,
        can_manage_users: false,
        can_view_analytics: true,
        can_manage_payments: false,
        can_sign_nda: false
      }
    };

    setInviteForm({
      ...inviteForm,
      role,
      permissions: rolePermissions[role]
    });
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await base44.entities.CompanyUser.delete(memberId);
      toast.success('Team member removed');
      loadData();
    } catch (error) {
      toast.error('Failed to remove team member');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Team Management</h1>
          <p className="text-slate-600 mt-1">Manage team members and their permissions</p>
        </div>
        <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Add a new member to your team and set their permissions
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Email Address *</Label>
                <Input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
                  placeholder="colleague@company.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Role *</Label>
                <Select value={inviteForm.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin - Full access</SelectItem>
                    <SelectItem value="manager">Manager - Can manage RFQs and bids</SelectItem>
                    <SelectItem value="contributor">Contributor - Can create RFQs</SelectItem>
                    <SelectItem value="viewer">Viewer - Read-only access</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-slate-900 mb-3">Permissions</h4>
                {Object.entries(inviteForm.permissions).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) => setInviteForm({
                        ...inviteForm,
                        permissions: {...inviteForm.permissions, [key]: checked}
                      })}
                    />
                    <Label htmlFor={key} className="font-normal cursor-pointer">
                      {key.replace(/can_/g, '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Label>
                  </div>
                ))}
              </div>

              <Button onClick={handleInvite} className="w-full">
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{member.user_email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={
                        member.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                        member.role === 'manager' ? 'bg-blue-100 text-blue-700' :
                        member.role === 'contributor' ? 'bg-green-100 text-green-700' :
                        'bg-slate-100 text-slate-700'
                      }>
                        {member.role}
                      </Badge>
                      <Badge variant="outline" className={
                        member.status === 'active' ? 'border-green-200 text-green-700' :
                        member.status === 'pending' ? 'border-yellow-200 text-yellow-700' :
                        'border-red-200 text-red-700'
                      }>
                        {member.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveMember(member.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {teamMembers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Shield className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">No team members yet. Invite your first team member!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}