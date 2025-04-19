import {
  Home,
  PawPrint,
  Users,
  ShieldAlert,
  LineChart,
  Calendar,
  Settings,
  Ticket,
  Map,
  UserCog,
  BookOpen,
  HeartPulse,
  Bird,
  Globe,
  BellRing,
} from 'lucide-react';

export type MenuItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  roles: string[];
};

export type MenuSection = {
  title: string;
  items: MenuItem[];
  roles: string[];
};

export const menuSections: MenuSection[] = [
  {
    title: "Overview",
    roles: ["admin", "user"],
    items: [
      {
        icon: Home,
        label: "Dashboard",
        href: "/",
        roles: ["admin", "user"],
      },
      {
        icon: BellRing,
        label: "Alerts",
        href: "/alerts",
        roles: ["admin", "user"],
      },
    ],
  },
  {
    title: "Animal Management",
    roles: ["admin", "user"],
    items: [
      {
        icon: PawPrint,
        label: "Animals",
        href: "/animals",
        roles: ["admin", "user"],
      },
      {
        icon: HeartPulse,
        label: "Health Tracking",
        href: "/health",
        roles: ["admin", "user"],
      },
      {
        icon: Bird,
        label: "Conservation",
        href: "/conservation",
        roles: ["admin", "user"],
      },
      {
        icon: Map,
        label: "Tracking Map",
        href: "/tracking",
        roles: ["admin", "user"],
      },
    ],
  },
  {
    title: "Visitor Experience",
    roles: ["admin", "user"],
    items: [
      {
        icon: Ticket,
        label: "Ticketing",
        href: "/tickets",
        roles: ["admin", "user"],
      },
      {
        icon: BookOpen,
        label: "Education",
        href: "/education",
        roles: ["admin", "user"],
      },
      {
        icon: Globe,
        label: "Sustainability",
        href: "/sustainability",
        roles: ["admin"],
      },
    ],
  },
  {
    title: "Operations",
    roles: ["admin", "user"],
    items: [
      {
        icon: Users,
        label: "Staff",
        href: "/staff",
        roles: ["admin"],
      },
      {
        icon: UserCog,
        label: "Tasks",
        href: "/tasks",
        roles: ["admin", "user"],
      },
      {
        icon: ShieldAlert,
        label: "Security",
        href: "/security",
        roles: ["admin"],
      },
      {
        icon: Calendar,
        label: "Schedule",
        href: "/schedule",
        roles: ["admin", "user"],
      },
    ],
  },
  {
    title: "Analytics",
    roles: ["admin"],
    items: [
      {
        icon: LineChart,
        label: "Reports",
        href: "/reports",
        roles: ["admin"],
      },
    ],
  },
  {
    title: "Settings",
    roles: ["admin", "user"],
    items: [
      {
        icon: Settings,
        label: "Settings",
        href: "/settings",
        roles: ["admin", "user"],
      },
    ],
  },
]; 