"use client";
import SigninForm from "@/app/(auth)/_components/signin-form";
import { signinWithGoogleAction } from "app/actions/signinAction";
import googleLogo from "@/public/google.svg";
import Image from "next/image";
import { useState } from "react";

export default function Signin() {
  const [isCredentialSignin, setIsCredentialSignin] = useState(false);
  async function googleSignInHandler() {
    try {
      await signinWithGoogleAction();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="w-full h-screen flex flex-col gap-5 justify-center items-center">
      <h3 className="font-bold text-2xl">Sign in to your account</h3>
      <div className="flex flex-col gap-4 justify-center items-center max-w-md">
        {!isCredentialSignin && (
          <>
            <button
              className="px-8 py-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 rounded-2xl flex gap-3 justify-center items-center"
              onClick={googleSignInHandler}
            >
              <Image
                src={googleLogo}
                alt="google logo"
                width={26}
                height={26}
                className="bg-foreground rounded-sm p-1"
              />
              <span>Signin with Google</span>
            </button>
            <div className="w-full flex justify-center items-center px-4">
              <hr className="w-full" />
              <span className="text-gray-500 text-sm mx-4">OR</span>
              <hr className="w-full" />
            </div>
          </>
        )}
        <SigninForm
          isCredentialsSignin={isCredentialSignin}
          setIsCredentialsSignin={setIsCredentialSignin}
        />
        <span className="text-gray-700 mt-2">
          Don't have a AutoMate account?
          <a
            href="/signup"
            className="text-blue-800 hover:text-gray-700 underline"
          >
            {" "}
            Signup
          </a>
        </span>
      </div>
    </section>
  );
}
