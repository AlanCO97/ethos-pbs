import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Rutas de autenticación (públicas)
const authRoutes = [
  '/signin',
  '/signup',
];

// Aqui pueden ir rutas publicas adicionales
const publicRoutes: string[] = [];

// Verifica si el token JWT es válido usando el secret key
async function isTokenValid(token: string): Promise<boolean> {
  try {
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
      console.warn('JWT_SECRET no está configurado');
      return false;
    }

    const secretKey = new TextEncoder().encode(secret);

    await jwtVerify(token, secretKey);
    
    return true;
  } catch (error) {
    if (error instanceof Error) {
      const jwtError = error as Error & { code?: string };
      console.log("Error al validar el token: ", jwtError.code, jwtError.message)
    } else {
      console.log("Error al validar el token: ", error)
    }
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;
  
  // Validar que el token existe y es válido
  const isAuthenticated = token ? await isTokenValid(token) : false;

  console.log('🔍 Middleware:', { pathname, hasToken: !!token, isAuthenticated });

  // Eliminar si el token existe pero es fake
  if (token && !isAuthenticated) {
    console.log('🗑️ Token inválido o expirado, eliminando cookie');
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('sessionExpired', 'true');
    
    const response = NextResponse.redirect(signInUrl);
    response.cookies.delete('auth-token');
    response.cookies.delete('fullname');
    return response;
  }

  // Verificar si es una ruta de autenticación
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // Verificar si es una ruta pública
  const isPublicRoute = publicRoutes.some(route => pathname === route);

  // Si está autenticado e intenta acceder a signin/signup
  if (isAuthRoute && isAuthenticated) {
    console.log('✅ Usuario autenticado intentando ir a auth, redirigiendo a /');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Si es una ruta pública o de auth, permitir el acceso
  if (isAuthRoute || isPublicRoute) {
    console.log('✅ Ruta pública o auth, permitiendo acceso');
    return NextResponse.next();
  }

  // Para todas las demás rutas, verificar autenticación
  if (!isAuthenticated) {
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif)).*)',
  ],
};