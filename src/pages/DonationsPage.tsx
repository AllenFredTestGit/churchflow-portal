import { useState } from "react";
import { CheckCircle, AlertCircle, DollarSign, Calendar } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DonationsPage = () => {
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Mock data - replace with API call
  const pendingDonations = [
    {
      id: 1,
      donorName: "John Smith",
      amount: 250.00,
      fund: "General Fund",
      date: "2024-08-30",
      isKnownMember: true,
      memberId: 123,
      submittedAt: "2024-08-30 10:30 AM"
    },
    {
      id: 2,
      donorName: "Sarah Williams",
      amount: 100.00,
      fund: "Mission Fund",
      date: "2024-08-30",
      isKnownMember: false,
      memberId: null,
      submittedAt: "2024-08-30 09:15 AM"
    },
    {
      id: 3,
      donorName: "Michael Brown",
      amount: 500.00,
      fund: "Building Fund",
      date: "2024-08-29",
      isKnownMember: true,
      memberId: 456,
      submittedAt: "2024-08-29 6:45 PM"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Donations</h1>
            <p className="text-muted-foreground">Manage and verify donation submissions</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{pendingDonations.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$12,450</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$3,200</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Verified Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8</div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Donations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Pending Donations Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Fund</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Member Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-medium">{donation.donorName}</TableCell>
                      <TableCell className="font-semibold">${donation.amount.toFixed(2)}</TableCell>
                      <TableCell>{donation.fund}</TableCell>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={donation.isKnownMember ? 'default' : 'secondary'}
                          className={donation.isKnownMember ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-orange-100 text-orange-800 border-orange-200'}
                        >
                          {donation.isKnownMember ? 'Known Member' : 'Guest'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{donation.submittedAt}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              className="gap-2"
                              onClick={() => setSelectedDonation(donation)}
                            >
                              <CheckCircle className="h-4 w-4" />
                              Verify
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Verify Donation</DialogTitle>
                              <DialogDescription>
                                Review and verify this donation submission
                              </DialogDescription>
                            </DialogHeader>
                            {selectedDonation && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Donor Name</label>
                                    <p className="text-sm text-muted-foreground">{selectedDonation.donorName}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Amount</label>
                                    <p className="text-sm text-muted-foreground">${selectedDonation.amount.toFixed(2)}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Fund</label>
                                    <p className="text-sm text-muted-foreground">{selectedDonation.fund}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Date</label>
                                    <p className="text-sm text-muted-foreground">{selectedDonation.date}</p>
                                  </div>
                                </div>
                                
                                <div className="p-4 bg-muted rounded-lg">
                                  <p className="text-sm font-medium">
                                    {selectedDonation.isKnownMember 
                                      ? `This donation is from a known member (ID: ${selectedDonation.memberId})`
                                      : 'This donation is from a guest. You can verify as guest or create a new member profile.'
                                    }
                                  </p>
                                </div>
                              </div>
                            )}
                            <DialogFooter className="gap-2">
                              {selectedDonation && !selectedDonation.isKnownMember && (
                                <Button variant="outline">
                                  Create Member Profile
                                </Button>
                              )}
                              <Button>
                                Verify & Record
                              </Button>
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

export default DonationsPage;