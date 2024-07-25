
import { CredentialsSignin, NextAuthConfig, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@repo/db/client";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signinSchema } from "@repo/schemas/signin";

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
    CredentialsProvider({
      name: "Email login",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const validation = signinSchema.safeParse(credentials);

        if (!validation.success) {
          return null;
        }

        const hashedPassword = await bcrypt.hash(credentials.password as string, 10);


        try {
          let user;
          user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
              password: hashedPassword
            }
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                email: credentials.email as string,
                password: hashedPassword
              }
            });
          }
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/signin"
  },
  session: {
    strategy: "jwt",
    maxAge: 604800
  },
  callbacks: {
    async jwt({ token, account, profile }) {

      if (account && profile) {
        token.email = profile.email as string;
        token.id = account.access_token;
      }
      return token;
    },
    async session({ session, token }: {
      session: Session,
      token: JWT,
    }) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: token.email
          }
        });

        if (user) {
          session.user.id = user.id;
        }
      } catch (error) {
        console.log(error);
      }
      return session;
    },
    async signIn({ account, profile }) {
      try {
        if (account?.provider === "google") {
          const user = await prisma.user.findUnique({
            where: {
              email: profile?.email!
            }
          });

          if (!user) {
            const newUser = await prisma.user.create({
              data: {
                email: profile?.email!,
              }
            });
          }
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};

