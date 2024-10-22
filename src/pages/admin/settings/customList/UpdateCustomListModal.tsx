import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/custom/form/FormInput';
import { PageDialog } from '@/components/custom/dialogs/PageDialog';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { DialogClose } from '@radix-ui/react-dialog';
import axios from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

interface CustomListFormProps {
    id: string;
    value: string;
}

const getCustomListApi = async ({ queryKey }: { queryKey: string[] }) => {
    const [_, id] = queryKey;
    const response = await axios.get(`/custom-values/${id}`);
    return response.data;
}

const updateCustomListApi = async (data: CustomListFormProps) => {
    await axios.put(`/custom-values`, data);
}

const schema = z.object({
    value: z.string().min(1, 'Value is required'),
});

export const UpdateCustomListModal = ({ id, onClose }: { id: string, onClose?: (success: boolean) => void }) => {
    const [open, setOpen] = useState(id !== null);
    const queryClient = useQueryClient();

    const { data: customList, isLoading, error } = useQuery({
        queryKey: ["custom-values", id],
        queryFn: getCustomListApi,
    });

    const { isPending, mutate } = useMutation({
        mutationFn: updateCustomListApi,
        onSuccess: () => {
            form.reset();
            toast.success('Custom list has been updated.');
            queryClient.invalidateQueries({ queryKey: ['custom-values'] });
            handleOpenChange(false, true);
        },
        onError: (error: any) => {
            toast.error('Failed to update custom list.', {
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

    const form = useForm<CustomListFormProps>({
        resolver: zodResolver(schema),
        values: {
            id: customList?.id,
            value: customList?.value,
        },
    });

    const onSubmit = (data: CustomListFormProps) => {
        const { id, key, type } = customList;
        const newData = { id, key, type, value: data.value };
        mutate(newData);
    };

    return (
        <PageDialog open={open} onOpenChange={handleOpenChange} title="Update Custom List">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormInput control={form.control} name="value" label="Value" type="text" maxLength={50} />
                    <div className="flex justify-end space-x-2">
                        <DialogClose asChild className="w-[100px]">
                            <Button type="button" variant="outline" disabled={isPending} >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending} className="w-[100px]">
                            {isPending ? 'Updating...' : 'Update'}
                        </Button>
                    </div>
                </form>
            </Form>
        </PageDialog>
    );
}
