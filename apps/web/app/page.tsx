import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Navbar />
      AutoMate
    </div>
  );
}
