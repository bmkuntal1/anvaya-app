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

    return (
        <div className="flex items-center gap-2">
            <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder={placeholder}
                    value={search}
                    onChange={handleChange}
                    className="w-full rounded-sm bg-background pl-8 py-1 md:w-[200px] lg:w-[336px]"
                />
            </div>
            <Button size="sm" onClick={handleSearch}>Search</Button>
        </div>
    );
}
