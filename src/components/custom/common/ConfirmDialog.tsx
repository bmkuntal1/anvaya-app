import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { AlertCircle, Trash } from "lucide-react";

export type ConfirmDialogProps = {
    open: boolean;
    onClose: (result: boolean) => void;
    message: string|React.ReactNode;
    title?: string;
    type?: 'confirm' | 'alert' | 'delete';
    confirmText?: string;
    cancelText?: string;
    trigger?: React.ReactNode;
};

export const ConfirmDialog = ({ open, onClose, message, type = 'confirm', title='Confirmation', confirmText = 'OK', cancelText = 'Cancel', }: ConfirmDialogProps) => {
    let messageElement = message;  
    if (type === 'alert') {
        messageElement = <span className="flex items-center"><AlertCircle className="w-4 h-4 mr-2" color="orange" /> {message}</span>;
        confirmText = 'Close';
    }

    if (type === 'delete') {
        messageElement = <span className="flex items-center"><Trash className="w-4 h-4 mr-2" color="red" /> {message}</span>;
        confirmText = 'Delete';
    }

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            onClose(false);
        }
    }
    
    return (
        <AlertDialog defaultOpen={open} onOpenChange={handleOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {messageElement}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onClose(true)}>{confirmText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};




