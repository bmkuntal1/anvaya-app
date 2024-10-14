import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectValue, SelectItem, SelectTrigger } from "@/components/ui/select";

export const FormInput = ({ control, ...rest }: any) => {
    if (!control) throw new Error("Control is required");

    if (rest.type === 'select') {
        if (!rest.options) throw new Error("Options are required");

        return (
            <FormField
                control={control}
                name={rest.name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{rest.label}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl {...field}>
                                <SelectTrigger>
                                    <SelectValue placeholder={rest.placeholder || rest.label} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {rest.options.map((option: any) => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        );
    }

    return (
        <FormField
            control={control}
            name={rest.name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{rest.label}</FormLabel>
                    <FormControl>
                        <Input
                            type={rest.type}
                            placeholder={rest.placeholder || rest.label}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm font-normal" />
                </FormItem>
            )}
        />
    )
}

