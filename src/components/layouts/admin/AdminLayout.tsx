import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, User, Settings, LogOut, Home, Users } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const navItems = [
    { href: "/", label: "Dashboard", icon: <Home className="w-4 h-4 mr-2" strokeWidth={0.8} /> },
    { href: "/users", label: "Users", icon: <Users className="w-4 h-4 mr-2" strokeWidth={0.8} /> },
    { href: "/admin/settings", label: "Settings", icon: <Settings className="w-4 h-4 mr-2" strokeWidth={0.8} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
    const isActive = location.pathname === href;
    return (
      <Link
        to={href}
        className={cn(
          "flex items-center py-2 px-4 text-sm font-medium rounded-md",
          isActive
            ? "bg-gray-800 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        )}
      >
        {children}
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for large screens */}
      <aside className="hidden w-64 bg-gray-900 lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center justify-center border-b border-gray-600">
            <h1 className="text-xl font-semibold text-white">Anvaya <span className="font-light">Billing</span></h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.icon} {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-14 items-center justify-between px-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-8 w-8" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-gray-900 p-0">
                <SheetHeader className="border-b border-gray-800 p-4">
                  <SheetTitle className="text-white">Admin Panel</SheetTitle>
                </SheetHeader>
                <nav className="flex-1 space-y-1 px-2 py-4">
                  {navItems.map((item) => (
                    <NavLink key={item.href} href={item.href}>
                      {item.icon} {item.label}
                    </NavLink>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex items-center space-x-2 hidden lg:block">
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700 hidden md:inline-block">
                {user?.email}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-6 w-6 rounded-full">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>{user?.email?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

