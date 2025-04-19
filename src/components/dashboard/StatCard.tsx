
import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export const StatCard = ({
  title,
  value,
  change,
  icon,
  className,
  loading = false,
}: StatCardProps) => {
  if (loading) {
    return (
      <Card className={cn(className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            {icon && <Skeleton className="h-8 w-8 rounded-md" />}
          </div>
          <Skeleton className="h-8 w-16 mt-2" />
          <div className="flex items-center mt-2">
            <Skeleton className="h-4 w-16" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold">{value}</p>
        </div>
        {change && (
          <div className="flex items-center mt-2">
            <div
              className={cn(
                "flex items-center text-xs font-medium",
                change.isPositive ? "text-green-500" : "text-red-500"
              )}
            >
              {change.isPositive ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              <span>{Math.abs(change.value)}%</span>
            </div>
            <span className="ml-1 text-xs text-muted-foreground">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
