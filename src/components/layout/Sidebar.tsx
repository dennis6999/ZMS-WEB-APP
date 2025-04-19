import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  PawPrint,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { menuSections } from '@/config/menuItems';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  toggleCollapsed: () => void;
  closeMobileSidebar: () => void;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  collapsed: boolean;
  onClick?: () => void;
  active?: boolean;
  alert?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, collapsed, onClick, active, alert }: SidebarItemProps) => {
  const isMobile = useIsMobile();
  const content = (
    <Link
      to={href}
      className={cn(
        "flex items-center p-3 my-1 rounded-md transition-all duration-200 ease-in-out relative group",
        collapsed && !isMobile ? "justify-center" : "px-4",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
      onClick={!isMobile ? onClick : undefined}
    >
      <div className="relative">
        <Icon className={cn(
          "flex-shrink-0 transition-all duration-200 ease-in-out", 
          collapsed && !isMobile ? "w-6 h-6" : "w-5 h-5 mr-3"
        )} />
        {alert && (
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent animate-pulse-slow flex-shrink-0" />
        )}
      </div>
      <div className={cn(
        "flex items-center flex-1 transition-all duration-200 ease-in-out",
        collapsed && !isMobile ? "opacity-0 w-0" : "opacity-100"
      )}>
        <span className="truncate">{label}</span>
      </div>
    </Link>
  );

  if (isMobile || !collapsed) {
    return content;
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const SidebarSection = ({ title, children, collapsed }: { title: string; children: React.ReactNode; collapsed: boolean }) => {
  const isMobile = useIsMobile();
  
  if (collapsed && !isMobile) {
    return <div className="mt-6 mb-2 px-2 transition-all duration-200 ease-in-out">{children}</div>;
  }
  
  return (
    <div className="mt-6 mb-2 transition-all duration-200 ease-in-out">
      <div className={cn(
        "px-4 mb-2 transition-all duration-200 ease-in-out",
        collapsed && !isMobile ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
      )}>
        <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
};

export const Sidebar = ({ collapsed, mobileOpen, toggleCollapsed, closeMobileSidebar }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const sidebarContent = (
    <>
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border flex-shrink-0 relative">
        <div className="flex items-center gap-2 flex-1">
          <PawPrint className="h-8 w-8 text-kws-amber" />
          <span className={cn(
            "font-bold text-xl text-sidebar-foreground transition-all duration-200 ease-in-out",
            collapsed && !isMobile ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          )}>KWS</span>
        </div>
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className={cn(
              "absolute -right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full",
              "bg-background border-2 border-border shadow-lg",
              "hover:bg-accent hover:text-accent-foreground hover:border-accent",
              "transition-all duration-200 ease-in-out",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar",
              "flex items-center justify-center"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? 
              <ChevronRight className="h-4 w-4" /> : 
              <ChevronLeft className="h-4 w-4" />
            }
          </Button>
        )}
      </div>

      <div className={cn(
        "flex-1 overflow-y-auto scrollbar-hidden transition-all duration-200 ease-in-out",
        collapsed && !isMobile ? "px-2" : "px-3"
      )}>
        {menuSections.map((section) => {
          // Only show sections that the user has access to
          if (!section.roles.includes(user?.role || 'user')) {
            return null;
          }

          // Filter items based on user role
          const accessibleItems = section.items.filter(item => 
            item.roles.includes(user?.role || 'user')
          );

          // Don't show empty sections
          if (accessibleItems.length === 0) {
            return null;
          }

          return (
            <SidebarSection key={section.title} title={section.title} collapsed={collapsed && !isMobile}>
              {accessibleItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  collapsed={collapsed && !isMobile}
                  active={currentPath === item.href}
                  alert={item.label === "Alerts"}
                />
              ))}
            </SidebarSection>
          );
        })}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={closeMobileSidebar}>
        <SheetContent side="left" className="w-[280px] p-0 bg-sidebar text-sidebar-foreground overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {sidebarContent}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        "bg-sidebar h-screen flex flex-col border-r border-sidebar-border transition-all duration-300 ease-in-out fixed top-0 left-0 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {sidebarContent}
    </aside>
  );
};
