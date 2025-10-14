import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 px-4">
      <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
      <p className="text-gray-400 text-lg mb-8">
        La página que buscas no existe.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition"
      >
        Volver al Dashboard
      </Link> 
      <div className="mt-12 text-gray-600 text-sm">
        ¿Estás seguro de que escribiste bien la URL?
      </div>
    </div>
  );
}