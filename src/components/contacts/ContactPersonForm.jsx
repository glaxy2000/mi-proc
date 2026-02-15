import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Plus, User } from 'lucide-react';

export default function ContactPersonForm({ contacts = [], onChange }) {
  const [localContacts, setLocalContacts] = useState(contacts.length > 0 ? contacts : [
    { full_name: '', designation: '', email: '', phone: '', is_primary: true }
  ]);

  const handleAddContact = () => {
    const newContacts = [...localContacts, { 
      full_name: '', 
      designation: '', 
      email: '', 
      phone: '', 
      is_primary: false 
    }];
    setLocalContacts(newContacts);
    onChange?.(newContacts);
  };

  const handleRemoveContact = (index) => {
    if (localContacts.length === 1) return;
    const newContacts = localContacts.filter((_, i) => i !== index);
    setLocalContacts(newContacts);
    onChange?.(newContacts);
  };

  const handleContactChange = (index, field, value) => {
    const newContacts = [...localContacts];
    newContacts[index][field] = value;
    if (field === 'is_primary' && value) {
      newContacts.forEach((contact, i) => {
        if (i !== index) contact.is_primary = false;
      });
    }
    setLocalContacts(newContacts);
    onChange?.(newContacts);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Contact Persons</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={handleAddContact}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
      </div>

      {localContacts.map((contact, index) => (
        <Card key={index} className="border-2">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-slate-500" />
                <h4 className="font-medium text-slate-900">
                  Contact {index + 1}
                  {contact.is_primary && (
                    <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                      Primary
                    </span>
                  )}
                </h4>
              </div>
              {localContacts.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveContact(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input
                  value={contact.full_name}
                  onChange={(e) => handleContactChange(index, 'full_name', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label>Designation *</Label>
                <Input
                  value={contact.designation}
                  onChange={(e) => handleContactChange(index, 'designation', e.target.value)}
                  placeholder="Procurement Manager"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={contact.email}
                  onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                  placeholder="john@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                  placeholder="+966 XX XXX XXXX"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Checkbox
                id={`primary-${index}`}
                checked={contact.is_primary}
                onCheckedChange={(checked) => handleContactChange(index, 'is_primary', checked)}
              />
              <Label htmlFor={`primary-${index}`} className="font-normal cursor-pointer">
                Set as primary contact
              </Label>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}