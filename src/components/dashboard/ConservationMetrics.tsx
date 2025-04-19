
import React from 'react';
import { Activity, TrendingUp, Bird, Leaf, Scale } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ConservationMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  icon: React.ReactNode;
  category: string;
  change?: number;
}

interface ConservationMetricsProps {
  metrics: ConservationMetric[];
  className?: string;
}

export const ConservationMetrics = ({ metrics, className }: ConservationMetricsProps) => {
  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Leaf className="h-5 w-5 mr-2 text-kws-green" />
          Conservation Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {metrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 text-muted-foreground">{metric.icon}</div>
                  <div>
                    <p className="text-sm font-medium">{metric.name}</p>
                    <p className="text-xs text-muted-foreground">{metric.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {metric.value} / {metric.target} {metric.unit}
                  </p>
                  {metric.change && (
                    <p 
                      className={cn(
                        "text-xs flex items-center justify-end",
                        metric.change > 0 ? "text-green-500" : "text-red-500"
                      )}
                    >
                      <TrendingUp className={cn("h-3 w-3 mr-1", metric.change < 0 && "rotate-180")} />
                      {Math.abs(metric.change)}% {metric.change > 0 ? "increase" : "decrease"}
                    </p>
                  )}
                </div>
              </div>
              <Progress 
                value={(metric.value / metric.target) * 100} 
                className={cn(
                  metric.value / metric.target >= 0.75 ? "bg-green-100" : "bg-amber-100",
                  metric.value / metric.target >= 0.75 ? "text-green-500" : "text-amber-500"
                )} 
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
