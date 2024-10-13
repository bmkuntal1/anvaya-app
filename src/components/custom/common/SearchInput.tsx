import { Search } from "lucide-react";
import { Input } from "../../ui/input";

export const SearchInput = ({ placeholder, value, onChange }: { placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full rounded-sm bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
        </div>
    );
}