"use client";

import { Facebook, Apple, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AuthFooter } from "../footer/AuthFooter";
import { signUpAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { SignUpFormData, signUpSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function SignUpForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: "onBlur",
    });

    const onSubmit = (data: SignUpFormData) => {
        startTransition(async () => {
        const result = await signUpAction(data);

        if (result.success) {
            toast.success(result.message || "¡Cuenta creada exitosamente!");
            router.push("/signin");
        } else {
            toast.error(result.message || "Error al crear la cuenta");
        }
        });
    };

    return (
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-[#0b0f19] text-white">
        <Card className="w-full max-w-sm bg-[#101520] border border-gray-800 text-white shadow-xl">
            <CardHeader>
            <CardTitle className="text-center text-2xl font-bold mb-1">
                Welcome!
            </CardTitle>
            <p className="text-center text-gray-400 text-sm">
                Use these awesome forms to login or create a new account for free.
            </p>
            </CardHeader>

            <CardContent className="space-y-6">

            <div className="flex justify-center gap-3">
                <Button
                variant="outline"
                className="bg-transparent border-gray-700 hover:bg-gray-800 text-white p-3 rounded-xl"
                >
                <Facebook className="h-5 w-5" />
                </Button>
                <Button
                variant="outline"
                className="bg-transparent border-gray-700 hover:bg-gray-800 text-white p-3 rounded-xl"
                >
                <Apple className="h-5 w-5" />
                </Button>
                <Button
                variant="outline"
                className="bg-transparent border-gray-700 hover:bg-gray-800 text-white p-3 rounded-xl"
                >
                <Mail className="h-5 w-5" />
                </Button>
            </div>

            <div className="flex items-center justify-center">
                <div className="border-t border-gray-700 w-16" />
                <span className="text-gray-500 text-sm mx-2">or</span>
                <div className="border-t border-gray-700 w-16" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="name" className="text-gray-300 mb-2">
                        Name
                    </Label>
                    <Input
                        id="name"
                        placeholder="Your name"
                        className={`bg-transparent border-gray-700 focus:border-blue-600 text-white rounded-2xl ${
                        errors.name ? 'border-red-500 focus:border-red-500' : ''
                        }`}
                        {...register('name')}
                        disabled={isPending}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="paternalSurname" className="text-gray-300 mb-2">
                        Paternal Name
                    </Label>
                    <Input
                        id="paternalSurname"
                        placeholder="Your paternal name"
                        className={`bg-transparent border-gray-700 focus:border-blue-600 text-white rounded-2xl ${
                            errors.paternalSurname ? 'border-red-500 focus:border-red-500' : ''
                        }`}
                        {...register('paternalSurname')}
                        disabled={isPending}
                    />
                    {errors.paternalSurname && (
                        <p className="text-red-500 text-sm mt-1">{errors.paternalSurname.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="maternalSurname" className="text-gray-300 mb-2">
                        Maternal Name
                    </Label>
                    <Input
                        id="maternalSurname"
                        placeholder="Your maternal name"
                        className="bg-transparent border-gray-700 focus:border-blue-600 text-white rounded-2xl"
                        {...register('maternalSurname')}
                        disabled={isPending}
                    />
                </div>

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
                    {isPending ? "Signing up..." : "Sign Up"}
                </Button>
            </form>

            <p className="text-center text-gray-400 text-sm">
                Already have an account?{" "}
                <a href="/signin" className="text-blue-400 hover:text-blue-300">
                Sign in
                </a>
            </p>
            </CardContent>
        </Card>

        <AuthFooter />
        
        </div>
    );
}
