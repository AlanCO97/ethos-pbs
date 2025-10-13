import Image from "next/image";

export function AuthImage() {
  return (
    <div className="relative hidden w-1/2 lg:flex items-center justify-center bg-black">
      <Image
        src="/login-bg.jpg"
        alt="Login background"
        fill
        priority
        className="object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="relative z-10 text-center text-white px-8">
        <p className="text-sm tracking-widest mb-2 uppercase">
          Inspired by the Future
        </p>
        <h1 className="text-4xl font-bold">THE DASHBOARD</h1>
      </div>
    </div>
  );
}