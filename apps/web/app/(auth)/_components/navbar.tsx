"use client";

import { Button } from "@repo/ui/components/button";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center py-2 px-5 fixed top-0 z-50 w-full border-b border-black border-opacity-10">
      <section>
        <header className="font-bold text-2xl">AutoMate</header>
      </section>
      <section>
        {pathname === "/signin" && (
          <Button
            className="bg-primary text-white rounded-full font-semibold hover:shadow-md"
            onClick={() => router.push("/signup")}
          >
            Signup
          </Button>
        )}
        {pathname === "/signup" && (
          <Button variant={"ghost"} onClick={() => router.push("/signin")}>
            Login
          </Button>
        )}
      </section>
    </nav>
  );
}
