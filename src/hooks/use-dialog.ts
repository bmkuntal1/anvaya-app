import { appStore } from "@/stores/appStore";

interface UseConfirmDialogProps {
    type: 'confirm' | 'alert' | 'delete';
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

export const useConfirmDialog = () => {
    const { openConfirmDialog, closeConfirmDialog } = appStore();
    const confirmDialog = (props: UseConfirmDialogProps): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            openConfirmDialog({
                ...props,
                open: true,
                type: props.type,
                message: props.message,
                onClose: (result: boolean) => {
                    closeConfirmDialog();
                    resolve(result);
                }
            });
        });
    }

    return {
        confirmDialog
    }
}