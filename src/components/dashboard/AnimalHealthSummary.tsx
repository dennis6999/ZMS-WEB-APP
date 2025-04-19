
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, TooltipProps } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse, Activity } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { cn } from '@/lib/utils';

interface HealthData {
  name: string;
  value: number;
  color: string;
}

interface AnimalHealthSummaryProps {
  data: HealthData[];
  totalAnimals: number;
  className?: string;
  onViewDetails: () => void;
}

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as HealthData;
    
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-muted-foreground">Status</span>
          <span className="text-sm font-bold">{data.name}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-muted-foreground">Count</span>
          <span className="text-sm font-bold">{data.value}</span>
        </div>
      </div>
    );
  }

  return null;
};

export const AnimalHealthSummary = ({
  data,
  totalAnimals,
  className,
  onViewDetails,
}: AnimalHealthSummaryProps) => {
  return (
    <DashboardCard
      title="Animal Health Status"
      description="Current health distribution"
      icon={<HeartPulse />}
      className={cn("col-span-2", className)}
      action={{
        label: "View Health Records",
        onClick: onViewDetails,
      }}
    >
      <div className="flex flex-col items-center justify-center h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              formatter={(value, entry, index) => (
                <span className="text-sm">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-3 flex items-center space-x-3">
            <Activity className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Total Animals</p>
              <p className="text-lg font-bold">{totalAnimals}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 flex items-center space-x-3">
            <HeartPulse className="h-5 w-5 text-red-500" />
            <div>
              <p className="text-sm font-medium">Needs Attention</p>
              <p className="text-lg font-bold">
                {data.find(item => item.name === "Attention")?.value || 0}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardCard>
  );
};
