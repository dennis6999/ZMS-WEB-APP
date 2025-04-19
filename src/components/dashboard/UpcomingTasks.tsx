
import React from 'react';
import { Calendar, CheckCircle, Circle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  assignee: string;
}

interface UpcomingTasksProps {
  tasks: Task[];
  onViewAllTasks: () => void;
  onTaskComplete: (id: string, completed: boolean) => void;
}

export const UpcomingTasks = ({ tasks, onViewAllTasks, onTaskComplete }: UpcomingTasksProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Today's Tasks</CardTitle>
        </div>
        <Calendar className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[270px]">
          <div className="px-6 py-2">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                <CheckCircle className="h-8 w-8 mb-2" />
                <p>No tasks for today</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "flex items-start space-x-4 rounded-md border p-3",
                      task.completed && "bg-muted/50"
                    )}
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={(checked) => onTaskComplete(task.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <p className={cn(
                          "text-sm font-medium",
                          task.completed && "line-through text-muted-foreground"
                        )}>
                          {task.title}
                        </p>
                        <Badge 
                          variant={
                            task.priority === 'high' 
                              ? 'destructive' 
                              : task.priority === 'medium' 
                                ? 'secondary' 
                                : 'outline'
                          }
                          className="text-xs ml-2"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      {task.description && (
                        <p className="text-xs text-muted-foreground">{task.description}</p>
                      )}
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{task.dueDate}</span>
                        </div>
                        <span>Assigned to: {task.assignee}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full" onClick={onViewAllTasks}>
            View all tasks
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
