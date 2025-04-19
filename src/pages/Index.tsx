import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentAlerts } from '@/components/dashboard/RecentAlerts';
import { WildlifeTracker } from '@/components/dashboard/WildlifeTracker';
import { VisitorStats } from '@/components/dashboard/VisitorStats';
import { AnimalHealthSummary } from '@/components/dashboard/AnimalHealthSummary';
import { ConservationMetrics } from '@/components/dashboard/ConservationMetrics';
import { AnimalCountBySpecies } from '@/components/dashboard/AnimalCountBySpecies';
import { UpcomingTasks } from '@/components/dashboard/UpcomingTasks';
import { Bird, Leaf, Ticket, Users, AlertTriangle, ShieldAlert, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  // Mock data for statistics
  const stats = [
    { title: 'Total Animals', value: '1,284', change: { value: 4.5, isPositive: true }, icon: <Bird className="h-5 w-5" /> },
    { title: 'Visitors Today', value: '642', change: { value: 10.2, isPositive: true }, icon: <Users className="h-5 w-5" /> },
    { title: 'Conservation Projects', value: '24', change: { value: 0, isPositive: true }, icon: <Leaf className="h-5 w-5" /> },
    { title: 'Active Alerts', value: '7', change: { value: 2.3, isPositive: false }, icon: <AlertTriangle className="h-5 w-5" /> },
  ];

  // Mock animal health data
  const healthData = [
    { name: 'Healthy', value: 982, color: '#1D7356' },
    { name: 'Monitoring', value: 235, color: '#D9970D' },
    { name: 'Attention', value: 67, color: '#C75C2E' },
  ];

  // Mock visitor data for the chart
  const visitorData = [
    { date: 'Apr 1', visitors: 543 },
    { date: 'Apr 2', visitors: 621 },
    { date: 'Apr 3', visitors: 486 },
    { date: 'Apr 4', visitors: 723 },
    { date: 'Apr 5', visitors: 612 },
    { date: 'Apr 6', visitors: 538 },
    { date: 'Apr 7', visitors: 895 },
    { date: 'Apr 8', visitors: 720 },
    { date: 'Apr 9', visitors: 756 },
    { date: 'Apr 10', visitors: 642 },
  ];

  // Mock alerts - Fix the type issue by using literal types
  const alerts = [
    {
      id: '1',
      type: 'security' as 'security',
      title: 'Perimeter Alert: Sector 4',
      description: 'Motion detected near south perimeter fence. Security team dispatched.',
      timestamp: '10 minutes ago',
      urgent: true,
    },
    {
      id: '2',
      type: 'health' as 'health',
      title: 'Health Alert: Zebra (ID: ZB-103)',
      description: 'Exhibiting signs of reduced appetite. Veterinary checkup scheduled.',
      timestamp: '35 minutes ago',
      urgent: true,
    },
    {
      id: '3',
      type: 'maintenance' as 'maintenance',
      title: 'Low Supply: Rhino Feed',
      description: 'Inventory below 15%. Please reorder within 3 days.',
      timestamp: '2 hours ago',
    },
    {
      id: '4',
      type: 'info' as 'info',
      title: 'VIP Group Arriving',
      description: 'Ministry of Tourism delegation arriving at 2:00 PM today.',
      timestamp: '3 hours ago',
    },
  ];

  // Mock animal locations - Fix the type issue by using literal types
  const animalLocations = [
    {
      id: '1',
      name: 'Simba',
      species: 'Lion (Male)',
      location: 'Eastern Savanna, Section B',
      status: 'normal' as 'normal',
      lastUpdate: '5 min ago',
      trackerBattery: 87,
    },
    {
      id: '2',
      name: 'Tembo',
      species: 'Elephant (Female)',
      location: 'Northern Watering Hole',
      status: 'normal' as 'normal',
      lastUpdate: '12 min ago',
      trackerBattery: 92,
    },
    {
      id: '3',
      name: 'Kifaru',
      species: 'Rhino (Male)',
      location: 'Protected Reserve',
      status: 'alert' as 'alert',
      lastUpdate: '3 min ago',
      trackerBattery: 63,
    },
    {
      id: '4',
      name: 'Twiga',
      species: 'Giraffe (Female)',
      location: 'Acacia Grove',
      status: 'warning' as 'warning',
      lastUpdate: '25 min ago',
      trackerBattery: 24,
    },
    {
      id: '5',
      name: 'Chui',
      species: 'Leopard (Female)',
      location: 'Southern Ridge',
      status: 'normal' as 'normal',
      lastUpdate: '18 min ago',
      trackerBattery: 78,
    },
  ];

  // Mock species count data
  const speciesData = [
    { name: 'Lions', count: 32, endangered: false },
    { name: 'Elephants', count: 64, endangered: false },
    { name: 'Rhinos', count: 18, endangered: true },
    { name: 'Giraffes', count: 46, endangered: false },
    { name: 'Cheetahs', count: 23, endangered: true },
    { name: 'Zebras', count: 87, endangered: false },
  ];

  // Mock conservation metrics
  const conservationMetrics = [
    {
      name: 'Rhino Population',
      value: 18,
      target: 25,
      unit: 'animals',
      category: 'Endangered Species Recovery',
      icon: <Bird className="h-4 w-4" />,
      change: 12.5,
    },
    {
      name: 'Protected Habitat',
      value: 1250,
      target: 1500,
      unit: 'hectares',
      category: 'Land Conservation',
      icon: <Leaf className="h-4 w-4" />,
      change: 5.2,
    },
    {
      name: 'Anti-Poaching Patrols',
      value: 85,
      target: 100,
      unit: 'weekly',
      category: 'Security Operations',
      icon: <ShieldAlert className="h-4 w-4" />,
      change: -3.5,
    },
    {
      name: 'GPS Collars Deployed',
      value: 42,
      target: 50,
      unit: 'devices',
      category: 'Wildlife Tracking',
      icon: <MapPin className="h-4 w-4" />,
      change: 8.0,
    },
  ];

  // Mock tasks - Fix the type issue by using literal types
  const tasks = [
    {
      id: '1',
      title: 'Veterinary checkup for Rhino (ID: RH-104)',
      description: 'Scheduled health assessment and sample collection',
      dueDate: 'Today at 10:30 AM',
      priority: 'high' as 'high',
      completed: false,
      assignee: 'Dr. Wanjiku',
    },
    {
      id: '2',
      title: 'Restock medical supplies',
      description: 'Antibiotics, bandages and tranquilizers',
      dueDate: 'Today at 1:00 PM',
      priority: 'medium' as 'medium',
      completed: false,
      assignee: 'John Muthoni',
    },
    {
      id: '3',
      title: 'Check south perimeter fence',
      description: 'Inspect reported damage in Sector 3',
      dueDate: 'Today at 3:15 PM',
      priority: 'high' as 'high',
      completed: false,
      assignee: 'Security Team A',
    },
    {
      id: '4',
      title: 'Update visitor information boards',
      dueDate: 'Today at 9:00 AM',
      priority: 'low' as 'low',
      completed: true,
      assignee: 'Visitor Services',
    },
  ];

  // Event handlers
  const handleViewAllAlerts = () => {
    toast({
      title: "Feature in development",
      description: "The alerts page is coming soon.",
    });
  };

  const handleViewAnimal = (id: string) => {
    toast({
      title: "Animal details",
      description: `Viewing details for animal ID: ${id}`,
    });
  };

  const handleViewMap = () => {
    toast({
      title: "Feature in development",
      description: "The tracking map is coming soon.",
    });
  };

  const handleViewAllTasks = () => {
    toast({
      title: "Feature in development",
      description: "The tasks management system is coming soon.",
    });
  };

  const handleTaskComplete = (id: string, completed: boolean) => {
    toast({
      title: completed ? "Task completed" : "Task reopened",
      description: `Task ID: ${id} has been ${completed ? 'marked as complete' : 'reopened'}`,
    });
  };

  const handleViewDetails = () => {
    toast({
      title: "Feature in development",
      description: "The animal health records system is coming soon.",
    });
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to Kenya Wildlife Service Management System
        </p>
      </div>

      <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4">
        <AnimalHealthSummary
          data={healthData}
          totalAnimals={1284}
          onViewDetails={handleViewDetails}
        />
        <AnimalCountBySpecies data={speciesData} />
        <RecentAlerts 
          alerts={alerts} 
          onViewAll={handleViewAllAlerts} 
        />
      </div>

      <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-3 mb-4">
        <VisitorStats
          data={visitorData}
          totalVisitors={6536}
          averageVisitors={654}
        />
      </div>

      <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4">
        <ConservationMetrics metrics={conservationMetrics} />
      </div>

      <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <WildlifeTracker
          animals={animalLocations}
          onViewMap={handleViewMap}
          onViewAnimal={handleViewAnimal}
        />
        <UpcomingTasks
          tasks={tasks}
          onViewAllTasks={handleViewAllTasks}
          onTaskComplete={handleTaskComplete}
        />
        <div className="bg-card rounded-lg border shadow-sm p-4 md:p-6 flex flex-col justify-center items-center text-center space-y-3 md:space-y-4">
          <Ticket className="h-12 w-12 md:h-16 md:w-16 text-kws-amber" />
          <h3 className="text-lg md:text-xl font-semibold">Quick Access</h3>
          <p className="text-muted-foreground text-sm md:text-base">
            Manage tickets, visitor groups, or access animal tracking tools directly
          </p>
          <div className="grid grid-cols-2 gap-2 w-full mt-2">
            <Button variant="outline" onClick={() => navigate('/tickets')}>
              Ticketing
            </Button>
            <Button variant="outline" onClick={() => navigate('/animals')}>
              Health Records
            </Button>
            <Button variant="outline" onClick={() => navigate('/security')}>
              Security Alerts
            </Button>
            <Button variant="outline" onClick={() => navigate('/reports')}>
              Analytics
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
