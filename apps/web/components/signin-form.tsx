"use client";
import { signinSchema } from "@repo/schemas/signin";
import { signinAction } from "app/actions/signinAction";
import { Eye, EyeIcon, EyeOffIcon } from "lucide-react";
import { AuthError } from "next-auth";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<String[]>([]);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      const validation = signinSchema.safeParse({ email, password });
      if (!validation.success) {
        setErrors(validation.error.issues.map((issue) => issue.message));
      }
      const res = await signinAction({
        email: data.email as string,
        password: data.password as string,
      });
      toast.success("Signed in successfully");
    } catch (error) {
      //console.log(error);

      /* if (error instanceof Error) {
        if (error instanceof Error) return toast.error(error.message);
      } */
      toast.error("Error while signing in");
    }
  }

  /*   useEffect(() => {
    const validation = signinSchema.safeParse({ email, password });
    if (!validation.success) {
      setErrors(validation.error.issues.map((issue) => issue.message));
    }
  }, [email, password]); */

  return (
    <>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4 max-w-sm">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-500 rounded-lg p-2 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="border border-gray-500 rounded-lg p-2 outline-none w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            title="showPassword"
            className="absolute right-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className="stroke-gray-500" size={16} />
            ) : (
              <EyeIcon className="stroke-gray-500" size={16} />
            )}
          </button>
        </div>
        {errors.length > 0 && (
          <ul className="text-red-500 list-disc pl-5">
            {errors.map((error) => (
              <li>{error}</li>
            ))}
          </ul>
        )}
        <button type="submit" className="px-4 py-2 border rounded-lg">
          Sign in
        </button>
      </form>
    </>
  );
}
