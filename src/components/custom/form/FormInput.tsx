import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectValue, SelectItem, SelectTrigger } from "@/components/ui/select";
import { PasswordInput } from "./PasswordInput";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const REGEXP_ONLY_DIGITS_AND_CHARS = "^[0-9]*$";

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
                    <CustomTextInputs field={field} {...rest} />
                    <FormMessage className="text-red-500 text-sm font-normal" />
                </FormItem>
            )}
        />
    )
}

const CustomTextInputs = ({ field, ...rest }: any) => {
    if (rest.type === 'password') {
        return <PasswordInput {...field} placeholder={rest.placeholder || rest.label} />
    }
    if (rest.type === 'otp') {
        return <InputOTP pattern={REGEXP_ONLY_DIGITS_AND_CHARS} {...field} maxLength={rest.maxLength}>
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPGroup>
                <InputOTPSlot index={2} />

                <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
            </InputOTPGroup>
        </InputOTP>
    }
    return <Input type={rest.type} placeholder={rest.placeholder || rest.label} {...field} />
}
