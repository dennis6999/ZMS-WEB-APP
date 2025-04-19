
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardCard } from './DashboardCard';

interface VisitorData {
  date: string;
  visitors: number;
}

interface VisitorStatsProps {
  data: VisitorData[];
  totalVisitors: number;
  averageVisitors: number;
  className?: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-muted-foreground">Date</span>
            <span className="text-sm font-bold">{label}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-muted-foreground">Visitors</span>
            <span className="text-sm font-bold">{payload[0].value}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export const VisitorStats = ({
  data,
  totalVisitors,
  averageVisitors,
  className,
}: VisitorStatsProps) => {
  return (
    <DashboardCard
      title="Visitor Statistics"
      description="Daily visitor count trends"
      icon={<Users />}
      className={cn("col-span-3", className)}
    >
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#8884" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickLine={{ stroke: '#8884' }}
              axisLine={{ stroke: '#8884' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={{ stroke: '#8884' }}
              axisLine={{ stroke: '#8884' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="hsl(var(--primary))"
              fill="url(#colorVisitors)"
              activeDot={{ r: 8 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4">
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm font-medium">Average Daily</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-2xl font-bold">{averageVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Visitors per day</p>
          </CardContent>
        </Card>
      </div>
    </DashboardCard>
  );
};
