import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "@/components/ui/button";

export const SearchInput = ({ placeholder, onChange }: { placeholder: string, onChange: (value: string) => void }) => {
    const [search, setSearch] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSearch = () => {
        onChange(search);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleClear = () => {
        setSearch('');
        onChange('');
    };

    return (
        <div className="flex items-center gap-2">
            <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={search}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="w-full rounded-sm bg-background pl-8 pr-16 h-8 md:w-[200px] lg:w-[336px]"
                />
                {search && <Button onClick={handleClear} className="h-6 w-12  absolute right-1.5 top-1"> Clear</Button>}
            </div>

        </div>
    );
}
