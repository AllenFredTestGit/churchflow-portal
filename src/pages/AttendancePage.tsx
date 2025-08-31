import { useState } from "react";
import { Search, UserCheck, UserPlus, Calendar, Users } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const AttendancePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [checkedInMembers, setCheckedInMembers] = useState<Set<number>>(new Set());

  // Mock data
  const events = [
    { id: "1", name: "Sunday Service", date: "2024-08-31", type: "Service" },
    { id: "2", name: "Youth Fellowship", date: "2024-08-31", type: "Group" },
    { id: "3", name: "Prayer Meeting", date: "2024-08-28", type: "Meeting" }
  ];

  const members = [
    { id: 1, name: "John Smith", phone: "+1 234-567-8901", group: "Adult", status: "Active" },
    { id: 2, name: "Mary Johnson", phone: "+1 234-567-8902", group: "Adult", status: "Active" },
    { id: 3, name: "David Wilson", phone: "+1 234-567-8903", group: "Youth", status: "Active" },
    { id: 4, name: "Sarah Brown", phone: "+1 234-567-8904", group: "Adult", status: "Active" },
    { id: 5, name: "Michael Davis", phone: "+1 234-567-8905", group: "Youth", status: "Active" }
  ];

  const filteredMembers = members.filter(member =>
    !checkedInMembers.has(member.id) &&
    (member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     member.phone.includes(searchTerm))
  );

  const handleCheckIn = (memberId: number) => {
    setCheckedInMembers(new Set([...checkedInMembers, memberId]));
    setSearchTerm(""); // Clear search after check-in
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
            <p className="text-muted-foreground">Digital check-in and attendance tracking</p>
          </div>
        </div>

        {/* Event Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Select Event
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="event-select">Event/Gathering</Label>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an event or gathering" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.name} - {event.date} ({event.type})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button disabled={!selectedEvent}>
                Start Check-in Session
              </Button>
            </div>
          </CardContent>
        </Card>

        {selectedEvent && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Checked In</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{checkedInMembers.size}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Remaining</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{members.length - checkedInMembers.size}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Guests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">3</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Present</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{checkedInMembers.size + 3}</div>
                </CardContent>
              </Card>
            </div>

            {/* Check-in Interface */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Digital Check-in
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <UserPlus className="h-4 w-4" />
                        Add New Guest
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Guest</DialogTitle>
                        <DialogDescription>
                          Quickly add and check in a new guest
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="guest-name">Guest Name *</Label>
                          <Input id="guest-name" placeholder="Enter guest's name" />
                        </div>
                        <div>
                          <Label htmlFor="guest-phone">Phone Number *</Label>
                          <Input id="guest-phone" placeholder="Enter phone number" />
                        </div>
                        <div>
                          <Label htmlFor="guest-email">Email (Optional)</Label>
                          <Input id="guest-email" placeholder="Enter email address" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Check In Guest</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search member by name or phone number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 text-lg h-12"
                  />
                </div>

                {/* Members List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{member.group}</Badge>
                          <Button
                            onClick={() => handleCheckIn(member.id)}
                            className="gap-2"
                          >
                            <UserCheck className="h-4 w-4" />
                            Check In
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : searchTerm ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No members found matching "{searchTerm}"
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      All eligible members have been checked in!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recently Checked In */}
            {checkedInMembers.size > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Recently Checked In
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(checkedInMembers).map((memberId) => {
                      const member = members.find(m => m.id === memberId);
                      return (
                        <Badge key={memberId} variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                          {member?.name}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AttendancePage;