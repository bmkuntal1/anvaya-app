import { create } from 'zustand';

interface AppState {
    confirmDialog: {
        open: boolean;
        result: boolean | null;
    }
}

export const appStore = create<AppState>()((set) => ({
    confirmDialog: {
        open: false,
        result: null,
    },
    openConfirmDialog: () => set({ confirmDialog: { open: true, result: null } }),
    closeConfirmDialog: (result: boolean) => set({ confirmDialog: { open: false, result } }),
}))