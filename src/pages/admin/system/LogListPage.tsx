import { PageContainer, PageHeader, PageContent } from "@/components/custom/common/PageContainer";
import { getLogList } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/custom/data-table/DataTable";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

export const LogListPage = () => {
    const [showHealthData, setShowHealthData] = useState(false);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 20,
    });

    const { data, isLoading } = useQuery({
        queryKey: ["api-logs", { page: pagination.pageIndex + 1, pageSize: pagination.pageSize, showHealth: showHealthData }],
        queryFn: getLogList
    });

    //Date	File Name	Size	Action
    const columns = [
        {
            name: "Date",
            header: "Date",
            accessorKey: "date",
            cell: ({ row }: any) => <span>{new Date(row.original.date).toLocaleDateString()}</span>
        },
        {
            name: "File Name",
            header: "File Name",
            accessorKey: "name",
            cell: ({ row }: any) => <Link to={`/logs/${row.original.name?.slice(0, -4)}`}>{row.original.name}</Link>
        },
        {
            name: "Size",
            header: "Size",
            accessorKey: "size",
            cell: ({ row }: any) => <span>{row.original.size} KB</span>
        },
        {
            name: "Health",
            header: "Health",
            accessorKey: "health",
            cell: ({ row }: any) => <HealthBadge health={row.original.health} />
        },
        {
            name: "Action",
            header: "Action",
            accessorKey: "action",
            cell: ({ row }: any) => <Link to={`/logs/${row.original.name?.slice(0,-4)}`}><FileText className="w-4 h-4 mr-2" strokeWidth={0.8} />  </Link>
        },
    ];

    return (
        <PageContainer>
            <PageHeader title="Logs">
                <div className="flex items-center justify-between">
                    <Link to="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                        <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={0.8} />
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center justify-center gap-2">
                        <Checkbox id="showHealth" checked={showHealthData} onCheckedChange={() => setShowHealthData(!showHealthData)} />
                        <label htmlFor="showHealth" className="cursor-pointer">Show Health</label>
                    </div>
                </div>
            </PageHeader>
            <PageContent variant="card">
                {isLoading ? <LoadingSkeleton /> :
                    <DataTable columns={columns} data={data?.data || []} pagination={pagination} columnVisibility={{ health: showHealthData }}
                        onPaginationChange={setPagination} pageCount={data?.totalPages} />
                }
            </PageContent>
        </PageContainer>
    );
}

const HealthBadge = ({ health }: { health: { errors: number, warnings: number, status: string } }) => {
    return (
        <div className="flex gap-2">
            {health.errors > 0 ? (<Badge className="bg-red-500">Errors: {health.errors}</Badge>) : null}
            {health.warnings > 0 ? (<Badge className="bg-yellow-500">Warning: {health.warnings}</Badge>) : null}
            {health.status == "good" ? <Badge className="bg-green-500">Good</Badge> : null}
        </div>
    );
}

const LoadingSkeleton = () => {
    return (
        <div className="flex flex-col space-y-2">
            {/* Table Header Skeleton */}
            <div className="grid grid-cols-5 gap-3 p-4">
                <Skeleton className="h-6 w-full" /> {/* Date Header */}
                <Skeleton className="h-6 w-full" /> {/* File Name Header */}
                <Skeleton className="h-6 w-full" /> {/* Size Header */}
                <Skeleton className="h-6 w-full" /> {/* Health Header */}
                <Skeleton className="h-6 w-full" /> {/* Action Header */}
            </div>

            {/* Table Row Skeletons */}
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="grid grid-cols-5 gap-3 p-4 border-b">
                    <Skeleton className="h-4 w-full" /> {/* Date */}
                    <Skeleton className="h-4 w-full" /> {/* File Name */}
                    <Skeleton className="h-4 w-full" /> {/* Size */}
                    <Skeleton className="h-4 w-full" /> {/* Health */}
                    <Skeleton className="h-4 w-full" /> {/* Action */}
                </div>
            ))}
        </div>
    )
}

