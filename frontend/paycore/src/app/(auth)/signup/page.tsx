import { AuthImage } from "@/components/auth/AuthImage";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="flex h-screen overflow-hidden">
      <AuthImage />
      <SignUpForm />
    </main>
  );
}