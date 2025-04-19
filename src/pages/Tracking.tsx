import React, { useState } from 'react';
import { PageTemplate } from '@/components/layout/PageTemplate';
import { Map, Search, Filter, AlertTriangle, Info, Battery, Maximize2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type AnimalStatus = 'normal' | 'warning' | 'alert';

interface AnimalLocation {
  id: string;
  name: string;
  species: string;
  location: string;
  status: AnimalStatus;
  lastUpdate: string;
  trackerBattery: number;
  coordinates: { lat: number; lng: number };
  image: string;
  notes: string;
}

const Tracking = () => {
  const isMobile = useIsMobile();
  const [activeAnimal, setActiveAnimal] = useState<string | null>(null);
  
  const animalLocations: AnimalLocation[] = [
    {
      id: '1',
      name: 'Simba',
      species: 'Lion (Male)',
      location: 'Eastern Savanna, Section B',
      status: 'normal',
      lastUpdate: '5 min ago',
      trackerBattery: 87,
      coordinates: { lat: -1.286389, lng: 36.817223 },
      image: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1000&auto=format&fit=crop',
      notes: 'Healthy condition, regular movement patterns observed',
    },
    {
      id: '2',
      name: 'Tembo',
      species: 'Elephant (Female)',
      location: 'Northern Watering Hole',
      status: 'normal',
      lastUpdate: '12 min ago',
      trackerBattery: 92,
      coordinates: { lat: -1.292389, lng: 36.821223 },
      image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=1000&auto=format&fit=crop',
      notes: 'Part of matriarchal group, recently gave birth to a calf',
    },
    {
      id: '3',
      name: 'Kifaru',
      species: 'Rhino (Male)',
      location: 'Protected Reserve',
      status: 'alert',
      lastUpdate: '3 min ago',
      trackerBattery: 63,
      coordinates: { lat: -1.282389, lng: 36.827223 },
      image: 'https://images.unsplash.com/photo-1584316712724-f5d4b188fee2?q=80&w=1000&auto=format&fit=crop',
      notes: 'Alert: Unusual movement pattern detected, possible poaching threat',
    },
    {
      id: '4',
      name: 'Twiga',
      species: 'Giraffe (Female)',
      location: 'Acacia Grove',
      status: 'warning',
      lastUpdate: '25 min ago',
      trackerBattery: 24,
      coordinates: { lat: -1.289389, lng: 36.812223 },
      image: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?q=80&w=1000&auto=format&fit=crop',
      notes: 'Warning: Low tracker battery, requires attention',
    },
    {
      id: '5',
      name: 'Chui',
      species: 'Leopard (Female)',
      location: 'Southern Ridge',
      status: 'normal',
      lastUpdate: '18 min ago',
      trackerBattery: 78,
      coordinates: { lat: -1.283389, lng: 36.819223 },
      image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=1000&auto=format&fit=crop',
      notes: 'Recently tagged, monitoring hunting patterns',
    },
  ];

  const handleSelectAnimal = (id: string) => {
    setActiveAnimal(id === activeAnimal ? null : id);
  };

  const getStatusColor = (status: 'normal' | 'warning' | 'alert') => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'warning': return 'bg-amber-500';
      case 'alert': return 'bg-red-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <PageTemplate 
      title="Tracking Map" 
      description="Real-time location tracking for monitored wildlife"
      icon={<Map className="h-6 w-6" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sidebar with animal list */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span>Find Animals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input placeholder="Search by name or species..." className="flex-1" />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="mb-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Species</SelectItem>
                    <SelectItem value="lion">Lions</SelectItem>
                    <SelectItem value="elephant">Elephants</SelectItem>
                    <SelectItem value="rhino">Rhinos</SelectItem>
                    <SelectItem value="giraffe">Giraffes</SelectItem>
                    <SelectItem value="leopard">Leopards</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tracked Animals</CardTitle>
              <CardDescription>
                Showing {animalLocations.length} animals with active trackers
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[420px] overflow-y-auto px-6">
                {animalLocations.map((animal) => (
                  <div 
                    key={animal.id}
                    className={cn(
                      "border-b last:border-b-0 py-3 cursor-pointer transition-colors",
                      animal.id === activeAnimal ? "bg-muted/50" : "hover:bg-muted/30"
                    )}
                    onClick={() => handleSelectAnimal(animal.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(animal.status)}`} />
                        <div>
                          <h4 className="font-medium">{animal.name}</h4>
                          <p className="text-sm text-muted-foreground">{animal.species}</p>
                        </div>
                      </div>
                      {animal.status !== 'normal' && (
                        <Badge variant={animal.status === 'alert' ? 'destructive' : 'outline'} className="ml-auto">
                          {animal.status === 'alert' ? 'Alert' : 'Warning'}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-2 pl-5 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>{animal.location}</span>
                        <span>{animal.lastUpdate}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Battery className="h-3 w-3" />
                        <span className={cn(
                          animal.trackerBattery < 30 ? "text-destructive" : 
                          animal.trackerBattery < 50 ? "text-amber-500" : 
                          "text-green-500"
                        )}>
                          {animal.trackerBattery}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map and details area */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Live Tracking Map</CardTitle>
                <CardDescription>
                  Updated every 5 minutes - Last refresh: 2 minutes ago
                </CardDescription>
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px] bg-muted/20 relative flex items-center justify-center">
                <div className="text-center p-6">
                  <Map className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    This is where the interactive map would be displayed, showing the real-time locations of tracked animals.
                  </p>
                  <Button>Launch Full Map</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {activeAnimal && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {animalLocations.find(a => a.id === activeAnimal)?.name} Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="info">
                  <TabsList className="mb-4">
                    <TabsTrigger value="info">Information</TabsTrigger>
                    <TabsTrigger value="history">Movement History</TabsTrigger>
                    <TabsTrigger value="health">Health Data</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-1/3">
                        <div className="aspect-square bg-muted rounded-md overflow-hidden">
                          <img 
                            src={animalLocations.find(a => a.id === activeAnimal)?.image} 
                            alt={animalLocations.find(a => a.id === activeAnimal)?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="font-semibold text-lg mb-2">
                          {animalLocations.find(a => a.id === activeAnimal)?.name} - {animalLocations.find(a => a.id === activeAnimal)?.species}
                        </h3>
                        <div className="grid grid-cols-2 gap-y-2 mb-4">
                          <div className="text-sm text-muted-foreground">ID:</div>
                          <div className="text-sm">KWS-{animalLocations.find(a => a.id === activeAnimal)?.id}2023</div>
                          <div className="text-sm text-muted-foreground">Location:</div>
                          <div className="text-sm">{animalLocations.find(a => a.id === activeAnimal)?.location}</div>
                          <div className="text-sm text-muted-foreground">Last Updated:</div>
                          <div className="text-sm">{animalLocations.find(a => a.id === activeAnimal)?.lastUpdate}</div>
                          <div className="text-sm text-muted-foreground">Tracker Battery:</div>
                          <div className="text-sm">{animalLocations.find(a => a.id === activeAnimal)?.trackerBattery}%</div>
                          <div className="text-sm text-muted-foreground">Status:</div>
                          <div className="text-sm">
                            <Badge variant={
                              animalLocations.find(a => a.id === activeAnimal)?.status === 'alert' ? 'destructive' : 
                              animalLocations.find(a => a.id === activeAnimal)?.status === 'warning' ? 'outline' : 
                              'secondary'
                            }>
                              {animalLocations.find(a => a.id === activeAnimal)?.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">Notes:</div>
                        <p className="text-sm">{animalLocations.find(a => a.id === activeAnimal)?.notes}</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history">
                    <div className="text-center py-12">
                      <Info className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">Movement History</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        This tab would display historical movement data, showing migration patterns and frequent locations.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="health">
                    <div className="text-center py-12">
                      <Info className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">Health Data</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        This tab would display health monitoring data from the tracker, including activity levels and vitals.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Full History</Button>
                <Button>Request Update</Button>
              </CardFooter>
            </Card>
          )}

          {!activeAnimal && (
            <Card className="bg-muted/10">
              <CardContent className="text-center py-12">
                <Info className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Select an Animal</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Click on an animal from the list to view detailed information and tracking data.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageTemplate>
  );
};

export default Tracking;
