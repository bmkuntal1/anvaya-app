import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ListFilter, File, PlusCircle } from "lucide-react";

export const UserListToolbar = ({ filter, onFilterChange }: { filter: Record<string, string>, onFilterChange: (filter: Record<string, string>) => void }) => {
    return (
        <div className="ml-auto flex items-center gap-2">
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked={filter.status === 'active'} onCheckedChange={(checked) => onFilterChange({ ...filter, status: checked ? 'active' : '' })}>
                        Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={filter.status === 'inactive'} onCheckedChange={(checked) => onFilterChange({ ...filter, status: checked ? 'inactive' : '' })}>
                        Inactive
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add User
                </span>
            </Button>
        </div>
    );
}