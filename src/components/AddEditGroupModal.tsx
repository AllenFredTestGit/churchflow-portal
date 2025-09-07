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

interface Group {
  id?: number;
  name: string;
  type: 'Department' | 'Ministry' | 'Committee' | 'Small Group';
  description?: string;
  leader?: string;
  leaderContact?: string;
  members: string[];
  meetingDay?: string;
  meetingTime?: string;
  location?: string;
  status: 'Active' | 'Inactive';
  createdDate: string;
}

interface AddEditGroupModalProps {
  group?: Group | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (group: Omit<Group, 'id'>) => void;
  isEdit?: boolean;
}

export const AddEditGroupModal = ({ 
  group, 
  isOpen, 
  onClose, 
  onSave, 
  isEdit = false 
}: AddEditGroupModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Omit<Group, 'id'>>({
    name: "",
    type: "Department",
    description: "",
    leader: "",
    leaderContact: "",
    members: [],
    meetingDay: "",
    meetingTime: "",
    location: "",
    status: "Active",
    createdDate: new Date().toISOString().split('T')[0]
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && group) {
      setFormData({
        name: group.name,
        type: group.type,
        description: group.description || "",
        leader: group.leader || "",
        leaderContact: group.leaderContact || "",
        members: group.members || [],
        meetingDay: group.meetingDay || "",
        meetingTime: group.meetingTime || "",
        location: group.location || "",
        status: group.status,
        createdDate: group.createdDate
      });
    } else if (!isEdit) {
      setFormData({
        name: "",
        type: "Department",
        description: "",
        leader: "",
        leaderContact: "",
        members: [],
        meetingDay: "",
        meetingTime: "",
        location: "",
        status: "Active",
        createdDate: new Date().toISOString().split('T')[0]
      });
    }
    setErrors({});
  }, [group, isEdit, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Group name is required";
    }

    if (!formData.type) {
      newErrors.type = "Group type is required";
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(formData);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEdit ? 'update' : 'add'} group. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const dayOptions = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    "First Sunday", "Second Sunday", "Third Sunday", "Fourth Sunday",
    "First Monday", "Second Monday", "Third Monday", "Fourth Monday"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-bold">
            {isEdit ? 'Edit Group' : 'Add New Group'}
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
                <Label htmlFor="name">Group Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter group name"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Group Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger className={errors.type ? "border-destructive" : ""}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Department">Department</SelectItem>
                    <SelectItem value="Ministry">Ministry</SelectItem>
                    <SelectItem value="Committee">Committee</SelectItem>
                    <SelectItem value="Small Group">Small Group</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
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
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Meeting Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter meeting location"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter group description"
                rows={3}
              />
            </div>
          </div>

          {/* Leadership Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Leadership</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leader">Group Leader</Label>
                <Input
                  id="leader"
                  value={formData.leader}
                  onChange={(e) => handleInputChange('leader', e.target.value)}
                  placeholder="Enter leader's name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="leaderContact">Leader Contact</Label>
                <Input
                  id="leaderContact"
                  value={formData.leaderContact}
                  onChange={(e) => handleInputChange('leaderContact', e.target.value)}
                  placeholder="Enter leader's phone number"
                />
              </div>
            </div>
          </div>

          {/* Meeting Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Meeting Schedule</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="meetingDay">Meeting Day</Label>
                <Select value={formData.meetingDay} onValueChange={(value) => handleInputChange('meetingDay', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meeting day" />
                  </SelectTrigger>
                  <SelectContent>
                    {dayOptions.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meetingTime">Meeting Time</Label>
                <Input
                  id="meetingTime"
                  type="time"
                  value={formData.meetingTime}
                  onChange={(e) => handleInputChange('meetingTime', e.target.value)}
                />
              </div>
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
              {isSubmitting ? (isEdit ? 'Updating...' : 'Adding...') : (isEdit ? 'Update Group' : 'Add Group')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};