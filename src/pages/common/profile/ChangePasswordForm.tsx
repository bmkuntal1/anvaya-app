import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/custom/form/FormInput';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { toast } from 'sonner';

interface ChangePasswordFields {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const changePasswordApi = async (data: ChangePasswordFields) => {
    const response = await axios.put('/user/change-password', data);
    return response.data;
}

const passwordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your new password')
}).refine((data) => {
    if (data.newPassword !== data.confirmPassword) {
        return false;
    }
    return true;
}, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
});

export const ChangePasswordForm = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: changePasswordApi,
        onSuccess: () => {
            toast.success('Password changed successfully');
        },
        onError: (error: any) => {
            toast.error('Failed to change password', {
                description: error.response.data.message || error.message,
            });
        },
    });

    const onSubmit = (data: ChangePasswordFields) => {
        delete data.confirmPassword;
        mutate(data);
    }

    const form = useForm<ChangePasswordFields>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    });

    return (
        <div className="max-w-[500px]">
            <h2 className="text-lg text-gray-600 mb-4">Change Password</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormInput control={form.control} name="currentPassword" label="Current Password" type="password" />
                    <FormInput control={form.control} name="newPassword" label="New Password" type="password" />
                    <FormInput control={form.control} name="confirmPassword" label="Confirm New Password" type="password" />
                    <div className="flex justify-end space-x-2">
                        <Button type="submit" disabled={isPending} className="w-[100px]">
                            {isPending ? 'Updating...' : 'Update'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

