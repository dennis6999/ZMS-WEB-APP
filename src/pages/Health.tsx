
import React from 'react';
import { PageTemplate } from '@/components/layout/PageTemplate';
import { HeartPulse, Calendar, AlertCircle, Stethoscope, Syringe, Activity, Pill, Weight, ClipboardList } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const Health = () => {
  // Mock data for upcoming health checks
  const upcomingChecks = [
    { id: 1, animal: 'Kifaru (Rhino)', type: 'Routine Checkup', date: 'Today, 10:30 AM', vet: 'Dr. Wanjiku', priority: 'high' },
    { id: 2, animal: 'Simba (Lion)', type: 'Vaccination', date: 'Tomorrow, 09:00 AM', vet: 'Dr. Ochieng', priority: 'medium' },
    { id: 3, animal: 'Twiga (Giraffe)', type: 'Follow-up', date: 'Apr 18, 11:15 AM', vet: 'Dr. Njoroge', priority: 'low' },
    { id: 4, animal: 'Chui (Leopard)', type: 'Dental Check', date: 'Apr 19, 02:00 PM', vet: 'Dr. Kamau', priority: 'medium' },
    { id: 5, animal: 'Tembo (Elephant)', type: 'Foot Examination', date: 'Apr 21, 08:30 AM', vet: 'Dr. Wanjiku', priority: 'medium' },
  ];

  // Mock data for recent health events
  const recentEvents = [
    { id: 1, animal: 'Duma (Cheetah)', type: 'Treatment', date: 'Today, 08:45 AM', description: 'Administered antibiotics for respiratory infection', status: 'completed' },
    { id: 2, animal: 'Kiboko (Hippo)', type: 'Vaccination', date: 'Yesterday, 11:20 AM', description: 'Annual vaccination completed', status: 'completed' },
    { id: 3, animal: 'Kifaru (Rhino)', type: 'Surgery', date: 'Apr 10, 09:30 AM', description: 'Wound cleaning and treatment after territorial fight', status: 'follow-up' },
    { id: 4, animal: 'Simba (Lion)', type: 'Checkup', date: 'Apr 8, 02:15 PM', description: 'General health assessment - all parameters normal', status: 'completed' },
  ];

  // Mock data for health status overview
  const healthOverview = [
    { category: 'Healthy', count: 982, percentage: 76, color: 'bg-green-500' },
    { category: 'Monitoring', count: 235, percentage: 18, color: 'bg-amber-500' },
    { category: 'Treatment', count: 67, percentage: 5, color: 'bg-orange-500' },
    { category: 'Critical', count: 12, percentage: 1, color: 'bg-red-500' },
  ];

  // Mock data for medication inventory
  const medicationInventory = [
    { name: 'Antibiotics (General)', stock: 85, threshold: 25, unit: 'boxes' },
    { name: 'Pain Relief Medication', stock: 32, threshold: 20, unit: 'bottles' },
    { name: 'Tranquilizers', stock: 18, threshold: 15, unit: 'vials' },
    { name: 'Topical Treatments', stock: 12, threshold: 15, unit: 'tubes' },
    { name: 'Vaccines', stock: 56, threshold: 30, unit: 'doses' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-amber-500';
      case 'low': return 'text-green-500';
      default: return '';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case 'follow-up':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Follow-up Required</Badge>;
      case 'scheduled':
        return <Badge variant="secondary">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStockLevel = (stock: number, threshold: number) => {
    const percentage = (stock / threshold) * 100;
    if (percentage <= 50) return 'text-red-500';
    if (percentage <= 100) return 'text-amber-500';
    return 'text-green-500';
  };

  return (
    <PageTemplate 
      title="Health Tracking" 
      description="Monitor and manage animal health records and treatments"
      icon={<HeartPulse className="h-6 w-6" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {/* Health Status Overview */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>Health Status Overview</span>
            </CardTitle>
            <CardDescription>Current health status of all animals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthOverview.map((item) => (
                <div key={item.category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.category}</span>
                    <span className="text-muted-foreground">{item.count} animals ({item.percentage}%)</span>
                  </div>
                  <Progress value={item.percentage} className={item.color} />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Detailed Reports</Button>
          </CardFooter>
        </Card>

        {/* Medication Inventory */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Pill className="h-4 w-4" />
              <span>Medication Inventory</span>
            </CardTitle>
            <CardDescription>Current stock levels of essential medications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medicationInventory.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <span className="text-sm">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-sm font-medium", getStockLevel(item.stock, item.threshold))}>
                      {item.stock} {item.unit}
                    </span>
                    {item.stock < item.threshold && (
                      <Badge variant="outline" className="text-red-500 border-red-500 text-xs">Low Stock</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Manage Inventory</Button>
          </CardFooter>
        </Card>

        {/* Upcoming Health Checks */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Upcoming Health Checks</span>
            </CardTitle>
            <CardDescription>Scheduled veterinary appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingChecks.map((check) => (
                <div key={check.id} className="flex flex-col md:flex-row md:items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1 mb-2 md:mb-0">
                    <div className="font-medium">{check.animal}</div>
                    <div className="text-sm text-muted-foreground">{check.type} with {check.vet}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={cn("text-sm", getPriorityColor(check.priority))}>
                      {check.date}
                    </div>
                    <Button size="sm" variant="outline">Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> View Schedule
            </Button>
            <Button>
              <Stethoscope className="mr-2 h-4 w-4" /> New Check-up
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Health Events */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              <span>Recent Events</span>
            </CardTitle>
            <CardDescription>Latest health-related activities</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-6">
              {recentEvents.map((event, index) => (
                <div 
                  key={event.id}
                  className={cn(
                    "py-3",
                    index !== recentEvents.length - 1 && "border-b border-dashed"
                  )}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium">{event.animal}</div>
                    {getStatusBadge(event.status)}
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">{event.type} • {event.date}</div>
                  <div className="text-sm">{event.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Events</Button>
          </CardFooter>
        </Card>

        {/* Health Management Tabs */}
        <Card className="md:col-span-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HeartPulse className="h-4 w-4" />
              <span>Health Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="records">
              <TabsList className="mb-4">
                <TabsTrigger value="records">Health Records</TabsTrigger>
                <TabsTrigger value="treatments">Treatments</TabsTrigger>
                <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
                <TabsTrigger value="quarantine">Quarantine</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              </TabsList>
              
              <TabsContent value="records" className="space-y-4">
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Health Records System</h3>
                  <p className="text-muted-foreground max-w-3xl mx-auto mb-4">
                    This tab would display comprehensive health records for all animals, 
                    including medical history, test results, and treatment plans.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline">Search Records</Button>
                    <Button>Add New Record</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="treatments">
                <div className="text-center py-8">
                  <Syringe className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Treatment Management</h3>
                  <p className="text-muted-foreground max-w-3xl mx-auto">
                    This tab would provide tools for managing ongoing treatments,
                    including medication schedules, dosage tracking, and treatment outcomes.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="vaccinations">
                <div className="text-center py-8">
                  <Syringe className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Vaccination Records</h3>
                  <p className="text-muted-foreground max-w-3xl mx-auto">
                    This tab would display vaccination schedules, past vaccination records,
                    and upcoming vaccination requirements for all animals.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="quarantine">
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Quarantine Management</h3>
                  <p className="text-muted-foreground max-w-3xl mx-auto">
                    This tab would provide tools for managing animals in quarantine,
                    including isolation protocols, monitoring schedules, and release criteria.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="nutrition">
                <div className="text-center py-8">
                  <Weight className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Nutrition Plans</h3>
                  <p className="text-muted-foreground max-w-3xl mx-auto">
                    This tab would display dietary requirements, feeding schedules,
                    and nutritional supplements for all animals.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default Health;
