import { useState } from "react";
import { Users, Shield, Settings, UserPlus } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const StaffPage = () => {
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [staffPermissions, setStaffPermissions] = useState<Record<string, boolean>>({});

  // Mock data
  const staffMembers = [
    {
      id: 1,
      name: "Pastor John Smith",
      email: "pastor.john@unitychurch.com",
      role: "Senior Pastor",
      status: "Active",
      lastLogin: "2024-08-30",
      permissionCount: 12
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@unitychurch.com",
      role: "Administrative Assistant",
      status: "Active",
      lastLogin: "2024-08-30",
      permissionCount: 8
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@unitychurch.com",
      role: "Youth Pastor",
      status: "Active",
      lastLogin: "2024-08-29",
      permissionCount: 6
    },
    {
      id: 4,
      name: "Lisa Davis",
      email: "lisa.d@unitychurch.com",
      role: "Worship Leader",
      status: "Active",
      lastLogin: "2024-08-28",
      permissionCount: 4
    }
  ];

  const availablePermissions = [
    { key: "can_view_members", label: "View Members", description: "Can view member profiles and information" },
    { key: "can_edit_members", label: "Edit Members", description: "Can create and modify member profiles" },
    { key: "can_view_donations", label: "View Donations", description: "Can view donation records and history" },
    { key: "can_verify_donations", label: "Verify Donations", description: "Can verify and process pending donations" },
    { key: "can_take_attendance", label: "Take Attendance", description: "Can mark attendance for events and groups" },
    { key: "can_manage_volunteers", label: "Manage Volunteers", description: "Can schedule and manage volunteer assignments" },
    { key: "can_communicate", label: "Send Communications", description: "Can send bulk messages to members" },
    { key: "can_generate_reports", label: "Generate Reports", description: "Can create and export analytics reports" },
    { key: "can_manage_staff", label: "Manage Staff", description: "Can manage staff accounts and permissions" },
    { key: "can_manage_settings", label: "Manage Settings", description: "Can modify system settings and configurations" },
    { key: "can_export_data", label: "Export Data", description: "Can export member lists and reports" },
    { key: "can_manage_events", label: "Manage Events", description: "Can create and manage church events" }
  ];

  const handlePermissionChange = (permissionKey: string, checked: boolean) => {
    setStaffPermissions(prev => ({
      ...prev,
      [permissionKey]: checked
    }));
  };

  const openPermissionsDialog = (staff: any) => {
    setSelectedStaff(staff);
    // Mock current permissions for the selected staff
    const mockPermissions: Record<string, boolean> = {
      can_view_members: true,
      can_edit_members: staff.id === 1 || staff.id === 2,
      can_view_donations: staff.id === 1 || staff.id === 2,
      can_verify_donations: staff.id === 1,
      can_take_attendance: true,
      can_manage_volunteers: staff.id === 1 || staff.id === 3,
      can_communicate: staff.id === 1 || staff.id === 2,
      can_generate_reports: staff.id === 1 || staff.id === 2,
      can_manage_staff: staff.id === 1,
      can_manage_settings: staff.id === 1,
      can_export_data: staff.id === 1 || staff.id === 2,
      can_manage_events: staff.id === 1 || staff.id === 3
    };
    setStaffPermissions(mockPermissions);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
            <p className="text-muted-foreground">Manage staff accounts and permissions</p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Staff Member
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{staffMembers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{staffMembers.filter(s => s.status === 'Active').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Logged In Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Permission Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{availablePermissions.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Staff List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Staff Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffMembers.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.email}</TableCell>
                      <TableCell>{staff.role}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className="bg-green-100 text-green-800 border-green-200"
                        >
                          {staff.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{staff.lastLogin}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {staff.permissionCount} permissions
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-2"
                              onClick={() => openPermissionsDialog(staff)}
                            >
                              <Shield className="h-4 w-4" />
                              Manage Permissions
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Manage Permissions - {selectedStaff?.name}</DialogTitle>
                              <DialogDescription>
                                Grant or revoke permissions for this staff member. Changes take effect immediately.
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4">
                              <div className="grid gap-4">
                                {availablePermissions.map((permission) => (
                                  <div key={permission.key} className="flex items-start space-x-3">
                                    <Checkbox
                                      id={permission.key}
                                      checked={staffPermissions[permission.key] || false}
                                      onCheckedChange={(checked) => 
                                        handlePermissionChange(permission.key, checked as boolean)
                                      }
                                    />
                                    <div className="flex-1">
                                      <Label
                                        htmlFor={permission.key}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                      >
                                        {permission.label}
                                      </Label>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {permission.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button>Save Permissions</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StaffPage;