import { AppError } from "./errorHandler";

export const authGuard = async ({ jwt, headers, cookie }: any) => {
    let token: string | undefined;

    const authorization = headers.authorization;
    if (authorization?.startsWith('Bearer ')) {
        token = authorization.slice(7);
    } else if (cookie?.auth_token?.value) {
        token = cookie.auth_token.value;
    }

    if (!token) {
        throw new AppError(
            'Missing authentication token',
            'UNAUTHORIZED',
            401
        );
    }

    try {
        const payload = await jwt.verify(token);
        if (!payload) {
            throw new AppError(
                'Invalid or expired token',
                'INVALID_TOKEN',
                401
            );
        }

        return { user: payload };
    } catch (error) {
        if (error instanceof AppError) throw error;

        throw new AppError(
            'Token verification failed',
            'TOKEN_VERIFICATION_FAILED',
            401
        );
    }
};