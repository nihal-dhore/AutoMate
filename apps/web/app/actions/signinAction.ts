"use server";

import { signIn, signOut } from "auth";

interface signinActionProps {
  email: string;
  password: string;
}

export async function signinAction({ email, password }: signinActionProps) {
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });

    return res;

  } catch (error) {
    throw error;
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/signin" });
}

export async function signinWithGoogleAction() {
  try {
    const res = await signIn("google", {
      redirectTo: "/",
    });

    return res;
  } catch (error) {
    throw error
  }
}