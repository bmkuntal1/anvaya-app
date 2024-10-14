import { Home, Users, Settings } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: <Home className="w-4 h-4 mr-2" strokeWidth = { 0.8} /> },
  { href: "/users", label: "Users", icon: <Users className="w-4 h-4 mr-2" strokeWidth = { 0.8} /> },
  { href: "/admin/settings", label: "Settings", icon: <Settings className="w-4 h-4 mr-2" strokeWidth = { 0.8} /> },
];
