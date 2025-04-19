import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, Calendar, Clock, User } from 'lucide-react';

interface HealthCheck {
  id: string;
  animalId: string;
  animalName: string;
  date: string;
  time: string;
  type: string;
  veterinarian: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
}

interface HealthCheckManagementProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HealthCheckManagement({
  isOpen,
  onClose,
}: HealthCheckManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for health checks
  const healthChecks: HealthCheck[] = [
    {
      id: 'HC001',
      animalId: 'A001',
      animalName: 'Simba',
      date: '2024-03-15',
      time: '09:00',
      type: 'Routine Check-up',
      veterinarian: 'Dr. Smith',
      status: 'scheduled',
      notes: 'Annual health check-up',
    },
    {
      id: 'HC002',
      animalId: 'A002',
      animalName: 'Nala',
      date: '2024-03-16',
      time: '10:30',
      type: 'Vaccination',
      veterinarian: 'Dr. Johnson',
      status: 'scheduled',
      notes: 'Annual vaccination',
    },
    {
      id: 'HC003',
      animalId: 'A003',
      animalName: 'Mufasa',
      date: '2024-03-14',
      time: '14:00',
      type: 'Emergency',
      veterinarian: 'Dr. Williams',
      status: 'completed',
      notes: 'Follow-up after injury',
    },
    {
      id: 'HC004',
      animalId: 'A004',
      animalName: 'Sarabi',
      date: '2024-03-17',
      time: '11:00',
      type: 'Dental Check',
      veterinarian: 'Dr. Brown',
      status: 'scheduled',
      notes: 'Regular dental examination',
    },
    {
      id: 'HC005',
      animalId: 'A005',
      animalName: 'Rafiki',
      date: '2024-03-18',
      time: '15:30',
      type: 'Blood Test',
      veterinarian: 'Dr. Davis',
      status: 'scheduled',
      notes: 'Annual blood work',
    },
  ];

  // Filter health checks based on search query and status
  const filteredChecks = healthChecks.filter(check => {
    const matchesSearch = 
      check.animalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      check.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      check.veterinarian.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      selectedStatus === 'all' || 
      check.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Health Check Management</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid grid-cols-1 sm:flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search health checks..." 
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 sm:flex gap-2">
                <Select 
                  value={selectedStatus} 
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">New Check-up</span>
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Animal</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Veterinarian</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChecks.length > 0 ? (
                  filteredChecks.map((check) => (
                    <TableRow key={check.id}>
                      <TableCell className="font-medium">{check.id}</TableCell>
                      <TableCell>{check.animalName}</TableCell>
                      <TableCell>{check.date}</TableCell>
                      <TableCell>{check.time}</TableCell>
                      <TableCell>{check.type}</TableCell>
                      <TableCell>{check.veterinarian}</TableCell>
                      <TableCell>{getStatusBadge(check.status)}</TableCell>
                      <TableCell>{check.notes}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      No health checks found with the selected filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 