import React from "react";
import Navbar from "./_components/navbar";
import { SessionProvider } from "next-auth/react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar />
      <section>{children}</section>
    </SessionProvider>
  );
}
