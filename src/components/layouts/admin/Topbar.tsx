import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { NavLink } from "../common/NavLink";
import { navItems } from "./adminMenu";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "../common/UserDropdown";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Power } from 'lucide-react';
import { useState, useEffect } from "react";

export const Topbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const logout = useAuthStore(state => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        if (isOpen) {
            setIsOpen(false);
        }
    }, [location]);

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex h-14 items-center justify-between px-4">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <Menu className="h-8 w-8" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 bg-gray-900 p-0 border-r border-gray-800">
                        <SheetHeader className="border-b border-gray-800 p-4">
                            <SheetTitle className="text-white">Admin Panel</SheetTitle>
                        </SheetHeader>
                        <SheetDescription className="hidden" />
                        <nav className="flex-1 flex flex-col space-y-1 px-2 py-4">
                            {navItems.map((item) => (
                                <NavLink key={item.href} href={item.href}>
                                    {item.icon} {item.label}
                                </NavLink>
                            ))}
                        </nav>
                        <div className="p-2 border-t border-gray-800">
                            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white w-full justify-start px-4 py-2">
                                <Power className="h-4 w-4 mr-2 flex-" strokeWidth={0.8} /> Logout
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>

                <div className="flex items-center space-x-2 hidden lg:block">
                </div>
                <UserDropdown />
                {/* <div className="flex items-center space-x-4">
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
                            <DropdownMenuItem onClick={() => navigate('/profile')}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate('/profile/account-settings')}>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div> */}
            </div>
        </header>
    )
}