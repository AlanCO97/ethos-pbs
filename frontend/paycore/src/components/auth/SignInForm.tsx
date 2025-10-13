"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthFooter } from "../footer/AuthFooter";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SignInFormData, signInSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInAction } from "@/actions/auth";
import { toast } from "sonner";

export function SignInForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: SignInFormData) => {
    startTransition(async () => {
      const result = await signInAction(data);

      if (result.success) {
        toast.success(result.message || "¡Login exitoso!");
        router.push("/");
      } else {
        toast.error(result.message || "Error al hacer login");
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-[#0b0f19] text-white">
      <Card className="w-full max-w-sm bg-[#101520] border border-gray-800 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-left text-2xl font-bold mb-1">
            Nice to see you!
          </CardTitle>
          <p className="text-left text-gray-400 text-sm">
            Enter your email and password to sign in
          </p>
        </CardHeader>

        <CardContent className="space-y-6">

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300 mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email address"
                className={`bg-transparent border-gray-700 focus:border-blue-600 text-white rounded-2xl ${
                errors.email ? 'border-red-500 focus:border-red-500' : ''
                }`}
                {...register('email')}
                disabled={isPending}
              />
              {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300 mb-2">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                className={`bg-transparent border-gray-700 focus:border-blue-600 text-white rounded-2xl ${
                errors.password ? 'border-red-500 focus:border-red-500' : ''
                }`}
                {...register('password')}
                disabled={isPending}
              />
              {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>


            <div className="flex items-center gap-2 mt-4">
              <Checkbox
                id="remember"
                className="border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label htmlFor="remember" className="text-gray-400">
                Remember me
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="text-center text-gray-400 text-sm">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-400 hover:text-blue-300">
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
      <AuthFooter />
    </div>
  );
}
