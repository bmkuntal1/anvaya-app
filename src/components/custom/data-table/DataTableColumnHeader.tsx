import {
    ChevronsUp,
    ChevronsDown,
    ChevronsUpDown,
    EyeOff,
} from "lucide-react"
import { type Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>,
    title: string
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
    if (!column.getCanSort() && !column.getCanHide()) {
        return <div className={cn(className)}>{title}</div>
    }

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        aria-label={
                            column.getIsSorted() === "desc"
                                ? "Sorted descending. Click to sort ascending."
                                : column.getIsSorted() === "asc"
                                    ? "Sorted ascending. Click to sort descending."
                                    : "Not sorted. Click to sort ascending."
                        }
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                        <span>{title}</span>
                        {column.getCanSort() && column.getIsSorted() === "desc" ? (
                            <ChevronsDown className="ml-2 size-4" aria-hidden="true" />
                        ) : column.getIsSorted() === "asc" ? (
                            <ChevronsUp className="ml-2 size-4" aria-hidden="true" />
                        ) : (
                            <ChevronsUpDown className="ml-2 size-4" aria-hidden="true" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {column.getCanSort() && (
                        <>
                            <DropdownMenuItem
                                aria-label="Sort ascending"
                                onClick={() => column.toggleSorting(false)}
                            >
                                <ChevronsUp
                                    className="mr-2 size-3.5 text-muted-foreground/70"
                                    aria-hidden="true"
                                />
                                Asc
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                aria-label="Sort descending"
                                onClick={() => column.toggleSorting(true)}
                            >
                                <ChevronsDown
                                    className="mr-2 size-3.5 text-muted-foreground/70"
                                    aria-hidden="true"
                                />
                                Desc
                            </DropdownMenuItem>
                            {/* None */}
                            <DropdownMenuItem
                                aria-label="Not sorted"
                                onClick={() => column.clearSorting()}
                            >
                                <ChevronsUpDown className="mr-2 size-3.5 text-muted-foreground/70" aria-hidden="true" />
                                Clear
                            </DropdownMenuItem>
                        </>
                    )}
                    {column.getCanSort() && column.getCanHide() && (
                        <DropdownMenuSeparator />
                    )}
                    {column.getCanHide() && (
                        <DropdownMenuItem
                            aria-label="Hide column"
                            onClick={() => column.toggleVisibility(false)}
                        >
                            <EyeOff
                                className="mr-2 size-3.5 text-muted-foreground/70"
                                aria-hidden="true"
                            />
                            Hide
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}