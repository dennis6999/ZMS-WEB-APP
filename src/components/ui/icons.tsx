import {
  AlertTriangle,
  Bell,
  BellRing,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Info,
  Loader2,
  LogOut,
  Mail,
  Menu,
  Moon,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  Sun,
  User,
  X
} from "lucide-react"

export const Icons = {
  logo: Globe,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  trash: X,
  post: Mail,
  page: Globe,
  media: Globe,
  settings: Settings,
  billing: Globe,
  ellipsis: Globe,
  add: Globe,
  warning: AlertTriangle,
  user: User,
  arrowRight: ChevronRight,
  help: Globe,
  sun: Sun,
  moon: Moon,
  gitHub: Globe,
  twitter: Globe,
  check: Check,
  google: ({ className, ...props }: React.ComponentProps<typeof Globe>) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      ></path>
    </svg>
  ),
  gitlab: Globe,
  search: Search,
  menu: Menu,
  logout: LogOut,
  bell: Bell,
  bellRing: BellRing,
  shield: Shield,
  shieldAlert: ShieldAlert,
  info: Info,
  clock: Clock,
  mail: Mail,
  globe: Globe,
} 