import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { validateCredentials } from "../../utils/ValidateCredentials";

export const {
  auth,
  handlers: { GET, POST }
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          eventType: "admin"
        }
      }
    }),
    Credentials({
      authorize: validateCredentials
    })
  ],
  // session: { strategy: "jwt" },
  // pages: {
  //   signIn: "/login"
  // },
  callbacks: {
    async signIn({ account, profile }) {

      // Strict Google verification
      if (account?.provider === "google") {
        return profile?.email_verified === true;
      }
      return true;
    },

    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0"),
          randomKey: token.randomKey,
          email: session?.user?.email
        }
      };
    },
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          secret: process.env.NEXTAUTH_SECRET!,
          id: user.id as string,
          email: user.email,
          exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
        };
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});
