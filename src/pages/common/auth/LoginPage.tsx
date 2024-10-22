import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useApi } from "@/hooks/use-api";
import { AuthLayout } from "./AuthLayout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/custom/form/FormInput";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { Tokens } from "@/types/auth";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const { toast } = useToast();
  const { useApiMutation } = useApi();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useApiMutation('/auth/login', {
    onSuccess: (data) => {
      toast({ title: "Login successful", description: "Welcome back!" });
      login(data.data as Tokens);
      navigate('/');
    },
    onError: (error) => {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <AuthLayout>
      <Card className="mx-auto max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormInput control={form.control} name="email" label="Email" type="email" placeholder="m@example.com" />
              <div className="relative">
                <Link to="/forgot-password" className="absolute right-0 top-1 text-sm text-gray-800 hover:underline">
                  Forgot Password?
                </Link>
                <FormInput control={form.control} name="password" label="Password" type="password" placeholder="********" />
              </div>
              <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-px bg-gray-200 w-full"></div>
            <span className="text-gray-500">OR</span>
            <div className="h-px bg-gray-200 w-full"></div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};
