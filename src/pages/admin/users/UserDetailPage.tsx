import { useApi } from "@/hooks/use-api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon, PencilIcon, SettingsIcon } from "lucide-react";
import { DataList as Dl } from "@/components/custom/common/DataList";
import { PageContainer, PageContent, PageHeader } from '@/components/custom/common/PageContainer';
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { staticFileUrl } from "@/lib/utils";
import { UserStatus } from "@/components/custom/user/UserStatus";
import { DateDisplay } from "@/components/custom/common/DateDisplay";
import { useState } from "react";
import { UpdateUserDialog } from "./UpdateUserDialog";
import { UserSetting } from "./settings/UserSetting";

export const UserDetailPage = () => {
    const { userId } = useParams();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const { useApiQuery } = useApi();
    const { data, isLoading, error } = useApiQuery<any>(`/users/${userId}`, { queryKey: ['users', userId], enabled: !!userId });

    if (isSettingOpen) {
        return <PageWrapper>
            <UserSetting data={data} onClose={() => setIsSettingOpen(false)} />
        </PageWrapper>
    }

    if (isLoading) {
        return <PageWrapper>
            <LoadingSkeleton />
        </PageWrapper>
    }

    return (
        <PageWrapper>
            <div className="flex flex-row justify-between md:items-start">
                <div className="flex items-center gap-2 p-6 pl-3 pb-3">
                    <div className="bg-gray-100 rounded-full p-[3px] shadow-xl">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={staticFileUrl(data?.avatar)} className="object-cover" />
                            <AvatarFallback className="bg-gray-500 align-center text-white font-light text-4xl pb-2">
                                {data?.firstName?.charAt(0)}
                                {data?.lastName?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{data?.firstName} {data?.lastName}</h1>
                        <p className="text-sm text-gray-500">{data?.email}</p>
                    </div>
                </div>
                {/* edit and setting button at the right */}
                <div className="flex items-center gap-2 p-6 pr-3 pb-3 justify-end">
                    <Button variant="ghost" size="sm" className="text-sm hover:drop-shadow-md" onClick={() => setIsEditModalOpen(true)}> <PencilIcon className="w-4 h-4 mr-0 md:mr-1" /><span className="hidden md:block">Edit</span></Button>
                    <Button variant="ghost" size="sm" className="text-sm hover:drop-shadow-md" onClick={() => setIsSettingOpen(true)}> <SettingsIcon className="w-4 h-4 mr-0 md:mr-1" /><span className="hidden md:block">Setting</span></Button>
                </div>
            </div>
            <Dl className="md:grid-cols-[120px_auto_120px_auto] p-6 pt-0">
                <Dl.Label>First Name</Dl.Label>
                <Dl.Value>{data?.firstName}</Dl.Value>
                <Dl.Label>Last Name</Dl.Label>
                <Dl.Value>{data?.lastName}</Dl.Value>
                <Dl.Label>Email</Dl.Label>
                <Dl.Value>{data?.email}</Dl.Value>
                <Dl.Label>Phone Number</Dl.Label>
                <Dl.Value>{data?.phoneNumber}</Dl.Value>
                <Dl.Label>Roles</Dl.Label>
                <Dl.Value className="capitalize">{data?.role}</Dl.Value>
                <Dl.Label>Status</Dl.Label>
                <Dl.Value className="capitalize"><UserStatus status={data?.isActive === true ? 'active' : 'inactive'} /></Dl.Value>
                <Dl.Label>Last Login At</Dl.Label>
                <Dl.Value><DateDisplay date={data?.lastLoggedinAt} fallback="Never" /></Dl.Value>
                <Dl.Label>Created At</Dl.Label>
                <Dl.Value><DateDisplay date={data?.createdAt} /></Dl.Value>
                <Dl.Label>Updated At</Dl.Label>
                <Dl.Value><DateDisplay date={data?.updatedAt} fallback="Never" /></Dl.Value>
            </Dl>
            {isEditModalOpen && <UpdateUserDialog userId={data?.id} onClose={() => setIsEditModalOpen(false)} />}
        </PageWrapper>
    )
}

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <PageContainer className="md:max-w-screen-lg">
            <PageHeader title="User Details">
                <Link to={`/users`} className={buttonVariants({ variant: "ghost", size: "sm" })}> <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Users</Link>
            </PageHeader>
            <PageContent variant="card">
                {children}
            </PageContent>
        </PageContainer>
    )
}

const LoadingSkeleton = () => {
    return (
        <div className="p-6">
            <div className="flex items-center space-x-4 p-5">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
            <div className="p-6 grid grid-cols-[120px_200px] gap-4">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}
