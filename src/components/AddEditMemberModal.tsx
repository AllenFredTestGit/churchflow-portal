import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Member {
  id?: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  joinDate: string;
  family: string;
  address?: string;
  emergencyContact?: string;
  dateOfBirth?: string;
  membershipType?: string;
}

interface AddEditMemberModalProps {
  member?: Member | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Member) => void;
  isEdit?: boolean;
}

export const AddEditMemberModal = ({ 
  member, 
  isOpen, 
  onClose, 
  onSave, 
  isEdit = false 
}: AddEditMemberModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Member>({
    name: "",
    email: "",
    phone: "",
    status: "Active",
    joinDate: new Date().toISOString().split('T')[0],
    family: "",
    address: "",
    emergencyContact: "",
    dateOfBirth: "",
    membershipType: "Regular Member"
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && member) {
      setFormData({
        ...member,
        dateOfBirth: member.dateOfBirth || "",
        address: member.address || "",
        emergencyContact: member.emergencyContact || "",
        membershipType: member.membershipType || "Regular Member"
      });
    } else if (!isEdit) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        status: "Active",
        joinDate: new Date().toISOString().split('T')[0],
        family: "",
        address: "",
        emergencyContact: "",
        dateOfBirth: "",
        membershipType: "Regular Member"
      });
    }
    setErrors({});
  }, [member, isEdit, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.joinDate) {
      newErrors.joinDate = "Join date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave({
        ...formData,
        id: isEdit ? member?.id : Date.now()
      });
      
      toast({
        title: `Member ${isEdit ? 'updated' : 'added'} successfully`,
        description: `${formData.name} has been ${isEdit ? 'updated' : 'added'} to the system.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEdit ? 'update' : 'add'} member. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof Member, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-bold">
            {isEdit ? 'Edit Member' : 'Add New Member'}
          </DialogTitle>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter full name"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Visitor">Visitor</SelectItem>
                    <SelectItem value="Guest">Guest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="membershipType">Membership Type</Label>
                <Select value={formData.membershipType} onValueChange={(value) => handleInputChange('membershipType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Regular Member">Regular Member</SelectItem>
                    <SelectItem value="Associate Member">Associate Member</SelectItem>
                    <SelectItem value="Youth Member">Youth Member</SelectItem>
                    <SelectItem value="Child Member">Child Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="joinDate">Join Date *</Label>
                <Input
                  id="joinDate"
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => handleInputChange('joinDate', e.target.value)}
                  className={errors.joinDate ? "border-destructive" : ""}
                />
                {errors.joinDate && <p className="text-sm text-destructive">{errors.joinDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="family">Family Name</Label>
                <Input
                  id="family"
                  value={formData.family}
                  onChange={(e) => handleInputChange('family', e.target.value)}
                  placeholder="Enter family name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter full address"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                placeholder="Name and phone number of emergency contact"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (isEdit ? 'Updating...' : 'Adding...') : (isEdit ? 'Update Member' : 'Add Member')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};