import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ListFilter, File, X, LucideCross, LucideUserRoundX, CircleX } from "lucide-react";
import { AddUserDialog } from "./AddUserDialog";

export interface UserListFilter {
    status: string;
    role: string;
}

interface UserListToolbarProps {
    filter: UserListFilter;
    onFilterChange: (filter: UserListFilter) => void;
}

export const UserListToolbar = ({ filter, onFilterChange }: UserListToolbarProps) => {
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
                    <DropdownMenuLabel className="flex justify-between items-center h-6"><span>Filter by</span> <Button variant="link" size="sm" onClick={() => onFilterChange({ status: '', role: '' })} ><span className="flex items-center justify-between gap-2 text-gray-500 font-normal">X Clear</span></Button></DropdownMenuLabel>
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
                    <DropdownMenuCheckboxItem checked={filter.role === 'job-seeker'} onCheckedChange={(checked) => onFilterChange({ ...filter, role: checked ? 'job-seeker' : '' })}>
                        Job Seeker
                    </DropdownMenuCheckboxItem>

                </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                </span>
            </Button>
            <AddUserDialog />
        </div>
    );
}