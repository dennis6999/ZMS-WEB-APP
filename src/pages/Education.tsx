import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/PageTemplate';
import { BookOpen, Search, Plus, Calendar, Users, MapPin, Target, Award, Clock, Download, BarChart, FileText, School, GraduationCap, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Education = () => {
  const [activeTab, setActiveTab] = useState('programs');
  const [programFilter, setProgramFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock education programs data
  const programs = [
    {
      id: 'EP-001',
      name: 'Wildlife Conservation for Schools',
      type: 'school',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2025-12-31',
      participants: 1250,
      targetParticipants: 2000,
      coordinator: {
        name: 'Grace Muthoni',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
        title: 'Education Officer'
      },
      locations: ['Nairobi', 'Mombasa', 'Nakuru'],
      description: 'A comprehensive program designed for primary and secondary schools to teach wildlife conservation principles and create awareness about endangered species.',
      outcomes: [
        'Increased awareness of conservation issues among students',
        'Development of school conservation clubs',
        'Student participation in community conservation activities'
      ],
      progress: 62,
      nextSession: '2025-04-25'
    },
    {
      id: 'EP-002',
      name: 'Junior Rangers Program',
      type: 'youth',
      status: 'active',
      startDate: '2024-03-10',
      endDate: '2025-10-31',
      participants: 350,
      targetParticipants: 500,
      coordinator: {
        name: 'Daniel Kamau',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        title: 'Youth Programs Coordinator'
      },
      locations: ['Amboseli', 'Tsavo', 'Maasai Mara'],
      description: 'Hands-on field program for youth aged 10-16 to learn about wildlife tracking, conservation, and park management through practical activities.',
      outcomes: [
        'Basic wildlife tracking skills',
        'Understanding of conservation challenges',
        'Leadership and teamwork development'
      ],
      progress: 70,
      nextSession: '2025-04-20'
    },
    {
      id: 'EP-003',
      name: 'Community Conservation Workshops',
      type: 'community',
      status: 'active',
      startDate: '2023-09-15',
      endDate: '2025-09-14',
      participants: 780,
      targetParticipants: 1200,
      coordinator: {
        name: 'Sarah Ochieng',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
        title: 'Community Outreach Manager'
      },
      locations: ['Laikipia', 'Samburu', 'Turkana'],
      description: 'A series of workshops designed for communities living adjacent to wildlife areas to promote coexistence and sustainable practices.',
      outcomes: [
        'Reduced human-wildlife conflicts',
        'Implementation of sustainable land use practices',
        'Development of community-led conservation initiatives'
      ],
      progress: 65,
      nextSession: '2025-04-18'
    },
    {
      id: 'EP-004',
      name: 'Conservation Certificate Course',
      type: 'professional',
      status: 'upcoming',
      startDate: '2025-05-10',
      endDate: '2025-11-30',
      participants: 0,
      targetParticipants: 100,
      coordinator: {
        name: 'Dr. James Mwangi',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        title: 'Senior Educational Consultant'
      },
      locations: ['Nairobi'],
      description: 'Professional development course for conservation practitioners, rangers, and wildlife management professionals.',
      outcomes: [
        'Advanced conservation techniques',
        'Wildlife monitoring and research methodologies',
        'Conservation project management skills'
      ],
      progress: 0,
      nextSession: '2025-05-10'
    },
    {
      id: 'EP-005',
      name: 'University Internship Program',
      type: 'university',
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2026-01-31',
      participants: 45,
      targetParticipants: 60,
      coordinator: {
        name: 'Dr. Elizabeth Ngari',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop',
        title: 'Academic Liaison Officer'
      },
      locations: ['Various National Parks'],
      description: 'Internship opportunities for university students in wildlife management, biology, ecology, and related fields.',
      outcomes: [
        'Practical research experience',
        'Career development in conservation',
        'Contributing to ongoing conservation research'
      ],
      progress: 75,
      nextSession: 'Ongoing'
    },
    {
      id: 'EP-006',
      name: 'Wildlife Photography Workshop',
      type: 'public',
      status: 'completed',
      startDate: '2024-01-10',
      endDate: '2025-03-15',
      participants: 120,
      targetParticipants: 100,
      coordinator: {
        name: 'Michael Ngugi',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
        title: 'Media Specialist'
      },
      locations: ['Maasai Mara', 'Amboseli'],
      description: 'Workshop series teaching wildlife photography techniques while emphasizing ethical wildlife observation.',
      outcomes: [
        'Wildlife photography skills',
        'Understanding of ethical wildlife observation',
        'Creating advocates through visual storytelling'
      ],
      progress: 100,
      nextSession: 'TBA for next season'
    },
    {
      id: 'EP-007',
      name: 'Indigenous Knowledge Program',
      type: 'community',
      status: 'active',
      startDate: '2024-01-20',
      endDate: '2025-12-31',
      participants: 85,
      targetParticipants: 150,
      coordinator: {
        name: 'John Lekorere',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
        title: 'Indigenous Knowledge Coordinator'
      },
      locations: ['Marsabit', 'Samburu', 'Turkana'],
      description: 'Program documenting and integrating indigenous ecological knowledge into modern conservation practices.',
      outcomes: [
        'Documentation of traditional conservation practices',
        'Integration of indigenous knowledge into conservation strategies',
        'Strengthening ties between traditional communities and conservation efforts'
      ],
      progress: 57,
      nextSession: '2025-04-30'
    },
    {
      id: 'EP-008',
      name: 'Wildlife Documentary Series',
      type: 'public',
      status: 'upcoming',
      startDate: '2025-06-01',
      endDate: '2025-12-31',
      participants: 0,
      targetParticipants: 5000,
      coordinator: {
        name: 'Amina Hassan',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop',
        title: 'Media Production Manager'
      },
      locations: ['National Broadcast'],
      description: 'Educational documentary series highlighting Kenya\'s diverse wildlife and conservation challenges.',
      outcomes: [
        'Increased public awareness of wildlife conservation',
        'Documentation of Kenya\'s biodiversity',
        'Generating public support for conservation efforts'
      ],
      progress: 20,
      nextSession: '2025-06-01'
    }
  ];

  // Filter programs based on status and search query
  const filteredPrograms = programs.filter(program => {
    const matchesType = programFilter === 'all' || program.type === programFilter;
    const matchesSearch = searchQuery === '' || 
      program.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      program.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Upcoming</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'school':
        return <Badge className="bg-blue-500 hover:bg-blue-600 flex gap-1 items-center"><School className="h-3 w-3" /> School</Badge>;
      case 'youth':
        return <Badge className="bg-purple-500 hover:bg-purple-600 flex gap-1 items-center"><Users className="h-3 w-3" /> Youth</Badge>;
      case 'community':
        return <Badge className="bg-orange-500 hover:bg-orange-600 flex gap-1 items-center"><MapPin className="h-3 w-3" /> Community</Badge>;
      case 'professional':
        return <Badge className="bg-gray-500 hover:bg-gray-600 flex gap-1 items-center"><Award className="h-3 w-3" /> Professional</Badge>;
      case 'university':
        return <Badge className="bg-green-500 hover:bg-green-600 flex gap-1 items-center"><GraduationCap className="h-3 w-3" /> University</Badge>;
      case 'public':
        return <Badge className="bg-teal-500 hover:bg-teal-600 flex gap-1 items-center"><Users className="h-3 w-3" /> Public</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <PageTemplate 
      title="Education Programs" 
      description="Manage wildlife education and awareness programs"
      icon={<BookOpen className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid grid-cols-1 sm:flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search programs..." 
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2">
              <Select 
                defaultValue="all"
                value={programFilter}
                onValueChange={setProgramFilter}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Program Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="youth">Youth</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="university">University</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">New Program</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <FileText className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <BarChart className="mr-2 h-4 w-4" /> Impact Report
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" /> Export Data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="programs" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 w-full sm:w-auto overflow-x-auto">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="instructors">Instructors</TabsTrigger>
          </TabsList>

          <TabsContent value="programs" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program) => (
                  <Card key={program.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{program.name}</CardTitle>
                        {getStatusBadge(program.status)}
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <span className="text-sm">{program.id}</span>
                        <span className="mx-1">•</span>
                        {getTypeBadge(program.type)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-sm mb-3">{program.description}</div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={program.coordinator.avatar} alt={program.coordinator.name} />
                          <AvatarFallback>{program.coordinator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{program.coordinator.name}</div>
                          <div className="text-xs text-muted-foreground">{program.coordinator.title}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{program.progress}%</span>
                        </div>
                        <Progress value={program.progress} className="h-2" />
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {program.locations.map((location, idx) => (
                          <Badge key={idx} variant="outline" className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {location}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-3">
                      <div className="text-xs text-muted-foreground">
                        {new Date(program.startDate).toLocaleDateString()} - {new Date(program.endDate).toLocaleDateString()}
                      </div>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 py-10 text-center text-muted-foreground">
                  No education programs found matching your criteria.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Program Sessions</CardTitle>
                <CardDescription>Schedule of upcoming educational activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Program</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="hidden md:table-cell">Location</TableHead>
                        <TableHead className="hidden md:table-cell">Coordinator</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {programs
                        .filter(p => p.status !== 'completed' && p.nextSession && p.nextSession !== 'TBA for next season')
                        .sort((a, b) => new Date(a.nextSession).getTime() - new Date(b.nextSession).getTime())
                        .map(program => (
                          <TableRow key={program.id}>
                            <TableCell>
                              <div className="font-medium">{program.name}</div>
                              <div className="text-xs text-muted-foreground">{program.id}</div>
                            </TableCell>
                            <TableCell>
                              {program.nextSession === 'Ongoing' 
                                ? <Badge variant="outline" className="text-green-500 border-green-500">Ongoing</Badge>
                                : new Date(program.nextSession).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{program.locations[0]}</TableCell>
                            <TableCell className="hidden md:table-cell">{program.coordinator.name}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="materials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Educational Materials</CardTitle>
                <CardDescription>Resources developed for education programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['Wildlife Identification Guide', 'Conservation Principles Handbook', 'Junior Rangers Activity Book', 
                    'Community Conservation Manual', 'Field Research Methods Guide', 'Ecosystem Education Poster Set',
                    'Indigenous Knowledge Documentation', 'Wildlife Photography Ethics Guide'].map((material, idx) => (
                    <Card key={idx} className="p-4 flex flex-col hover:shadow-sm transition-shadow">
                      <div className="text-md font-medium mb-2">{material}</div>
                      <div className="text-sm text-muted-foreground flex-grow">
                        Educational resource for wildlife program participants
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t">
                        <Badge variant="outline">PDF</Badge>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="instructors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Program Instructors</CardTitle>
                <CardDescription>Education staff and program facilitators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {programs.map(program => (
                    <div key={program.id} className="border rounded-lg p-4 flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={program.coordinator.avatar} alt={program.coordinator.name} />
                        <AvatarFallback>{program.coordinator.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{program.coordinator.name}</div>
                        <div className="text-sm text-muted-foreground mb-1">{program.coordinator.title}</div>
                        <div className="text-xs mb-2">
                          Program: {program.name.length > 25 ? `${program.name.substring(0, 25)}...` : program.name}
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">Profile</Button>
                          <Button size="sm" variant="ghost">Contact</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {programs.filter(p => p.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {programs.reduce((sum, p) => sum + p.participants, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">People reached</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Locations Covered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(programs.flatMap(p => p.locations)).size}
              </div>
              <p className="text-xs text-muted-foreground">Distinct areas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {programs.filter(p => p.status === 'upcoming').length}
              </div>
              <p className="text-xs text-muted-foreground">Starting soon</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Education;
