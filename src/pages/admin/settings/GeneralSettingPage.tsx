import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";

interface FormInputProps {
    appName: string;
    appLogo: string;
    appTheme: string;
}

export const GeneralSettingPage = () => {
    const form = useForm<FormInputProps>();

    const onSubmit = (data: FormInputProps) => {
        console.log(data);
    }

    return (
        <>
            <div>
                <h3 className="text-lg font-medium">General Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Configure general settings for the application.
                </p>
            </div>
            <Separator className="my-6" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="appName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Application Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="appLogo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Application Logo</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="appTheme"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Application Theme</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </>
    )
}