"use client";
import { emailSchema, passwordSchema } from "@repo/schemas/credentials";
import { signinAction, verifyEmail } from "app/actions/signinAction";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import invalid from "@/public/invalid.svg";

enum ErrorType {
  email,
  password,
}

interface ValidationError {
  type: ErrorType;
  message: String;
}

interface CredentialSigninFormProps {
  isCredentialsSignin: boolean;
  setIsCredentialsSignin: Dispatch<SetStateAction<boolean>>;
}

export default function CredentialSigninForm({
  isCredentialsSignin,
  setIsCredentialsSignin,
}: CredentialSigninFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<ValidationError>();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await signinAction({
        email: email,
        password: password,
      });
      toast.success("Signed in successfully");
    } catch (error) {
      toast.error("Error while signing in");
    }
  }

  async function handleEmailVerification() {
    const emailValidation = emailSchema.safeParse(email);
    if (!emailValidation.success) {
      setError({
        type: ErrorType.email,
        message: "Please enter a valid email address.",
      });
      return;
    }

    const user = await verifyEmail(email);
    if (!user) {
      setError({
        type: ErrorType.email,
        message: "That AutoMate account doesn't exist.",
      });
      return;
    }

    setError(undefined);
    setIsCredentialsSignin(true);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            return !isCredentialsSignin && handleEmailVerification();
          }
          handleSubmit(e);
        }}
        className="w-full flex flex-col max-w-sm"
      >
        {!isCredentialsSignin && (
          <>
            <label
              htmlFor="email"
              className={`lg:text-base flex gap-1 items-center mb-2 font-semibold ${error?.type === ErrorType.email ? "text-destructive" : "text-gray-800"}`}
            >
              <span>*</span>
              {error?.type === ErrorType.email && (
                <Image src={invalid} alt="invalid" />
              )}
              <span>Email</span>
              <span className="text-gray-700 font-normal">(required)</span>
            </label>
            <input
              type="text"
              id="email"
              className={`border bg-transparent border-gray-400 rounded-sm px-3 py-2 outline-none font-semibold ${error?.type === ErrorType.email ? "border-destructive" : ""}`}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error?.type === ErrorType.email && (
              <span className="text-sm text-destructive mt-2">
                {error.message}
              </span>
            )}
            <button
              type="button"
              disabled={email.length === 0}
              className="disabled:text-gray-500  disabled:border-gray-300 disabled:cursor-not-allowed enabled:bg-primary enabled:border-primary enabled:text-white font-semibold px-4 py-2 rounded-2xl transition-all duration-300 mt-4 border"
              onClick={handleEmailVerification}
            >
              Continue
            </button>
          </>
        )}
        {isCredentialsSignin && (
          <>
            <div className="relative flex flex-col justify-center mt-4">
              <label htmlFor="password" className="text-sm lg:text-base mb-2">
                * Password <span className="text-gray-700">(required)</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="border border-gray-400 rounded-sm p-2 outline-none w-full bg-transparent"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                title="showPassword"
                className="absolute right-3 top-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="stroke-gray-500" size={16} />
                ) : (
                  <EyeIcon className="stroke-gray-500" size={16} />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={false}
              className="disabled:opacity-70 disabled:border enabled:bg-primary enabled:text-white font-semibold px-4 py-2 rounded-2xl transition-all duration-300 mt-4"
            >
              Continue
            </button>
          </>
        )}
      </form>
    </>
  );
}
