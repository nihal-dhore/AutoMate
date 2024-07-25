"use client";
import { signIn } from "next-auth/react";
import SigninForm from "../../../components/signin-form";

export default function Signin() {
  const signInHandler = () => {
    signIn("google", {
      callbackUrl: "/",
      redirect: true,
    });
  };
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <SigninForm />
      <button className="px-8 py-2 border rounded-lg" onClick={signInHandler}>
        Signin with Google
      </button>
    </div>
  );
}
