"use server";
import { signIn, signOut } from "@/auth";

interface signinActionProps {
  email: string;
  password: string;
}

export async function signinAction({ email, password }: signinActionProps) {
  const res = await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });

  console.log(res);
  

  return res;
}

export async function signOutAction() {
  await signOut({ redirectTo: "/signin" });
}

export async function signinWithGoogleAction() {
  const res = await signIn("google", {
    redirectTo: "/",
  });
  return res;
}