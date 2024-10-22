import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/custom/form/FormInput';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface UpdateProfileFields {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

const getUserApi = async () => {
    const response = await axios.get('/user/profile');
    return response.data;
}

const updateProfileApi = async (data: UpdateProfileFields) => {
    const response = await axios.put('/user/profile', data);
    return response.data;
}

const userFormSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phoneNumber: z.string().min(1),
});

export const UpdateProfileForm = ({ onClose }: { onClose: () => void }) => {
    const queryClient = useQueryClient();
    const { data: user, isLoading } = useQuery({ queryKey: ['user-profile-update'], queryFn: getUserApi })

    const { mutate, isPending } = useMutation({
        mutationFn: updateProfileApi,
        onSuccess: () => {
            toast.success('Profile updated successfully');
            queryClient.invalidateQueries({ queryKey: ['user-profile'] });
            onClose();
        },
        onError: (error:any) => {
            toast.error('Failed to update profile', {
                description: error.response.data.message || error.message,
            });
        },
    });

    const onSubmit = (data: UpdateProfileFields) => {
        mutate(data);
    }

    const form = useForm<UpdateProfileFields>({
        resolver: zodResolver(userFormSchema),
        values: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            phoneNumber: user?.phoneNumber,
        },
    });

    return (
        <div className="max-w-[500px]">
            {isLoading ? <SkeletonLoader /> : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormInput control={form.control} name="firstName" label="First Name" type="text" />
                        <FormInput control={form.control} name="lastName" label="Last Name" type="text" />
                        <FormInput control={form.control} name="phoneNumber" label="Phone Number" type="text" />
                        <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" disabled={isPending} className="w-[100px]" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending} className="w-[100px]">
                                {isPending ? 'Updating...' : 'Update'}
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}

const SkeletonLoader = () => {
    return (
        <div className="max-w-[500px] p-4 space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <div className="flex justify-end space-x-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
            </div>
        </div>
    );
};
