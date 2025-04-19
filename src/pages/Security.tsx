import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/PageTemplate';
import { 
  ShieldAlert, Search, Filter, Eye, Calendar, MapPin, Camera, AlertTriangle, 
  User, ChevronDown, Plus, Activity, Lock, Siren, Bell, Users, 
  FileText, Map, CheckCircle, AlarmClockCheck, CircleCheck, BarChart,
  Shield, ArrowUpRightSquare, AlarmCheck, LayoutGrid, ListFilter, Clock,
  Battery, Settings, Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Security = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('incidents');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewIncidentDialog, setShowNewIncidentDialog] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: '',
    description: '',
    location: '',
    priority: 'medium',
    category: 'perimeter',
    assignedTo: ''
  });
  
  // Sample incident data
  const incidents = [
    {
      id: 'INC-2025-001',
      title: 'Perimeter Breach Detected',
      description: 'Motion detected near Sector 4 fence line. Possible animal or human intrusion.',
      location: 'Sector 4',
      time: '2025-04-18T03:45:00',
      assignedTo: {
        id: 301,
        name: 'Ranger Emily',
        image: 'https://i.pravatar.cc/150?img=12'
      },
      status: 'active',
      priority: 'high',
      category: 'perimeter'
    },
    {
      id: 'INC-2025-002',
      title: 'Suspicious Vehicle Sighted',
      description: 'Unidentified vehicle observed near the park entrance after hours.',
      location: 'Park Entrance',
      time: '2025-04-19T22:12:00',
      assignedTo: {
        id: 302,
        name: 'Officer Kevin',
        image: 'https://i.pravatar.cc/150?img=13'
      },
      status: 'investigating',
      priority: 'medium',
      category: 'vehicle'
    },
    {
      id: 'INC-2025-003',
      title: 'Camera Offline',
      description: 'Camera 7 in Sector 9 is offline. Possible malfunction or tampering.',
      location: 'Sector 9',
      time: '2025-04-20T08:00:00',
      assignedTo: {
        id: 301,
        name: 'Ranger Emily',
        image: 'https://i.pravatar.cc/150?img=12'
      },
      status: 'active',
      priority: 'medium',
      category: 'camera'
    },
    {
      id: 'INC-2025-004',
      title: 'False Alarm - Animal Crossing',
      description: 'Motion sensors triggered by a herd of elephants crossing Sector 2.',
      location: 'Sector 2',
      time: '2025-04-21T01:55:00',
      assignedTo: {
        id: 302,
        name: 'Officer Kevin',
        image: 'https://i.pravatar.cc/150?img=13'
      },
      status: 'false-alarm',
      priority: 'low',
      category: 'animal'
    },
    {
      id: 'INC-2025-005',
      title: 'Gate Lock Damaged',
      description: 'Lock on the main gate to the research area is damaged. Possible attempted entry.',
      location: 'Research Area Gate',
      time: '2025-04-22T06:30:00',
      assignedTo: {
        id: 301,
        name: 'Ranger Emily',
        image: 'https://i.pravatar.cc/150?img=12'
      },
      status: 'resolved',
      priority: 'high',
      category: 'access'
    }
  ];

  // Sample alerts data  
  const alerts = [
    {
      id: 'ALRT-2025-001',
      title: 'High Activity Zone Detected',
      description: 'Unusual concentration of animal movement in Sector 6.',
      location: 'Sector 6',
      time: '2025-04-18T14:22:00',
      type: 'animal',
      severity: 'warning'
    },
    {
      id: 'ALRT-2025-002',
      title: 'Perimeter Sensor Triggered',
      description: 'Sensor 12 near the north fence line triggered. Investigate possible breach.',
      location: 'North Fence Line',
      time: '2025-04-19T01:18:00',
      type: 'perimeter',
      severity: 'critical'
    },
    {
      id: 'ALRT-2025-003',
      title: 'Vehicle Speeding',
      description: 'Vehicle exceeding speed limit on main road. License plate KWS-789.',
      location: 'Main Road',
      time: '2025-04-20T11:55:00',
      type: 'vehicle',
      severity: 'minor'
    },
    {
      id: 'ALRT-2025-004',
      title: 'Camera Tampering',
      description: 'Camera 3 in Sector 2 shows signs of physical tampering. Check for damage.',
      location: 'Sector 2',
      time: '2025-04-21T09:30:00',
      type: 'camera',
      severity: 'warning'
    },
    {
      id: 'ALRT-2025-005',
      title: 'Unusual Sound Detected',
      description: 'High-pitched sound detected near the visitor center. Source unknown.',
      location: 'Visitor Center',
      time: '2025-04-22T16:48:00',
      type: 'sound',
      severity: 'minor'
    },
    {
      id: 'ALRT-2025-006',
      title: 'Perimeter Sensor Triggered',
      description: 'Sensor 12 near the north fence line triggered. Investigate possible breach.',
      location: 'North Fence Line',
      time: '2025-04-19T01:18:00',
      type: 'perimeter',
      severity: 'critical'
    },
    {
      id: 'ALRT-2025-007',
      title: 'Vehicle Speeding',
      description: 'Vehicle exceeding speed limit on main road. License plate KWS-789.',
      location: 'Main Road',
      time: '2025-04-20T11:55:00',
      type: 'vehicle',
      severity: 'minor'
    }
  ];

  // Sample patrol data
  const patrols = [
    {
      id: 'PTL-2025-001',
      name: 'North Perimeter Patrol',
      status: 'active',
      members: [
        { id: 301, name: 'Ranger Emily', image: 'https://i.pravatar.cc/150?img=12' },
        { id: 302, name: 'Officer Kevin', image: 'https://i.pravatar.cc/150?img=13' }
      ],
      route: 'North Perimeter',
      startTime: '2025-04-22T06:00:00',
      endTime: '2025-04-22T14:00:00',
      lastCheckIn: '2025-04-22T13:45:00',
      location: { lat: -1.2921, lng: 36.8219 }
    },
    {
      id: 'PTL-2025-002',
      name: 'Wildlife Monitoring Patrol',
      status: 'active',
      members: [
        { id: 303, name: 'Ranger David', image: 'https://i.pravatar.cc/150?img=14' }
      ],
      route: 'Central Wildlife Zone',
      startTime: '2025-04-22T07:00:00',
      endTime: '2025-04-22T15:00:00',
      lastCheckIn: '2025-04-22T13:30:00',
      location: { lat: -1.2848, lng: 36.8344 }
    },
    {
      id: 'PTL-2025-003',
      name: 'Visitor Area Patrol',
      status: 'completed',
      members: [
        { id: 304, name: 'Officer Sarah', image: 'https://i.pravatar.cc/150?img=15' }
      ],
      route: 'Visitor Center Area',
      startTime: '2025-04-22T05:00:00',
      endTime: '2025-04-22T13:00:00',
      lastCheckIn: '2025-04-22T13:00:00',
      location: { lat: -1.2890, lng: 36.8250 }
    }
  ];

  // Sample camera data
  const cameras = [
    {
      id: 'CAM-001',
      name: 'North Gate Camera',
      location: 'North Gate',
      status: 'online',
      type: 'PTZ',
      lastMotion: '2025-04-22T13:45:00',
      recording: true,
      battery: 100,
      signal: 95
    },
    {
      id: 'CAM-002',
      name: 'Visitor Center East',
      location: 'Visitor Center',
      status: 'online',
      type: 'Fixed',
      lastMotion: '2025-04-22T13:40:00',
      recording: true,
      battery: 100,
      signal: 90
    },
    {
      id: 'CAM-003',
      name: 'Perimeter Fence S1',
      location: 'South Perimeter',
      status: 'warning',
      type: 'Thermal',
      lastMotion: '2025-04-22T13:30:00',
      recording: true,
      battery: 45,
      signal: 75
    },
    {
      id: 'CAM-004',
      name: 'Wildlife Zone 2',
      location: 'Central Zone',
      status: 'offline',
      type: 'PTZ',
      lastMotion: '2025-04-22T12:15:00',
      recording: false,
      battery: 0,
      signal: 0
    },
    {
      id: 'CAM-005',
      name: 'Parking Area West',
      location: 'Parking Zone',
      status: 'online',
      type: 'Fixed',
      lastMotion: '2025-04-22T13:42:00',
      recording: true,
      battery: 95,
      signal: 88
    },
    {
      id: 'CAM-006',
      name: 'Research Station',
      location: 'Research Zone',
      status: 'online',
      type: 'PTZ',
      lastMotion: '2025-04-22T13:44:00',
      recording: true,
      battery: 85,
      signal: 92
    }
  ];

  // Sample reports data
  const reports = [
    {
      id: 'RPT-2025-001',
      title: 'Monthly Security Overview',
      type: 'periodic',
      status: 'completed',
      author: {
        name: 'Security Admin',
        image: 'https://i.pravatar.cc/150?img=12'
      },
      date: '2025-04-01',
      summary: 'Comprehensive overview of security operations for March 2025',
      metrics: {
        incidents: 24,
        resolved: 22,
        pending: 2
      }
    },
    {
      id: 'RPT-2025-002',
      title: 'Perimeter Breach Analysis',
      type: 'incident',
      status: 'in-progress',
      author: {
        name: 'Ranger Emily',
        image: 'https://i.pravatar.cc/150?img=12'
      },
      date: '2025-04-20',
      summary: 'Analysis of recent perimeter breach incidents and preventive measures',
      metrics: {
        incidents: 3,
        resolved: 2,
        pending: 1
      }
    },
    {
      id: 'RPT-2025-003',
      title: 'Camera System Audit',
      type: 'audit',
      status: 'scheduled',
      author: {
        name: 'Tech Team',
        image: 'https://i.pravatar.cc/150?img=13'
      },
      date: '2025-04-25',
      summary: 'Scheduled audit of all security camera systems and infrastructure',
      metrics: {
        incidents: 0,
        resolved: 0,
        pending: 0
      }
    }
  ];

  // Handler functions
  const handleFilterClick = () => {
    toast({
      title: "Advanced Filters",
      description: "Advanced filter options would appear here",
    });
  };

  const handleNewIncident = () => {
    setShowNewIncidentDialog(true);
  };

  const handleCreateIncident = () => {
    // In a real app, this would create a new incident in the database
    toast({
      title: "Incident Created",
      description: `New incident "${newIncident.title}" has been created successfully.`,
    });
    setShowNewIncidentDialog(false);
    // Reset form
    setNewIncident({
      title: '',
      description: '',
      location: '',
      priority: 'medium',
      category: 'perimeter',
      assignedTo: ''
    });
  };

  const handleIncidentAction = (action: string, incidentId: string) => {
    toast({
      title: `Incident Action: ${action}`,
      description: `Action '${action}' performed on incident ${incidentId}`,
    });
  };

  const handlePagination = (direction: 'prev' | 'next') => {
    toast({
      title: `Pagination: ${direction === 'prev' ? 'Previous' : 'Next'} Page`,
      description: `Navigating to ${direction === 'prev' ? 'previous' : 'next'} page of results`,
    });
  };

  const handleViewAll = (section: string) => {
    toast({
      title: `View All ${section}`,
      description: `Navigating to all ${section} view`,
    });
  };

  const handleMapView = () => {
    toast({
      title: "Map View",
      description: "Switching to map view of incidents and alerts",
    });
  };

  const handleViewLayout = (layout: string) => {
    toast({
      title: `View Layout: ${layout}`,
      description: `Switching to ${layout} layout`,
    });
  };

  // Filter incidents based on status, sector and search query
  const filteredIncidents = incidents.filter(incident => {
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    const matchesSector = sectorFilter === 'all' || incident.location.includes(sectorFilter.charAt(0).toUpperCase() + sectorFilter.slice(1));
    const matchesSearch = searchQuery === '' ||
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSector && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="destructive">Active</Badge>;
      case 'investigating':
        return <Badge className="bg-amber-500 hover:bg-amber-600">Investigating</Badge>;
      case 'resolved':
        return <Badge className="bg-green-500 hover:bg-green-600">Resolved</Badge>;
      case 'false-alarm':
        return <Badge variant="secondary">False Alarm</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500 hover:bg-amber-600">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryMap: {[key: string]: {label: string, color: string}} = {
      'perimeter': { label: 'Perimeter', color: 'bg-blue-100 text-blue-800' },
      'vehicle': { label: 'Vehicle', color: 'bg-green-100 text-green-800' },
      'camera': { label: 'Camera', color: 'bg-red-100 text-red-800' },
      'animal': { label: 'Animal', color: 'bg-purple-100 text-purple-800' },
      'access': { label: 'Access', color: 'bg-yellow-100 text-yellow-800' }
    };

    const categoryInfo = categoryMap[category] || { label: category, color: 'bg-gray-100 text-gray-800' };

    return (
      <Badge variant="secondary" className={categoryInfo.color}>
        {categoryInfo.label}
      </Badge>
    );
  };

  const getAlertTypeBadge = (type: string) => {
    const typeMap: {[key: string]: {label: string, color: string}} = {
      'animal': { label: 'Animal Activity', color: 'bg-blue-100 text-blue-800' },
      'perimeter': { label: 'Perimeter Breach', color: 'bg-red-100 text-red-800' },
      'vehicle': { label: 'Vehicle Alert', color: 'bg-green-100 text-green-800' },
      'camera': { label: 'Camera Issue', color: 'bg-purple-100 text-purple-800' },
      'sound': { label: 'Sound Anomaly', color: 'bg-yellow-100 text-yellow-800' }
    };

    const typeInfo = typeMap[type] || { label: type, color: 'bg-gray-100 text-gray-800' };

    return (
      <Badge variant="secondary" className={typeInfo.color}>
        {typeInfo.label}
      </Badge>
    );
  };

  const getCameraStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-500">Online</Badge>;
      case 'offline':
        return <Badge variant="destructive">Offline</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-500">Warning</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getReportTypeBadge = (type: string) => {
    switch (type) {
      case 'periodic':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Periodic</Badge>;
      case 'incident':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Incident</Badge>;
      case 'audit':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">Audit</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const getReportStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-500">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="bg-amber-500">In Progress</Badge>;
      case 'scheduled':
        return <Badge variant="secondary">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  return (
    <PageTemplate 
      title="Security Management" 
      description="Monitor and manage security operations"
      icon={<ShieldAlert className="h-6 w-6" />}
    >
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid grid-cols-1 sm:flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search incidents..." 
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2">
              <div className="w-full">
                <Select 
                  value={statusFilter} 
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="false-alarm">False Alarm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="w-full sm:w-auto" onClick={handleFilterClick}>
                <Filter className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full sm:w-40">
              <Select 
                value={sectorFilter} 
                onValueChange={setSectorFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="north">North Sector</SelectItem>
                  <SelectItem value="south">South Sector</SelectItem>
                  <SelectItem value="east">East Sector</SelectItem>
                  <SelectItem value="west">West Sector</SelectItem>
                  <SelectItem value="central">Central Sector</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full sm:w-auto" onClick={handleNewIncident}>
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">New Incident</span>
            </Button>
          </div>
        </div>

        {/* Security Tabs and Content */}
        <Tabs defaultValue="incidents" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 w-full overflow-x-auto flex whitespace-nowrap">
            <TabsTrigger value="incidents" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Incidents
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> Alerts
            </TabsTrigger>
            <TabsTrigger value="patrols" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Patrols
            </TabsTrigger>
            <TabsTrigger value="cameras" className="flex items-center gap-2">
              <Camera className="h-4 w-4" /> Cameras
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="incidents" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" /> Security Incidents
                    </CardTitle>
                    <CardDescription>
                      Showing {filteredIncidents.length} of {incidents.length} incidents
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {/* Map view and layout buttons removed */}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="hidden md:table-cell">Location</TableHead>
                          <TableHead className="hidden md:table-cell">Time</TableHead>
                          <TableHead className="hidden lg:table-cell">Assigned To</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredIncidents.length > 0 ? (
                          filteredIncidents.map((incident) => (
                            <TableRow key={incident.id} className="cursor-pointer hover:bg-muted/50">
                              <TableCell className="font-medium">{incident.id}</TableCell>
                              <TableCell>
                                <div className="font-medium">{incident.title}</div>
                                <div className="text-xs text-muted-foreground hidden sm:block mt-1">
                                  {incident.description.substring(0, 60)}...
                                </div>
                                <div className="mt-1 flex gap-1">
                                  {getPriorityBadge(incident.priority)}
                                  {getCategoryBadge(incident.category)}
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3 text-muted-foreground" />
                                  <span>{incident.location}</span>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3 text-muted-foreground" />
                                  <span>{new Date(incident.time).toLocaleString()}</span>
                                </div>
                              </TableCell>
                              <TableCell className="hidden lg:table-cell">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-7 w-7">
                                    <AvatarImage src={incident.assignedTo?.image} alt={incident.assignedTo?.name} />
                                    <AvatarFallback>{incident.assignedTo?.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{incident.assignedTo?.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>{getStatusBadge(incident.status)}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <ChevronDown className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => handleIncidentAction('view', incident.id)}>
                                      <Eye className="mr-2 h-4 w-4" /> View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleIncidentAction('update', incident.id)}>
                                      <Activity className="mr-2 h-4 w-4" /> Update Status
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleIncidentAction('assign', incident.id)}>
                                      <User className="mr-2 h-4 w-4" /> Reassign
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleIncidentAction('resolve', incident.id)}>
                                      <CheckCircle className="mr-2 h-4 w-4" /> Mark Resolved
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                              No incidents found matching the current filters.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Page 1 of 1
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled onClick={() => handlePagination('prev')}>Previous</Button>
                  <Button variant="outline" size="sm" disabled onClick={() => handlePagination('next')}>Next</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>Most recent security alerts from all systems</CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="space-y-4">
                    {alerts.slice(0, 5).map((alert) => (
                      <div key={alert.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            {getAlertTypeBadge(alert.type)}
                            <span className="font-medium">{alert.title}</span>
                          </div>
                          <Badge>{alert.severity}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{alert.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(alert.time).toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleIncidentAction('respond', alert.id)}>
                            Respond
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleIncidentAction('dismiss', alert.id)}>
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" onClick={() => handleViewAll('Alerts')}>
                      View All Alerts
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Status</CardTitle>
                  <CardDescription>Overall security health of the park</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  <CircleCheck className="h-10 w-10 text-green-500" />
                  <div className="text-2xl font-semibold mt-2">All Systems Nominal</div>
                  <div className="text-sm text-muted-foreground">Last checked: 2025-04-22 17:30</div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Detailed Status
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:col-span-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Metrics</CardTitle>
                    <CardDescription>Real-time security performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { title: 'Response Time', value: '4.2 min', icon: <Clock className="h-4 w-4" />, change: '-12%', positive: true },
                        { title: 'Incidents This Month', value: '24', icon: <AlertTriangle className="h-4 w-4" />, change: '+8%', positive: false },
                        { title: 'Perimeter Breaches', value: '3', icon: <Activity className="h-4 w-4" />, change: '-25%', positive: true },
                        { title: 'Active Patrols', value: '6', icon: <Users className="h-4 w-4" />, change: '+2', positive: true }
                      ].map((metric, idx) => (
                        <Card key={idx} className="bg-muted/50">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col gap-1">
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  {metric.icon} {metric.title}
                                </span>
                                <span className="text-2xl font-semibold">{metric.value}</span>
                              </div>
                              <div className={`text-xs ${metric.positive ? 'text-green-500' : 'text-red-500'}`}>
                                {metric.change}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => handleViewAll('Metrics')}>
                      View Detailed Metrics
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="patrols" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" /> Active Patrols
                    </CardTitle>
                    <CardDescription>
                      Currently active patrol units and their status
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {/* Map view and layout buttons removed */}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Map View */}
                  <div className="md:col-span-2 rounded-lg border bg-card h-[400px] relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="text-center">
                        <Map className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Map view will be implemented here</p>
                        <p className="text-xs text-muted-foreground mt-1">Showing patrol locations and routes</p>
                      </div>
                    </div>
                  </div>

                  {/* Patrol List */}
                  <div className="space-y-4">
                    {patrols.map((patrol) => (
                      <Card key={patrol.id} className={`${patrol.status === 'active' ? 'border-green-500' : ''}`}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-sm font-medium">{patrol.name}</CardTitle>
                              <CardDescription>{patrol.route}</CardDescription>
                            </div>
                            <Badge variant={patrol.status === 'active' ? 'default' : 'secondary'}>
                              {patrol.status === 'active' ? 'Active' : 'Completed'}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex -space-x-2 mb-2">
                            {patrol.members.map((member) => (
                              <Avatar key={member.id} className="border-2 border-background">
                                <AvatarImage src={member.image} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              Last check-in: {new Date(patrol.lastCheckIn).toLocaleTimeString()}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(patrol.startTime).toLocaleTimeString()} - {new Date(patrol.endTime).toLocaleTimeString()}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <div className="flex gap-2 w-full">
                            <Button variant="outline" className="flex-1" onClick={() => handleIncidentAction('contact', patrol.id)}>
                              Contact
                            </Button>
                            <Button variant="outline" className="flex-1" onClick={() => handleIncidentAction('track', patrol.id)}>
                              Track
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Patrol Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Coverage Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>North Sector</span>
                        <span className="text-green-500">Active</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>South Sector</span>
                        <span className="text-yellow-500">Partial</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>East Sector</span>
                        <span className="text-green-500">Active</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>West Sector</span>
                        <span className="text-red-500">No Coverage</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Patrol Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Patrols</span>
                      <span className="font-medium">3/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Distance</span>
                      <span className="font-medium">24.5 km</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Areas Covered</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Check-ins Today</span>
                      <span className="font-medium">28</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: '13:45', event: 'Patrol PTL-001 checked in at North Gate' },
                      { time: '13:30', event: 'Patrol PTL-002 reported animal sighting' },
                      { time: '13:15', event: 'Patrol PTL-003 completed route' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="text-sm font-medium">{activity.time}</div>
                          <div className="text-sm text-muted-foreground">{activity.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Equipment Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Radios', status: 'Operational', count: '12/12' },
                      { name: 'GPS Trackers', status: 'Warning', count: '10/12' },
                      { name: 'Body Cameras', status: 'Operational', count: '8/8' },
                      { name: 'Vehicles', status: 'Warning', count: '4/5' },
                    ].map((equipment, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="text-sm">{equipment.name}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant={equipment.status === 'Operational' ? 'default' : 'warning'}>
                            {equipment.count}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cameras" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Camera className="h-5 w-5" /> Security Cameras
                    </CardTitle>
                    <CardDescription>
                      Live camera feeds and status monitoring
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cameras</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* Layout button removed */}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cameras.map((camera) => (
                    <Card key={camera.id} className={`${camera.status === 'offline' ? 'opacity-75' : ''}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-sm font-medium">{camera.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {camera.location}
                            </CardDescription>
                          </div>
                          {getCameraStatusBadge(camera.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        {/* Camera Feed Placeholder */}
                        <div className="aspect-video rounded-md bg-muted relative mb-2">
                          <div className="absolute inset-0 flex items-center justify-center">
                            {camera.status === 'offline' ? (
                              <div className="text-center">
                                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Camera Offline</p>
                              </div>
                            ) : (
                              <div className="text-center">
                                <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Live Feed</p>
                              </div>
                            )}
                          </div>
                          {camera.recording && camera.status !== 'offline' && (
                            <div className="absolute top-2 right-2">
                              <Badge variant="destructive" className="animate-pulse">REC</Badge>
                            </div>
                          )}
                        </div>
                        {/* Camera Stats */}
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Activity className="h-4 w-4" />
                            Signal: {camera.signal}%
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Battery className="h-4 w-4" />
                            Battery: {camera.battery}%
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Eye className="h-4 w-4" />
                            Type: {camera.type}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            Last Motion: {new Date(camera.lastMotion).toLocaleTimeString()}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex gap-2 w-full">
                          <Button variant="outline" className="flex-1" disabled={camera.status === 'offline'}>
                            <Eye className="h-4 w-4 mr-2" /> View
                          </Button>
                          <Button variant="outline" className="flex-1" disabled={camera.status === 'offline'}>
                            <Settings className="h-4 w-4 mr-2" /> Configure
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Camera System Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>System Health</span>
                        <span className="text-green-500">Good</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Storage</span>
                        <span className="text-yellow-500">75% Used</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Network</span>
                        <span className="text-green-500">Strong</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Uptime</span>
                        <span className="text-green-500">99.9%</span>
                      </div>
                      <Progress value={99} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Camera Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Cameras</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Feeds</span>
                      <span className="font-medium">10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Motion Events (24h)</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Storage Rate</span>
                      <span className="font-medium">2.4 TB/day</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Recent Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: '13:45', event: 'Motion detected on CAM-001' },
                      { time: '13:30', event: 'CAM-004 went offline' },
                      { time: '13:15', event: 'Scheduled maintenance completed' },
                      { time: '13:00', event: 'Storage cleanup initiated' }
                    ].map((event, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="text-sm font-medium">{event.time}</div>
                          <div className="text-sm text-muted-foreground">{event.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" /> Security Reports
                    </CardTitle>
                    <CardDescription>
                      Security analysis reports and documentation
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Reports</SelectItem>
                        <SelectItem value="periodic">Periodic</SelectItem>
                        <SelectItem value="incident">Incident</SelectItem>
                        <SelectItem value="audit">Audit</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" /> New Report
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <Card key={report.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base font-medium">{report.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              {getReportTypeBadge(report.type)}
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(report.date).toLocaleDateString()}
                              </span>
                            </CardDescription>
                          </div>
                          {getReportStatusBadge(report.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="text-sm text-muted-foreground mb-4">
                          {report.summary}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                            <span className="text-sm text-muted-foreground">Incidents</span>
                            <span className="text-2xl font-semibold">{report.metrics.incidents}</span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                            <span className="text-sm text-muted-foreground">Resolved</span>
                            <span className="text-2xl font-semibold text-green-500">{report.metrics.resolved}</span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                            <span className="text-sm text-muted-foreground">Pending</span>
                            <span className="text-2xl font-semibold text-amber-500">{report.metrics.pending}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={report.author.image} alt={report.author.name} />
                            <AvatarFallback>{report.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{report.author.name}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" /> View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" /> Download
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reports Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Report Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Reports</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Generated This Month</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Pending Review</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Scheduled</span>
                      <span className="font-medium">2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Report Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Periodic Reports</span>
                        <span>40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Incident Reports</span>
                        <span>35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Audit Reports</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: '13:45', event: 'Monthly report generated' },
                      { time: '12:30', event: 'Incident report updated' },
                      { time: '11:15', event: 'New audit scheduled' },
                      { time: '10:00', event: 'Report reviewed and approved' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="text-sm font-medium">{activity.time}</div>
                          <div className="text-sm text-muted-foreground">{activity.event}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Incident Dialog */}
      <Dialog open={showNewIncidentDialog} onOpenChange={setShowNewIncidentDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Security Incident</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new security incident report.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newIncident.title}
                onChange={(e) => setNewIncident({...newIncident, title: e.target.value})}
                className="col-span-3"
                placeholder="Incident title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newIncident.description}
                onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                className="col-span-3"
                placeholder="Detailed description of the incident"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Select
                value={newIncident.location}
                onValueChange={(value) => setNewIncident({...newIncident, location: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north">North Sector</SelectItem>
                  <SelectItem value="south">South Sector</SelectItem>
                  <SelectItem value="east">East Sector</SelectItem>
                  <SelectItem value="west">West Sector</SelectItem>
                  <SelectItem value="central">Central Sector</SelectItem>
                  <SelectItem value="perimeter">Perimeter</SelectItem>
                  <SelectItem value="entrance">Park Entrance</SelectItem>
                  <SelectItem value="visitor">Visitor Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select
                value={newIncident.priority}
                onValueChange={(value) => setNewIncident({...newIncident, priority: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                value={newIncident.category}
                onValueChange={(value) => setNewIncident({...newIncident, category: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="perimeter">Perimeter</SelectItem>
                  <SelectItem value="vehicle">Vehicle</SelectItem>
                  <SelectItem value="camera">Camera</SelectItem>
                  <SelectItem value="animal">Animal</SelectItem>
                  <SelectItem value="access">Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignedTo" className="text-right">
                Assign To
              </Label>
              <Select
                value={newIncident.assignedTo}
                onValueChange={(value) => setNewIncident({...newIncident, assignedTo: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ranger-emily">Ranger Emily</SelectItem>
                  <SelectItem value="officer-kevin">Officer Kevin</SelectItem>
                  <SelectItem value="ranger-david">Ranger David</SelectItem>
                  <SelectItem value="officer-sarah">Officer Sarah</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewIncidentDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateIncident}>Create Incident</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTemplate>
  );
};

export default Security;
