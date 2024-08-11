
import { AuthError, NextAuthConfig, Session } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@repo/db/client";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { signinSchema } from "@repo/schemas/signin";

export const authOptions: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
        }
      }
    }),
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      async authorize(credentials) {

        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const validation = signinSchema.safeParse(credentials);

        if (!validation.success) {
          throw new Error(validation.error.issues.map((issue) => issue.message).toString());
        }

        try {
          const hashedPassword = await bcrypt.hash(credentials.password as string, 10);


          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            }
          });

          if (!user) {
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email as string,
                password: hashedPassword
              }
            });
            return newUser;
          }

          if (!user.password) throw new Error("User does not have a password");

          const passwordValidation = await bcrypt.compare(credentials.password as string, user.password);

          if (!passwordValidation) {
            //console.log("Invalid password");
            throw new AuthError("Invalid password");
          }

          return user;
        } catch (error) {
          console.log(error);

          // throw new Error("Signin error");
          throw error;
        }
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/signin",
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

