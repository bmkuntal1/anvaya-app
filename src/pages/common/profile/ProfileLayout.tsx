import { NavLink, Outlet, Link } from 'react-router-dom';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowLeftIcon, LockIcon, BellIcon, SettingsIcon, UserIcon, PowerIcon, ArrowLeft } from 'lucide-react';
import { PageContainer, PageContent, PageHeader } from '@/components/custom/common/PageContainer';
import axios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from './UserAvatar';
import { useAuthStore } from '@/stores/authStore';
import { SidebarNav } from '@/components/custom/common/SidebarNav';

const getUserApi = async () => {
    const response = await axios.get(`/user/profile`);
    return response.data;
}

const profilelMenu = [
    {
        title: <div className="flex items-center gap-2"><UserIcon className="w-4 h-4" /> Personal Information</div>,
        href: "/profile",
    },
    {
        title: <div className="flex items-center gap-2"><SettingsIcon className="w-4 h-4" /> Account Settings</div>,
        href: "/profile/account-settings",
    }
];

export const ProfileLayout: React.FC = () => {
    const { data: user, isLoading } = useQuery({ queryKey: ['user-profile'], queryFn: getUserApi });
    const logout = useAuthStore(state => state.logout);

    return (
        <PageContainer className="md:max-w-screen-lg">
            <PageHeader title="My Profile">
                <Link to="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                    <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={0.8} />
                    Back to Dashboard
                </Link>
            </PageHeader>
            <PageContent variant="card" className="p-10">
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    {isLoading ? <NavigationSkeleton /> :
                        <aside className="-mx-4 lg:w-1/4">
                            <div className="flex items-center p-4">
                                <UserAvatar user={user} />
                                <span className="ml-4">{user?.firstName} {user?.lastName}</span>
                            </div>
                            <SidebarNav items={profilelMenu} />
                        </aside>}
                    <div className="flex-1 lg:max-w-2xl"><Outlet /></div>
                </div>
            </PageContent>
        </PageContainer>
    )
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
