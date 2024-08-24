import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }
  return (
    <div className="h-screen w-full flex justify-center items-center">Home</div>
  );
}
