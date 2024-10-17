import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { useAuthStore } from "@/stores/authStore";

export const DashboardPage = () => {
    const { user } = useAuthStore();

    if (user?.role === 'admin') {
        return <AdminDashboard />;
    }

    return <div className="flex-1 p-6">No Dashboard Found</div>;
};
