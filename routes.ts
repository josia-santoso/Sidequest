/**
 * Array berisi routes yang hanya bisa diakses oleh publik tanpa memerlukan autentikasi
 * @type {string[]}
 *  */ 

export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/api/province",
];

/**
 * Array berisi routes yang hanya bisa diakses setelah autentikasi
 * User akan di-redirect ke routes dalam authRoutes
 * @type {string[]}
 *  */ 

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/new-password",
    "/auth/reset",
    // "/api/province",
];

/**
 * Route prefix untuk API autentikasi
 * Route yang dimulai dengan "/api/auth" akan digunakan untuk API autentikasi
 * @type {string}
 *  */ 

export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect path setelah logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/home";