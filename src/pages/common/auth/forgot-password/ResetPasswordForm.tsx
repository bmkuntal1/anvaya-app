import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/custom/form/FormInput";


interface FormDataProps {
    password: string;
    confirmPassword: string;
}

const resetPasswordApi = async (body: any) => {
    const response = await axios.post('/auth/forgot-password/reset', body);
    return response.data;
}

const schema = z.object({
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
});

export const ResetPasswordForm = ({ data, onClose }: { data: any, onClose: (state: any) => void }) => {
    const navigate = useNavigate();
    const { isPending, mutate } = useMutation({
        mutationFn: resetPasswordApi,
        onSuccess: () => {
            toast({ title: "Password reset", description: "Your password has been reset successfully" });
            onClose({ page: 0, data: null });
            navigate('/login');
        },
    });

    const form = useForm<FormDataProps>({
        resolver: zodResolver(schema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (formData: FormDataProps) => {
        const body = {
            email: data.email,
            token: data.token,
            password: formData.password,
        }
        mutate(body);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormInput control={form.control} name="password" type="password" label="Password" />
                <FormInput control={form.control} name="confirmPassword" type="password" label="Confirm Password" />
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Resetting..." : "Reset"}
                </Button>
            </form>
        </Form>
    )
}