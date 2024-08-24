"use server";
import { signIn, signOut } from "@/auth";
import prisma from "@repo/db/client";

interface signinActionProps {
  email: string;
  password: string;
}

export async function signinAction({ email, password }: signinActionProps) {
  const res = await signIn("credentials", {
    email,
    password,
    redirectTo: "/home",
  });

  console.log(res);


  return res;
}

export async function signOutAction() {
  await signOut({ redirectTo: "/signin" });
}

export async function signinWithGoogleAction() {
  const res = await signIn("google", {
    redirectTo: "/home",
  });
  return res;
}

export async function verifyEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server error");
  }
}