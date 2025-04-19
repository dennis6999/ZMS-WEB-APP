import React, { useState, useMemo } from 'react';
import { PageTemplate } from '@/components/layout/PageTemplate';
import { Users, Search, Filter, Plus, Mail, Phone, MapPin, UserCheck, UserCog, BriefcaseMedical, Shield, Calendar, Clock, FileText, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const Staff = () => {
  const isMobile = useIsMobile();
  const [department, setDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddStaffDialog, setShowAddStaffDialog] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  
  // Mock staff data
  const staffMembers = [
    {
      id: 1,
      name: 'Dr. Jane Wanjiku',
      role: 'Chief Veterinarian',
      department: 'veterinary',
      contactEmail: 'jane.wanjiku@kws.org',
      contactPhone: '+254 712 345 678',
      location: 'Main Office',
      startDate: 'Apr 2018',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=32',
      bio: 'Dr. Jane Wanjiku is a highly experienced veterinarian with over 15 years of experience in wildlife medicine. She specializes in large animal care and has led numerous conservation projects.',
      schedule: [
        { day: 'Monday', hours: '8:00 AM - 5:00 PM' },
        { day: 'Tuesday', hours: '8:00 AM - 5:00 PM' },
        { day: 'Wednesday', hours: '8:00 AM - 5:00 PM' },
        { day: 'Thursday', hours: '8:00 AM - 5:00 PM' },
        { day: 'Friday', hours: '8:00 AM - 3:00 PM' },
      ]
    },
    {
      id: 2,
      name: 'David Ochieng',
      role: 'Senior Ranger',
      department: 'security',
      contactEmail: 'david.ochieng@kws.org',
      contactPhone: '+254 723 456 789',
      location: 'Eastern Section',
      startDate: 'Feb 2015',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=68',
      bio: 'David Ochieng has been protecting wildlife for over 8 years. He leads patrols in the Eastern Section and has extensive experience in anti-poaching operations.',
      schedule: [
        { day: 'Monday', hours: '6:00 AM - 2:00 PM' },
        { day: 'Tuesday', hours: '6:00 AM - 2:00 PM' },
        { day: 'Wednesday', hours: '6:00 AM - 2:00 PM' },
        { day: 'Thursday', hours: '6:00 AM - 2:00 PM' },
        { day: 'Friday', hours: '6:00 AM - 2:00 PM' },
        { day: 'Saturday', hours: '6:00 AM - 12:00 PM' },
      ]
    },
    {
      id: 3,
      name: 'Sarah Kimani',
      role: 'Conservation Officer',
      department: 'conservation',
      contactEmail: 'sarah.kimani@kws.org',
      contactPhone: '+254 734 567 890',
      location: 'Main Office',
      startDate: 'Nov 2019',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=47',
      bio: 'Sarah Kimani is dedicated to wildlife conservation and environmental education. She develops and implements conservation programs for local communities.',
      schedule: [
        { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Friday', hours: '9:00 AM - 3:00 PM' },
      ]
    },
    {
      id: 4,
      name: 'Daniel Njoroge',
      role: 'Assistant Veterinarian',
      department: 'veterinary',
      contactEmail: 'daniel.njoroge@kws.org',
      contactPhone: '+254 745 678 901',
      location: 'Field Hospital',
      startDate: 'Jun 2020',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=59',
      bio: 'Daniel Njoroge assists in veterinary procedures and emergency care for wildlife. He has a special interest in avian medicine and rehabilitation.',
      schedule: [
        { day: 'Monday', hours: '8:00 AM - 4:00 PM' },
        { day: 'Tuesday', hours: '8:00 AM - 4:00 PM' },
        { day: 'Wednesday', hours: '8:00 AM - 4:00 PM' },
        { day: 'Thursday', hours: '8:00 AM - 4:00 PM' },
        { day: 'Friday', hours: '8:00 AM - 2:00 PM' },
      ]
    },
    {
      id: 5,
      name: 'Grace Muthoni',
      role: 'Research Lead',
      department: 'research',
      contactEmail: 'grace.muthoni@kws.org',
      contactPhone: '+254 756 789 012',
      location: 'Main Office',
      startDate: 'Aug 2017',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=10',
      bio: 'Grace Muthoni leads research initiatives focused on wildlife behavior and habitat preservation. She has published numerous papers on conservation biology.',
      schedule: [
        { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Friday', hours: '9:00 AM - 3:00 PM' },
      ]
    },
    {
      id: 6,
      name: 'Paul Kiprono',
      role: 'Senior Ranger',
      department: 'security',
      contactEmail: 'paul.kiprono@kws.org',
      contactPhone: '+254 767 890 123',
      location: 'Northern Section',
      startDate: 'Apr 2016',
      status: 'leave',
      avatar: 'https://i.pravatar.cc/150?img=12',
      bio: 'Paul Kiprono has extensive experience in wildlife protection and anti-poaching operations. He currently leads the Northern Section security team.',
      schedule: [
        { day: 'Monday', hours: 'On Leave' },
        { day: 'Tuesday', hours: 'On Leave' },
        { day: 'Wednesday', hours: 'On Leave' },
        { day: 'Thursday', hours: 'On Leave' },
        { day: 'Friday', hours: 'On Leave' },
      ]
    },
    {
      id: 7,
      name: 'Eunice Akinyi',
      role: 'Visitor Operations',
      department: 'operations',
      contactEmail: 'eunice.akinyi@kws.org',
      contactPhone: '+254 778 901 234',
      location: 'Visitor Center',
      startDate: 'Mar 2021',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=24',
      bio: 'Eunice Akinyi manages visitor experiences and educational programs. She ensures visitors have safe and informative experiences while respecting wildlife.',
      schedule: [
        { day: 'Monday', hours: '8:00 AM - 5:00 PM' },
        { day: 'Tuesday', hours: '8:00 AM - 5:00 PM' },
        { day: 'Wednesday', hours: '8:00 AM - 5:00 PM' },
        { day: 'Thursday', hours: '8:00 AM - 5:00 PM' },
        { day: 'Friday', hours: '8:00 AM - 5:00 PM' },
        { day: 'Saturday', hours: '9:00 AM - 3:00 PM' },
      ]
    },
    {
      id: 8,
      name: 'James Kamau',
      role: 'IT Specialist',
      department: 'operations',
      contactEmail: 'james.kamau@kws.org',
      contactPhone: '+254 789 012 345',
      location: 'Main Office',
      startDate: 'Jan 2022',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=13',
      bio: 'James Kamau manages the park\'s IT infrastructure and digital systems. He ensures all technology systems run smoothly to support conservation efforts.',
      schedule: [
        { day: 'Monday', hours: '8:00 AM - 5:00 PM' },
        { day: 'Tuesday', hours: '8:00 AM - 5:00 PM' },
        { day: 'Wednesday', hours: '8:00 AM - 5:00 PM' },
        { day: 'Thursday', hours: '8:00 AM - 5:00 PM' },
        { day: 'Friday', hours: '8:00 AM - 3:00 PM' },
      ]
    },
  ];

  // Mock department data
  const departments = [
    { id: 'veterinary', name: 'Veterinary', icon: BriefcaseMedical, color: 'bg-blue-100 text-blue-800' },
    { id: 'security', name: 'Security', icon: Shield, color: 'bg-green-100 text-green-800' },
    { id: 'conservation', name: 'Conservation', icon: Users, color: 'bg-amber-100 text-amber-800' },
    { id: 'research', name: 'Research', icon: UserCog, color: 'bg-purple-100 text-purple-800' },
    { id: 'operations', name: 'Operations', icon: Calendar, color: 'bg-orange-100 text-orange-800' },
  ];

  // Filter staff by department and search query
  const filteredStaff = useMemo(() => {
    return staffMembers.filter(member => {
      // Filter by department
      const departmentMatch = department === 'all' || member.department === department;
      
      // Filter by search query
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = !searchQuery || 
        member.name.toLowerCase().includes(searchLower) ||
        member.role.toLowerCase().includes(searchLower) ||
        member.contactEmail.toLowerCase().includes(searchLower);
      
      return departmentMatch && searchMatch;
    });
  }, [department, searchQuery, staffMembers]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case 'leave':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">On Leave</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDepartmentBadge = (deptId: string) => {
    const dept = departments.find(d => d.id === deptId);
    if (!dept) return null;
    
    const Icon = dept.icon;
    return (
      <Badge variant="outline" className={cn("flex items-center gap-1", dept.color)}>
        <Icon className="h-3 w-3" /> {dept.name}
      </Badge>
    );
  };

  const handleAddStaff = () => {
    // In a real application, this would open a form to add a new staff member
    toast({
      title: "Staff member added",
      description: "A new staff member has been added to the system.",
    });
    setShowAddStaffDialog(false);
  };

  const handleViewProfile = (staffId: number) => {
    setSelectedStaff(staffId);
    setShowProfileDialog(true);
  };

  const handleViewSchedule = (staffId: number) => {
    setSelectedStaff(staffId);
    setShowScheduleDialog(true);
  };

  const selectedStaffMember = selectedStaff ? staffMembers.find(s => s.id === selectedStaff) : null;

  return (
    <PageTemplate 
      title="Staff Management" 
      description="Manage park staff, roles, and responsibilities"
      icon={<Users className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search staff..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Dialog open={showAddStaffDialog} onOpenChange={setShowAddStaffDialog}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Add Staff Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new staff member to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="Full name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Input id="role" placeholder="Job title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">
                    Department
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="Email address" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" placeholder="Phone number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" placeholder="Work location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <Textarea id="bio" placeholder="Brief biography" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddStaffDialog(false)}>Cancel</Button>
                <Button onClick={handleAddStaff}>Add Staff Member</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Department cards */}
          {departments.map(dept => {
            const count = staffMembers.filter(s => s.department === dept.id).length;
            const Icon = dept.icon;
            return (
              <Card 
                key={dept.id} 
                className={cn(
                  "cursor-pointer hover:border-primary transition-colors",
                  department === dept.id && "border-primary bg-primary/5"
                )}
                onClick={() => setDepartment(dept.id)}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-2", dept.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium">{dept.name}</h3>
                  <p className="text-sm text-muted-foreground">{count} staff</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>
                    {department === 'all' 
                      ? 'All Staff Members' 
                      : `${departments.find(d => d.id === department)?.name} Department`}
                  </span>
                </CardTitle>
                <CardDescription>
                  Showing {filteredStaff.length} of {staffMembers.length} staff members
                </CardDescription>
              </div>
              <Select 
                value={department} 
                onValueChange={setDepartment}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStaff.map(person => (
                <div key={person.id} className="border rounded-lg p-4 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{person.name}</h3>
                      <p className="text-sm text-muted-foreground">{person.role}</p>
                      <div className="mt-1">
                        {getStatusBadge(person.status)}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="break-all">{person.contactEmail}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{person.contactPhone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{person.location}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>Since {person.startDate}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t">
                    {getDepartmentBadge(person.department)}
                  </div>
                  <div className="mt-auto pt-4 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewProfile(person.id)}
                    >
                      Profile
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewSchedule(person.id)}
                    >
                      Schedule
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Page 1 of 1
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedStaffMember && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedStaffMember.avatar} alt={selectedStaffMember.name} />
                    <AvatarFallback>{selectedStaffMember.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl">{selectedStaffMember.name}</DialogTitle>
                    <DialogDescription>
                      {selectedStaffMember.role} • {departments.find(d => d.id === selectedStaffMember.department)?.name}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedStaffMember.contactEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedStaffMember.contactPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedStaffMember.location}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Biography</h3>
                  <p className="text-sm">{selectedStaffMember.bio}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Employment Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Started: {selectedStaffMember.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                      <span>Status: {selectedStaffMember.status === 'active' ? 'Active' : 'On Leave'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowProfileDialog(false)}>Close</Button>
                <Button>Edit Profile</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedStaffMember && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedStaffMember.avatar} alt={selectedStaffMember.name} />
                    <AvatarFallback>{selectedStaffMember.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl">Schedule</DialogTitle>
                    <DialogDescription>
                      {selectedStaffMember.name} • {selectedStaffMember.role}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-3">
                  {selectedStaffMember.schedule.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                      <div className="font-medium">{item.day}</div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{item.hours}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>Close</Button>
                <Button>Edit Schedule</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageTemplate>
  );
};

export default Staff;
