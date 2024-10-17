import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { PageContainer, PageContent, PageHeader } from '@/components/custom/common/PageContainer';
import axios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from './UserAvatar';

const getUserApi = async () => {
    const response = await axios.get(`/user/profile`);
    return response.data;
}

export const ProfileLayout: React.FC = () => {
    const { data: user, isLoading } = useQuery({ queryKey: ['user-profile'], queryFn: getUserApi });
    return (
        <PageContainer>
            <PageHeader title="My Profile">
                <Link to="/" className={buttonVariants({ variant: "ghost", size: "sm" })}> <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Dashboard</Link>
            </PageHeader>
            <PageContent variant="card" className="mt-4 flex">
                {isLoading ? <NavigationSkeleton /> : (
                    <nav className="w-64 p-4">
                        <div className="flex items-center mb-6">
                            <UserAvatar user={user} />
                            <span className="ml-4">{user?.firstName} {user?.lastName}</span>
                        </div>
                        <ul className="space-y-2">
                            <li><NavLink to="/profile" end className={({ isActive }) => isActive ? "block py-2 bg-gray-200  px-4" : "block py-2 hover:bg-gray-200  px-4"}>Personal Information</NavLink></li>
                            <li><NavLink to="/profile/account-settings" end className={({ isActive }) => isActive ? "block py-2 bg-gray-200  px-4" : "block py-2 hover:bg-gray-200  px-4"}>Account Settings</NavLink></li>
                            <li><NavLink to="/profile/notification" end className={({ isActive }) => isActive ? "block py-2 bg-gray-200  px-4" : "block py-2 hover:bg-gray-200  px-4"}>Notification</NavLink></li>
                            <li><NavLink to="/profile/privacy" end className={({ isActive }) => isActive ? "block py-2 bg-gray-200  px-4" : "block py-2 hover:bg-gray-200  px-4"}>Privacy</NavLink></li>
                        </ul>
                        <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md">Sign Out</button>
                    </nav>
                )}
                <Outlet />
            </PageContent>
        </PageContainer>
    );
};

const NavigationSkeleton: React.FC = () => {
    return (
        <div className="w-64 p-4">
            <div className="flex items-center mb-6">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="ml-4">
                    <Skeleton className="w-24 h-4" />
                </div>
            </div>
            <ul className="space-y-2">
                <li><Skeleton className="w-full h-8" /></li>
                <li><Skeleton className="w-full h-8" /></li>
                <li><Skeleton className="w-full h-8" /></li>
                <li><Skeleton className="w-full h-8" /></li>
            </ul>
            <Skeleton className="mt-6 px-4 py-2 w-full h-10 rounded-md bg-red-500" />
        </div>
    );
};
