import Link from "next/link";

export default function MenuItem({
  icon,
  label,
  route,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  route: string;
  active: boolean;
}) {
  return (
    <Link
      href={route}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        active
          ? "bg-white text-gray-900 shadow-lg shadow-white/20"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}