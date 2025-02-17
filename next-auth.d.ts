import { userRole } from "@prisma/client"
import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user" & {
    // custom: string,
    role: userRole
}]

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

//   import { JWT } from "next-auth/jwt"

//   declare module "@auth/core/jwt" {
//     interface JWT {
//         role?: "ADMIN" | "USER" | "JASTIPER" | "BUYER"
//     }
//   }