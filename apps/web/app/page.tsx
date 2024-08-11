import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }
  return <div className="h-screen w-full">AutoMate</div>;
}
