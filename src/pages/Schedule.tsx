import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/PageTemplate';
import { Calendar, Search, Plus, Clock, Users, MapPin, CheckCircle, XCircle, Info, Filter, CalendarDays, ChevronLeft, ChevronRight, Bird, Calendar as CalendarIcon, ClipboardList, Download, Printer } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Schedule = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('schedule');
  const [currentMonth, setCurrentMonth] = useState('April 2025');
  const [selectedDay, setSelectedDay] = useState('2025-04-18');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddEventDialog, setShowAddEventDialog] = useState(false);
  const [showEditEventDialog, setShowEditEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'veterinary',
    location: '',
    status: 'pending',
    participants: [],
    resources: []
  });
  
  // Sample schedule events data
  const events = [
    {
      id: 'EVT-1001',
      title: 'Veterinary Team Rhino Health Check',
      description: 'Scheduled health assessment for rhinos in the northern sanctuary.',
      date: '2025-04-18',
      startTime: '08:00',
      endTime: '12:00',
      type: 'veterinary',
      location: 'Northern Rhino Sanctuary',
      status: 'confirmed',
      participants: [
        { id: 1, name: 'Dr. Jane Wanjiku', avatar: 'https://i.pravatar.cc/150?img=32', role: 'Chief Veterinarian' },
        { id: 4, name: 'Daniel Njoroge', avatar: 'https://i.pravatar.cc/150?img=59', role: 'Assistant Veterinarian' }
      ],
      resources: ['Veterinary Kit', 'Transport Vehicle', 'Tranquilizers']
    },
    {
      id: 'EVT-1002',
      title: 'School Visitor Group Tour',
      description: 'Guided tour for St. Mary\'s Primary School, 35 students, 3 teachers.',
      date: '2025-04-18',
      startTime: '09:30',
      endTime: '12:30',
      type: 'visitor',
      location: 'Visitor Center to Eastern Viewpoint',
      status: 'confirmed',
      participants: [
        { id: 7, name: 'Eunice Akinyi', avatar: 'https://i.pravatar.cc/150?img=24', role: 'Visitor Operations' },
        { id: 3, name: 'Sarah Kimani', avatar: 'https://i.pravatar.cc/150?img=47', role: 'Conservation Officer' }
      ],
      resources: ['Tour Bus', 'Educational Materials', 'Refreshments']
    },
    {
      id: 'EVT-1003',
      title: 'Fence Maintenance: Southern Sector',
      description: 'Scheduled repair and reinforcement of perimeter fencing in southern sector.',
      date: '2025-04-18',
      startTime: '07:00',
      endTime: '15:00',
      type: 'maintenance',
      location: 'Southern Perimeter',
      status: 'confirmed',
      participants: [
        { id: 12, name: 'Alex Kirui', avatar: 'https://i.pravatar.cc/150?img=57', role: 'Maintenance Technician' },
        { id: 13, name: 'Joseph Kiptoo', avatar: 'https://i.pravatar.cc/150?img=69', role: 'Maintenance Technician' }
      ],
      resources: ['Fencing Materials', 'Tools', 'Transport Vehicle']
    },
    {
      id: 'EVT-1004',
      title: 'Lion Pride Monitoring',
      description: 'Tracking and documenting behavior of Eastern pride following recent cub births.',
      date: '2025-04-18',
      startTime: '15:30',
      endTime: '18:30',
      type: 'research',
      location: 'Eastern Savanna',
      status: 'confirmed',
      participants: [
        { id: 5, name: 'Grace Muthoni', avatar: 'https://i.pravatar.cc/150?img=10', role: 'Research Lead' },
        { id: 3, name: 'Sarah Kimani', avatar: 'https://i.pravatar.cc/150?img=47', role: 'Conservation Officer' }
      ],
      resources: ['Tracking Equipment', 'Camera Equipment', '4x4 Vehicle']
    },
    {
      id: 'EVT-1005',
      title: 'Anti-Poaching Unit Training',
      description: 'Training session for rangers on new tracking and patrol techniques.',
      date: '2025-04-19',
      startTime: '08:00',
      endTime: '16:00',
      type: 'security',
      location: 'Ranger Headquarters',
      status: 'confirmed',
      participants: [
        { id: 2, name: 'David Ochieng', avatar: 'https://i.pravatar.cc/150?img=68', role: 'Senior Ranger' },
        { id: 6, name: 'Paul Kiprono', avatar: 'https://i.pravatar.cc/150?img=12', role: 'Senior Ranger' }
      ],
      resources: ['Training Room', 'Field Equipment', 'Communication Devices']
    },
    {
      id: 'EVT-1006',
      title: 'Bird Species Census',
      description: 'Annual count of bird species in wetland areas to monitor population trends.',
      date: '2025-04-19',
      startTime: '06:00',
      endTime: '11:00',
      type: 'research',
      location: 'Western Wetlands',
      status: 'confirmed',
      participants: [
        { id: 5, name: 'Grace Muthoni', avatar: 'https://i.pravatar.cc/150?img=10', role: 'Research Lead' },
        { id: 15, name: 'Christine Auma', avatar: 'https://i.pravatar.cc/150?img=45', role: 'Research Assistant' }
      ],
      resources: ['Binoculars', 'Species Identification Guides', 'Recording Equipment']
    },
    {
      id: 'EVT-1007',
      title: 'Water Quality Testing',
      description: 'Monthly water quality assessment at key water sources within the park.',
      date: '2025-04-20',
      startTime: '09:00',
      endTime: '14:00',
      type: 'conservation',
      location: 'Multiple Water Sources',
      status: 'confirmed',
      participants: [
        { id: 3, name: 'Sarah Kimani', avatar: 'https://i.pravatar.cc/150?img=47', role: 'Conservation Officer' },
        { id: 14, name: 'Lucy Njeri', avatar: 'https://i.pravatar.cc/150?img=15', role: 'Environmental Specialist' }
      ],
      resources: ['Water Testing Kits', 'Sample Containers', 'GPS Device']
    },
    {
      id: 'EVT-1008',
      title: 'VIP Donor Visit',
      description: 'Tour and project briefing for major conservation funding organization representatives.',
      date: '2025-04-20',
      startTime: '10:00',
      endTime: '15:00',
      type: 'visitor',
      location: 'Main Office and Conservation Areas',
      status: 'confirmed',
      participants: [
        { id: 5, name: 'Grace Muthoni', avatar: 'https://i.pravatar.cc/150?img=10', role: 'Research Lead' },
        { id: 7, name: 'Eunice Akinyi', avatar: 'https://i.pravatar.cc/150?img=24', role: 'Visitor Operations' }
      ],
      resources: ['Presentation Materials', 'Luxury Vehicle', 'Refreshments']
    },
    {
      id: 'EVT-1009',
      title: 'Wildlife Photography Workshop',
      description: 'Educational workshop for visitors on wildlife photography techniques and ethics.',
      date: '2025-04-21',
      startTime: '13:00',
      endTime: '17:00',
      type: 'education',
      location: 'Visitor Center & Eastern Viewpoint',
      status: 'pending',
      participants: [
        { id: 16, name: 'Michael Ngugi', avatar: 'https://i.pravatar.cc/150?img=65', role: 'Media Specialist' },
        { id: 7, name: 'Eunice Akinyi', avatar: 'https://i.pravatar.cc/150?img=24', role: 'Visitor Operations' }
      ],
      resources: ['Presentation Equipment', 'Photography Guidelines', 'Transport']
    },
    {
      id: 'EVT-1010',
      title: 'Elephant Migration Tracking',
      description: 'Tracking elephant movement along the southern corridor to monitor seasonal migration patterns.',
      date: '2025-04-21',
      startTime: '06:30',
      endTime: '18:30',
      type: 'research',
      location: 'Southern Migration Corridor',
      status: 'pending',
      participants: [
        { id: 5, name: 'Grace Muthoni', avatar: 'https://i.pravatar.cc/150?img=10', role: 'Research Lead' },
        { id: 3, name: 'Sarah Kimani', avatar: 'https://i.pravatar.cc/150?img=47', role: 'Conservation Officer' }
      ],
      resources: ['GPS Tracking Equipment', '4x4 Vehicle', 'Drone Equipment', 'Food Supplies']
    }
  ];

  // Filter events based on selected date and search query
  const filteredEvents = events.filter(event => {
    // Filter by event type
    const matchesType = eventTypeFilter === 'all' || event.type === eventTypeFilter;
    
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
                          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  // Events for the selected day
  const dayEvents = filteredEvents.filter(event => event.date === selectedDay);
  
  // Generate calendar days for current month view
  const daysInMonth = 30; // April has 30 days
  const firstDayOfMonth = 2; // April 2025 starts on Tuesday (0-indexed, 0 = Sunday)
  
  const calendarDays = [];
  // Add empty cells for days before the 1st of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const dayStr = `2025-04-${i.toString().padStart(2, '0')}`;
    const dayEvents = events.filter(event => event.date === dayStr);
    calendarDays.push({
      day: i,
      date: dayStr,
      events: dayEvents
    });
  }
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500 hover:bg-green-600">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getEventTypeBadge = (type: string) => {
    const typeMap: {[key: string]: {icon: React.ReactNode, color: string}} = {
      'veterinary': { icon: <Bird className="h-3 w-3" />, color: 'bg-blue-100 text-blue-800' },
      'visitor': { icon: <Users className="h-3 w-3" />, color: 'bg-purple-100 text-purple-800' },
      'maintenance': { icon: <Info className="h-3 w-3" />, color: 'bg-orange-100 text-orange-800' },
      'research': { icon: <ClipboardList className="h-3 w-3" />, color: 'bg-green-100 text-green-800' },
      'security': { icon: <Info className="h-3 w-3" />, color: 'bg-red-100 text-red-800' },
      'conservation': { icon: <Bird className="h-3 w-3" />, color: 'bg-teal-100 text-teal-800' },
      'education': { icon: <ClipboardList className="h-3 w-3" />, color: 'bg-indigo-100 text-indigo-800' }
    };
    
    const typeInfo = typeMap[type] || { icon: <Info className="h-3 w-3" />, color: 'bg-gray-100 text-gray-800' };
    
    return (
      <Badge variant="secondary" className={`flex items-center gap-1 ${typeInfo.color}`}>
        {typeInfo.icon} {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };
  
  const getDayClasses = (day: any) => {
    if (!day) return "bg-muted/30 text-muted-foreground";
    
    const isSelected = day.date === selectedDay;
    const hasEvents = day.events.length > 0;
    
    if (isSelected) return "bg-primary text-primary-foreground font-bold";
    if (hasEvents) return "bg-primary/10 hover:bg-primary/20 font-medium";
    return "hover:bg-muted";
  };
  
  // Time slots for day view (hourly from 6AM to 8PM)
  const timeSlots = Array.from({ length: 15 }, (_, i) => 6 + i);
  
  // Handle month navigation
  const handlePrevMonth = () => {
    const [month, year] = currentMonth.split(' ');
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    const prevMonth = new Date(year, monthIndex - 1, 1);
    setCurrentMonth(`${prevMonth.toLocaleString('default', { month: 'long' })} ${prevMonth.getFullYear()}`);
  };
  
  const handleNextMonth = () => {
    const [month, year] = currentMonth.split(' ');
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    const nextMonth = new Date(year, monthIndex + 1, 1);
    setCurrentMonth(`${nextMonth.toLocaleString('default', { month: 'long' })} ${nextMonth.getFullYear()}`);
  };
  
  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(`${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}`);
    setSelectedDay(today.toISOString().split('T')[0]);
  };
  
  // Handle adding a new event
  const handleAddEvent = () => {
    setNewEvent({
      ...newEvent,
      date: selectedDay
    });
    setShowAddEventDialog(true);
  };
  
  const handleCreateEvent = () => {
    // In a real app, this would create a new event in the database
    toast({
      title: "Event Created",
      description: `New event "${newEvent.title}" has been created successfully.`,
    });
    setShowAddEventDialog(false);
    // Reset form
    setNewEvent({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      type: 'veterinary',
      location: '',
      status: 'pending',
      participants: [],
      resources: []
    });
  };
  
  // Handle editing an event
  const handleEditEvent = (event: any) => {
    setSelectedEvent(event);
    setShowEditEventDialog(true);
  };
  
  const handleUpdateEvent = () => {
    // In a real app, this would update the event in the database
    toast({
      title: "Event Updated",
      description: `Event "${selectedEvent.title}" has been updated successfully.`,
    });
    setShowEditEventDialog(false);
  };
  
  // Handle exporting calendar
  const handleExportCalendar = () => {
    // In a real app, this would generate and download a calendar file
    toast({
      title: "Calendar Exported",
      description: "Your calendar has been exported successfully.",
    });
  };
  
  // Handle printing schedule
  const handlePrintSchedule = () => {
    // In a real app, this would open the print dialog
    toast({
      title: "Printing Schedule",
      description: "Opening print dialog...",
    });
    window.print();
  };
  
  return (
    <PageTemplate 
      title="Schedule Management" 
      description="Manage park activities and staff schedules"
      icon={<Calendar className="h-6 w-6" />}
    >
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid grid-cols-1 sm:flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search events..." 
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2">
              <Select 
                value={eventTypeFilter} 
                onValueChange={setEventTypeFilter}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="veterinary">Veterinary</SelectItem>
                  <SelectItem value="visitor">Visitor</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="conservation">Conservation</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="w-full sm:w-auto" onClick={handleAddEvent}>
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Add Event</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportCalendar}>
                  <Download className="mr-2 h-4 w-4" /> Export Calendar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePrintSchedule}>
                  <Printer className="mr-2 h-4 w-4" /> Print Schedule
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Schedule Tabs and Content */}
        <Tabs defaultValue="schedule" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 w-full sm:w-auto overflow-x-auto">
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Calendar
            </TabsTrigger>
            <TabsTrigger value="day" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" /> Day View
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" /> List View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" /> {currentMonth}
                    </CardTitle>
                    <CardDescription>
                      Monthly calendar view
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePrevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hidden sm:flex" onClick={handleToday}>
                      Today
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1">
                  {/* Days of week */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                    <div key={idx} className="text-center py-2 font-medium text-sm">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {calendarDays.map((day, idx) => (
                    <div 
                      key={idx} 
                      className={`min-h-[80px] text-sm border rounded-md p-1 ${getDayClasses(day)}`}
                      onClick={() => day && setSelectedDay(day.date)}
                    >
                      {day && (
                        <>
                          <div className="font-medium mb-1">{day.day}</div>
                          <div className="space-y-1">
                            {day.events.slice(0, 3).map((event, eidx) => (
                              <div key={eidx} className="text-xs truncate px-1 py-0.5 rounded bg-muted/50">
                                {event.title.length > 20 ? `${event.title.substring(0, 18)}...` : event.title}
                              </div>
                            ))}
                            {day.events.length > 3 && (
                              <div className="text-xs text-center text-muted-foreground">
                                +{day.events.length - 3} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-md">Events for {new Date(selectedDay).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</CardTitle>
                <CardDescription>
                  {dayEvents.length} events scheduled
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dayEvents.length > 0 ? (
                  <div className="space-y-4">
                    {dayEvents.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((event) => (
                      <div key={event.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row justify-between md:items-start mb-3">
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          </div>
                          <div className="flex gap-2 mt-2 md:mt-0">
                            {getEventTypeBadge(event.type)}
                            {getStatusBadge(event.status)}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Time & Location</h4>
                            <div className="space-y-1">
                              <div className="flex items-start gap-2 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <span>{event.startTime} - {event.endTime}</span>
                              </div>
                              <div className="flex items-start gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Participants</h4>
                            <div className="flex -space-x-2 mb-2">
                              {event.participants.map((person, idx) => (
                                <Avatar key={idx} className="h-8 w-8 border-2 border-background">
                                  <AvatarImage src={person.avatar} alt={person.name} />
                                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {event.participants.map(p => p.name).join(', ')}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Resources</h4>
                            <div className="flex flex-wrap gap-1">
                              {event.resources.map((resource, idx) => (
                                <Badge key={idx} variant="outline">{resource}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">Cancel</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <h3 className="text-lg font-medium mb-1">No Events Scheduled</h3>
                    <p className="text-sm">There are no events scheduled for this day.</p>
                    <Button className="mt-4" onClick={handleAddEvent}>
                      <Plus className="mr-2 h-4 w-4" /> Add New Event
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="day" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">
                      {new Date(selectedDay).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </CardTitle>
                    <CardDescription>
                      Daily schedule view
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8"
                      onClick={() => {
                        const currentDate = new Date(selectedDay);
                        currentDate.setDate(currentDate.getDate() - 1);
                        setSelectedDay(currentDate.toISOString().split('T')[0]);
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8"
                      onClick={() => {
                        const currentDate = new Date(selectedDay);
                        currentDate.setDate(currentDate.getDate() + 1);
                        setSelectedDay(currentDate.toISOString().split('T')[0]);
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 border rounded-md">
                  {timeSlots.map(hour => {
                    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
                    const hourEvents = dayEvents.filter(event => {
                      const eventStartHour = parseInt(event.startTime.split(':')[0]);
                      const eventEndHour = parseInt(event.endTime.split(':')[0]);
                      return hour >= eventStartHour && hour < eventEndHour;
                    });
                    
                    return (
                      <div key={hour} className="flex min-h-[60px] border-b last:border-b-0">
                        <div className="w-16 sm:w-20 flex-shrink-0 border-r py-2 px-2 text-sm text-muted-foreground">
                          {timeStr}
                        </div>
                        <div className="flex-grow p-1 relative">
                          {hourEvents.map((event, idx) => (
                            <div 
                              key={event.id} 
                              className={`absolute rounded-md p-2 text-xs lg:text-sm border-l-4 flex flex-col justify-between ${
                                event.type === 'veterinary' ? 'bg-blue-50 border-blue-500' :
                                event.type === 'visitor' ? 'bg-purple-50 border-purple-500' :
                                event.type === 'maintenance' ? 'bg-orange-50 border-orange-500' :
                                event.type === 'research' ? 'bg-green-50 border-green-500' :
                                event.type === 'security' ? 'bg-red-50 border-red-500' :
                                event.type === 'conservation' ? 'bg-teal-50 border-teal-500' :
                                'bg-indigo-50 border-indigo-500'
                              }`}
                              style={{
                                top: '0',
                                left: `${(idx * 20) + 5}%`,
                                width: '30%',
                                height: '95%'
                              }}
                            >
                              <div className="font-medium truncate">{event.title}</div>
                              <div className="text-muted-foreground hidden sm:block">{event.startTime} - {event.endTime}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  All scheduled events for the next 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Event</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Date & Time</th>
                        <th className="px-4 py-3 text-left text-sm font-medium hidden md:table-cell">Location</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium hidden lg:table-cell">Participants</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                        <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.sort((a, b) => {
                        // Sort by date, then by start time
                        const dateComp = a.date.localeCompare(b.date);
                        if (dateComp !== 0) return dateComp;
                        return a.startTime.localeCompare(b.startTime);
                      }).map((event) => (
                        <tr key={event.id} className="border-t hover:bg-muted/30">
                          <td className="px-4 py-3 text-sm">
                            <div className="font-medium">{event.title}</div>
                            <div className="text-xs text-muted-foreground hidden sm:block">{event.id}</div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                            <div className="text-xs text-muted-foreground">{event.startTime} - {event.endTime}</div>
                          </td>
                          <td className="px-4 py-3 text-sm hidden md:table-cell">{event.location}</td>
                          <td className="px-4 py-3 text-sm">
                            {getEventTypeBadge(event.type)}
                          </td>
                          <td className="px-4 py-3 text-sm hidden lg:table-cell">
                            <div className="flex -space-x-2">
                              {event.participants.map((person, idx) => (
                                <Avatar key={idx} className="h-6 w-6 border-2 border-background">
                                  <AvatarImage src={person.avatar} alt={person.name} />
                                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {getStatusBadge(event.status)}
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            <div className="flex justify-end gap-1">
                              <Button size="sm" variant="ghost">View</Button>
                              <Button size="sm" variant="outline">Edit</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Schedule Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Events Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {events.filter(e => e.date === selectedDay).length}
              </div>
              <p className="text-xs text-muted-foreground">Across all departments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {events.length}
              </div>
              <p className="text-xs text-muted-foreground">Total scheduled events</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Staff on Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(events.flatMap(e => e.participants.map(p => p.id))).size}
              </div>
              <p className="text-xs text-muted-foreground">Assigned to events</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                78%
              </div>
              <p className="text-xs text-muted-foreground">Of available resources</p>
            </CardContent>
          </Card>
        </div>

        {/* Department Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Department Schedules</CardTitle>
            <CardDescription>Overview of scheduled activities by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Veterinary Team', color: 'bg-blue-100', events: events.filter(e => e.type === 'veterinary') },
                { name: 'Conservation Team', color: 'bg-teal-100', events: events.filter(e => e.type === 'conservation') },
                { name: 'Research Team', color: 'bg-green-100', events: events.filter(e => e.type === 'research') },
                { name: 'Visitor Services', color: 'bg-purple-100', events: events.filter(e => e.type === 'visitor') },
                { name: 'Maintenance', color: 'bg-orange-100', events: events.filter(e => e.type === 'maintenance') },
                { name: 'Security', color: 'bg-red-100', events: events.filter(e => e.type === 'security') }
              ].map((dept, idx) => (
                <div key={idx} className={`rounded-lg p-4 ${dept.color}`}>
                  <h3 className="font-medium mb-2">{dept.name}</h3>
                  <div className="text-sm mb-3">
                    <CheckCircle className="h-4 w-4 inline-block mr-2 text-green-600" />
                    <span>{dept.events.length} events scheduled</span>
                  </div>
                  <div className="space-y-2 max-h-[120px] overflow-y-auto">
                    {dept.events.slice(0, 3).map((event, eidx) => (
                      <div key={eidx} className="text-xs p-2 bg-white/80 rounded flex justify-between">
                        <div className="truncate">{event.title}</div>
                        <div className="text-muted-foreground">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                      </div>
                    ))}
                    {dept.events.length > 3 && (
                      <div className="text-xs text-center text-muted-foreground">
                        +{dept.events.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event in the schedule.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                className="col-span-3"
                placeholder="Event title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                className="col-span-3"
                placeholder="Event description"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startTime" className="text-right">
                Start Time
              </Label>
              <Input
                id="startTime"
                type="time"
                value={newEvent.startTime}
                onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endTime" className="text-right">
                End Time
              </Label>
              <Input
                id="endTime"
                type="time"
                value={newEvent.endTime}
                onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                value={newEvent.type}
                onValueChange={(value) => setNewEvent({...newEvent, type: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="veterinary">Veterinary</SelectItem>
                  <SelectItem value="visitor">Visitor</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="conservation">Conservation</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                className="col-span-3"
                placeholder="Event location"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={newEvent.status}
                onValueChange={(value) => setNewEvent({...newEvent, status: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEventDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateEvent}>Create Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={showEditEventDialog} onOpenChange={setShowEditEventDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update event details.
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={selectedEvent.title}
                  onChange={(e) => setSelectedEvent({...selectedEvent, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={selectedEvent.description}
                  onChange={(e) => setSelectedEvent({...selectedEvent, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-date" className="text-right">
                  Date
                </Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={selectedEvent.date}
                  onChange={(e) => setSelectedEvent({...selectedEvent, date: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-startTime" className="text-right">
                  Start Time
                </Label>
                <Input
                  id="edit-startTime"
                  type="time"
                  value={selectedEvent.startTime}
                  onChange={(e) => setSelectedEvent({...selectedEvent, startTime: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-endTime" className="text-right">
                  End Time
                </Label>
                <Input
                  id="edit-endTime"
                  type="time"
                  value={selectedEvent.endTime}
                  onChange={(e) => setSelectedEvent({...selectedEvent, endTime: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Type
                </Label>
                <Select
                  value={selectedEvent.type}
                  onValueChange={(value) => setSelectedEvent({...selectedEvent, type: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="veterinary">Veterinary</SelectItem>
                    <SelectItem value="visitor">Visitor</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="conservation">Conservation</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">
                  Location
                </Label>
                <Input
                  id="edit-location"
                  value={selectedEvent.location}
                  onChange={(e) => setSelectedEvent({...selectedEvent, location: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  value={selectedEvent.status}
                  onValueChange={(value) => setSelectedEvent({...selectedEvent, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditEventDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateEvent}>Update Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTemplate>
  );
};

export default Schedule;
