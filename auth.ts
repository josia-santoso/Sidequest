import NextAuth from "next-auth"
import authConfig from "@/auth.config"
// import { userRole } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserById } from "@/data/user"

import { db } from "@/lib/db"

import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"

export const { handlers, auth, signIn, signOut } = NextAuth({
pages: {
  signIn: "/auth/login",
  error: "/auth/error",
},

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },

  callbacks: {
    
    async signIn({ user, account }) {
      // Allow OAuth to use credentials without email verification
      if (account?.provider !== "credentials") return true;
      
      // @ts-ignore comment
      const existingUser = await getUserById(user.id);

      // Prevent sign in if email is not verified from email confirmation
      if (!existingUser?.emailVerified) {
        return false;
      }


      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if (!twoFactorConfirmation) {
          return false;
        }

        //Deletes two factor for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        })
      }
      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      //Tambahkan sesuai yang diinginkan
      // session.user.custom = "anything"

      // if (token.role && session.user) {
      //   session.user.role = token.role as userRole;
      // }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      // token.role = existingUser.role;
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})