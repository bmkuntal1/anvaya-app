import axiosInstance from '@/lib/axios';
import { Camera, Loader2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { staticFileUrl } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';

const updateUserAvatar = async (data: FormData) => {
    const response = await axiosInstance.put('/user/avatar', data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
}

export const UserAvatar = ({ user }: { user: any }) => {
    const queryClient = useQueryClient();
    const {mutate, isPending } = useMutation({
        mutationFn: updateUserAvatar,
        onSuccess: (data) => {
            queryClient.setQueryData(['user-profile'], data);
            toast.success('Avatar updated successfully');
        },
        onError: (error:any) => {
            toast.error('Failed to update avatar', {
                description: error.response.data.message || error.message,
            });
        }
    });

    const handleUpdateAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            mutate(formData);
        } else {
            toast.error('Please select an image file');
        }
    }

    return (
        // Improved UI for avatar update
        <div className="flex items-center justify-center">
            <div className="relative">
                <Avatar className="w-20 h-20">
                    <AvatarImage src={staticFileUrl(user?.avatar)} className="object-cover" />
                    <AvatarFallback>
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                {/* Overlay Update Avatar Button */}
                <div className="absolute bottom-0 right-[-10px] mb-1 mr-1">
                    <label htmlFor="avatar" className="flex items-center justify-center p-1 border rounded-full bg-white shadow-md hover:bg-gray-200 transition">
                        {isPending ? <Loader2 className="w-5 h-5 text-gray-700" /> : <Camera className="w-5 h-5 text-gray-700" />}
                    </label>
                </div>
                <input
                    id="avatar"
                    type="file"
                    onChange={handleUpdateAvatar}
                    className="hidden"
                    accept="image/*"
                />
            </div>
        </div>
    );
}
