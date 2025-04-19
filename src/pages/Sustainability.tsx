
import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/PageTemplate';
import { Globe, Search, Plus, Leaf, LucideRecycle, Wind, Droplets, Sun, CloudRain, Battery, PanelTop, AreaChart, Wifi, Construction, AlertCircle, Info, BarChart, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Sustainability = () => {
  const [activeTab, setActiveTab] = useState('initiatives');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock sustainability initiatives data
  const initiatives = [
    {
      id: 'SI-001',
      name: 'Solar Power Implementation',
      category: 'energy',
      status: 'active',
      startDate: '2023-07-15',
      targetCompletion: '2025-12-31',
      progress: 65,
      impact: 'High',
      location: 'Headquarters & 3 Regional Offices',
      lead: 'Robert Maina',
      budget: 350000,
      description: 'Installation of solar panels across all major facilities to reduce reliance on grid electricity and lower carbon emissions.',
      metrics: {
        current: 'Reduced grid electricity usage by 45%',
        target: '80% electricity from renewable sources',
        co2Reduction: '120 tonnes CO2 annually'
      },
      icon: <Sun className="h-10 w-10 text-amber-500" />
    },
    {
      id: 'SI-002',
      name: 'Water Conservation System',
      category: 'water',
      status: 'active',
      startDate: '2024-01-10',
      targetCompletion: '2026-01-09',
      progress: 40,
      impact: 'Medium',
      location: 'All Visitor Centers',
      lead: 'Elizabeth Wanjiru',
      budget: 180000,
      description: 'Implementation of rainwater harvesting and greywater recycling systems at visitor centers to reduce freshwater consumption.',
      metrics: {
        current: 'Harvested 1.2 million liters of rainwater',
        target: '50% reduction in freshwater consumption',
        co2Reduction: '15 tonnes CO2 annually'
      },
      icon: <Droplets className="h-10 w-10 text-blue-500" />
    },
    {
      id: 'SI-003',
      name: 'Zero Waste Program',
      category: 'waste',
      status: 'active',
      startDate: '2023-09-01',
      targetCompletion: '2025-08-31',
      progress: 58,
      impact: 'Medium',
      location: 'All Facilities',
      lead: 'Daniel Odhiambo',
      budget: 125000,
      description: 'Comprehensive waste reduction, recycling, and composting program aimed at minimizing landfill waste from operations.',
      metrics: {
        current: '68% waste diverted from landfill',
        target: '95% waste diverted from landfill',
        co2Reduction: '45 tonnes CO2 annually'
      },
      icon: <LucideRecycle className="h-10 w-10 text-green-500" />
    },
    {
      id: 'SI-004',
      name: 'Sustainable Transportation Fleet',
      category: 'transport',
      status: 'planning',
      startDate: '2025-06-01',
      targetCompletion: '2027-05-31',
      progress: 15,
      impact: 'High',
      location: 'All Transport Routes',
      lead: 'Michael Njoroge',
      budget: 650000,
      description: 'Transition of the vehicle fleet to electric and hybrid vehicles to reduce fossil fuel consumption and emissions.',
      metrics: {
        current: 'Planning phase, 5 vehicles converted',
        target: '80% of fleet electric or hybrid',
        co2Reduction: 'Estimated 200 tonnes CO2 annually'
      },
      icon: <Battery className="h-10 w-10 text-purple-500" />
    },
    {
      id: 'SI-005',
      name: 'Habitat Restoration Project',
      category: 'biodiversity',
      status: 'active',
      startDate: '2023-03-15',
      targetCompletion: '2026-03-14',
      progress: 45,
      impact: 'High',
      location: 'Multiple Conservation Areas',
      lead: 'Dr. Jane Muthoni',
      budget: 420000,
      description: 'Restoration of degraded habitats through native planting, invasive species removal, and ecological monitoring.',
      metrics: {
        current: '350 hectares restored',
        target: '1000 hectares restored',
        co2Reduction: '500 tonnes CO2 sequestered annually'
      },
      icon: <Leaf className="h-10 w-10 text-emerald-500" />
    },
    {
      id: 'SI-006',
      name: 'Renewable Energy Microgrids',
      category: 'energy',
      status: 'planning',
      startDate: '2025-07-01',
      targetCompletion: '2027-06-30',
      progress: 10,
      impact: 'Medium',
      location: 'Remote Ranger Stations',
      lead: 'Alex Kimani',
      budget: 280000,
      description: 'Development of self-sufficient renewable energy microgrids for remote ranger stations using solar and wind power.',
      metrics: {
        current: 'Feasibility studies and equipment testing',
        target: '15 remote stations with 100% renewable energy',
        co2Reduction: 'Estimated 70 tonnes CO2 annually'
      },
      icon: <Wind className="h-10 w-10 text-sky-500" />
    },
    {
      id: 'SI-007',
      name: 'Green Building Retrofits',
      category: 'facilities',
      status: 'active',
      startDate: '2024-02-01',
      targetCompletion: '2025-12-31',
      progress: 35,
      impact: 'Medium',
      location: 'Headquarters & Regional Offices',
      lead: 'Grace Nyambura',
      budget: 390000,
      description: 'Retrofitting existing buildings with energy-efficient systems, improved insulation, and sustainable materials.',
      metrics: {
        current: '35% reduction in energy consumption',
        target: '60% reduction in energy consumption',
        co2Reduction: '95 tonnes CO2 annually'
      },
      icon: <PanelTop className="h-10 w-10 text-orange-500" />
    },
    {
      id: 'SI-008',
      name: 'Sustainable Procurement Policy',
      category: 'policy',
      status: 'active',
      startDate: '2023-10-15',
      targetCompletion: '2025-10-14',
      progress: 80,
      impact: 'Medium',
      location: 'Organizational Level',
      lead: 'Samuel Ngugi',
      budget: 75000,
      description: 'Development and implementation of sustainable procurement policies for all organizational purchases and contracts.',
      metrics: {
        current: '75% of suppliers meeting sustainability criteria',
        target: '95% of suppliers meeting sustainability criteria',
        co2Reduction: 'Estimated 85 tonnes CO2 annually'
      },
      icon: <Construction className="h-10 w-10 text-gray-500" />
    }
  ];

  // Filter initiatives based on category and search query
  const filteredInitiatives = initiatives.filter(initiative => {
    const matchesCategory = categoryFilter === 'all' || initiative.category === categoryFilter;
    const matchesSearch = searchQuery === '' || 
      initiative.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      initiative.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case 'planning':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Planning</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return <Badge className="bg-emerald-500 hover:bg-emerald-600">High Impact</Badge>;
      case 'medium':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Medium Impact</Badge>;
      case 'low':
        return <Badge className="bg-gray-500 hover:bg-gray-600">Low Impact</Badge>;
      default:
        return <Badge variant="outline">{impact}</Badge>;
    }
  };

  return (
    <PageTemplate 
      title="Sustainability Initiatives" 
      description="Track and manage environmental sustainability projects"
      icon={<Globe className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid grid-cols-1 sm:flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search initiatives..." 
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2">
              <Select 
                defaultValue="all"
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="water">Water</SelectItem>
                  <SelectItem value="waste">Waste</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="biodiversity">Biodiversity</SelectItem>
                  <SelectItem value="facilities">Facilities</SelectItem>
                  <SelectItem value="policy">Policy</SelectItem>
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
              <span className="hidden sm:inline">New Initiative</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <BarChart className="h-4 w-4" />
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

        <Tabs defaultValue="initiatives" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 w-full sm:w-auto overflow-x-auto">
            <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="initiatives" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredInitiatives.length > 0 ? (
                filteredInitiatives.map((initiative) => (
                  <Card key={initiative.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {initiative.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <span className="text-sm">{initiative.id}</span>
                          </CardDescription>
                        </div>
                        <div className="p-2 rounded-full bg-muted flex items-center justify-center">
                          {initiative.icon}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {getStatusBadge(initiative.status)}
                        {getImpactBadge(initiative.impact)}
                      </div>

                      <div className="text-sm mb-3">{initiative.description}</div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between items-center text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{initiative.progress}%</span>
                        </div>
                        <Progress value={initiative.progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <div className="text-muted-foreground">CO2 Reduction</div>
                          <div>{initiative.metrics.co2Reduction}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Budget</div>
                          <div>${initiative.budget.toLocaleString()}</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-3">
                      <div className="text-xs text-muted-foreground">
                        {new Date(initiative.startDate).toLocaleDateString()} - {new Date(initiative.targetCompletion).toLocaleDateString()}
                      </div>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 py-10 text-center text-muted-foreground">
                  No sustainability initiatives found matching your criteria.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total CO2 Reduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,130 tonnes</div>
                  <p className="text-xs text-muted-foreground">Annual carbon reduction</p>
                  <div className="mt-4">
                    <div className="font-medium text-sm mb-1">By Category</div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs">
                          <span>Energy</span>
                          <span>42%</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs">
                          <span>Biodiversity</span>
                          <span>30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs">
                          <span>Transport</span>
                          <span>15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs">
                          <span>Other</span>
                          <span>13%</span>
                        </div>
                        <Progress value={13} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Resource Consumption</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Electricity</span>
                        <span className="text-sm text-green-500">-45%</span>
                      </div>
                      <div className="text-muted-foreground text-xs mb-2">Compared to baseline</div>
                      <Progress value={55} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Water Usage</span>
                        <span className="text-sm text-green-500">-32%</span>
                      </div>
                      <div className="text-muted-foreground text-xs mb-2">Compared to baseline</div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Waste to Landfill</span>
                        <span className="text-sm text-green-500">-68%</span>
                      </div>
                      <div className="text-muted-foreground text-xs mb-2">Compared to baseline</div>
                      <Progress value={32} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Fuel Consumption</span>
                        <span className="text-sm text-green-500">-15%</span>
                      </div>
                      <div className="text-muted-foreground text-xs mb-2">Compared to baseline</div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Initiative Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-2xl font-bold">{initiatives.filter(i => i.status === 'active').length}</div>
                        <div className="text-xs text-muted-foreground">Active</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{initiatives.filter(i => i.status === 'planning').length}</div>
                        <div className="text-xs text-muted-foreground">Planning</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{initiatives.filter(i => i.status === 'completed').length}</div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Overall Progress</div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>42% Complete</span>
                        <span>2025 Target</span>
                      </div>
                      <Progress value={42} className="h-3" />
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <div className="text-sm font-medium mb-2">Investment by Category</div>
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="outline" className="bg-amber-50">Energy: 42%</Badge>
                        <Badge variant="outline" className="bg-emerald-50">Biodiversity: 30%</Badge>
                        <Badge variant="outline" className="bg-blue-50">Water: 10%</Badge>
                        <Badge variant="outline" className="bg-purple-50">Transport: 8%</Badge>
                        <Badge variant="outline" className="bg-orange-50">Facilities: 7%</Badge>
                        <Badge variant="outline" className="bg-gray-50">Other: 3%</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Sustainability Alerts</CardTitle>
                <CardDescription>Recent notifications and alerts related to sustainability initiatives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Water usage above threshold</div>
                      <div className="text-sm text-muted-foreground">Northern facility showing 25% increase in water consumption over last week.</div>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline">Investigate</Button>
                        <Button size="sm" variant="ghost">Dismiss</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Solar panel maintenance due</div>
                      <div className="text-sm text-muted-foreground">Scheduled maintenance for headquarters solar installation in 7 days.</div>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline">Schedule</Button>
                        <Button size="sm" variant="ghost">Remind Later</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg border bg-green-50">
                    <Leaf className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium">Sustainability target achieved</div>
                      <div className="text-sm text-muted-foreground">Waste reduction initiative reached 65% goal ahead of schedule.</div>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="ghost">Share</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sustainability Reports</CardTitle>
                <CardDescription>Available reports and documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Report Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium hidden md:table-cell">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium hidden md:table-cell">Author</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                        <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Annual Sustainability Report 2024', date: '2024-03-15', author: 'Sustainability Committee', type: 'Annual' },
                        { name: 'Carbon Footprint Analysis Q1 2025', date: '2025-04-05', author: 'Climate Team', type: 'Quarterly' },
                        { name: 'Renewable Energy Implementation Progress', date: '2025-03-22', author: 'Robert Maina', type: 'Project' },
                        { name: 'Water Conservation Impact Assessment', date: '2025-02-18', author: 'Elizabeth Wanjiru', type: 'Project' },
                        { name: 'Waste Reduction Initiative Results', date: '2025-01-30', author: 'Daniel Odhiambo', type: 'Project' },
                        { name: 'Green Building Standards Compliance', date: '2024-12-12', author: 'Grace Nyambura', type: 'Compliance' },
                      ].map((report, idx) => (
                        <tr key={idx} className="border-t hover:bg-muted/30">
                          <td className="px-4 py-3 text-sm">{report.name}</td>
                          <td className="px-4 py-3 text-sm hidden md:table-cell">{new Date(report.date).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-sm hidden md:table-cell">{report.author}</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant="outline" className={
                              report.type === 'Annual' ? 'bg-blue-50 text-blue-800' : 
                              report.type === 'Quarterly' ? 'bg-purple-50 text-purple-800' : 
                              report.type === 'Project' ? 'bg-green-50 text-green-800' : 
                              'bg-amber-50 text-amber-800'
                            }>
                              {report.type}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            <Button size="sm" variant="outline">Download</Button>
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

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Renewable Energy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48%</div>
              <p className="text-xs text-muted-foreground">Of total energy consumption</p>
              <Progress value={48} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Water Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.5M liters</div>
              <p className="text-xs text-muted-foreground">Annual reduction</p>
              <Progress value={62} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Waste Diversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">Diverted from landfill</p>
              <Progress value={68} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Sustainability Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.47M</div>
              <p className="text-xs text-muted-foreground">Total allocated for 2025</p>
              <Progress value={35} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Sustainability;
