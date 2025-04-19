
import React from 'react';
import { MainLayout } from './MainLayout';
import { Button } from '@/components/ui/button';

interface PageTemplateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

export const PageTemplate = ({ title, description, icon, children }: PageTemplateProps) => {
  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 flex items-center justify-center rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </div>
      
      {children || (
        <div className="space-y-6">
          <div className="bg-card border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
            <p className="text-muted-foreground mb-4">
              This page is currently under development. The team is working on implementing the full functionality.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline">View Documentation</Button>
              <Button variant="default">Request Feature</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-card border rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium mb-2">Feature {index + 1}</h3>
                <p className="text-muted-foreground mb-4">
                  A brief description of the upcoming feature and its benefits.
                </p>
                <Button variant="link" className="px-0">Learn more</Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
};
