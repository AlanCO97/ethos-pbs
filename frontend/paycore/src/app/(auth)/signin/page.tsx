export const dynamic = "force-dynamic";
import { SignInForm } from "@/components/auth/SignInForm";
import { AuthImage } from "@/components/auth/AuthImage";

export default function LoginPage() {
  return (
    <main className="flex h-screen overflow-hidden">
      <AuthImage />
      <SignInForm />
    </main>
  );
}