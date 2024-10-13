import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { useAuthStore } from "@/stores/authStore";

export const DashboardPage = () => {
    const { user } = useAuthStore();

    if (user?.role === 'admin') {
        return <AdminDashboard />;
    }

    return (
        <div>
            {/* Definition List Shadcn UI */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <h2 className="text-lg font-medium">User Information</h2>
                    <p>{user?.email} {JSON.stringify(user)}</p>
                </div>
            </div>
           
        </div>
    );
};
