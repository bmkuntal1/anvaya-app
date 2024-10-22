
import React from 'react';
import { DataList as Dl } from "@/components/custom/common/DataList";
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { DateDisplay } from '@/components/custom/common/DateDisplay';
import { UpdateProfileForm } from './UpdateProfileForm';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';

const getUserApi = async () => {
    const response = await axios.get(`/user/profile`);
    return response.data;
}

export const UserProfilePage: React.FC = () => {
    const { data: user, isLoading } = useQuery({ queryKey: ['user-profile'], queryFn: getUserApi })
    const [isUpdateProfileOpen, setIsUpdateProfileOpen] = React.useState(false);
    return (
        <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-6">Personal Information</h1>
            {isUpdateProfileOpen ? <UpdateProfileForm onClose={() => setIsUpdateProfileOpen(false)} /> :
                <>
                    <Button onClick={() => setIsUpdateProfileOpen(true)} variant="ghost" size="sm" className="mb-2 font-light text-muted-foreground"><PencilIcon className="w-4 h-4 mr-2" /> Edit</Button>
                    <Dl variant="vertical" className="ms-2 md:grid-cols-[1fr_2fr]">
                        <Dl.Label>First Name</Dl.Label>
                        <Dl.Value>{user?.firstName}</Dl.Value>
                        <Dl.Label>Last Name</Dl.Label>
                        <Dl.Value>{user?.lastName}</Dl.Value>
                        <Dl.Label>Email</Dl.Label>
                        <Dl.Value>{user?.email}</Dl.Value>
                        <Dl.Label>Phone Number</Dl.Label>
                        <Dl.Value>{user?.phoneNumber}</Dl.Value>
                        <Dl.Label>Role</Dl.Label>
                        <Dl.Value className="capitalize">{user?.role}</Dl.Value>
                        <Dl.Label>Last Login</Dl.Label>
                        <Dl.Value><DateDisplay date={user?.lastLoggedinAt} />   </Dl.Value>
                    </Dl>
                </>
            }
        </div>
    );
};

export default UserProfilePage;
