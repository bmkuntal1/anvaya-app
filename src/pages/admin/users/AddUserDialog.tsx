import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/custom/form/FormInput';
import { AddUserFormData, } from '@/types/user';
import { PageDialog } from '@/components/custom/dialogs/PageDialog';
import { useApi } from '@/hooks/use-api';
import { useQueryClient } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { DialogClose } from '@radix-ui/react-dialog';

const userFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  role: z.string().min(1, 'At least one role must be selected'),
});

const roleOptions: { value: string; label: string }[] = [
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
];

export const AddUserDialog = ({ onClose }: { onClose?: (success: boolean) => void }) => {
  const [open, setOpen] = useState(false);

  const { useApiMutation } = useApi();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useApiMutation('/users', {
    onSuccess: () => {
      form.reset();
      toast.success('User has been created.');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      handleOpenChange(false, true);
    },
    onError: (error: any) => {
      toast.error('Failed to create user.', {
        description: error.response?.data?.message || error.message,
      });
    }
  });

  const handleOpenChange = (open: boolean, result?: boolean) => {
    if (!open) {
      onClose && onClose(result ?? false);
    }
    form.reset();
    setOpen(open);
  }

  const form = useForm<AddUserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      role: '',
    },
  });

  const onSubmit = (data: AddUserFormData) => {
    console.log(data);
    mutate(data);
  };

  return (
    <PageDialog open={open} onOpenChange={handleOpenChange} title="Add User" trigger={
      <Button size="sm" className="h-8 gap-1">
        <PlusCircle className="h-3 w-3" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Add User
        </span>
      </Button>
    }>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput control={form.control} name="firstName" label="First Name" type="text" />
          <FormInput control={form.control} name="lastName" label="Last Name" type="text" />
          <FormInput control={form.control} name="email" label="Email" type="email" />
          <FormInput control={form.control} name="password" label="Password" type="password" />
          <FormInput control={form.control} name="phoneNumber" label="Phone Number" type="text" />
          <FormInput control={form.control} name="role" label="Roles" type="select" options={roleOptions} />
          <div className="flex justify-end space-x-2">
            <DialogClose asChild className="w-[100px]">
              <Button type="button" variant="outline" disabled={isPending} >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending} className="w-[100px]">
              {isPending ? 'Creating...' : 'Create User'}
            </Button>
          </div>
        </form>
      </Form>
    </PageDialog>
  );
}
