"use client";
import SigninForm from "@/components/signin-form";
import { signinWithGoogleAction } from "app/actions/signinAction";

export default function Signin() {
  async function googleSignInHandler() {
    try {
      await signinWithGoogleAction();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 justify-center items-center max-w-sm">
        <SigninForm />
        <button
          className="px-8 py-2 border rounded-lg w-full"
          onClick={googleSignInHandler}
        >
          Signin with Google
        </button>
      </div>
    </section>
  );
}
