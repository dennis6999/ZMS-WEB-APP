
import React from 'react';
import { ShieldAlert, AlertTriangle, InfoIcon, Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface Alert {
  id: string;
  type: 'security' | 'health' | 'maintenance' | 'info';
  title: string;
  description: string;
  timestamp: string;
  urgent?: boolean;
}

interface RecentAlertsProps {
  alerts: Alert[];
  onViewAll: () => void;
}

const AlertIcon = ({ type, urgent }: { type: Alert['type']; urgent?: boolean }) => {
  const commonClasses = cn("h-5 w-5", urgent ? "text-destructive" : "text-muted-foreground");

  switch (type) {
    case 'security':
      return <ShieldAlert className={commonClasses} />;
    case 'health':
      return <AlertTriangle className={commonClasses} />;
    case 'maintenance':
      return <Bell className={commonClasses} />;
    case 'info':
      return <InfoIcon className={commonClasses} />;
  }
};

export const RecentAlerts = ({ alerts, onViewAll }: RecentAlertsProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-6">
        <CardTitle className="text-lg font-semibold">Recent Alerts</CardTitle>
        <CardDescription>Latest notifications and urgent matters</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px]">
          <div className="px-6 py-2">
            {alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                <InfoIcon className="h-8 w-8 mb-2" />
                <p>No recent alerts</p>
              </div>
            ) : (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      "flex items-start space-x-4 rounded-md border p-3",
                      alert.urgent && "border-destructive/20 bg-destructive/10"
                    )}
                  >
                    <AlertIcon type={alert.type} urgent={alert.urgent} />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.description}</p>
                      <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full" onClick={onViewAll}>
            View all alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
