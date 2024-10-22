import { create } from 'zustand';
import { ConfirmDialogProps } from '@/components/custom/dialogs/ConfirmDialog';

interface AppState {
    confirmDialog: ConfirmDialogProps | null;
    openConfirmDialog: (props: ConfirmDialogProps) => void;
    closeConfirmDialog: () => void;
}

export const appStore = create<AppState>()((set) => ({
    confirmDialog: null,
    openConfirmDialog: (props: ConfirmDialogProps) => set({ confirmDialog: props }),
    closeConfirmDialog: () => set({ confirmDialog: null }),
}))