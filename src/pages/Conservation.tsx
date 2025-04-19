import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/PageTemplate';
import { Bird, Search, Filter, Plus, Calendar, MapPin, Tag, Info, ArrowUpDown, Download, FileText, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AddProjectForm } from '@/components/conservation/AddProjectForm';
import { toast } from '@/components/ui/use-toast';
import * as z from 'zod';

const projectFormSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  status: z.enum(['planning', 'ongoing', 'completed']),
  startDate: z.date({
    required_error: 'Start date is required',
  }),
  endDate: z.date({
    required_error: 'End date is required',
  }),
  budget: z.string().min(1, 'Budget is required'),
  lead: z.string().min(1, 'Project lead is required'),
  location: z.string().min(1, 'Location is required'),
  species: z.string().min(1, 'At least one species is required'),
  description: z.string().min(1, 'Description is required'),
  partners: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

const Conservation = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [projectStatus, setProjectStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  
  const projects = [
    {
      id: 'CP-001',
      name: 'East African Lion Conservation',
      status: 'ongoing',
      startDate: '2023-03-15',
      endDate: '2026-03-14',
      budget: 450000,
      spent: 175000,
      lead: 'Dr. Sarah Kimani',
      location: 'Eastern Savanna',
      species: ['Lion', 'Antelope', 'Zebra'],
      description: 'Protecting lion populations through habitat preservation, anti-poaching measures, and community education.',
      progress: 39,
      lastUpdate: '2025-04-12',
      partners: ['WWF Kenya', 'Lion Recovery Fund', 'African Conservation Centre']
    },
    {
      id: 'CP-002',
      name: 'Rhino Horn Anti-Poaching Initiative',
      status: 'ongoing',
      startDate: '2024-01-10',
      endDate: '2026-12-31',
      budget: 850000,
      spent: 215000,
      lead: 'John Mwangi',
      location: 'Northern Reserve',
      species: ['Black Rhino', 'White Rhino'],
      description: 'Comprehensive anti-poaching program using technology, patrols, and intelligence to protect rhinos.',
      progress: 25,
      lastUpdate: '2025-04-15',
      partners: ['Save the Rhino International', 'Kenya Wildlife Trust', 'International Rhino Foundation']
    },
    {
      id: 'CP-003',
      name: 'Elephant Migration Corridor Protection',
      status: 'ongoing',
      startDate: '2023-09-01',
      endDate: '2027-08-31',
      budget: 725000,
      spent: 190000,
      lead: 'Dr. Daniel Ondiek',
      location: 'Southern Plains',
      species: ['African Elephant'],
      description: 'Securing and maintaining elephant migration corridors to reduce human-wildlife conflict.',
      progress: 26,
      lastUpdate: '2025-04-10',
      partners: ['Elephant Conservation Network', 'Nairobi University', 'Local Communities']
    },
    {
      id: 'CP-004',
      name: 'Giraffe Population Recovery',
      status: 'planning',
      startDate: '2025-06-01',
      endDate: '2028-05-31',
      budget: 390000,
      spent: 25000,
      lead: 'Amina Hassan',
      location: 'Western Zone',
      species: ['Reticulated Giraffe', 'Masai Giraffe'],
      description: 'Research and conservation actions to boost giraffe populations in key habitats.',
      progress: 6,
      lastUpdate: '2025-04-05',
      partners: ['Giraffe Conservation Foundation', 'Kenya Forestry Service']
    },
    {
      id: 'CP-005',
      name: 'Cheetah Genetic Diversity Project',
      status: 'completed',
      startDate: '2022-05-15',
      endDate: '2025-01-31',
      budget: 275000,
      spent: 275000,
      lead: 'Dr. Eric Mutai',
      location: 'Central Plains',
      species: ['Cheetah'],
      description: 'Genetic monitoring and population management to ensure cheetah survival.',
      progress: 100,
      lastUpdate: '2025-02-01',
      partners: ['Cheetah Conservation Fund', 'National Geographic', 'African Wildlife Foundation']
    },
    {
      id: 'CP-006',
      name: 'Wetland Habitats Restoration',
      status: 'ongoing',
      startDate: '2024-03-10',
      endDate: '2027-03-09',
      budget: 510000,
      spent: 95000,
      lead: 'Lucy Njeri',
      location: 'Lake Victoria Basin',
      species: ['Flamingo', 'Pelican', 'Hippopotamus', 'Various waterbirds'],
      description: 'Restoring critical wetland habitats to support diverse wildlife populations.',
      progress: 19,
      lastUpdate: '2025-04-14',
      partners: ['Wetlands International', 'Nature Kenya', 'Ramsar Convention']
    },
    {
      id: 'CP-007',
      name: 'Pangolin Anti-Trafficking Program',
      status: 'ongoing',
      startDate: '2023-11-01',
      endDate: '2026-10-31',
      budget: 320000,
      spent: 87000,
      lead: 'Patrick Omondi',
      location: 'National Level',
      species: ['Ground Pangolin', 'Tree Pangolin'],
      description: 'Disrupting illegal wildlife trade networks to protect endangered pangolins.',
      progress: 27,
      lastUpdate: '2025-04-08',
      partners: ['TRAFFIC', 'Kenya Customs Service', 'Kenya Police Wildlife Unit']
    },
    {
      id: 'CP-008',
      name: 'Savanna Grassland Restoration',
      status: 'planning',
      startDate: '2025-09-01',
      endDate: '2028-08-31',
      budget: 415000,
      spent: 35000,
      lead: 'Michael Wanjau',
      location: 'Masai Mara Region',
      species: ['Multiple savanna species'],
      description: 'Ecosystem-wide approach to restore degraded grassland habitats.',
      progress: 8,
      lastUpdate: '2025-03-30',
      partners: ['The Nature Conservancy', 'Masai Community Council', 'Kenya Agricultural Research Institute']
    }
  ];

  // Filter projects based on status and search query
  const filteredProjects = projects.filter(project => {
    const matchesStatus = projectStatus === 'all' || project.status === projectStatus;
    const matchesTab = activeTab === 'all' || project.status === activeTab;
    const matchesSearch = searchQuery === '' || 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.species.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesStatus && matchesTab && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ongoing':
        return <Badge className="bg-green-500 hover:bg-green-600">Ongoing</Badge>;
      case 'planning':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Planning</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAddProject = (data: ProjectFormData) => {
    // In a real application, this would make an API call to create the project
    console.log('New project data:', data);
    toast({
      title: "Project Created",
      description: "The new conservation project has been created successfully.",
    });
  };

  return (
    <PageTemplate 
      title="Conservation Projects" 
      description="Manage and track wildlife conservation initiatives"
      icon={<Bird className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid grid-cols-1 sm:flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search projects..." 
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2">
              <Select 
                defaultValue="all"
                value={projectStatus}
                onValueChange={setProjectStatus}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="w-full sm:w-auto" onClick={() => setIsAddProjectOpen(true)}>
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">New Project</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <FileText className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" /> Export Report
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" /> Download Data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Tabs defaultValue="ongoing" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 w-full sm:w-auto overflow-x-auto">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bird className="h-4 w-4" />
                  <span>Conservation Projects</span>
                </CardTitle>
                <CardDescription>
                  Total: {filteredProjects.length} projects
                  {activeTab !== 'all' && ` with status: ${activeTab}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>Project Name</TableHead>
                          <TableHead className="hidden md:table-cell">Lead</TableHead>
                          <TableHead className="hidden lg:table-cell">Timeline</TableHead>
                          <TableHead className="hidden md:table-cell">Progress</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProjects.length > 0 ? (
                          filteredProjects.map((project) => (
                            <TableRow key={project.id} className="cursor-pointer hover:bg-muted/50">
                              <TableCell className="font-medium">{project.id}</TableCell>
                              <TableCell>
                                <div className="font-medium">{project.name}</div>
                                <div className="text-xs text-muted-foreground hidden sm:block">
                                  {project.species.slice(0, 2).join(', ')}
                                  {project.species.length > 2 && ` +${project.species.length - 2} more`}
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{project.lead}</TableCell>
                              <TableCell className="hidden lg:table-cell">
                                <div className="flex flex-col">
                                  <span className="text-xs">Start: {new Date(project.startDate).toLocaleDateString()}</span>
                                  <span className="text-xs">End: {new Date(project.endDate).toLocaleDateString()}</span>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <div className="flex flex-col gap-1">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>${project.spent.toLocaleString()}</span>
                                    <span>${project.budget.toLocaleString()}</span>
                                  </div>
                                  <Progress value={project.progress} className="h-2" />
                                  <span className="text-xs text-right">{project.progress}%</span>
                                </div>
                              </TableCell>
                              <TableCell>{getStatusBadge(project.status)}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <Info className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                      <Info className="mr-2 h-4 w-4" /> View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Calendar className="mr-2 h-4 w-4" /> Timeline
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <MapPin className="mr-2 h-4 w-4" /> Location
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Tag className="mr-2 h-4 w-4" /> Species
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Clock className="mr-2 h-4 w-4" /> Updates
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                              No conservation projects found matching the current filters.
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
                  Showing {filteredProjects.length} of {projects.length} projects
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </CardFooter>
            </Card>
          </Tabs>
        </div>

        {/* Project Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Budget Allocated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.filter(p => p.status === 'ongoing').length}</div>
              <p className="text-xs text-muted-foreground">Currently in progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Species Protected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(projects.flatMap(p => p.species)).size}
              </div>
              <p className="text-xs text-muted-foreground">Under active conservation</p>
            </CardContent>
          </Card>
        </div>

        <AddProjectForm 
          isOpen={isAddProjectOpen}
          onClose={() => setIsAddProjectOpen(false)}
          onSubmit={handleAddProject}
        />
      </div>
    </PageTemplate>
  );
};

export default Conservation;
