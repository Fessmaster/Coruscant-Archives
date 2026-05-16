import NextAuth, { type NextAuthConfig, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credential) {
        const res = await fetch("http://localhost:3030/auth/login", {
          method: "POST",
          body: JSON.stringify(credential),
          headers: { "Content-Type": "application/json" },
        });

        const response = await res.json();

        if (res.ok && response.data.user?.accessToken) {
          return {
            id: String(response.data.user.id),
            name: response.data.user.username,
            accessToken: response.data.user.accessToken,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.accessToken = user.accessToken as string;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
