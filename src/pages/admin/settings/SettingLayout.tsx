import { PageContainer, PageHeader, PageContent } from "@/components/custom/common/PageContainer";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { SidebarNav } from "@/components/custom/common/SidebarNav";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
    {
        title: "General",
        href: "/settings/general",
    },
    {
        title: "Custom Lists",
        href: "/settings/custom-lists",
    },
];

export const SettingLayout = () => {
    return (
        <PageContainer>
            <PageHeader title="App Settings">
                <Link to="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                    <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={0.8} />
                    Back to Dashboard
                </Link>
            </PageHeader>
            <PageContent variant="card" className="h-[calc(100vh-10rem)] p-10">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">
                        Manage application settings.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl"><Outlet /></div>
                </div>
            </PageContent>
        </PageContainer>
    )
}
