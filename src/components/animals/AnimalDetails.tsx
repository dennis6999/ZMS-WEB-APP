import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AnimalDetailsProps {
  animal: {
    id: string;
    name: string;
    species: string;
    status: string;
    location: string;
    age: number;
    weight: number;
    healthStatus: string;
    notes?: string;
    lastCheckup?: string;
    nextCheckup?: string;
    diet?: string;
    medications?: string[];
  };
  onClose: () => void;
  onEdit: () => void;
}

export function AnimalDetails({ animal, onClose, onEdit }: AnimalDetailsProps) {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{animal.name}</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onEdit}>Edit</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Species</h3>
                <p className="text-lg">{animal.species}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
                <Badge variant={animal.status === 'active' ? 'default' : 'secondary'}>
                  {animal.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Location</h3>
                <p className="text-lg">{animal.location}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Age</h3>
                <p className="text-lg">{animal.age} years</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Weight</h3>
                <p className="text-lg">{animal.weight} kg</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Diet</h3>
                <p className="text-lg">{animal.diet || 'Not specified'}</p>
              </div>
            </div>
            {animal.notes && (
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Notes</h3>
                <p className="text-sm">{animal.notes}</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="health" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Health Status</h3>
                <Badge
                  variant={
                    animal.healthStatus === 'healthy'
                      ? 'default'
                      : animal.healthStatus === 'sick'
                      ? 'destructive'
                      : 'secondary'
                  }
                >
                  {animal.healthStatus}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Last Checkup</h3>
                <p className="text-lg">{animal.lastCheckup || 'Not recorded'}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Next Checkup</h3>
                <p className="text-lg">{animal.nextCheckup || 'Not scheduled'}</p>
              </div>
            </div>
            {animal.medications && animal.medications.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Current Medications</h3>
                <div className="flex flex-wrap gap-2">
                  {animal.medications.map((medication, index) => (
                    <Badge key={index} variant="outline">
                      {medication}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="history">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <div className="space-y-4">
                {/* This would be populated with actual history data */}
                <div className="space-y-2">
                  <h3 className="font-medium">Medical History</h3>
                  <p className="text-sm text-muted-foreground">No medical history available</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Behavioral Notes</h3>
                  <p className="text-sm text-muted-foreground">No behavioral notes available</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Location History</h3>
                  <p className="text-sm text-muted-foreground">No location history available</p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 