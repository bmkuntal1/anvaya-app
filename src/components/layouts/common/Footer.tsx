import { ConfirmDialog } from "@/components/custom/common/ConfirmDialog";
import { Toaster } from "@/components/ui/sonner";
import { appStore } from "@/stores/appStore";

export const Footer = () => {
    const { confirmDialog } = appStore();
    return (
        <>
        {confirmDialog && <ConfirmDialog {...confirmDialog} />}
        <Toaster />
        </>
    );
}

