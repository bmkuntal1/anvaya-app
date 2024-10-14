import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { NavLink } from "../common/NavLink";
import { navItems } from "./navItems";
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
import { Menu, User, Settings, LogOut } from 'lucide-react';

export const Topbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
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
    )
}