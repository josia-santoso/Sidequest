import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { redirect } from "next/navigation"

const { auth } = NextAuth(authConfig)

import {
    DEFAULT_LOGIN_REDIRECT,
    authRoutes,
    apiAuthPrefix,
    publicRoutes
} from "@/routes";

export default auth((req) => {

    const { nextUrl } = req;
    const isLoggedIn = !!req.auth

    const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    
    if (isAPIAuthRoute){
        return;
    }

    if (isAuthRoute) {
        if(isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl))
    }

    return;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    //   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],

    // dari https://clerk.com/docs/references/nextjs/auth-middleware#usage
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}