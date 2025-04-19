
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Animal = {
  name: string;
  count: number;
  endangered: boolean;
};

interface AnimalCountBySpeciesProps {
  data: Animal[];
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const isEndangered = payload[0].payload.endangered;
    return (
      <div className="bg-card p-3 border rounded-md shadow-sm">
        <p className="font-medium">{label}</p>
        <div className="flex items-center gap-2">
          <p className="text-foreground">Count: {payload[0].value}</p>
          {isEndangered && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> Endangered
            </p>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export function AnimalCountBySpecies({ data, className }: AnimalCountBySpeciesProps) {
  // Sort the data by count in descending order
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-0">
        <CardTitle className="text-base">Animal Population</CardTitle>
        <CardDescription>
          Distribution by species
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              margin={{
                top: 20,
                right: 15,
                left: 0,
                bottom: 5,
              }}
              layout="vertical"
            >
              <XAxis type="number" />
              <YAxis 
                dataKey="name" 
                type="category" 
                tick={{ fontSize: 12 }} 
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))"
                radius={4}
                style={{ 
                  opacity: 0.8 
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-muted-foreground flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-primary rounded-sm opacity-100 inline-block"></span>
            <span>Endangered</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-primary rounded-sm opacity-80 inline-block"></span>
            <span>Non-endangered</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
