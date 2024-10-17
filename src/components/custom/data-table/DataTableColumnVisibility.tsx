import { Button } from "@/components/ui/button";
import { RotateCcw, Settings2 } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ColumnVisibilityProps {
    columns: any;
    visibility: any;
    onChangeVisibility: any;
}

export const DataTableColumnVisibility = ({ columns, visibility, onChangeVisibility }: ColumnVisibilityProps) => {

    if (Object.keys(visibility).length === 0) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto hidden h-8 lg:flex"
                >
                    <Settings2 className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuItem onClick={() => onChangeVisibility({})}>
                    <RotateCcw className="h-4 w-4 mr-2 text-muted-foreground" /> Reset
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {columns
                    .filter(
                        (column: any) =>
                            Object.keys(visibility).includes(column.accessorKey)
                    )
                    .map((column: any) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.accessorKey}
                                className="capitalize"
                                checked={visibility[column.accessorKey]}
                                onCheckedChange={(value) => {
                                    const newVisibility = { ...visibility, [column.accessorKey]: !!value };
                                    onChangeVisibility(newVisibility);
                                }}
                            >
                                {column.meta.header || column.accessorKey}
                            </DropdownMenuCheckboxItem>
                        );
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}