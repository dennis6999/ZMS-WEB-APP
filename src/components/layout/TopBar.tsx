import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Sun, 
  Moon,
  Globe,
  User,
  HelpCircle,
  Menu,
  LogOut,
  ShieldAlert,
  AlertTriangle,
  Calendar,
  Clock
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface TopBarProps {
  openMobileSidebar: () => void;
}

export const TopBar = ({ openMobileSidebar }: TopBarProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Update date and time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Format date and time
  const currentDate = currentDateTime.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const currentTime = currentDateTime.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-2 sm:px-4 bg-background">
      <div className="flex items-center gap-4 sm:gap-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={openMobileSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{currentDate}</span>
          <div className="h-4 w-px bg-border" />
          <Clock className="h-4 w-4" />
          <span>{currentTime}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 relative">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 flex items-center justify-center text-[10px] sm:text-xs bg-accent">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Recent Alerts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              <div className="p-2 space-y-2">
                <div 
                  className="flex items-start gap-2 p-2 rounded-md hover:bg-accent/50 cursor-pointer"
                  onClick={() => navigate('/alerts')}
                >
                  <ShieldAlert className="h-4 w-4 mt-1 text-destructive" />
                  <div>
                    <p className="text-sm font-medium">Perimeter Alert: Sector 4</p>
                    <p className="text-xs text-muted-foreground">10 minutes ago</p>
                  </div>
                </div>
                <div 
                  className="flex items-start gap-2 p-2 rounded-md hover:bg-accent/50 cursor-pointer"
                  onClick={() => navigate('/alerts')}
                >
                  <AlertTriangle className="h-4 w-4 mt-1 text-destructive" />
                  <div>
                    <p className="text-sm font-medium">Health Alert: Zebra (ID: ZB-103)</p>
                    <p className="text-xs text-muted-foreground">35 minutes ago</p>
                  </div>
                </div>
                <div 
                  className="flex items-start gap-2 p-2 rounded-md hover:bg-accent/50 cursor-pointer"
                  onClick={() => navigate('/alerts')}
                >
                  <Bell className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Low Supply: Rhino Feed</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/alerts')}>
              <Bell className="mr-2 h-4 w-4" />
              <span>View all alerts</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 sm:h-9 sm:w-9"
          onClick={toggleTheme}
        >
          <Sun className="h-4 w-4 sm:h-5 sm:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 sm:h-5 sm:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full">
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                <AvatarImage src={user?.photoURL || "/avatars/01.png"} alt={user?.displayName || "User"} />
                <AvatarFallback>{user?.displayName?.[0] || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Globe className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
