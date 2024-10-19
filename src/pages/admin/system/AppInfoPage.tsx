import { PageContainer, PageContent, PageHeader } from "@/components/custom/common/PageContainer";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { DataList as Dl } from "@/components/custom/common/DataList";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getAppInfo = async () => {
    const response = await axiosInstance.get("/info");
    return response.data;
}

const AppInfoPage = () => {
    const { data:api, isLoading } = useQuery({
        queryKey: ["appInfo"],
        queryFn: getAppInfo
    })
    return (
        <PageContainer className="md:max-w-screen-lg">
            <PageHeader title="App Info">
                <Link to="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                    <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={0.8} />
                    Back to Dashboard
                </Link>
            </PageHeader>
            <PageContent variant="card" className="p-10">
                <h2 className="text-xl font-semibold text-gray-800">Application Information</h2>
                <Dl className="md:grid-cols-[160px_auto] mt-6">
                    <Dl.Label>App Name</Dl.Label>
                    <Dl.Value>{import.meta.env.VITE_APP_NAME}</Dl.Value>
                    <Dl.Label>App Version</Dl.Label>
                    <Dl.Value>{import.meta.env.VITE_APP_VERSION}</Dl.Value>
                    <Dl.Label>App Environment</Dl.Label>
                    <Dl.Value>{import.meta.env.MODE}</Dl.Value>
                    <Dl.Label>API Version</Dl.Label>
                    <Dl.Value>{api?.version}</Dl.Value>
                    <Dl.Label>API Environment</Dl.Label>
                    <Dl.Value>{api?.environment}</Dl.Value>
                </Dl>
            </PageContent>
        </PageContainer>
    )
}

export default AppInfoPage;