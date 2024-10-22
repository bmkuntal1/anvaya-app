import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

const updatePassword = async (data: any) => {
    const res = await axios.put("/users/update-password", data);
    return res.data;
}

export const UpdatePassword = ({ userId }: { userId: string }) => {
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { isPending, mutate } = useMutation({
        mutationFn: updatePassword,
        onSuccess: (data: any) => {
            setPassword('');
            setShowPassword(false);
            toast.success("Password updated successfully");
        },
        onError: (error: any) => {
            toast.error("Failed to update password", {
                description: error.response.data.message || error.message
            });
        }
    });

    const handleUpdatePassword = () => {
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }
        mutate({ userId, newpassword: password });
    }

    const generatePassword = () => {
        setPassword(Math.random().toString(36).slice(2, 10));
        setShowPassword(true);
    }

    const handleCopyPassword = () => {
        navigator.clipboard.writeText(password);
        toast.success("Password copied to clipboard");
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Reset Password</h1>
            <div className="space-y-2 max-w-lg">
                <div className="flex flex-col gap-2 w-[300px]">
                    <div className="flex justify-between items-center relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pr-10" />
                        <div className="absolute right-0 top-0 h-full flex items-center justify-center">
                            <Button variant="link" size="icon" className="text-sm h-[24px] text-gray-500 hover:text-gray-600 hover:drop-shadow-md" onClick={() => setShowPassword(!showPassword)}> {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</Button>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="text-sm h-[24px] hover:drop-shadow-md" onClick={handleCopyPassword}> <Copy className="w-4 h-4 mr-2" />Copy </Button>
                            <Button variant="outline" size="sm" className="text-sm h-[24px] hover:drop-shadow-md" onClick={generatePassword}> Generate</Button>
                        </div>
                        <Button variant="default" size="sm" className="text-sm h-[24px] hover:drop-shadow-md" onClick={handleUpdatePassword} disabled={isPending}>{isPending ? "Updating..." : "Update"}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}