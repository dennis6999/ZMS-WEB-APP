
import React from 'react';
import { PawPrint, Map, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface AnimalLocation {
  id: string;
  name: string;
  species: string;
  imageUrl?: string;
  location: string;
  status: 'normal' | 'alert' | 'warning';
  lastUpdate: string;
  trackerBattery: number;
}

interface WildlifeTrackerProps {
  animals: AnimalLocation[];
  onViewMap: () => void;
  onViewAnimal: (id: string) => void;
}

export const WildlifeTracker = ({ animals, onViewMap, onViewAnimal }: WildlifeTrackerProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Wildlife Tracker</CardTitle>
          <CardDescription>Real-time location monitoring</CardDescription>
        </div>
        <Map className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px]">
          <div className="grid gap-2 p-4">
            {animals.map((animal) => (
              <div
                key={animal.id}
                className={cn(
                  "flex items-center space-x-4 rounded-md border p-3 transition-colors hover:bg-muted/50 cursor-pointer",
                  animal.status === 'alert' && "border-destructive/50 bg-destructive/10",
                  animal.status === 'warning' && "border-amber-500/50 bg-amber-500/10"
                )}
                onClick={() => onViewAnimal(animal.id)}
              >
                <Avatar className="h-10 w-10 border">
                  {animal.imageUrl ? (
                    <AvatarImage src={animal.imageUrl} alt={animal.name} />
                  ) : (
                    <AvatarFallback>
                      <PawPrint className="h-5 w-5" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{animal.name}</p>
                    <Badge 
                      variant={
                        animal.status === 'normal' 
                          ? 'outline' 
                          : animal.status === 'alert' 
                            ? 'destructive' 
                            : 'secondary'
                      }
                      className="text-xs"
                    >
                      {animal.status === 'normal' ? 'OK' : animal.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-xs text-muted-foreground">{animal.species}</p>
                    <p className="text-xs text-muted-foreground">Battery: {animal.trackerBattery}%</p>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    <span>{animal.location}</span>
                    <span className="ml-auto text-xs">{animal.lastUpdate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Button variant="secondary" className="w-full" onClick={onViewMap}>
          View Full Map
        </Button>
      </CardFooter>
    </Card>
  );
};
