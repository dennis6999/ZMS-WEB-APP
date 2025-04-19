import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HealthReport {
  id: string;
  animalId: string;
  animalName: string;
  date: string;
  type: string;
  status: string;
  veterinarian: string;
  findings: string;
  recommendations: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  nextCheckup: string;
  attachments: {
    name: string;
    type: string;
    url: string;
  }[];
}

interface HealthReportDetailsProps {
  report: HealthReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export function HealthReportDetails({
  report,
  isOpen,
  onClose,
}: HealthReportDetailsProps) {
  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Health Report Details</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Animal</h3>
                <p className="text-lg">{report.animalName}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Date</h3>
                <p className="text-lg">{report.date}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Type</h3>
                <p className="text-lg">{report.type}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
                <Badge
                  variant={
                    report.status === 'healthy'
                      ? 'default'
                      : report.status === 'sick'
                      ? 'destructive'
                      : 'secondary'
                  }
                >
                  {report.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Veterinarian</h3>
                <p className="text-lg">{report.veterinarian}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Next Checkup</h3>
                <p className="text-lg">{report.nextCheckup}</p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Findings</h3>
              <p className="text-sm">{report.findings}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Recommendations</h3>
              <p className="text-sm">{report.recommendations}</p>
            </div>
          </TabsContent>
          <TabsContent value="medications" className="space-y-4">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              {report.medications.length > 0 ? (
                <div className="space-y-4">
                  {report.medications.map((medication, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium">{medication.name}</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Dosage:</span> {medication.dosage}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Frequency:</span> {medication.frequency}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span> {medication.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No medications prescribed</p>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="attachments">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              {report.attachments.length > 0 ? (
                <div className="space-y-2">
                  {report.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{attachment.name}</span>
                        <Badge variant="outline">{attachment.type}</Badge>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No attachments available</p>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 