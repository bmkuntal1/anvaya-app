import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const FormInput = ({ control, ...rest }: any) => {
    if (!control) throw new Error("Control is required");

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

