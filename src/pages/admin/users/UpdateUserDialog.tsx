import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/custom/form/FormInput';
import { PageDialog } from '@/components/custom/dialogs/PageDialog';
import { useApi } from '@/hooks/use-api';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { DialogClose } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface UpdateUserDialogProps {
  userId: string | null;
  onClose?: (success: boolean) => void;
}

interface FormDataProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
}

const userFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  role: z.string().min(1, 'At least one role must be selected'),
});

const roleOptions: { value: string; label: string }[] = [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
];

export const UpdateUserDialog = ({ userId, onClose }: UpdateUserDialogProps) => {
  const { useApiMutation, useApiQuery } = useApi();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useApiQuery<any>(`/users/${userId}`, {queryKey: ['users', userId], enabled: !!userId });

  const { isPending, mutate } = useApiMutation(`/users`, {
    method: 'put',
    onSuccess: () => {
      toast.success('User has been updated.');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      handleOpenChange(false, true);
    },
    onError: (error: any) => {
      toast.error('Failed to update user.', {
        description: error.response?.data?.message || error.message,
      });
    }
  });

  const handleOpenChange = (open: boolean, result?: boolean) => {
    if (!open) {
      onClose && onClose(result ?? false);
    }
    form.reset();
  }

  const form = useForm<FormDataProps>({
    resolver: zodResolver(userFormSchema),
    values: {
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      phoneNumber: data?.phoneNumber || '',
      role: data?.role || '',
    },
  });

  const onSubmit = (data: FormDataProps) => {
    mutate({ ...data, id: userId });
  };

  return (
    <PageDialog open={userId !== null} onOpenChange={handleOpenChange} title="Update User">
      {isLoading ? 
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
      :
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput control={form.control} name="firstName" label="First Name" type="text" />
            <FormInput control={form.control} name="lastName" label="Last Name" type="text" />
            <FormInput control={form.control} name="phoneNumber" label="Phone Number" type="text" />
            <FormInput control={form.control} name="role" label="Roles" type="select" options={roleOptions} />
            <div className="flex justify-end space-x-2">
              <DialogClose asChild disabled={isPending} className="w-[100px]">
                Cancel
              </DialogClose>
              <Button type="submit" disabled={isPending} className="w-[100px]">
                {isPending ? 'Updating...' : 'Update User'}
              </Button>
            </div>
          </form>
        </Form>}
    </PageDialog>
  );
}
