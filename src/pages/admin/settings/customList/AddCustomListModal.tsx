import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/custom/form/FormInput';
import { PageDialog } from '@/components/custom/dialogs/PageDialog';
import { useQueryClient } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import { DialogClose } from '@radix-ui/react-dialog';
import axios from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

interface CustomListFormProps {
    key: string;
    value: string;
}

const addCustomListApi = async (data: CustomListFormProps) => {
    await axios.post('/custom-values', data);
}

const schema = z.object({
    key: z.string().min(1, 'Key is required'),
    value: z.string().min(1, 'Value is required'),
});

export const AddCustomListModal = ({ type, onClose }: { type: string, onClose?: (success: boolean) => void }) => {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const { isPending, mutate } = useMutation({
        mutationFn: addCustomListApi,
        onSuccess: () => {
            form.reset();
            toast.success('Custom list has been created.');
            queryClient.invalidateQueries({ queryKey: ['custom-values'] });
            handleOpenChange(false, true);
        },
        onError: (error: any) => {
            toast.error('Failed to create custom list.', {
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
        defaultValues: {
            key: '',
            value: '',
        },
    });

    const onSubmit = (data: CustomListFormProps) => {
        const newData = { ...data, type, order: 0 };
        mutate(newData);
    };

    return (
        <PageDialog open={open} onOpenChange={handleOpenChange} title="Add Custom List" trigger={
            <Button className="gap-1">
                <PlusCircle className="h-3 w-3" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add
                </span>
            </Button>
        }>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormInput control={form.control} name="key" label="Key" type="text" maxLength={30} />
                    <FormInput control={form.control} name="value" label="Value" type="text" maxLength={50} />
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
