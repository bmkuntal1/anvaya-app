import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/custom/form/FormInput";
import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";


interface FormDataProps {
    email: string;
}

const forgotPasswordApi = async (body:any) => {
    const response = await axios.post('/auth/forgot-password', body);
    return response.data;
}

const schema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export const ForgotPasswordForm = ({ onClose }: { onClose: (state: any) => void }) => {
    const [email, setEmail] = useState("");

    const { isPending, mutate } = useMutation({
        mutationFn: forgotPasswordApi,
        onSuccess: () => {
            toast({ title: "OTP sent", description: "Check your email for the OTP" });
            onClose({ page: 1, data: { email } });
        },
        onError: (error: any) => {
            toast({ title: "Request failed", description: error.response.data.message || error.message, variant: "destructive" });
        },
    });

    const form = useForm<FormDataProps>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (formData: FormDataProps) => {
        setEmail(formData.email);
        mutate(formData);
    };

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormInput control={form.control} name="email" label="Email" type="email" placeholder="m@example.com" />
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </Form>
    );
};
