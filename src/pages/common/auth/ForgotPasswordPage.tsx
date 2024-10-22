import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ForgotPasswordForm } from "./forgot-password/ForgotPasswordForm";
import { VerifyOtpForm } from "./forgot-password/VerifyOtpForm";
import { ResetPasswordForm } from "./forgot-password/ResetPasswordForm";

const pageContents = [
    {
        title: 'Forgot Password',
        description: 'Enter your email below to reset your password'
    },
    {
        title: 'Verify OTP',
        description: 'Enter the OTP sent to your email below to reset your password'
    },
    {
        title: 'Reset Password',
        description: 'Enter your new password below to reset your password'
    }
]

export const ForgotPasswordPage = () => {
    const [pageState, setPageState] = useState({ page: 0, data: null });

    const handlePageState = (state: any) => {
        setPageState(state);
    }

    return <AuthLayout>
        <Card className="mx-auto max-w-sm shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl">{pageContents[pageState.page].title}</CardTitle>
                <CardDescription>
                    {pageContents[pageState.page].description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {pageState.page === 0 && <ForgotPasswordForm onClose={handlePageState} />}
                {pageState.page === 1 && <VerifyOtpForm data={pageState.data} onClose={handlePageState} />}
                {pageState.page === 2 && <ResetPasswordForm data={pageState.data} onClose={handlePageState} />}
                <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="h-px bg-gray-200 w-full"></div>
                    <span className="text-gray-500">OR</span>
                    <div className="h-px bg-gray-200 w-full"></div>
                </div>
                <div className="mt-4 text-center text-sm">
                    Remember your password?{" "}
                    <Link to="/login" className="underline">
                        Login
                    </Link>
                </div>
            </CardContent>
        </Card>
    </AuthLayout>
}   