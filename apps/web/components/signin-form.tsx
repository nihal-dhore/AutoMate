"use client";
import { useToast } from "@repo/ui/components/use-toast";
import { signinAction } from "app/actions/signinAction";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function SigninForm() {
  const { toast } = useToast();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await signinAction({
        email: data.email as string,
        password: data.password as string,
      });
      toast({
        title: "Signed in successfully",
      });
    } catch (error) {
      toast({
        title: "Error while signing in",
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-500 rounded-lg p-2 outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-500 rounded-lg p-2 outline-none"
        />
        <button type="submit" className="px-4 py-2 border rounded-lg">
          Sign in
        </button>
      </form>
    </>
  );
}
