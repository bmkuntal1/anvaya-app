import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { staticFileUrl } from "@/lib/utils";

const getUserApi = async () => {
    const response = await axios.get('/user/profile');
    return response.data;
}

export const UserDropdown = () => {
    const navigate = useNavigate();
    const { data: user } = useQuery({ queryKey: ['user-profile'], queryFn: getUserApi });
    const logout = useAuthStore(state => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-4 cursor-pointer hover:drop-shadow-md">
                    <span className="text-sm font-medium text-gray-700 hidden md:inline-block">
                        {user?.email}
                    </span>
                    <Button variant="ghost" className="h-6 w-6 rounded-full">
                        <Avatar>
                            <AvatarImage src={staticFileUrl(user?.avatar)} alt={user?.email} className="object-cover" />
                            <AvatarFallback>{user?.email?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.firstName} {user?.lastName}</DropdownMenuLabel>
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
    )
}