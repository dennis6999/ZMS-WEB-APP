
import React from 'react';
import { PageTemplate } from '@/components/layout/PageTemplate';
import { BellRing, AlertTriangle, ShieldAlert, InfoIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Alerts = () => {
  // Sample alert data
  const alertCategories = [
    { id: 'security', label: 'Security', count: 3, icon: <ShieldAlert className="h-4 w-4" /> },
    { id: 'health', label: 'Health', count: 5, icon: <AlertTriangle className="h-4 w-4" /> },
    { id: 'maintenance', label: 'Maintenance', count: 2, icon: <BellRing className="h-4 w-4" /> },
    { id: 'info', label: 'Information', count: 4, icon: <InfoIcon className="h-4 w-4" /> },
  ];

  const allAlerts = [
    {
      id: '1',
      type: 'security',
      title: 'Perimeter Alert: Sector 4',
      description: 'Motion detected near south perimeter fence. Security team dispatched.',
      timestamp: '10 minutes ago',
      urgent: true,
    },
    {
      id: '2',
      type: 'health',
      title: 'Health Alert: Zebra (ID: ZB-103)',
      description: 'Exhibiting signs of reduced appetite. Veterinary checkup scheduled.',
      timestamp: '35 minutes ago',
      urgent: true,
    },
    {
      id: '3',
      type: 'maintenance',
      title: 'Low Supply: Rhino Feed',
      description: 'Inventory below 15%. Please reorder within 3 days.',
      timestamp: '2 hours ago',
    },
    {
      id: '4',
      type: 'info',
      title: 'VIP Group Arriving',
      description: 'Ministry of Tourism delegation arriving at 2:00 PM today.',
      timestamp: '3 hours ago',
    },
    {
      id: '5',
      type: 'security',
      title: 'Camera Offline: Northeast Tower',
      description: 'Camera has been offline for 45 minutes. Maintenance team notified.',
      timestamp: '1 hour ago',
      urgent: true,
    },
    {
      id: '6',
      type: 'health',
      title: 'Health Alert: Lion Pride (Sector B)',
      description: 'Cubs showing signs of dehydration. Veterinary team monitoring situation.',
      timestamp: '4 hours ago',
      urgent: false,
    },
  ];

  const getAlertsForType = (type: string) => {
    return allAlerts.filter(alert => alert.type === type);
  };

  const getAlertIcon = (type: string, urgent?: boolean) => {
    const category = alertCategories.find(cat => cat.id === type);
    if (!category) return <InfoIcon className="h-5 w-5" />;
    
    return React.cloneElement(category.icon as React.ReactElement, { 
      className: cn("h-5 w-5", urgent ? "text-destructive" : "text-muted-foreground")
    });
  };

  return (
    <PageTemplate 
      title="Alerts Management" 
      description="Monitor and respond to system alerts and notifications"
      icon={<BellRing className="h-6 w-6" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {alertCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                {React.cloneElement(category.icon as React.ReactElement, { 
                  className: "h-5 w-5 mr-2" 
                })}
                {category.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">{category.count}</span>
                <Badge variant={category.count > 0 ? "outline" : "secondary"}>
                  {category.count > 0 ? "Active" : "Clear"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="info">Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {allAlerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                "flex items-start space-x-4 rounded-md border p-4",
                alert.urgent && "border-destructive/20 bg-destructive/10"
              )}
            >
              {getAlertIcon(alert.type, alert.urgent)}
              <div className="flex-1 space-y-1">
                <p className="font-medium">{alert.title}</p>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
              </div>
              <Badge variant={alert.urgent ? "destructive" : "outline"}>
                {alert.urgent ? "Urgent" : "Normal"}
              </Badge>
            </div>
          ))}
        </TabsContent>
        
        {alertCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            {getAlertsForType(category.id).length > 0 ? (
              getAlertsForType(category.id).map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "flex items-start space-x-4 rounded-md border p-4",
                    alert.urgent && "border-destructive/20 bg-destructive/10"
                  )}
                >
                  {getAlertIcon(alert.type, alert.urgent)}
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{alert.title}</p>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                  </div>
                  <Badge variant={alert.urgent ? "destructive" : "outline"}>
                    {alert.urgent ? "Urgent" : "Normal"}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted mb-4">
                  {React.cloneElement(category.icon as React.ReactElement, { 
                    className: "h-5 w-5" 
                  })}
                </div>
                <h3 className="font-medium">No {category.label} Alerts</h3>
                <p className="text-sm text-muted-foreground mt-1">There are no active alerts in this category.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </PageTemplate>
  );
};

export default Alerts;
