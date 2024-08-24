"use client";

import Avatar from "./avatar";

export default function Navbar() {
  return (
    <nav className="bg-foreground flex justify-between items-center py-3 px-5 fixed top-0 z-50 w-full border-b border-black border-opacity-10">
      <section>
        <header className="font-bold text-2xl">AutoMate</header>
      </section>
      <section>
        <Avatar />
      </section>
    </nav>
  );
}
