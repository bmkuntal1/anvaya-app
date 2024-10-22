import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ListFilter, CircleX } from "lucide-react";

export interface UserListFilterItem {
    status: string;
    role: string;
}

interface UserListFilterProps {
    filter: UserListFilterItem;
    onFilterChange: (filter: UserListFilterItem) => void;
}

export const UserListFilter = ({ filter, onFilterChange }: UserListFilterProps) => {
    return (
        <div className="ml-auto flex items-center gap-2">
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button variant="default" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onFilterChange({ status: '', role: '' })}>
                        <CircleX className="mr-2 h-4 w-4" />
                        <span>Clear Filter</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-gray-500 font-semibold py-0">Status</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem checked={filter.status === 'active'} onCheckedChange={(checked) => onFilterChange({ ...filter, status: checked ? 'active' : '' })}>
                        Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={filter.status === 'inactive'} onCheckedChange={(checked) => onFilterChange({ ...filter, status: checked ? 'inactive' : '' })}>
                        Inactive
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-gray-500 font-semibold py-0">Role</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem checked={filter.role === 'admin'} onCheckedChange={(checked) => onFilterChange({ ...filter, role: checked ? 'admin' : '' })}>
                        Admin
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={filter.role === 'recruiter'} onCheckedChange={(checked) => onFilterChange({ ...filter, role: checked ? 'recruiter' : '' })}>
                        Recruiter
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={filter.role === 'job_seeker'} onCheckedChange={(checked) => onFilterChange({ ...filter, role: checked ? 'job_seeker' : '' })}>
                        Job Seeker
                    </DropdownMenuCheckboxItem>

                </DropdownMenuContent>
            </DropdownMenu>
            {/* <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                </span>
            </Button> */}
        </div>
    );
}