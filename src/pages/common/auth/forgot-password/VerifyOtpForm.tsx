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
    otp: string;
}

const verifyOtpApi = async (body: any) => {
    const response = await axios.post('/auth/forgot-password/otp', body);
    return response.data;
}

const forgotPasswordApi = async (body: any) => {
    const response = await axios.post('/auth/forgot-password', body);
    return response.data;
}

const schema = z.object({
    otp: z.string().min(1, "OTP is required").max(6, "OTP must be 6 digits"),
});

export const VerifyOtpForm = ({ data, onClose }: { data: any, onClose: (state: any) => void }) => {

    const { isPending, mutate } = useMutation({
        mutationFn: verifyOtpApi,
        onSuccess: (resp) => {
            toast({ title: "OTP verified", description: "Check your email for the OTP" });
            onClose({ page: 2, data: { email: data.email, token: resp.token } });
        },
        onError: (error: any) => {
            toast({ title: "Failed to verify OTP", description: error.response.data.message || error.message, variant: "destructive" });
        },
    });


    const { isPending: isResendPending, mutate: resendMutate } = useMutation({
        mutationFn: forgotPasswordApi,
        onSuccess: () => {
            toast({ title: "OTP resent", description: "Check your email for the OTP" });
        },
    });


    const form = useForm<FormDataProps>({
        resolver: zodResolver(schema),
        defaultValues: {
            otp: "",
        },
    });

    const onSubmit = (formData: FormDataProps) => {
        const body = {
            email: data.email,
            otp: formData.otp,
        }
        mutate(body);
    };

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <div className="flex justify-center items-center">
                    <FormInput control={form.control} name="otp" label="OTP" type="otp" placeholder="123456" maxLength={6} />
                </div>
                <div className="flex justify-center items-center">
                    <span className="text-sm text-gray-500">Didn't receive OTP?</span>
                    <Button type="button" variant="link"
                        className="text-sm hover:underline"
                        onClick={() => {
                            const body = { email: data.email };
                            resendMutate(body);
                        }}
                        disabled={isResendPending}
                    >
                        Resend OTP
                    </Button>
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </Form>
    );
};