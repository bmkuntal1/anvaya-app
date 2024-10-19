import { PageHeader } from "@/components/custom/common/PageContainer";
import { PageContent } from "@/components/custom/common/PageContainer";
import { PageContainer } from "@/components/custom/common/PageContainer";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { getLogContent } from "@/services";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const LogContentPage = () => {
    const { fileName } = useParams<{ fileName: string }>();
    const { data, isLoading, error } = useQuery({ queryKey: ['log-content', fileName as string], 
        queryFn: getLogContent, enabled: !!fileName });

    return (
        <PageContainer>
            <PageHeader title={`Log Content - ${fileName}`}>
                <Link to="/logs" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                    <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={0.8} />
                    Back to Logs
                </Link>
            </PageHeader>
            <PageContent variant={isLoading ? "card" : "default"} className="h-[calc(100vh-10rem)]">
                {isLoading ? <LoadingSkelton /> :
                    <Textarea
                        value={data?.content || "No log contents available"}
                        className="h-full resize-none p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                }
            </PageContent>
        </PageContainer>
    )
}

const LoadingSkelton = () => {
    return <div className="h-[calc(100vh-10rem)] space-y-2 p-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <div className="my-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />


    </div>
}
