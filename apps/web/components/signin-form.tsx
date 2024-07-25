import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const searchParams = useSearchParams();

  async function handleSubmit() {
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: searchParams.get("callbackUrl") || "/",
    });
  }

  return (
    <>
      <form onSubmit={() => handleSubmit()} className=" flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border rounded-lg p-2 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded-lg p-2 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="px-4 py-2 border rounded-lg">
          Sign in
        </button>
      </form>
    </>
  );
}
