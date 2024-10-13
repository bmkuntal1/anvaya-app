import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle, Trash } from "lucide-react"
export const ConfirmDialog = ({ title, message, onConfirm, type = 'confirm', confirmButtonText = 'OK', cancelButtonText = 'Cancel', }: { title: string, message: string | React.ReactNode, onConfirm: () => void, type?: 'confirm' | 'alert' | 'delete', confirmButtonText?: string, cancelButtonText?: string }) => {
    if (type === 'alert') {
        message = <span className="flex items-center"><AlertCircle className="w-4 h-4 mr-2" color="orange" /> {message}</span>;
        confirmButtonText = 'Close';
    }

    if (type === 'delete') {
        message = <span className="flex items-center"><Trash className="w-4 h-4 mr-2" color="red" /> {message}</span>;
        confirmButtonText = 'Delete';
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {message}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelButtonText}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>{confirmButtonText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
