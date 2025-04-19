
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  loading?: boolean;
  children: React.ReactNode;
}

export const DashboardCard = ({
  title,
  description,
  icon,
  className,
  action,
  loading = false,
  children,
}: DashboardCardProps) => {
  if (loading) {
    return (
      <Card className={cn("overflow-hidden w-full", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <Skeleton className="h-6 w-24" />
            {description && <Skeleton className="h-4 w-40 mt-1" />}
          </div>
          {icon && <Skeleton className="h-8 w-8 rounded-md" />}
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-2">
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {description && (
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          )}
        </div>
        {icon && <div className="h-8 w-8 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent className="pt-2">
        {children}
        {action && (
          <div className="mt-4">
            <Button variant="outline" size="sm" onClick={action.onClick}>
              {action.label}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
